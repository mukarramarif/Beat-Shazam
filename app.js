import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

import('dotenv').then((dotenv) => {
    dotenv.config({ path: 'API_KEY.env' });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RapidKey = process.env.RAPID_KEY;
import fetch from 'node-fetch';

let score;

app.use(express.static(
    path.resolve(__dirname, "public")
));
async function startServer() {
    //waitts for environment variables to be loaded in this respct the api key
    const dotenv = await import('dotenv');
    dotenv.config({ path: 'API_KEY.env' });

    const RapidKey = process.env.RAPID_KEY;
    console.log(RapidKey);
    // is used to serve the static files in the public folder
    app.get("/send-playlist", async (req, res) => {
        const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${req.query.id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RapidKey,
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        }
        res.send(await fetch(url, options).then(response => response.json()));
    });
    // for getting the gamelost and gamescore html files
    app.get("/gamelost", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', "gamelost.html"));
    });
    app.get("/gameScore", (req, res) => {
        score = req.query;
        console.log(score);
        res.sendFile(path.resolve(__dirname, 'public', "gameScore.html"));
    });
    //sending to gamescore html
    app.get("/getScore", (req, res) => {
        res.send(score);
    });
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

startServer();