import { Response, Request } from "express";
import { client } from "../db/mongoDB";
import { MongoClient, ObjectId } from "mongodb";
import { connectMongo } from "../helpers/connectMongo";

interface NewNote {
  _uid: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
}

const getAllEvents = async (req: Request, res: Response) => {
  const { _uid } = req.body as { _uid: string };
  try {
    const connect = client as MongoClient;
    const database = connect.db("calendar");
    const collection = database.collection("notes");

    const note = await collection.find({ _uid }).toArray();

    return res.status(200).json({
      ok: true,
      message: "Status ok",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Please contact admin",
    });
  }
};

const createNewEvent = async (req: Request, res: Response) => {
  const { _uid, text, title, createdAt, updatedAt, startDate, endDate } =
    req.body as NewNote;

  const data = {
    _uid,
    text,
    title,
    creation: {
      createdAt,
      updatedAt,
    },
    timeNote: {
      startDate,
      endDate,
    },
  };
  if (!_uid)
    return res.status(401).json({
      ok: false,
      message: "Invalid Credentials when creating event",
    });

  try {
    const note = connectMongo("calendar", "notes");

    const result = await note.insertOne(data);

    if (!result.insertedId)
      return res.status(500).json({
        ok: false,
        message: "Note not inserted succesfully",
      });

    return res.status(200).json({
      ok: true,
      message: "Note inserted succesfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Please contact to the admin area",
    });
  }
};

const updateNote = async (req: Request, res: Response) => {
  const { _uid, _id, ...data } = req.body as {
    _uid: string;
    _id: string;
    data: unknown;
  };
  console.log({ _uid, _id });
  console.log({ ...data });
  if (!_uid || !_id)
    return res.status(401).json({
      ok: false,
      message: "Invalid Credentials when creating event",
    });

  try {
    const updateNote = connectMongo("calendar", "notes");
    const filter = { _id: new ObjectId(_id), _uid };
    const updateDoc = {
      $set: {
        ...data,
      },
    };
    const result = await updateNote.updateOne(filter, updateDoc);
    if (result.matchedCount === 0)
      return res.status(500).json({
        ok: false,
        message: "Error Updating Note",
        result,
      });
    return res.status(200).json({
      ok: true,
      message: "Note Updated",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Please contact the admin area",
    });
  }
};

export { createNewEvent, getAllEvents, updateNote };
