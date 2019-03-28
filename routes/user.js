var express         = require("express"),
    router          = express.Router(),
    User            = require("../models/user"),
    middleware      = require("../middleware/index");

//show route
router.get("/user/:user_id",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.user_id,function(err,foundUser){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            res.render("user/profile",{user: foundUser});
        }
    });
});

//edit route
router.get("/user/:user_id/edit",middleware.checkUserOwnership,function(req,res){
    User.findById(req.params.user_id,function(err,foundUser){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            res.render("user/edit",{user: foundUser});
        }
    });
});

//update route
router.put("/user/:user_id",middleware.checkUserOwnership,function(req,res){
    User.findByIdAndUpdate(req.params.user_id,req.body.user,function(err,updatedUser){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("back");
        }
        else
        {
            req.flash("success","Profile Updated Successfully !");
            res.redirect("/user/"+req.params.user_id);
        }
    });
});




module.exports=router;