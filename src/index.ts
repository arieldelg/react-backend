import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("ariel");
  res.json({
    ok: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("hola");
});

console.log("hola mundo ariel");
