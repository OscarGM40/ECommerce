const router = require("express").Router();
const { response, request } = require("express");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyAdmin,
  verifyToken,
} = require("../middlewares/verifyiers");
const Order = require("../models/Order");

// CREATE (EveryOne but Registered can create an Order)
router.post("/", verifyToken, async (req = request, res = response) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE (Only the Admin can update an Order)
router.put("/:id", verifyTokenAndOnlyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE (Only the Admin can delete an Order)
router.delete("/:id", verifyTokenAndOnlyAdmin, async (req, res) => {
  try {
    await Order.findOneAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDERS OF A USER
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // find a Cart with the property userId same as params
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndOnlyAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MONTHLY INCOME(compara el mes pasado con el anterior)
router.get("/income", verifyTokenAndOnlyAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    //parece que es un array con 3 argumentos(match,project y group),fijate que puedo llamar por $field a cualquier campo de la coleccion.Si tuviera ventas puedo usar $ventas
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
