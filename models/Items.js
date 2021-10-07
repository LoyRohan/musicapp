const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.export = Item = mongoose.model('item', ItemSchema);