import React, {  useEffect } from 'react';
import '../styles/index.css'; // Import index.css from the styles folder

const Controls = ({ audioRef, handleNext, handlePrev, isFileUploaded }) => {
  

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element not found.");
      return;
    }

    

    
    

    
  }, [audioRef]);

  

  

  return (
    <div className="controls">
      <button onClick={handlePrev} disabled={!isFileUploaded}>Previous</button>
      <button onClick={handleNext} disabled={!isFileUploaded}>Next</button>
    </div>
  );
  
};

export default Controls;
