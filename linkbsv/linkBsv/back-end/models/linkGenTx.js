const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId : {
        type : String
    },
    linkId : {
        type:String,
    },
    txId : {
        type : String
    },
    createdAt : {
        type : Number
    }
});

module.exports = mongoose.model("linksGenTx",schema);