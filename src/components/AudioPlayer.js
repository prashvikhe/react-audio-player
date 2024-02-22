import React, { useRef, useState, useEffect } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import TopBar from './TopBar';

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      setCurrentTrack(playlist[trackIndex]);
    }
  }, [playlist, trackIndex]);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const handleNext = () => {
    if (trackIndex >= playlist.length - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (trackIndex <= 0) {
      setTrackIndex(playlist.length - 1);
    } else {
      setTrackIndex((prev) => prev - 1);
    }
  };

  const handleChooseAudio = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addTrackToPlaylist = () => {
    if (selectedFile) {
      const newTrack = {
        title: selectedFile.name,
        src: URL.createObjectURL(selectedFile),
      };
      setPlaylist(prevPlaylist => [...prevPlaylist, newTrack]);
      setSelectedFile(null); // Reset selected file after adding to playlist
      setIsFileUploaded(true); // Set flag to indicate file upload
    }
  };

  return (
    <>
      <TopBar />
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack
            currentTrack={currentTrack}
            audioRef={audioRef}
            setDuration={setDuration}
            progressBarRef={progressBarRef}
            handleNext={handleNext}
          />
          <Controls
            audioRef={audioRef}
            progressBarRef={progressBarRef}
            duration={duration}
            setTimeProgress={setTimeProgress}
            playlist={playlist}
            trackIndex={trackIndex}
            setTrackIndex={setTrackIndex}
            setCurrentTrack={setCurrentTrack}
            handleNext={handleNext}
            handlePrev={handlePrev} // Pass handlePrev function to Controls component
            isFileUploaded={isFileUploaded}
            setIsFileUploaded={setIsFileUploaded}
          />
          <ProgressBar
            progressBarRef={progressBarRef}
            audioRef={audioRef}
            timeProgress={timeProgress}
            duration={duration}
          />
        </div>
        <div className="playlist">
          <h3>Playlist</h3>
          <ul>
            {playlist.map((track, index) => (
              <li key={index}>
                {track.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="audio-upload">
        <input type="file" accept="audio/*" id="audioFileInput" onChange={handleChooseAudio} />
        <button onClick={addTrackToPlaylist} disabled={!selectedFile}>Upload</button>
      </div>
    </>
  );
};

export default AudioPlayer;
