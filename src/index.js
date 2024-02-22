
import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import { createRoot } from 'react-dom/client';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioPlayer />
  </React.StrictMode>
);
