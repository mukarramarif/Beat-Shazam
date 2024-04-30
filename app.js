const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config({ path: 'API_KEY.env' });
const RapidKey = process.env.RAPID_KEY;
const fetch = require('node-fetch');
console.log(RapidKey);

app.use(express.static(
    path.resolve(__dirname, "public")
  ));
app.get("/send-playlist", async (req, res) => {
    const url = `https://spotify23.p.rapidapi.com/playlist/?id=${req.query.id}`;
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