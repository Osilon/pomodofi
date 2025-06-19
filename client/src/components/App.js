import { useEffect, useState } from 'react';
import lofi1 from '../assets/lofi1.gif';
import lofi2 from '../assets/lofi2.gif';
import lofi3 from '../assets/lofi3.gif';
import githubIcon from '../assets/githubLogo.png';
import fullscreenIcon from '../assets/fullscreenIcon.jpg';
import PomodoroTimer from './PomodoroTimer';
import Audio from './Audio';

const bgList = [lofi1, lofi2, lofi3];

function App() {

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === 'ArrowRight'){
        setBgIndex((prevIndex) => (prevIndex + 1) % bgList.length);
      }
      if(e.key === 'ArrowLeft'){
        setBgIndex((prevIndex) => (prevIndex - 1 + bgList.length) % bgList.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((error) => {
        console.error(`Error entering fullscreen: ${error.message}`);
      });
    } else {
      document.exitFullscreen().catch((error) => {
        console.error(`Error exiting fullscreen: ${error.message}`);
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover" style={{backgroundImage: `url(${bgList[bgIndex]})`}}>
      <div className="flex flex-wrap items-center justify-center sm:justify-between px-6 sm:px-12 mt-10 text-white text-shadow-lg" style={{ fontFamily: 'Pixel' }}>
        <div className="ml-[20%] sm:ml-[25%] md:ml-[30%] text-4xl sm:text-5xl">pomodofi</div>
        <div className="flex items-center gap-4 ml-auto mr-[20%] sm:mr-[25%] md:mr-[30%]">
          <a href="https://github.com/Osilon" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} width={40} alt="GitHub" />
          </a>
          <button onClick={toggleFullscreen}>
            <img src={fullscreenIcon} width={57} alt="Fullscreen" />
          </button>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <PomodoroTimer />
      </div>
      <Audio />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',}}>
        <h2 style={{fontFamily: 'Pixel'}} className="text-2xl mb-8 text-white text-shadow-lg">background {bgIndex + 1} &nbsp;[change using arrow keys]</h2>
      </div>
    </div>
  );
}

export default App;
