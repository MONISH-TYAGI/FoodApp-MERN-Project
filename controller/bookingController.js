let SK="sk_test_51NZXUCSGQyuzcSaeWpCGFVvxxrvQS0cJlTRGpeztepyG6aff4gv4CoWoZG6WxrraaSVTyD8wxwIuVX9yV8FDCn8Q00AWUl5v50";
const stripe=require("stripe")(SK)




const planModel = require("../models/planModel")
const userModel = require("../models/userModel")
const sharedState = require('./idx.js');
module.exports.createSession=async function(req,res)
{
    console.log("hello stripe session");
    console.log("hello dost2",sharedState.x);
    // additionalData
    try{
      

        const session=await stripe.checkout.sessions.create({
            line_items:[
                {
                    // price_data:"HealthyFood101",
                    // amount:"1234",
                    // currency:"inr",
                    // quantity:1,
                    price_data: {
                        currency: 'inr',
                        unit_amount: sharedState.x*100,
                        product_data: {
                            name:"HealthyFood101"
                        }
                    },
                    quantity: 1,
                }
            ],
            mode:"payment",
            success_url:`${req.protocol}://localhost:3000`,
            cancel_url:`${req.protocol}://${req.get("host")}/profile`,
        })  
        res.redirect(303, session.url);
    }catch(err)
    {
        // res.json({
        //     msg:err.message
        // })
    
    }
}
// foodApp/controller/bookingController.js




