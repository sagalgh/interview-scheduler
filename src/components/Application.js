import React, { useState, useEffect } from "react";
import "components/Application.scss";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";





export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  },[]);


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      
      // const [first, second, third] = all;
      // console.log("days & appts --> ", first, second, third);


    });
  },[]);


  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const schedule = dailyAppointments.map((appointment) => {
  return (
      <Appointment 
      key={appointment.id} {...appointment} />
      
  )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >

          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay} />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}