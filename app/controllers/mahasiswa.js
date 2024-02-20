const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.welcome = (req, res) => {
  res.send({
    message: "Welcome to Mahasiswa API.",
    status: 200,
    content: {
      "GET /api/mahasiswa/all": "Get all mahasiswa",
      "GET /api/mahasiswa/:id": "Get mahasiswa by id",
      "POST /api/mahasiswa": "Create mahasiswa",
      "PUT /api/mahasiswa/:id": "Update mahasiswa",
      "DELETE /api/mahasiswa/:id": "Delete mahasiswa",
    },
  });
};

exports.create = (req, res) => {
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  Mahasiswa.create(req.body)
    .then(() => {
      res.send({
        message: "Mahasiswa created successfully!",
        status: 200,
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: "Failed to create mahasiswa!",
        status: 500,
      })
    );
};

exports.findAll = (req, res) => {
  Mahasiswa.find()
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message,
        status: 500,
      })
    );
};

exports.show = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findById(id)
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res.status(404).send({
        message: "Mahasiswa not found!",
        status: 404,
      })
    );
};

exports.update = (req, res) => {
  const id = req.params.id;

  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  Mahasiswa.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Mahasiswa not found!",
        });
      }
      res.send({
        message: "Mahasiswa updated successfully!",
        status: 200,
        data: {
          mahasiswa: data,
        },
      });
    })
    .catch((err) =>
      res.status(404).send({
        message: "Mahasiswa not found!",
        status: 404,
      })
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Mahasiswa not found!",
        });
      }
      res.send({
        message: "Mahasiswa deleted successfully!",
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: "Could not delete mahasiswa!",
        status: 500,
      })
    );
};
