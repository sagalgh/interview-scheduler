import React, { useState, useEffect } from "react";
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  console.log("history-----", history)
  const transition= function(newMode,replace) {
    setHistory((prev) => {
      console.log("prev---", prev)
      console.log("New mode", newMode)
      
      const newHistory = [...prev];
      console.log("New history", newHistory)
      if(replace){
        newHistory.pop();
      }
      newHistory.push(newMode);
      console.log("New history------", newHistory)
      return  newHistory;
    });
  };

  const back = () =>{
    if(history.length <2){
      return;
    }
    setHistory((prev)=>{
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
      });
  }

 const mode = history[history.length-1];
  return {transition, back, mode}
}


