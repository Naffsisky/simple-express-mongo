import jwt from "jsonwebtoken";

const blacklist = new Set();

function verifyToken(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(403).send({ error: "Unauthorized. Token not provided." });
  }

  const token = bearerToken.split(" ")[1];

  if (blacklist.has(token)) {
    return res.status(401).json({ error: "Unauthorized. Token has been invalidated." });
  }

  jwt.verify(token, "secret", (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(401).json({ error: "Unauthorized. Invalid token.", message: err.message });
      return;
    }

    if (new Date() > new Date(data.exp * 1000)) {
      return res.status(401).json({ error: "Unauthorized. Token has expired." });
    }

    req.userData = data;
    next();
  });
}

function blacklistToken(token) {
  blacklist.add(token);
}

export default { verifyToken, blacklistToken };
