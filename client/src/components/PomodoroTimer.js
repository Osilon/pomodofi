import { useEffect, useState } from "react"

function PomodoroTimer() {

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayPause, setDisplayPause] = useState(false);
  const [ isRunning, setIsRunning ] = useState(false);
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
    <div className="text-white mt-8 ml-5 font-medium text-shadow-lg" style={{ fontFamily: 'Pixel' }}>
      <div className="text-3xl">
        {displayPause ? <div>Take a break!</div> : <div>Do your best!</div>}
      </div>
      <div className="text-3xl font-medium text-shadow-lg">
        {timerMinutes}:{timerSeconds}
      </div>
      <button className="text-3xl font-medium text-shadow-lg" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  )
}

export default PomodoroTimer