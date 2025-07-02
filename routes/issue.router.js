const express = require('express');
const issueController = require('../controllers/issueController');
const issueRouter = express.Router();


issueRouter.post("/:repoId/creation", issueController.createIssue);
issueRouter.put("/getAllRepo/:userId", issueController.updateIssueById);
issueRouter.delete("/:repoId/:ID", issueController.deleteIssueById);
issueRouter.get("/repo/:name", issueController.getAllIssue);
issueRouter.get("/repo/Current/:ID", issueController.getIssueById);

module.exports = issueRouter;
