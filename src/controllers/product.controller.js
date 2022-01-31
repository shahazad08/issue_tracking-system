const Product = require("../models/product.model")
const mongoose = require("mongoose")

exports.createProduct=(req, res, next)=> {
      _id = new mongoose.Types.ObjectId(),
      name =req.body.name,
      price = req.body.price
     
    const product = new Product({
        _id: _id,
        name: name,
        price: price,
    })
      product
        .save()
        .then(result=> {
            console.log("Result is", result);
            res.status(200).send({
                message:"Product Created Successfully",
                result
            })
        })
        .catch(err=> {
            console.log(err);
        })
}