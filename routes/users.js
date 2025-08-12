const express = require("express");

const userRouter = express.Router();

const {
  getUserInfo,
  getUserById,
  createUser,
  signInUser,
  getUserData,
} = require("../controller/userController");
const { isAuthenticated } = require("../middleware/middlewares");

// Get user information
userRouter.get("/", getUserInfo);

userRouter.get("/profile", isAuthenticated, getUserData);

// Get a single user by id
userRouter.get("/:id", getUserById);

// Create a new user
userRouter.post("/sign-up", createUser);

// Create a new user
userRouter.post("/sign-in", signInUser);

module.exports = userRouter;