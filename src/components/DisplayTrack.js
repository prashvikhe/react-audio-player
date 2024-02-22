import React, { useEffect, useRef } from 'react';

const DisplayTrack = ({ currentTrack, handleNext }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
  
    const playAudio = () => {
      if (audio && audio.src) {
        audio.play().catch((error) => {
          console.error("Failed to play audio.", error);
        });
      }
    };
  
    if (currentTrack) {
      if (audio.src !== currentTrack.src) {
        audio.src = currentTrack.src;
        audio.load(); // Load the new audio source
      }
      playAudio();
  
      audio.addEventListener('ended', handleNext);
  
      return () => {
        audio.removeEventListener('ended', handleNext);
      };
    }
  }, [currentTrack, handleNext]);
  
  

  return (
    <div className="display-track">
      {currentTrack && (
        <>
          <h2>{currentTrack.title}</h2>
          <audio ref={audioRef} controls />
        </>
      )}
    </div>
  );
};

export default DisplayTrack;
