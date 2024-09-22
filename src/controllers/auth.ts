import { Response, Request } from "express";
import { validationResult } from "express-validator";

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
}

const createNewUser = (req: Request, res: Response) => {
  const { email, name, password } = req.body as UserCredentials;

  return res.status(201).json({
    ok: true,
    message: "register",
    user: {
      name,
      email,
      password,
    },
  });
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
