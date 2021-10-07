const express = require("express"),
    router = express.Router(),
    albums = require("../../models/Album"),
    songs = require("../../models/Songs");

router.get("/album/:id", (req, res, next) => {
    console.log(`${req.headers['x-forwarded-host']}${req.url} got request to fetch the songs from ${req.params.id} album songs.`)

    songs.find({album: req.params.id})
    .then((data, index) => {
        console.log(`Successfuly songs for album ${req.params.id} for the `)
        res.send(data.map( ({ title, songKey, artist, album}, index) => ({
            title,
            image: `/images/${songKey}.jpg`,
            key: songKey,
            albumkey: album,
            audioSrc: `/Albums/${songKey}.mp3`,
            artist
        })))
    })
    .catch((err) => {
        console.log(err)
    })
})


router.get("/albums", (req, res, next) => {
    console.log(`${req.headers['x-forwarded-host']}${req.url} got request for get songs`);

    albums.find()
        .then((data) => {
            res.send(data.map(({image, title, redirectRoute}, index) => ({title, redirectRoute, image: `/images/${image}.jpg`})))
        })
        .catch((err) => {
            console.log(err,'----------------errr')
        })
});

router.post("/albums", (req, res, next) => {
    albums.insertMany(req.body)
        .then(function (docs) {
            console.log(docs,'------------------docs')
            response.json(docs);
        })
        .catch(function (err) {
            response.status(500).send(err);
        })

        res.send()
})

module.exports = router;