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
    const dotenv = await import('dotenv');
    dotenv.config({ path: 'API_KEY.env' });

    const RapidKey = process.env.RAPID_KEY;
    console.log(RapidKey);

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

    app.get("/gamelost", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', "gamelost.html"));
    });
    app.get("/gameScore", (req, res) => {
        score = req.query;
        console.log(score);
        res.sendFile(path.resolve(__dirname, 'public', "gameScore.html"));
    });
    app.get("/getScore", (req, res) => {
        res.send(score);
    });
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

startServer();