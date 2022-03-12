const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    themeId : {
        type:String,
    },
    createdAt : {
        type : Number
    },
    updatedAt : {
        type : Number
    }
});

module.exports = mongoose.model("appearance",schema);