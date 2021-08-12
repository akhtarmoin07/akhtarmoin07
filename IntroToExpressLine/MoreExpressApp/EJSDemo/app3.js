var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home")
}) 
 
app.get("/fallinlovewith/:thing",function(req,res){
    var thing = req.params.thing;
    res.render("love",{thingVar: thing});
})
app.get("/posts",function(req,res){
    var posts = [
        {title:"POST 1" , author: "Susy"},
        {title: "MY IDOL ALI" , author: "CHARLIE"},
        {title: "CRISTIANO" , author: "MOIN"}
    ]
    res.render("posts",{posts: posts})
})


app.listen(300,function(){
    console.log("SERVING YOUR APP")
})