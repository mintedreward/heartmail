const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    linkId : {
        type : String
    },
    clicks : {
        type : String
    },
    createdAt : {
        type : Number
    }
})

module.exports = mongoose.model("impressions",schema);