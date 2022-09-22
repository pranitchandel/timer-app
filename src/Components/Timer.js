import { useEffect, useState, useRef } from "react";

const Timer = () => {
  const [timerInput, setTimerInput] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [pause, setPause] = useState(false);
  const [contine, setContinue] = useState(false);
  var [timer, setTimer] = useState(0);
  let timeout = useRef();
  const handleTimeChange = (e) => {
    setTimerInput(e.target.value);
  };

  const formatTime = (num) => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + ":" + minutes;
  };
  const handleClick = () => {
    clearTimeout(timeout.current);
    setReset(false);
    setPause(false);
    setStart(false);
    setContinue(false);
    setTimer(timerInput * 60);
  };

  const handleStart = () => {
    clearTimeout(timeout.current);
    setTimer(timerInput * 60);
    setPause(false);
    setReset(false);
    setContinue(true);
    setStart(true);
  };

  const handlePause = () => {
    setStart(false);
    setContinue(false);
    setPause(true);
    clearTimeout(timeout.current);
  };

  const handleReset = () => {
    setStart(false);
    setReset(true);
    setPause(true);
    clearTimeout(timeout.current);
    setTimer(0);
  };

  const handleContinue = () => {
    setPause(false);
    setContinue(true);
  };

  useEffect(() => {
    if ((start && timer > 0) || (contine && timer > 0)) {
      timeout.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [start, contine, timer]);

  return (
    <div className="timerContainer">
      <h1>Timer application</h1>
      <br />
      <input
        className="inputClass"
        type="number"
        placeholder="timer value"
        value={timerInput}
        min="0"
        onChange={(e) => handleTimeChange(e)}
      />
      <button onClick={handleClick} className="setBtn">
        set
      </button>
      <div className="timerClass">{formatTime(timer)}</div>
      <button onClick={handleStart} className="controlBtn">
        start
      </button>
      <button
        onClick={handleContinue}
        disabled={contine}
        className="controlBtn"
      >
        continue
      </button>
      <button onClick={handleReset} disabled={reset} className="controlBtn">
        reset
      </button>
      <button onClick={handlePause} disabled={pause} className="controlBtn">
        pause
      </button>
    </div>
  );
};

export default Timer;
