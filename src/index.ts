import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

console.log("hola mund");
