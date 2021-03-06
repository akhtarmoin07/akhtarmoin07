var express  = require("express"),
app          = express(),
bodyParser   = require("body-parser"),
mongoose     = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp",{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
})




app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
 
}) 

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {name: "Granite Hill", 
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     description:"This is a huge granite hill,no bathrooms,no water just granite"
//     },
//     function(err, campground){
//           if (err){
//               console.log(err)

//           } else {
//               console.log("NEWLY CREATED CAMPGROUND : ")
//               console.log(campground)
//           }
//         })



 

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
  var desc  = req.body.description
  var newCampground = {name: name, image: image,description: desc}

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
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
             console.log(err)
        }else {
            //render show template with that campground
            res.render("show",{campground: foundCampground})
        }

    })
    //find the campground wwih provided ID
    
})

app.listen(300,function(){
    console.log("YelpCamp Server has been started")
}) 

 
