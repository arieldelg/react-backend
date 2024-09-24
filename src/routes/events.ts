/**
 * !Important messafe
 */
import express from "express";
import {
  createNewEvent,
  deleteNote,
  getAllEvents,
  updateNote,
} from "../controllers/events";
import validateJWT from "../middleware/validateJWT";

const routerEvent = express.Router();

//!middleware obligatorio para todas las rutas, como esta primero primero se ejecuta este
routerEvent.use(validateJWT);

routerEvent.get("/", getAllEvents);

routerEvent.post("/new", createNewEvent);

routerEvent.put("/update/:id", updateNote);

routerEvent.delete("/delete/:id", deleteNote);

export default routerEvent;
