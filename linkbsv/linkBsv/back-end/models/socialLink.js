const mongoose = require("mongoose");


const schema = mongoose.Schema({
    userId : {
        type : String,
    },
    platform : {
        type : String
    },
    url : {
        type : String
    },
    createdAt : {
        type : Number
    },
    updatedAt : {
        type : Number
    } 
})

module.exports = mongoose.model("socialLinks",schema);