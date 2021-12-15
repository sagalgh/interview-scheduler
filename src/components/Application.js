import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "helpers/hooks/useApplicationData";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  
  const dailyInterviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const schedule = dailyAppointments.map((appointment) => {
   
  return (
      <Appointment 
      key={appointment.id} 
      {...appointment} 
      interviewers={dailyInterviewers}
      interview = {getInterview(state, appointment.interview)}
      bookInterview= {bookInterview}
      cancelInterview= {cancelInterview}
       />
      
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
            onChange={setDay}
            />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      <Appointment interviewers={dailyInterviewers} key="last" time="5pm" />
      </section>
    </main>
  );
}