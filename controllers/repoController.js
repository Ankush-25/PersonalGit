const mongoose = require("mongoose");
const Repository = require("../models/RepoModel");
const User = require("../models/UserModel");
const Issue = require("../models/issuesModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visiblity } = req.body;
  try {
    if (!name) {
      res.status(400).json({ error: "Repository name is required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID!" });
    }

    const newRepository = new Repository({
      name,
      description,
      visiblity,
      owner,
      content,
      issues,
    });
    const result = await newRepository.save();

    res
      .status(201)
      .json({ "Message ": "Repository Created", RepositoryId: result._id });
  } catch (error) {
    console.error("Error during repository creation : ", error);
    res.status(500).send("Server error");
  }
}

async function getAllRepository(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate('owner')
      .populate("issues");
    res.json(repositories);
  } catch (error) {
    console.error("Error during Fetching all repository : ", error);
    res.status(500).send("Internal Server error!");

  }
}
async function fetchRepositoryById(req, res) {
  res.send("Repository fetched By Id");
}
async function fetchRepositoryByName(req, res) {
  res.send("Repository fetched by Name");
}
async function fetchRepositoryLogedInUser(req, res) {
  res.send("fetched Repository by logedin User");
}
async function updateRepository(req, res) {
  res.send("Repository Updated");
}
async function toggleRepositoryVisiblityById(req, res) {
  res.send("Repository toggled visiblity");
}
async function deleteRepository(req, res) {
  res.send("Repository deleted");
}

module.exports = {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryLogedInUser,
  updateRepository,
  toggleRepositoryVisiblityById,
  deleteRepository,
};
