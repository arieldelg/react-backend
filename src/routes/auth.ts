/**
 * *Ruta para authenticacion y registro
 * ! no borrar las rutas, PORFAVOR!!!
 */

import express from "express";
const routerAuth = express.Router();

routerAuth.get("/", (req, res) => {
  res.json({
    ok: false,
  });
});

export default routerAuth;
