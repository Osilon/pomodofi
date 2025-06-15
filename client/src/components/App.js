import {useEffect, useState} from 'react';
import lofi1 from '../assets/lofi1.gif';
import lofi2 from '../assets/lofi2.gif';
import lofi3 from '../assets/lofi3.gif';
import lofi4 from '../assets/lofi4.gif';
import PomodoroTimer from './PomodoroTimer';

const bgList = [lofi1, lofi2, lofi3, lofi4];

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

  return (
    <div style={{
      backgroundImage: `url(${bgList[bgIndex]})`,
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <h1 style={{fontFamily: 'Pixel'}} className="text-5xl mt-5 ml-5 text-shadow-lg text-white">pomodofi</h1>
      <PomodoroTimer />
    </div>
  );
}

export default App;
