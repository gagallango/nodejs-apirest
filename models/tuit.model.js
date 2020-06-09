const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tuitSchema = new Schema({
    content: String,
    creatorID: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
})

const Tuit = mongoose.model("Tuit", tuitSchema)

module.exports = Tuit