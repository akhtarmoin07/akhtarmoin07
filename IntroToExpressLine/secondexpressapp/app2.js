var express = require("express")
var app = express();

app.get("/",function(req,res){
    res.send("Hi there,WELCOME TO MY ASSIGNMENT");
})

app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal;
    var sound  = ""
    if(animal === "pig"){
        sound = "oink"
    } else if (animal === "cow"){
        sound = "moo"
    } else if (animal === "dog"){
        sound = "woof"
    }
    console.log(req.params)
    res.send("The " + animal + " says " + sound);
})

app.get("/repeat/:message/:times",function(req,res){
    var message = req.params.message
    var times = req.params.times
    var result = "";
    for(var i=0; i < times; i++){
        result += message + " ";

    }
    res.send(result);
     
})
 

app.get("*",function(req,res){
    res.send("OOooOOOOOoooopss")
})

app.listen(3000,function(){
    console.log("NOW SERVING YOUR APP")
})