import { Collection, MongoClient } from "mongodb";
import { client } from "../db/mongoDB";

const connectMongo = (database: string, collection: string): Collection => {
  try {
    const connect = client as MongoClient;
    const db = connect.db(database);
    const col = db.collection(collection);

    return col;
  } catch (error) {
    console.log(error);
    throw new Error("Error en conecion Mongo");
  }
};

export { connectMongo };
