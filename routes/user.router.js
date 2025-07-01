const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();


userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/UserProfile/:id", userController.getUserProfile);
userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);



module.exports= userRouter;