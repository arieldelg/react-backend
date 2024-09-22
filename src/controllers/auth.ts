import { Response, Request } from "express";

interface UserCredentials {
  name: string;
  email: string;
  password: string;
}

const createNewUser = (req: Request, res: Response) => {
  const { email, name, password } = req.body as UserCredentials;

  if (name.length < 4)
    return res.status(400).json({
      ok: false,
      message: "name has to be a least 4 characters",
    });

  return res.json({
    ok: true,
    message: "register",
    user: {
      name,
      email,
      password,
    },
  });
};

const loginUser = (_: Request, res: Response) => {
  res.json({
    ok: true,
    message: "login",
  });
};

const revalidToken = (_: Request, res: Response) => {
  res.json({
    ok: true,
    message: "revalidateToken",
  });
};

export { createNewUser, loginUser, revalidToken };
