var Uplace              = require("../models/uplace"),
    Comment             = require("../models/comment");
    User                = require("../models/user");
var middlewareObj={};

middlewareObj. checkCommentOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err, foundComment){
            if(err)
            {
                req.flash("error","Something went wrong !");
                res.redirect("back");
            }
            else
            {
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","You don't have permission to do that !");
                    res.redirect("back");
                }
            }
        })
    }
    else
    {
        req.flash("error","Please Login First !");
        res.redirect("/login");
    }
}


middlewareObj. checkUplaceOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Uplace.findById(req.params.id,function(err, foundUplace){
            if(err)
            {
                req.flash("error","Something went wrong !");
                res.redirect("back");
            }
            else
            {
                if(foundUplace.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","You don't have permission to do that !");
                    res.redirect("back");
                }
            }
        })
    }
    else
    {
        req.flash("error","Please Login First !");
        res.redirect("/login");
    }
}

middlewareObj. checkUserOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        User.findById(req.params.user_id,function(err, foundUser){
            if(err)
            {
                req.flash("error","Something went wrong !");
                res.redirect("back");
            }
            else
            {
                
                if(foundUser._id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","You don't have permission to do that !");
                    res.redirect("back");
                }
            }
        })
    }
    else
    {
        req.flash("error","Please Login First !");
        res.redirect("/login");
    }
}


middlewareObj.isLoggedIn=function (req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error","Please Login First !");
    res.redirect("/login");
}



module.exports=middlewareObj;