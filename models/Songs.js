const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const Songs = new Schema({
    title: {
        type: String,
        require: true
    },
    songKey: {
        type: String,
        require: true,
        unique: true
    },
    artist: {
        type: String,
        require: true
    },
    album: {
        type: String,
        require: true
    }
})

module.exports = SongsList = mongoose.model('songs', Songs);