/**
 * *Highlighted comments
 * ! important comment
 */
import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { client } from "../db/mongoDB";
import { MongoClient } from "mongodb";

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
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
    if (isUnique > 0) throw new Error("Please contact with admin area");

    // * if everything ok add new document to collection
    const result = await user.insertOne({
      name,
      email,
      password,
    });

    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // * if no error throw, return a 201 status that user have been created
    return res.status(201).json({
      ok: true,
      message: "register",
      user: result,
    });
  } catch (error) {
    // * destructuring message from errrors, note that is a custom message and return a 500 status
    const { message } = error as { message: string };
    return res.status(500).json({
      ok: false,
      message: message,
    });
  }
};

const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body as UserCredentials;

  res.status(202).json({
    ok: true,
    message: "login",
    user: {
      email,
      password,
    },
  });
};

const revalidToken = (_: Request, res: Response) => {
  res.json({
    ok: true,
    message: "revalidateToken",
  });
};

export { createNewUser, loginUser, revalidToken };
