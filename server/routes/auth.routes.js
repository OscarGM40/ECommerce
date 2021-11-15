const { request, response } = require("express");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


const router = require("express").Router();

router.post("/register", async (req = request, res = response) => {
    //usar el constructo o el método build solo crear un object
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_SEED).toString()
    });

    try {
        const savedUser = await newUser.save();
        const { password, ...rest } = savedUser._doc;

        res.status(201).json(rest);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/login", async (req = request, res = response) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json("Wrong credentials")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SEED)
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originalpassword !== req.body.password && res.status(401).json("Wrong Credentials")

        const accessToken = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        /* puedo sacar varias propiedades a un objeto SPREAD, pues esparzo sus propiedades */
        const { password, casa, ...others } = user._doc;
        /* Aqui he juntado con el REST lo que estaba esparcido */
        res.status(200).json({ ...others, accessToken });


    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;