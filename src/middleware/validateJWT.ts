import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const validateJWT = (req: Request, res: Response, next: () => void) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({
      ok: false,
      message: "No token recieved",
    });

  try {
    const { name, uid } = jwt.verify(token, process.env.SECRET_JWT_SEED!) as {
      uid: string;
      name: string;
    };

    req.body = {
      ...req.body,
      _uid: uid,
      name,
    };
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Error Auth Token",
    });
  }
  return next();
};

export default validateJWT;
