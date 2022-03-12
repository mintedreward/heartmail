const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    referralId : {
        type : String
    },
    txId : {
        type : Number,
        default : 10
    },
    createdAt : {
        type : Number
    }
})

module.exports = mongoose.model("referralClaims",schema);