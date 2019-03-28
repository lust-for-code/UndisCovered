var express         = require("express"),
    router          = express.Router(),
    Uplace          = require("../models/uplace"),
    Comment         = require("../models/comment");
    middleware      = require("../middleware/index");


//=====================================
//comment routes
//=====================================

// Comments New Route
router.get("/uplaces/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Uplace.findById(req.params.id,function(err,foundUplace){
        if(err)
        {
            req.flash("error",err.message);
        }
        else
        {
            res.render("comments/new",{uplace: foundUplace});
        }
    });
});

// Comments Create Route
router.post("/uplaces/:id/comments",middleware.isLoggedIn,function(req,res){
    Uplace.findById(req.params.id,function(err,uplace){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("/uplaces");
        }
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    req.flash("error",err.message);
                }
                else
                {
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;
                    comment.author.fname=req.user.fname;
                    comment.author.lname=req.user.lname;
                    comment.save();
                    uplace.comments.push(comment);
                    uplace.save();
                    req.flash("success","Successfully added comment !");
                    res.redirect("/uplaces/"+uplace._id);
                }
            });
        }
    });
});

// Comments Edit Route
router.get("/uplaces/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err)
        {
            req.flash("error",err.message);
            res.render("back");
        }
        else
        {
            res.render("comments/edit",{uplace_id: req.params.id,comment: foundComment});
        }
    });
    
});

// Comments Update Route
router.put("/uplaces/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("back");
        }
        else
        {
            req.flash("success","Successfully Updated Comment !");
            res.redirect("/uplaces/"+req.params.id);
        }
    });
});

// Commnets Destroy Route
router.delete("/uplaces/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("back");
        }
        else
        {
            req.flash("success","Successfully Deleted Comment !");
            res.redirect("/uplaces/"+req.params.id);
        }
    });
});



module.exports=router;