const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./user.router");
const repoRouter = require('./repo.router');

mainRouter.use(userRouter);
mainRouter.use(repoRouter);

mainRouter.get("/",(req, res)=>{
    res.send("Welcome to JitHUb");
});

module.exports = mainRouter;

