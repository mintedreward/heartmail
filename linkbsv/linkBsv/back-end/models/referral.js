const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    referralId : {
        type : String
    },
    referrer : {
        type : String,
    },
    bonusPerc : {
        type : Number,
        default : 20
    },
    isActive : {
        type : Boolean,
        default : true
    },
    createdAt : {
        type : Number
    },
    updatedAt : {
        type : Number
    }
})

module.exports = mongoose.model("referrals",schema);