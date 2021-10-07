module.exports = {
    api: {
        album: "/albums",
        songs: "/songs"
    },
    routes: {
        ablbum: "/album",
        songs: "/allsongs",
        favList: "/favlist"
    },
    fields: {
        album: {
            label: "Album",
            redirectUrl: "/album",
            key: "album",
        },
        songs: {
            label: "All Songs",
            redirectUrl: "/allsongs",
            key: "allsongs",
        },
        favList: {
            label: "Favorite List",
            redirectUrl: "/favlist",
            key: "favlist",
        }
    },
    localStorageKeys: {
        favList: "favlist"
    }
}