import express from "express";
import {
  createNewEvent,
  deleteNote,
  getAllEvents,
  updateNote,
} from "../controllers/events";

const routerEvent = express.Router();

routerEvent.get("/", getAllEvents);

routerEvent.post("/new", createNewEvent);

routerEvent.put("/update/:id", updateNote);

routerEvent.delete("/delete/:id", deleteNote);

export default routerEvent;
