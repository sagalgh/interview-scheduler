import React, { useState, useEffect } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition= function(newMode) {
    setHistory([...history, newMode]);
    setMode(newMode);
  }
  const back = () =>{
    history.pop();
    setMode(history[history.length-1])
  }
 
  return {transition, back, mode}
}


