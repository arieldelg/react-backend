/**
 * *Ruta para authenticacion y registro
 * ! no borrar las rutas, PORFAVOR!!!
 */

import express from "express";
import { createNewUser, loginUser, revalidToken } from "../controllers/auth";
const routerAuth = express.Router();

routerAuth.post("/new", createNewUser);

routerAuth.post("/", loginUser);

routerAuth.get("/renew", revalidToken);

export default routerAuth;
