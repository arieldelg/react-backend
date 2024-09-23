/**
 * *Important comments
 * ! no borrar las rutas, PORFAVOR!!!
 */

import express from "express";
import { createNewUser, loginUser, revalidToken } from "../controllers/auth";
import { check } from "express-validator";
import validateFields from "../middleware/validateFields";
import validateJWT from "../middleware/validateJWT";
const routerAuth = express.Router();

routerAuth.post(
  "/new",
  [
    check("name", "name is required").notEmpty(),
    check("name", "name has to be a least 6 characters").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password is required").notEmpty(),
    check("password", "password has to be a least 6 characters").isLength({
      min: 6,
    }),
    validateFields, //* custom middlewares
  ],
  createNewUser
);

routerAuth.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").notEmpty(),
    check("password", "password has to be a least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

routerAuth.get("/renew", validateJWT, revalidToken);

export default routerAuth;
