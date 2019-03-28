var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user")
    bodyParser      = require("body-parser"),
    Uplace          = require("./models/uplace"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");


var uplaceRoutes    = require("./routes/uplaces"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index"),
    userRoutes      = require("./routes/user");


// seedDB();   //seeding the database
var url= process.env.DATABASEURL || "mongodb://localhost/undiscovered";
mongoose.connect(url,{ useNewUrlParser: true });
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once upon a time in India",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser= req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
})


app.use(indexRoutes);
app.use(uplaceRoutes);
app.use(commentRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 2000,process.env.IP,function(){
    console.log("The Undiscovered server has started !!");
});