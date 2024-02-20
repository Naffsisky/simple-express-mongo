const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.mongoose
  .connect(db.url, mongooseConfig)
  .then(() => {
    console.log(`\nConnected to the database!\n`);
  })
  .catch((err) => {
    console.log(`Cannot connect to the database!\n ${err.message}`, err);
    process.exit();
  });

// app.get('/', (req, res) => {
//     res.json({message: "Hello World"})
// });

require("./app/routes/mahasiswa")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`\nServer running on port ${port}`);
});
