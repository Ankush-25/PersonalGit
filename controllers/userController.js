const getAllUsers = (req, res) =>{
    res.send("All user fetched");
};

const login = (req, res)=>{
 res.send("Logged In ");   
};
const signup = (req, res) =>{
    res.send("signing Up");
};
const getUserProfile = (req, res) =>{
    res.send("All user fetched");
};
const updateUserProfile = (req, res)=>{
    res.send("Profile is Updated");
};
const deleteUserProfile= (req,res)=>{
    res.send("profile Deleted")
}

module.export ={
    getAllUsers,
    login,
    signup,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}