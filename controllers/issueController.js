const createIssue =(req, res)=>{
    console.log("Issue is Created");
};
const getIssueById =(req, res)=>{
    console.log("fetched issue by id ");
};
const getAllIssue =(req, res)=>{
    console.log("All Issues are fetch");
};
const updateIssueById =(req, res)=>{
    console.log("Issue is updated");
};
const deleteIssueById =(req, res)=>{
    console.log("Issue is deleted");
};

module.exports = {
    createIssue,
    getIssueById,
    getAllIssue,
    updateIssueById,
    deleteIssueById
}