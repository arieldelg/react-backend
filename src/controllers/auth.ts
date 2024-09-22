import { Response, Request } from "express";

const createNewUser = (req: Request, res: Response) => {
  console.log(req);
  res.json({
    ok: true,
    message: "register",
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
