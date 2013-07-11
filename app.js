var express=require("express");
var http=require("http");
var fs=require('fs');
var jh=require('json-header');
//var routes=require("./routes");


var app=express();

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");
app.use(app.router);
app.use(express.static(__dirname+"/rendered"));
app.use(express.static(__dirname+"/public"));


//app.get("/", routes.index);
//app.get("/signin", routes.signin);

/*
app.listen(3000, function(){
  console.log("Listening on port 3000.");
});
*/
http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
