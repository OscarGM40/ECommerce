const router = require("express").Router();
const { response, request } = require("express");
const {
   verifyTokenAndAuthorization,
   verifyTokenAndOnlyAdmin, 
   verifyToken} = require("../middlewares/verifyiers");
const Cart = require("../models/Cart");

// CREATE (EveryOne but Registered can create a Cart)
router.post("/", verifyToken, async (req = request, res = response) => {
   const newCart = new Cart(req.body)
   try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
   } catch (error) {
      res.status(500).json(error)
   }
});

// UPDATE (The own user and the Admin can update a Cart)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
   try {
      const updatedCart = await Cart.findByIdAndUpdate(
         req.params.id, { $set: req.body, }, { new: true })
      res.status(200).json(updatedCart);
   } catch (error) {
      res.status(500).json(error)
   }
})


//DELETE (The own user and the Admin can delete a Cart)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
   try {
      await Cart.findOneAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...")
   } catch (error) {
      res.status(500).json(error)
   }
})

//GET USER CART()
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
   try {
      // find a Cart with the property userId same as params
      const cart = await Cart.findOne({userId: req.params.userId});
      res.status(200).json(cart);
   } catch (error) {
      res.status(500).json(error)
   }
})

//GET ALL (Only Admin can retrieve all Carts at once) 
router.get("/", verifyTokenAndOnlyAdmin, async (req, res) => {
   try {
      const carts = await Cart.find();
      res.status(200).json(carts)
   } catch (error) {
     res.status(500).json(error); 
   }
})

module.exports = router;