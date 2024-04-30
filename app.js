const express = require("express");
const path = require("path");
//const Database =require( "better-sqlite3");
const app = express();
require('dotenv').config();
const RapidKey = process.env.RAPID_KEY;
const fetch = require('node-fetch');


app.use(express.static(
    path.resolve(__dirname, "public")
  ));
app.get("/send-playlist", async (req, res) => {
    const url = `https://spotify23.p.rapidapi.com/playlist/${req.query.id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RapidKey,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    }
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    res.json(json);
  
});

app.listen(3000, () => console.log("Go Beat Shazam!"));