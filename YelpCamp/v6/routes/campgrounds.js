var express = require("express")
var router  = express.Router()
var Campground = require("../models/campgrounds")


router.get("/",function(req, res){
    console.log(req.user)
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err)

        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user})

        }
    })

})

// CREATE -add new campground to DB
router.post("/",function(req, res){
    
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

router.get("/new",function(req, res){
    res.render("campgrounds/new")
})
 
//SHOW- shows more info about one campground
 router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
             console.log(err)
        }else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground})
        }

    })
    //find the campground wwih provided ID
    
})

 


module.exports = router