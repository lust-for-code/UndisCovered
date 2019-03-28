var express         = require("express"),
    router          = express.Router(),
    Uplace          = require("../models/uplace"),
    User            = require("../models/user"),
    middleware      = require("../middleware/index");

// Index route
router.get("/uplaces",function(req,res){
    Uplace.find({},function(err,allUplaces){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            res.render("uplaces/index",{uplaces:allUplaces});
        }
    });
});

// Create route
router.post("/uplaces",middleware.isLoggedIn,function(req,res){
    var author ={
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        fname: req.user.fname,
        lname: req.user.lname
    }
    var add ={ name:req.body.name, place:req.body.place, image: req.body.image, desc:req.body.description,author: author};
    Uplace.create(add,function(err,newUplace){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            req.flash("success","New UndisCovered Place Added Successfully!");
            res.redirect("/uplaces");
        }
    });
    
});


// New Route
router.get("/uplaces/new",middleware.isLoggedIn,function(req,res){
    res.render("uplaces/new");
});


// Show Route
router.get("/uplaces/:id",function(req,res){
    Uplace.findById(req.params.id).populate("comments").exec(function(err,foundUplace){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            res.render("uplaces/show",{uplace: foundUplace});
        }
    });
});

// Edit route
router.get("/uplaces/:id/edit",middleware.checkUplaceOwnership,function(req,res){
        Uplace.findById(req.params.id,function(err, foundUplace){
            res.render("uplaces/edit",{uplace: foundUplace});
        });
});

// Update route
router.put("/uplaces/:id",middleware.checkUplaceOwnership,function(req,res){
    Uplace.findByIdAndUpdate(req.params.id,req.body.uplace,function(err,updatedUplace){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("/uplaces");
        }
        else
        {
            req.flash("success","Updated Successfully !");
            res.redirect("/uplaces/"+req.params.id);
        }
    });
});

// Destroy route
router.delete("/uplaces/:id",middleware.checkUplaceOwnership,function(req,res){
    Uplace.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("/uplaces");
        }
        else
        {
            req.flash("success","Deleted Successfully !");
            res.redirect("/uplaces");
        }
    })
});

//contact route
router.get("/uplaces/:id/contact",function(req,res){
    Uplace.findById(req.params.id,function(err,foundUplace){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            res.render("uplaces/contact",{uplace: foundUplace});
        }
    });
});

module.exports=router;