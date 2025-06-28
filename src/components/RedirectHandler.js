import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customLogger } from '../middleware/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortLinks') || '{}');
    const entry = data[shortcode];

    if (entry) {
      const now = Date.now();
      if (now < entry.expiry) {
        entry.clicks.push({ timestamp: now, source: 'localhost', location: 'India' });
        data[shortcode] = entry;
        localStorage.setItem('shortLinks', JSON.stringify(data));
        customLogger('click', { shortcode, time: now });
        window.location.href = entry.longUrl;
        return;
      }
    }
    alert('Link is invalid or expired');
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;