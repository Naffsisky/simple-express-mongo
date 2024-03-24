import dbConfig from "../config/database.js";
import mongoose from "mongoose";
import adminModel from "./admin.js";

const db = {
  mongoose,
  url: dbConfig.url,
  admin: adminModel(mongoose),
};

export default db;
