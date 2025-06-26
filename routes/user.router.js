const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();


userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/UserProfile", userController.getUserProfile);
userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.put("/updateProfile", userController.updateUserProfile);
userRouter.delete("/deleteProfile", userController.deleteUserProfile);



module.exports= userRouter;