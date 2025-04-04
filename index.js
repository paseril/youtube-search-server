const express = require('express');
const axios = require('axios');
const app = express();

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=30&relevanceLanguage=ja&regionCode=JP&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const results = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    }));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));