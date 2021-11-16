const { response, request } = require("express");
const jwt = require("jsonwebtoken");


const verifyToken = (req = request, res = response, next) => {

    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify( token, process.env.JWT_SECRET, (err, data) => {
            if (err) { 
                console.log(err);
                return res.status(403).json("Token is not valid")
             }
            req.user = data;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed for this operation")
        }
    })
}

const verifyTokenAndOnlyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Admin zone")
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndOnlyAdmin

}