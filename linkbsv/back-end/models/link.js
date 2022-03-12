const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    linkId : {
        type : String
    },
    title : {
        type : String
    },
    description : {
        type : String
    },
    orderWeight: {
        type : Number,
        default : 0
    },
    thumbnailUrl : {
        type : String,
        default : null
    },
    url : {
        type : String,
    },
    createdAt : {
        type : Number
    },
    updatedAt : {
        type : Number
    }
});

module.exports = mongoose.model("links",schema);