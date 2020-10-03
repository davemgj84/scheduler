import { useState } from "react";

const useVisualMode = (initialMode) => {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(mode, replace = false) {
    setMode(mode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    };
  };

  const back = () => {
    setHistory(prev => {
      if (prev.length > 1) {
        return prev.slice(0, -1)
      }
      return prev;
    });
  };

  return { mode: history[history.length -1], back, transition }

};



export default useVisualMode;