const { Repository } = require('git');
const mongoose = require('mongoose');
const { string, required } = require('yargs');
const {schema} = mongoose;

const UserSchema = new schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    Repositories: [
        {
            default:[],
            type: schema.Types.ObjectId,
            ref: "Repository"
        }
    ],
    Following: [
        {
            default:[],
            type: schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    StaredRepo: [
        {
            default:[],
            type: schema.Types.ObjectId,
            ref: "Repository"
        }
    ]
});

const User = mongoose.model("User", UserSchema)