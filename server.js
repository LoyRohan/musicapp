const express = require("express"),
  mongoose = require("mongoose"),
  items = require("./routes/api/items"),
  albums = require("./routes/api/albums"),
  songs = require("./routes/api/songs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//DB config
const db = require("./Config/keys").mongoURI;

//connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected.................."))
  .catch((err) => console.log(err));

//user Routes
app.use(items);
app.use(albums);
app.use(songs);

//serve statics assets if in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
