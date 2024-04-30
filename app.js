const express = require("express");
const path = require("path");
const Database =require( "better-sqlite3");
const app = express();
app.use(express.static(
    path.resolve(__dirname, "public")
  ));

app.listen(3000, () => console.log("Go Beat Shazam!"));