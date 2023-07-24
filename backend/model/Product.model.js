const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    image:String,
    url:String,
    brand:String,
    desc:String,
    desc_url:String,
    price:Number,
    price_url:String,
    ratings:Number,
    strickedoffprice:String,
    strickedoffprice_url:String,
    target:String,
    category:String
  },
  { timestamps: false }
);


module.exports = mongoose.model("Products", ProductsSchema);