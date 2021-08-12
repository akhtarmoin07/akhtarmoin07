var express  = require("express"),
app          = express(),
bodyParser   = require("body-parser"),
mongoose     = require("mongoose")
Campground   = require("./models/campgrounds")
seedDB       = require("./seeds")

seedDB()
mongoose.connect("mongodb://localhost/yelp_camp",{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
})




app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")

 

 
 

app.get("/",function(req, res){
    res.render("landing")
})

app.get("/campgrounds",function(req, res){
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err)

        }else{
            res.render("index",{campgrounds:allCampgrounds})

        }
    })

})

// CREATE -add new campground to DB
app.post("/campgrounds",function(req, res){
    
//get data from form and add to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err)

      } else{
          //redirect back to campgrounds page
res.redirect("/campgrounds")
      }
  } )

 })

 //NEW - show form to create new campground

app.get("/campgrounds/new",function(req, res){
    res.render("new.ejs")
})
 
//SHOW- shows more info about one campground
app.get("/campgrounds/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
             console.log(err)
        }else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("show",{campground: foundCampground})
        }

    })
    //find the campground wwih provided ID
    
})

app.listen(300,function(){
    console.log("YelpCamp Server has been started")
}) 

 
