const mongoose = require('mongoose');
const { required } = require('yargs');
const {schema} = mongoose;

const RepositoriesSchema = new schema({
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
        type:schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    issues:[{
        type:schema.Types.ObjectId,
        ref: "Issue"
    }]


});
const Repository = mongoose.model("Repository", RepositoriesSchema);
export default Repository;