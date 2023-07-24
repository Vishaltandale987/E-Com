const ProductsModel = require("../model/Product.model");
const express = require("express");
const ProductsRoute = express.Router();


//get all post from ProductsModel

// ProductsRoute.get("/:color/:pri/:mi", async (req, res) => {
//   const original_paint = req.params.color;
//   const price = req.params.pri;
//   const mileage = req.params.mi;

//   if(original_paint === "all" && price === "all" && mileage === "all" ){
//     try {
//       const notes = await ProductsModel.find();
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint !== "all" && price === "all" && mileage === "all"){
//     try {
//       const notes = await ProductsModel.find({original_paint});
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint === "all" && price !== "all" && mileage === "all"){
//     try {
//       const notes = await ProductsModel.find({ price:{ $gt: price } });
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint === "all" && price === "all" && mileage !== "all"){
//     try {
//       const notes = await ProductsModel.find({ mileage:{ $gt:mileage} });
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint !== "all" && price !== "all" && mileage === "all"){
//     try {
//       const notes = await ProductsModel.find({original_paint,price:{ $gt: price }});
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint === "all" && price !== "all" && mileage !== "all"){
//     try {
//       const notes = await ProductsModel.find({mileage:{ $gt:mileage},price:{ $gt: price }});
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint !== "all" && price === "all" && mileage !== "all"){
//     try {
//       const notes = await ProductsModel.find({mileage:{ $gt:mileage},original_paint});
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }else if(original_paint !== "all" && price !== "all" && mileage !== "all"){
//     try {
//       const notes = await ProductsModel.find(newdata,original_paint,price:{ $gt: price }});
//       res.send(notes.reverse());
//     } catch (error) {
//       console.log(error)
//     }
//   }
  
  
//   });

// all product

ProductsRoute.get("/all_product", async (req, res) => {
  try {
    const data = await ProductsModel.find();
    res.send(data);
  } catch (error) {
    console.log(error)
  }

});

//men

ProductsRoute.get("/men", async (req, res) => {
    try {
      const notes = await ProductsModel.find({target:"men"});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  
  });


//women
  ProductsRoute.get("/women", async (req, res) => {
    try {
      const notes = await ProductsModel.find({target:"women"});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  
  });




//create a post

// ProductsRoute.post("/", async (req, res) => {

//   const newPost = req.body.arr
// //   const newPost = new ProductsModel(req.body);


// let newArr = newPost.map(obj => {
//     // Create a new object without the "key3" property
//     const { id, ...rest } = obj;
//     return rest;
//   });
//   console.log(newArr)

  
//   try {
//     const result = await ProductsModel.insertMany(newArr);

//     res.status(200).json(result)
//   } catch (err) {
//     res.status(500).json(err);
//   }


// });


// get post by id

ProductsRoute.get("/:id", async (req, res) => {
  try {
    const post = await ProductsModel.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete
ProductsRoute.delete("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await ProductsModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Post has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

// update


ProductsRoute.put("/:id", async (req, res) => {

  let post_id = req.params.id
  let obj = req.body

  // console.log(post_id, obj)



    try {
      const user = await ProductsModel.findByIdAndUpdate(post_id, {
        $set: obj,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  


});


// search 


ProductsRoute.get("/search/:q", async (req, res) => {
  const data = req.params.q;

  try {
    const user = await ProductsModel.find(  { model_name: { $regex: data || "", $options: 'i' } },);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = {
    ProductsRoute,
  };