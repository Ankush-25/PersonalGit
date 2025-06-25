const mongoose = require("mongoose");
const {schema} = mongoose;

const IssueSchema = new schema({
    title: {
        type:String,
        required: true
    },
    discription:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["OPEN", "CLOSED"],
        default: "OPEN"
    },
    Repository:{
        type: schema.Types.ObjectId,
        ref:'Repository'
    }
});

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;


