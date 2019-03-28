var mongoose   = require("mongoose"),
    uplace = require("./models/uplace"),
    Comment    = require("./models/comment");

data=[
        {
            name:  "Rishikesh Valley",
            place: "Rishikesh",
            image: "https://www.holidify.com/blog/wp-content/uploads/2016/08/rishikesh-valley.jpg",
            desc:  "When it comes to camping, Rishikesh Camping experience has to be on the list! This amazing Rishikesh Valley camp is not only close to nature but also has a more spiritual connection. The tents here are styled in a hermit fashion and are designed to give you a total aloof time. This camp is your go-to place if you are looking for a chance to introspect your inner self. The food served here is completely organic. Apart from detoxifying, you can undertake rafting, trekking, ayurvedic spas and the grand elephant rides. Camping in Rishikesh is one of the best in India!"

        },
        {
            name:  "Kipling's Camp",
            place: "Madhya Pradesh",
            image: "https://www.holidify.com/blog/wp-content/uploads/2016/08/kipling-camp.jpg",
            desc:  "Camping in the largest protected Tiger Reserve in the country has to be unparalleled experience, right? The Kipling Camp is located in the Kanha National Park in Madhya Pradesh. This camp site is in the Satpura Hills refreshed by the water of the Narmada. Camping here lets you experience the dense wild forest and an amazingly peaceful weather. The best thing to do here is to go bird watching or pursue a jungle safari. This one is a complete family vacation spot with the chance to make joyous memories."

        },
        {
            name:  "West Ladakh Camp",
            place: "Ladakh",
            image: "https://www.holidify.com/blog/wp-content/uploads/2016/08/west-ladakh-camp.jpg",
            desc:  "If you are planning to go on a trekking trip to Ladakh you can make it even more adventurous by camping at the West Ladakh Camp. This beautiful campsite is sprawled across 20 acres of ranch and is ideally situated close to the Indus River. The tents are so placed that these are surrounded by apricot and willow trees which nest the migratory birds. You can set your base here and go trekking in the nearby region and visit the Buddhist Monasteries. The food served here is authentic Tibetan and Ladakhi food making it a unique culinary experience."

        }
    ]

function seedDB()
{
    //remove all uplaces
    uplace.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("All uplaces Removed");
        data.forEach(function(seed){
            uplace.create(seed,function(err,uplace)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("uplace Created !!");
                    Comment.create(
                        {
                            text:   "This is amazing !!!",
                            author: "Saurabh Gupta"
                        },function(err,comment){
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                uplace.comments.push(comment);
                                uplace.save();
                                console.log("Added a comment !!");
                            }
                        });
                    
                }
                
            });
        });
    });

}

module.exports= seedDB;