import express from "express";
import cors from "cors";
// para selecionar variables de entorno
import dotenv from "dotenv";
import routerAuth from "./routes/auth";
import { run } from "./db/mongoDB";
import routerEvent from "./routes/events";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Database
run();

//Directorio Publico

app.use(express.static("src/public"));

//Rutas
app.use("/api/auth", routerAuth);
app.use("/api/calendarEvents", routerEvent);

app.use("*", (_, res) => {
  const __dirname = path.resolve();

  res.sendFile(path.join(__dirname, "src/public/index.html"));
});

//listening Port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("hola");
});
