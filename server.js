import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./app/models/index.js";
import adminRoutes from "./app/routes/admin.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

db.mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`\nConnected to the database!\n`);
  })
  .catch((err) => {
    console.log(`Cannot connect to the database!\n ${err.message}`, err);
    process.exit();
  });

adminRoutes(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`\nServer running on port ${port}`);
});
