import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  },[]);
  
  const setDay = (day) => setState({...state, day});

  const spotsCounter = (action)=> {
    console.log("state", state)
    const copyOfDaysArr = [...state.days];
    const modifier = action === "book" ? -1 : 1;
    for(let day in copyOfDaysArr){
      console.log("copyofdayArr[day]",copyOfDaysArr )
      if(copyOfDaysArr[day].name === state.day){
        copyOfDaysArr[day].spots += modifier;
      }
    }
    return copyOfDaysArr
  }
  


   const bookInterview = function (id, interview){
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      const getSpotsForDay = (day) =>       
      day.appointments.length - day.appointments.reduce((count, id) => 
      (appointments[id].interview ? count + 1 : count), 0);
      
      const days = state.days.map((day)=>{
        return day.appointments.includes(id) ? {...day, spots: getSpotsForDay(day)} : day
      })

      return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState((prev) =>({...prev, appointments,days}));
    })
  }
  
  const cancelInterview = (id)=> {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const days= spotsCounter("cancel");
      return axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({...state, appointments, days})
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState((prev) => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  },[]);

  return {state,setDay,bookInterview,cancelInterview}
}

export default useApplicationData
