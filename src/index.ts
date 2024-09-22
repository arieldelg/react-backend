import express from "express";
import cors from "cors";
// para selecionar variables de entorno
import dotenv from "dotenv";
import routerAuth from "./routes/auth";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Directorio Publico

app.use(express.static("src/public"));

//Rutas
app.use("/api/auth", routerAuth);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("hola");
});

console.log("hola mundo ariel");
