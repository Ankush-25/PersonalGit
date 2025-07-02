const mongoose = require("mongoose");
const Repository = require("../models/RepoModel");

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
      .populate("owner")
      .populate("issues");
    res.json(repositories);
  } catch (error) {
    console.error("Error during Fetching all repository : ", error);
    res.status(500).send("Internal Server error!");
  }
}

async function fetchRepositoryById(req, res) {
  const repoId = req.params.ID;
  try {
    const repository = await Repository.find({ _id: repoId })
      .populate("owner")
      .populate("issues");
    if (!repository) {
      res.status(400).json({ message: "No Repo found with this Id" });
    }
    res.json(repository);
  } catch (error) {
    console.error("Error During fetching repository : ", error);
    res.status(500).send("Internal Server Error! ");
  }
}
async function fetchRepositoryByName(req, res) {
  const repoName = req.params.name;
  try {
    const repository = await Repository.find({ name: repoName })
      .populate("owner")
      .populate("issues");
    if (!repository) {
      res.status(400).json({ message: "Unable to Find Repository" });
    }
    res.json(repository);
  } catch (error) {
    console.error("Unable to Create Repository!", error);
    res.status(500).send("Internal Server Error!");
  }
}
async function fetchRepositoryLogedInUser(req, res) {
  const UserId = req.user;
  try {
    const repository = await Repository.find({ owner: UserId})
    
    if (!repository|| repository.length ==0) {
      res.status(404).json({ message: "No Repo found with this Id" });
    }
    res.json({"message":repository});
  } catch (error) {
    console.error("Error During fetching repository : ", error);
    res.status(500).send("Internal Server Error! ");
  }
}
async function updateRepositoryById(req, res) {
  const UserId = req.params.ID;
  const {content, description} = req.body
  try {
    const repository = await Repository.find({_id: UserId});
    if (!repository|| repository.length ==0) {
      res.status(404).json({ message: "No Repo found with this Id" });
    }
    repository.content.push(content);
    repository.description = description;
    const updatedRepo = await repository.save();

    res.json(res.json({  message: `Repository Updated Successfully! from ${repository} to ${updatedRepo}`}));

    
  } catch (error) {
    console.error("Error During Updating repository : ", error);
    res.status(500).send("Internal Server Error! ");
  }

}
async function toggleRepositoryVisiblityById(req, res) {
  const repoId = req.params.ID;
 
  try {
    const repository = await Repository.find({_id: repoId});
    if (!repository|| repository.length ==0) {
      res.status(404).json({ message: "No Repo found" });
    }
    repository.visiblity = !repository.visiblity;
    const updatedRepo = await repository.save();

    res.json(res.json({  message: "Repository toggled Successfully! "}));

    
  } catch (error) {
    console.error("Error During Updating repository : ", error);
    res.status(500).send("Internal Server Error! ");
  }



}
async function deleteRepository(req, res) {
  const RepoId = req.params.ID;
  try {
    const repository = await Repository.findByIdAndDelete(RepoId);
    res.send("Repository deleted", repository);
  } catch (error) {
    console.error("Unable to delete the Repository!", error);
    res.status(500).send("Internal Server Error !");
  }
}

module.exports = {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryLogedInUser,
  updateRepositoryById,
  toggleRepositoryVisiblityById,
  deleteRepository,
};
