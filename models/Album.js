const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const Album = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    redirectRoute: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        require: true
    },
    key: {
        type: String,
        unique: true
    }
})

module.exports = Albums = mongoose.model('album', Album);