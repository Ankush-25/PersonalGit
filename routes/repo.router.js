const express = require('express');
const repoController = require('../controllers/repoController');
const repoRouter = express.Router();


repoRouter.post("/repo/creation", repoController.createRepository);
repoRouter.get("/getAllRepo", repoController.getAllRepository);
repoRouter.get("/repo/:ID", repoController.fetchRepositoryById);
repoRouter.get("/repo/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/Current/:ID", repoController.fetchRepositoryLogedInUser);
repoRouter.put("/updateRepo", repoController.updateRepository);
repoRouter.post("/repo/toggle/:ID", repoController.toggleRepositoryVisiblityById);
repoRouter.delete("/deleteRepo", repoController.deleteRepository);



module.exports = repoRouter;



