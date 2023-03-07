import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./config";
import { apiRouter } from "./routes/apiRouter";

const app = express();

const { PORT, MONGO_CONNECT_URL_SERVER } = config;

console.log(MONGO_CONNECT_URL_SERVER);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));
app.use("/api", apiRouter);

async function connectDB() {
  await mongoose.connect(MONGO_CONNECT_URL_SERVER as string);
}

connectDB();
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("DB connected");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
