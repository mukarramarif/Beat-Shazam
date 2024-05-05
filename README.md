# Beat-Shazam

Beat-Shazam is a web application that lets users play a game similar to the popular TV show "Beat Shazam." The game involves listening to a snippet of a song from a Spotify playlist and trying to guess the correct artist, title, and year of the song. Users earn points based on the accuracy of their guesses.

## Features

- Authenticate with Spotify and Rapid API to access your playlists.
- Select a playlist from your Spotify account to play the game with.
- Listen to a snippet of a randomly selected song from the chosen playlist.
- Guess the artist, title, and year of the song.



## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web application framework for Node.js.
- **React.js**: Frontend library for building user interfaces.
- **Rapid API**: Used for authentication and accessing user playlists and tracks.

## Installation

To run Beat-Shazam locally, follow these steps:

1. Clone the repository
2. Navigate into the project directory:
3. Install dependencies:
   ```
   npm i
   ```
5. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the following environment variables:
  ```
  RAPID_KEY=your_rapid_client_key
 
  ```
5. Start the development server:
6. Open your browser and navigate to `http://localhost:3000`.

## Deployment

Beat-Shazam can be deployed to Heroku or any other hosting service that supports Node.js applications. Make sure to set up environment variables on your hosting platform similar to the ones described in the installation section.

## Acknowledgements

- Beat-Shazam is inspired by the TV show "Beat Shazam."
- This project utilizes the Rapid API for music playback and authentication.

