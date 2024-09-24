import { Response, Request } from "express";
import { ObjectId } from "mongodb";
import { connectMongo } from "../helpers/connectMongo";

interface NewNote {
  _uid: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
}

const getAllEvents = async (req: Request, res: Response) => {
  const { _uid, name } = req.body as { _uid: string; name: string };

  if (!_uid)
    return res.status(401).json({
      ok: false,
      message: "Invalid credentials",
    });

  try {
    const note = connectMongo("calendar", "notes");
    const result = await note.find({ _uid }).toArray();

    result.map((element) => {
      element.name = name;
      return element;
    });

    return res.status(200).json({
      ok: true,
      message: "Status ok",
      data: result,
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
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    },
    timeNote: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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
  const { _uid, name, ...data } = req.body as {
    _uid: string;
    data: unknown;
    name: string;
  };

  const { id } = req.params;

  if (!_uid || !id)
    return res.status(401).json({
      ok: false,
      message: "Invalid Credentials when creating event",
    });

  try {
    const updateNote = connectMongo("calendar", "notes");
    const filter = { _id: new ObjectId(id), _uid };

    const updateDoc = {
      $set: {
        ...data,
      },
    };
    const result = await updateNote.updateOne(filter, updateDoc);
    if (result.matchedCount === 0)
      return res.status(500).json({
        ok: false,
        message: "Error Updating Note / who the f***k are you?",
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

const deleteNote = async (req: Request, res: Response) => {
  const { _uid } = req.body;
  const { id } = req.params;

  if (!_uid)
    return res.status(401).json({
      ok: false,
      message: "Credentials Error",
    });
  try {
    const startDelete = connectMongo("calendar", "notes");

    const query = {
      _id: new ObjectId(id),
      _uid,
    };
    const result = await startDelete.deleteOne(query);

    if (result.deletedCount === 0)
      return res.status(400).json({
        ok: false,
        message: "Bad request / delete Note",
      });

    return res.status(200).json({
      ok: true,
      message: "Note deleted",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Please contact the admin area / deleteNote",
    });
  }
};

export { createNewEvent, getAllEvents, updateNote, deleteNote };
