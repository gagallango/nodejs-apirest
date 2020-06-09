const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tuitSchema = new Schema({
    title: String,
    content: String,
    creatorID: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
})

const Tuit = mongoose.model("Tuit", tuitSchema)

module.exports = Tuit