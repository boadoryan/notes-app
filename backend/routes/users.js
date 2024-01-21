import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

// Route to register a new user.
router.route("/register").post(usersController.register);

// Route to login a user.
router.route("/login").post(usersController.login);

// router.route("/test").get(usersController.test);

router.route("/refresh").get(usersController.refresh);

router.route("/logout").post(usersController.logout);

export { router as userRouter };
