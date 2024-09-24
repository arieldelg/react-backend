import express from "express";
import {
  createNewEvent,
  deleteNote,
  getAllEvents,
  updateNote,
} from "../controllers/events";
import validateJWT from "../middleware/validateJWT";

const routerEvent = express.Router();

routerEvent.get("/", validateJWT, getAllEvents);

routerEvent.post("/new", validateJWT, createNewEvent);

routerEvent.put("/update/:id", validateJWT, updateNote);

routerEvent.delete("/delete/:id", validateJWT, deleteNote);

export default routerEvent;
