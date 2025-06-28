import React, { useState } from 'react';
import { TextField, Button, Card, Typography, Grid } from '@mui/material';
import { customLogger } from '../middleware/logger';
import generateShortcode from '../utils/generateShortcode';

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const newResults = [];
    const shortLinks = JSON.parse(localStorage.getItem('shortLinks') || '{}');

    for (let { longUrl, validity, shortcode } of urls) {
      if (!isValidUrl(longUrl)) continue;

      const code = shortcode || generateShortcode();
      if (shortLinks[code]) continue; // ensure uniqueness

      const createdAt = Date.now();
      const validMs = validity ? parseInt(validity) * 60000 : 30 * 60000;
      const expiry = createdAt + validMs;

      shortLinks[code] = { longUrl, createdAt, expiry, clicks: [] };
      newResults.push({ shortUrl: `http://localhost:3000/${code}`, expiry });
      customLogger('shorten', { longUrl, shortcode: code });
    }

    localStorage.setItem('shortLinks', JSON.stringify(shortLinks));
    setResults(newResults);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((u, i) => (
        <Card key={i} style={{ margin: 10, padding: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long URL"
                fullWidth
                value={u.longUrl}
                onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Validity (min)"
                fullWidth
                value={u.validity}
                onChange={(e) => handleChange(i, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={u.shortcode}
                onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Card>
      ))}
      {urls.length < 5 && (
        <Button onClick={() => setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }])}>Add More</Button>
      )}
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: 10 }}>Shorten URLs</Button>

      {results.map((r, i) => (
        <Typography key={i} style={{ marginTop: 10 }}>
          Short URL: <a href={r.shortUrl} target="_blank" rel="noopener noreferrer">{r.shortUrl}</a> — Expires: {new Date(r.expiry).toLocaleString()}
        </Typography>
      ))}
    </div>
  );
};

export default ShortenerForm;
