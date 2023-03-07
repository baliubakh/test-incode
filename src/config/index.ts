import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_CONNECT_URL_SERVER: process.env.MONGO_CONNECT_URL_SERVER,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};
