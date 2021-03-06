import { useState } from "react";

// HOOK FOR TRANSITIONING BETWEEN MODES:
const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode]);

  const transition = function (mode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
  };

  const back = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  return { mode: history[history.length - 1], back, transition };
};

export default useVisualMode;
