import express from "express";
import {
  createNewEvent,
  getAllEvents,
  updateNote,
} from "../controllers/events";

const routerEvent = express.Router();

routerEvent.get("/", getAllEvents);

routerEvent.post("/new", createNewEvent);

routerEvent.put("/update", updateNote);

export default routerEvent;
