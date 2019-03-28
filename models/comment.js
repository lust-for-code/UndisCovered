var mongoose   = require("mongoose");

var commentSchema=new mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        fname   : String,
        lname   : String
    }
});

module.exports=mongoose.model("Comment",commentSchema);