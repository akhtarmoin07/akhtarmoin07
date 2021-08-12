var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/blog_demo_2",{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
     useFindAndModify: false
})

var Post = require("./models/posts")
var User = require("./models/user")

//POST - title, content


 
// USER - email,name

Post.create({

    title: "How to Cook 02",
    
    content: "cook something good starting with the basic p5"
    
    }, function(err, post){
    
    if(err){
    
    console.log("The is an error at create");
    
    }
    
    else {
    
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
    
    if(err){
    
    console.log("error");
    
    }
    
    else{
    
    foundUser.posts.push(post);
    
    foundUser.save(function(err, data){
    
    if(err){
    
    console.log(err);
    
    }
    
    else {
    
    console.log(data);
    
    }
    
    });
    
    };
    
    });
    
    }
    
    });



//Find user
//find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// })


 