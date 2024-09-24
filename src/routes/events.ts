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
import { check } from "express-validator";
import validateFields from "../middleware/validateFields";
import isDate from "../helpers/isDate";

const routerEvent = express.Router();

//!middleware obligatorio para todas las rutas, como esta primero primero se ejecuta este
routerEvent.use(validateJWT);

routerEvent.get("/", getAllEvents);

routerEvent.post(
  "/new",
  [
    check("title", "Title is required").notEmpty(),
    check("endDate", "End Date is required").custom(isDate),
    check("startDate", "startDate is required").custom(isDate),
    check("createdAt", "createdAt is required").custom(isDate),
    check("updatedAt", "updatedAt is required").custom(isDate),
    validateFields,
  ],
  createNewEvent
);

routerEvent.put("/update/:id", updateNote);

routerEvent.delete("/delete/:id", deleteNote);

export default routerEvent;
