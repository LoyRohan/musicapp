const express = require('express'),
    router = express.Router();

//Item Model
const Item = require("../../models/Items");

//@route GET api/items
//@desc Get All Items
//@access public
router.get("/albulms", (req, res) => {
    Item.find()
    .sort({date: -1})
    .then((items) => {
        res.json(items)
    })
})

//@route Post api/items
//@desc Create new Items
//@access public
router.post("/", (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item = res.json(item));
})

module.exports = router;