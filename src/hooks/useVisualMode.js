import { useState } from "react";

const useVisualMode = (initialMode) => {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      history.pop()
    }
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };

};

export default useVisualMode;