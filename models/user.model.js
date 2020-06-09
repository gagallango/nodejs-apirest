const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userTuits: [{ type: Schema.Types.ObjectId, ref: 'Tuit' }],
    likedTuits: [{ type: Schema.Types.ObjectId, ref: 'Tuit' }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User