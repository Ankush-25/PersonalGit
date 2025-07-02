const Issue = require("../models/issuesModel");

async function createIssue(req, res) {
  const repoId = req.params.ID;
  const { title, description } = req.body;

  try {
    const issue = new Issue({
      title,
      description,
      repository: repoId,
    });
    await issue.save();

    res.status(201).json("Issue is Created", issue);
  } catch (error) {
    console.error("Error while creating Issue! ", error);
    res.status(500).json("Internal Server Error! ");
  }
}

async function getIssueById(req, res) {
  const id = req.params.ID;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      res.status(400).json("Unable to find The Issue!");
    }
    res.json(issue);
  } catch (error) {
    console.error("There is an Error while fetching the issue :", error);
    res.status(500).json("Internal Server Error!");
  }
}
async function getAllIssue(req, res) {
  const repoId = req.params.ID;
  try {
    const allIssues = await Issue.find({ repository: repoId });
    if (allIssues.length === 0) {
      return res.status(404).json("No issues found");
    }
    res.status(200).json(allIssues);
  } catch (error) {
    console.error("There is an Error while fetching the issue :", error);
    res.status(500).json("Internal Server Error!");
  }

}
async function updateIssueById(req, res) {
  const id = req.params.ID;
  const { title, description, status } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      res.status(400).json("Unable to find The Issue!");
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;
    await issue.save();
    res.json("issue Updated", issue);
  } catch (error) {
    console.error("There is an Error while updating the issue :", error);
    res.status(500).json("Internal Server Error!");
  }
}
async function deleteIssueById(req, res) {
  const id = req.params.ID;
  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      res.status(400).json("Unable to find The Issue!");
    }
    res.json("Issue is deleted", issue);
  } catch (error) {
    console.error("There is an Error while deleting the issue :", error);
    res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  createIssue,
  getIssueById,
  getAllIssue,
  updateIssueById,
  deleteIssueById,
};
