module.exports = (app) => {
  const mahasiswa = require("../controllers/mahasiswa.js");
  const router = require("express").Router();

  router.get("/", mahasiswa.welcome);
  router.get("/all", mahasiswa.findAll);
  router.get("/:id", mahasiswa.show);
  router.post("/", mahasiswa.create);
  router.put("/:id", mahasiswa.update);
  router.delete("/:id", mahasiswa.delete);

  app.use("/api/mahasiswa", router);

  // GET http://localhost:3000/api/mahasiswa
};
