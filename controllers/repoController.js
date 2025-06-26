const createRepository = (req, res)=>{
    res.send("Repository created");
};
const getAllRepository = (req, res)=>{
    res.send("All Repository fetched");
};
const fetchRepositoryById = (req, res)=>{
    res.send("Repository fetched By Id");
};
const fetchRepositoryByName = (req, res)=>{
    res.send("Repository fetched by Name");
};const fetchRepositoryLogedInUser = (req, res)=>{
    res.send("fetched Repository by logedin User");
};
const updateRepository = (req, res)=>{
    res.send("Repository Updated");
};const toggleRepositoryVisiblityById = (req, res)=>{
    res.send("Repository toggled visiblity");
};
const deleteRepository = (req, res)=>{
    res.send("Repository deleted");
};

module.exports={
    createRepository,
    getAllRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryLogedInUser,
    updateRepository,
    toggleRepositoryVisiblityById,
    deleteRepository
};