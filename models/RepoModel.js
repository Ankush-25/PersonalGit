const mongoose = require('mongoose');
const { Schema } = mongoose;

const RepositoriesSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        
    },
    content:[
        {
            type: String
        }
    ],
    visiblity:{
        type:Boolean,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    issues:[{
        type:Schema.Types.ObjectId,
        ref: "Issue"
    }]


});
const Repository = mongoose.model("Repository", RepositoriesSchema);
module.exports = Repository;