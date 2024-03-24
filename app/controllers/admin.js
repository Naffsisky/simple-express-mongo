import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middleware from "../middleware/index.js";

const ModelDB = db.admin;

async function login (req, res) {
  const { username, password } = req.body;

  try {
    const user = await ModelDB.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.status(200).json({ message: "Login successful.", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

async function register (req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Failed to hash the password." });
      }
      const admin = new ModelDB({
        username: username,
        password: hash,
      });

      admin
        .save()
        .then(() => {
          res.send({
            message: "Account created successfully!",
            status: 200,
            data: admin,
          });
        })
        .catch((err) =>
          res.status(500).send({
            message: "Failed to create account!",
            status: 500,
          })
        );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

async function dashboard (req, res) {
  ModelDB.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

async function logout (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(400).json({ message: "Token not provided." });
    }

    middleware.blacklistToken(token);

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default { login, register, dashboard, logout }