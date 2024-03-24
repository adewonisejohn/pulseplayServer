const axios = require('axios');
require('dotenv').config();

const SPOTIFY_API_KEY = process.env.SPOTIFY_API_KEY;
const SPOTIFY_API_BASE_URL = process.env.SPOTIFY_API_BASE_URL;

const getPlaylistSongs = async (req, res) => {
  try {
    const playlistId = '37i9dQZEVXbKY7jLzlJ11V';
    const endpoint = `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`;

    // Make a request to the Spotify API
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_API_KEY}`,
      },
    });

    // Extract the songs from the response
    const playlistSongs = response.data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(', '),
    }));

    // Send the playlist songs as a JSON response
    res.json(playlistSongs);
  } catch (error) {
    console.log('Error details:', error);
    console.error('Error fetching playlist songs:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getPlaylistSongs };
