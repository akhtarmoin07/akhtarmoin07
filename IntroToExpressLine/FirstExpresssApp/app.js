 var express = require("express")
 var app = express();

 // "/" => "Hi there!"
 app.get("/",function(req,res){
     res.send("Hi there!");
 })

 app.get("/bye",function(req,res){
     res.send("Goodbye!!");
 });

 app.get("/dog",function(req,res){
     res.send("MEOW!");
 })

 app.get("/r/:subredditName",function(req,res){
    var subreddit = req.params.subredditName;
     res.send("WELCOME TO A " + subreddit.toUpperCase() + " SUBREDDIT")
 })

 app.get("/r/:subredditName/comments/:id/:title/",function(req,res){
     console.log(req.params)
     res.send('WELCOME TO THE COMMENTS PAGE!!');
 })

 app.get('*',function(req,res){
     res.send("YOU ARE A STAR")
 })





app.listen(3000,function(){
    console.log("THIS IS PORT 3000!!");
});
