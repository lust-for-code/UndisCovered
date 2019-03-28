var express         = require("express"),
    router          = express.Router(),
    User            = require("../models/user");
    passport        = require("passport");
    middleware      = require("../middleware/index");





router.get("/",function(req,res){
    res.render("landing");
});

//=====================================
//Authentication Routes
//=====================================

//load register form
router.get("/register",function(req,res){
    
        res.render("register");
});

//signup logic
router.post("/register",function(req,res){
    var newUser= new User({username: req.body.username,
                           fname:req.body.fname,
                           lname:req.body.lname,
                           email:req.body.email,
                           dob:req.body.dob,
                           phone:req.body.phone,
                           place:req.body.place,
                           dp:req.body.dp
                          });
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            res.render("register");
             return ;
        }

        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to UndisCovered "+user.fname);
            res.redirect("/");
        });

    });

    
});

//show login form
router.get("/login",function(req,res){
    
    res.render("login");
});

//login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }),
    function(req,res){
        if(err)
        {
            req.flash("error",err.message);
        }
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged You Out !");
    res.redirect("back");
});




module.exports= router;