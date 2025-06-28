import React, { useEffect, useState } from 'react';
import { Typography, Card } from '@mui/material';

const StatsPage = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortLinks') || '{}');
    setLinks(data);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">URL Statistics</Typography>
      {Object.entries(links).map(([code, { longUrl, createdAt, expiry, clicks }]) => (
        <Card key={code} style={{ padding: 15, margin: 10 }}>
          <Typography>Short URL: http://localhost:3000/{code}</Typography>
          <Typography>Original URL: {longUrl}</Typography>
          <Typography>Created: {new Date(createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(expiry).toLocaleString()}</Typography>
          <Typography>Total Clicks: {clicks.length}</Typography>
          <ul>
            {clicks.map((c, i) => (
              <li key={i}>{new Date(c.timestamp).toLocaleString()} — {c.source} — {c.location}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default StatsPage;