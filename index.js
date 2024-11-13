import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import shipRouter from "./src/route/ship.js";
import userRouter from "./src/route/user.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION, { dbName: "ships" })
  .then(() => console.log("Connected!"))
  .catch(() => {
    console.log("bad connection");
  });

app.use(shipRouter);
app.use(userRouter);

app.use((req, res) => {
  res.status(404).json({ response: "your endpoint does not exit" });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
