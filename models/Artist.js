const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    rap_genius_id: {
        type: Number,
        required: true
    },
    auditeurs: {
        type: Number,
        required: true
    },
    spotify_id: {
        type: "String",
        required: true
    }
})

module.exports = mongoose.model("Artist", artistSchema)