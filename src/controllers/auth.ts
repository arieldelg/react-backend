/**
 * *Highlighted comments
 * ! important comment
 */
import { Response, Request } from "express";
import { client } from "../db/mongoDB";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/jwt";

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
}

interface MongoUser extends UserCredentials {
  _id: string;
}

const createNewUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body as UserCredentials;

  try {
    // * connecting to mongoDB client - db - collection
    const connect = client as MongoClient;
    const database = connect.db("authCalendar");
    const user = database.collection<UserCredentials>("users");

    // ! checking if email already exist, if exist , return error response else continue
    const isUnique = await user.countDocuments({ email: email });
    if (isUnique > 0)
      return res.status(400).json({
        ok: false,
        message: "User already exist, Please Login",
      });

    // ! encypt of password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    // * if everything ok add new document to collection
    const result = await user.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    //! creation of json web token
    const token = await generateJWT(
      result.insertedId as unknown as string,
      name as string
    );

    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // * if no error throw, return a 201 status that user have been created and sending token
    return res.status(201).json({
      ok: true,
      message: "register",
      user: result,
      token,
    });
  } catch (error) {
    // * returning an error if something went wrong
    return res.status(500).json({
      ok: false,
      message: "Please contact to the admin area",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  //* destructuring email and password from request body
  const { email, password } = req.body as UserCredentials;

  try {
    // * connecting to mongoDB client - db - collection
    const connect = client as MongoClient;
    const database = connect.db("authCalendar");
    const collection = database.collection("users");

    // ! checking if email dosent exist, if not , return error response else continue

    const noEmailExist = await collection.countDocuments({ email: email });

    if (noEmailExist === 0)
      return res.status(400).json({
        ok: false,
        message:
          "Invalid Credentials, please try again o contact with admin area",
      });

    // * if email exist get all the info that has the same email
    const user = (await collection.findOne({
      email: email,
    })) as unknown as MongoUser;

    // ! validate password of the email that match if doesnt match return an error
    const validCredentials = bcrypt.compareSync(password, user.password);

    if (!validCredentials)
      return res.status(400).json({
        ok: false,
        message:
          "Invalid Credentials, please try again o contact with admin area",
      });

    //! creation of json web token
    const token = await generateJWT(user._id, user.name as string);

    // * if everythinh goes ok return an status 200
    return res.status(200).json({
      ok: true,
      message: "status ok",
      data: user,
      token,
    });
  } catch (error) {
    // * returning an error if something went wrong

    return res.status(500).json({
      ok: false,
      message: "Please contact to the admin area",
    });
  }
};

const revalidToken = async (req: Request, res: Response) => {
  const { _id, name } = req.body as { _id: string; name: string };

  try {
    const token = await generateJWT(_id, name);
    return res.json({
      ok: true,
      message: "revalidateToken",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Please contact to the admin area",
    });
  }
};

export { createNewUser, loginUser, revalidToken };
