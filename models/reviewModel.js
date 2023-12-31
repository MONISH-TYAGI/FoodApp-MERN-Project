const mongoose = require("mongoose");
const { db_link } = require("../secrets");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("review db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    require: [true, "review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user:
  {
    type:mongoose.Schema.ObjectId,
    ref:"userModel",
    required:[true,"review must belong to a user"],
  },
  plan:
  {
    type:mongoose.Schema.ObjectId,
    ref:"planModel",
    required:[true,"plan must belong to  a user"],
  },

});

// reviewSchema.pre(/^find/,function(next){
//   console.log("inside pre find hook of review model")
//     this.populate({
//         path:'user',
//         select :'name profileImage'
//     }).populate("plan");
//     next();
// })
try{
reviewSchema.pre(/^find/, function (next) {
  // console.log("inside pre find hook of review model")
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});
}catch(err)
{
  console.log("error here ");
}

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;