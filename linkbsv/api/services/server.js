const express = require("express");
const cors = require("cors");
const Routes = require('../routes');

class Server{
     constructor(){
        this.app = express();
        this.app.use(express.json({ limit: '1mb' }))
        this.app.use(cors());
     }

     start(){
         require("../utils/response_handler");
         var routes = new Routes(this.app);
         routes.routesConfig()

         const port = process.env.PORT || 5000;
         const host = process.env.NODE_SERVER_HOST || '127.0.0.1';
          
         this.app.listen(port, host, () => {
             console.log(`linkBsv backend is listening on http://${host}:${port}`);
         });

     }
}

module.exports = new Server();