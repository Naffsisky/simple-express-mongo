import adminController from "../controllers/admin.js";
import express from "express";
import middleware from "../middleware/index.js";

const router = express.Router();

const adminRoutes = (app) => {

  router.post("/login", adminController.login);
  router.post("/register", adminController.register);
  router.get("/dashboard", middleware.verifyToken, adminController.dashboard);
  router.get("/logout", middleware.verifyToken, adminController.logout);

  app.use("/api/", router);
};

export default adminRoutes;
