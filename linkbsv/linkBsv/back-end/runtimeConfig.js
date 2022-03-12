require('dotenv').config()
const mongoose = require("mongoose");
const server = require("./services/server");
const computerController = require("./controllers/computer_controller");
const txController = require("./controllers/tx_controller");



const runtimeConfig = {
    async init(){
        mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSW}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology: true},async(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log("Database Server is connected and listening");
                server.start();
                computerController.init();
                txController.init();
                
            }
        });
    }
}

module.exports = runtimeConfig;