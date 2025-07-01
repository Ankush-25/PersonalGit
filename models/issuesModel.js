const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["OPEN", "CLOSED"],
        default: "OPEN"
    },
    repository: {
        type: Schema.Types.ObjectId,
        ref: 'Repository'
    }
});

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;


