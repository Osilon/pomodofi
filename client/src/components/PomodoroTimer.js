import { useEffect, useState } from "react"

function PomodoroTimer() {

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayPause, setDisplayPause] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    if (!isRunning) return;

    let interval = setInterval(() => {
      if (seconds === 0 && isRunning ){
        if (minutes !== 0){
          setSeconds(59)
          setMinutes(minutes - 1);
        }
        else{
          let minutes = displayPause ? 24 : 4;
          let seconds = 59;

          setMinutes(minutes);
          setSeconds(seconds);
          setDisplayPause(!displayPause);
        }
      }
      else if (isRunning) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, displayPause, isRunning]);

  return (
    <div className="text-white mt-8 ml-5 font-medium text-shadow-lg border rounded-full bg-black bg-opacity-80"
    style={{ 
      fontFamily: 'Pixel', 
      width: '300px', 
      height: '300px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
      <div className="text-4xl">
        {displayPause ? <div>take a break!</div> : <div>do your best!</div>}
      </div>
      <div className="text-4xl font-medium text-shadow-lg">
        {timerMinutes}:{timerSeconds}
      </div>
      <div style={{ display:'flex' }}>
        <button className="text-3xl font-medium text-shadow-lg" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "pause" : "start"}
        </button>
        <div>&nbsp;&nbsp;</div>
        <button className="text-3xl font-medium text-shadow-lg" 
        onClick={() =>{
          setMinutes(25);
          setSeconds(0);
          setDisplayPause(false);
          setIsRunning(false);
        }}>reset</button>
        </div>
    </div>
  )
}

export default PomodoroTimer