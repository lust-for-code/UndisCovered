var mongoose   = require("mongoose");

var uplaceSchema=new mongoose.Schema({
    name: String,
    place: String,
    image: String,
    desc: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        fname   : String,
        lname   : String,
        email   : String,
    },
    comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment"
                }
              ]
});

module.exports=mongoose.model("Uplace",uplaceSchema);