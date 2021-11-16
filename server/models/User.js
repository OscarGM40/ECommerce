const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,minlength:6 },
    phone: { type: String, required: false, unique: false,minlength:9},
    address: { type: String, required: false, unique: false},
    birthDate: { type: String, required: false, unique: false},
    gender: {
        type: String, 
        enum: ["male", "female","others"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
        inmutable: true
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("User", UserSchema);

