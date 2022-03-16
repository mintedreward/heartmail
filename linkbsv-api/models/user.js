const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    userName : {
        type : String
    },
    userHandleHandCash:{
        type: String,
    },
    userHandleMoneyButton:{
        type : String
    },
    userPaymail : {
        type : String
    },
    avatarUrl : {
        type : String
    },
    encMnemonics : {
        type : String
    },
    createdAt : {
        type : Number
    },
    updatedAt : {
        type : Number
    }
});

module.exports = mongoose.model("user",schema);