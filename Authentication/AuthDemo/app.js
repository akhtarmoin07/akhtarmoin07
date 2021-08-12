var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser")
    User                  = require("./models/user")
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
 


mongoose.connect("mongodb://localhost/auth_demo_app",{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
})




var app = express()
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.use(require("express-session")({
    secret: "Rumi is the best and cutest cat in the world",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())

app.get("/",function(req, res){
    res.render("home")
})


app.get("/secret",isLoggedIn, function(req, res){
    res.render("secret")
})

//AUTH ROUTES

//show sign up form
app.get("/register",function(req,res){
    res.render("register")
})

//handling user sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err,user)
    { if(err) {
        console.log(err)
        return res.render("register")
    }
    passport.authenticate("local")(req, res, function(){
        res.redirect("/secret")
    } )
        
    })
})

//LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
    res.render("login")
})

//LOGIN ROUTES
//render login form
app.get("/login",function(req, res){ 
    res.render("login")
})


//login logic
//middleware
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res){

})

//logout
app.get("/logout",function(req, res){
    req.logout()
    res.redirect("/")
})
 


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(300,function(){
    console.log("Server has been started")
}) 



