const express = require("express"),
    router = express.Router(),
    Songs = require("../../models/Songs");

router.get("/songs", (req, res, next) => {
    console.log(`${req.headers['x-forwarded-host']}${req.url} got request for get songs`)
    let data = [];
    Songs.find()
        .then((songsList) => {
            if (songsList.length > 0) {
                console.log(`Successfully fetched the songs data `)
                return songsList;
            }
            return [];
        })
        .then((songs) => {
            let allSongs = []
            if (songs.length > 0) {
                songs.map(({title, songKey, artist, album}, index) => {
                    allSongs.push({
                        title,
                        artist,
                        image: `/images/${songKey}.jpg`,
                        key: songKey,
                        albumkey: album,
                        audioSrc: `/Albums/${songKey}.mp3`
                    })
                })
                res.json(allSongs);
            }
        })
        .catch((err) => {
            console.log(err)
        })
});

router.post("/favlist", (req, res, next) => {
    console.log(`${req.headers['x-forwarded-host']}${req.url} got request for Favrait songs`);
    Songs.find({songKey: {$in: req.body}})
        .then((songsList) => {
            if (songsList.length > 0) {
                console.log(`Successfully fetched the songs data `)
                return songsList;
            }
            res.json([]);
        })
        .then((songs) => {
            let allSongs = []
            if (songs.length > 0) {
                songs.map(({title, songKey, artist, album}, index) => {
                    allSongs.push({
                        title,
                        artist,
                        image: `/images/${songKey}.jpg`,
                        key: songKey,
                        albumkey: album,
                        audioSrc: `/Albums/${songKey}.mp3`
                    })
                })
                res.json(allSongs);
            }
        })
        .catch((err) => {
            console.log(err)
        })  

})

router.post("/songs", (req, res, next) => {

        Songs.insertMany(req.body)
            .then(function (docs) {
                response.json(docs);
            })
            .catch(function (err) {
                response.status(500).send(err);
            })
})

module.exports = router;