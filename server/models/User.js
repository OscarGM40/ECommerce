const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false, unique: true},
    address: { type: String, required: false, unique: false},
    birthDate: { type: Date, required: false, unique: false},
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

