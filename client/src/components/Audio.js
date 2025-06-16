import { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const stationList = ['qH3fETPsqXU', 'GgbeNFD7l7Q'];

function Audio() {
  
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [stationIndex, setStationIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'c'){
        if(playerRef.current) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
          setStationIndex((prevIndex) => (prevIndex + 1) % stationList.length);
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    if (volume === 0) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  };

  const togglePlayPause = () => {
    if(!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      if(newVolume === 0) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      mute: 1,
    }
  };

  return (
    <div style={{display: 'flex',justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <YouTube 
        key={stationList[stationIndex]}
        videoId={stationList[stationIndex]} 
        opts={opts} 
        onReady={onPlayerReady}
      />
      <div className="border rounded-lg bg-black bg-opacity-80"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        width: '230px',
        }}>
        <button className="text-2xl mr-3 text-white text-shadow-lg" style={{fontFamily: "Pixel"}} onClick = {togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min = "0"
          max = "100"
          value={volume}
          onChange={handleVolume}>
        </input>
      </div>
      <div
        style={{
          fontFamily: 'Pixel',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}>
        <div className="text-2xl text-shadow-lg">station {stationIndex + 1} &nbsp;[change by pressing 'C']</div>
        <button className="text-2xl text-shadow-lg" onClick={() => window.open(`https://www.youtube.com/watch?v=${stationList[stationIndex]}`, '_blank')}>open stream</button>
      </div>
    </div>
  );
}

export default Audio