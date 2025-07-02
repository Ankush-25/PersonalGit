const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./user.router");
const repoRouter = require('./repo.router');
const issueRouter = require("./issue.router");

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter)

mainRouter.get("/",(req, res)=>{
    res.send("Welcome to JitHUb");
});

module.exports = mainRouter;

