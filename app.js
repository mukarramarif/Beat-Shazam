const express = require("express");
const path = require("path");
const Database =require( "better-sqlite3");
const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Listening on port 3000"));