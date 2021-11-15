const { response, request } = require("express");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyAdmin,
} = require("../middlewares/verifyiers");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const router = require("express").Router();

// UPDATE A USER
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  async (req = request, res = response) => {
    //si viene una pass la encripto
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_SEED
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...spread } = updatedUser._doc;
      res.status(200).json(spread);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// DELETE A USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER(only Admin can get user,not even same user can)
router.get("/find/:id", verifyTokenAndOnlyAdmin, async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);
    const { password, ...others } = userFound._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER(only Admin can get user,not even same user can)
router.get("/", verifyTokenAndOnlyAdmin, async (req, res) => {
  const latestUsers = req.query.new;

  try {
    const users = latestUsers
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER STATS
router.get("/stats", verifyTokenAndOnlyAdmin, async (req, res) => {
  const date = new Date();
  // esto devuelve el último año(el actual o el anterior)
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    //  para agregar items(se refiere a documentos o colecciones)
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
      { $sort: { month: 1 } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
