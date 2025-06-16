import {useEffect, useState} from 'react';
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
    <div style={{
      backgroundImage: `url(${bgList[bgIndex]})`,
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div className="text-5xl mt-10 text-shadow-lg text-white"
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Pixel',
        alignItems: 'center'
        }}>
        <h1 style={{marginLeft: '500px'}}>pomodofi</h1>
        <a href="https://github.com/Osilon" target="_blank" rel="noopener noreferrer" className="ml-auto">
          <button className="flex items-center justify-center">
            <img src={githubIcon} width={40} alt='GitHub Button'></img>
          </button>
        </a>
        <button style = {{marginRight: '500px'}} onClick={toggleFullscreen} className="ml-3">
          <img src={fullscreenIcon} width={57} alt='Fullscreen Button'></img>
        </button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(50vh + 100px)'}}>
        <PomodoroTimer />
      </div>
      <Audio />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',}}>
        <h2 style={{fontFamily: 'Pixel'}} className="text-2xl mt-5 text-white text-shadow-lg">background {bgIndex + 1} &nbsp;[change using arrow keys]</h2>
      </div>
    </div>
  );
}

export default App;
