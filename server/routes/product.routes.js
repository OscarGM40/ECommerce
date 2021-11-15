const router = require("express").Router();
const { response, request } = require("express");
const {
   verifyTokenAndAuthorization,
   verifyTokenAndOnlyAdmin, 
   verifyToken} = require("../middlewares/verifyiers");
const Product = require("../models/Product");

// CREATE (Only Admin can create a Product)
router.post("/", verifyTokenAndOnlyAdmin, async (req = request, res = response) => {
   const newProduct = new Product(req.body)

   try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
   } catch (error) {
      res.status(500).json(error)
   }
})

// UPDATE (only Admin)
router.put("/:id", verifyTokenAndOnlyAdmin, async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id, { $set: req.body, }, { new: true })
      res.status(200).json(updatedProduct);
   } catch (error) {
      res.status(500).json(error)
   }
})

//DELETE (Only Admin)
router.delete("/:id", verifyTokenAndOnlyAdmin, async (req, res) => {
   try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...")
   } catch (error) {
      res.status(500).json(error)
   }
})

// GET PRODUCT( Everybody but registered can see products)
router.get("/find/:id", verifyToken,  async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
   } catch (error) {
      res.status(500).json(error)
   }
})

// GET ALL PRODUCTS (Again EveryBody can perform this)
router.get("/", verifyToken, async (req, res) => {
   const qNew = req.query.new;
   const qCategory = req.query.category;

   try {
      let products;
      if (qNew) {
         products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
         products = await Product.find({ categories: { $in: [qCategory], }})
      } else {
         products = await Product.find();
      }
      res.status(200).json(products)
   } catch (error) {

   }
})


module.exports = router;