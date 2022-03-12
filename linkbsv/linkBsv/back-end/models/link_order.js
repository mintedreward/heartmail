const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    linkOrder : {
        type : String,
        default : null
    },
    createdAt : {
        type : Number
    },
    updatedAt : {
        type : Number
    }
})

module.exports = mongoose.model("linkOrders",schema);