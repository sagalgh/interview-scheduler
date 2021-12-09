import InterviewerListItem from 'components/InterviewerListItem';
import InterviewerList from 'components/InterviewerList';
import "components/Appointment/styles.scss"

import React from 'react'
import { useState } from "react";

const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset=()=>{
    setNewName("");
    setInterviewer(null);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value= {name}
        onChange={(event)=> setNewName(event.target.value)}
      />
    </form>
    <InterviewerList 
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger {/* your code goes here */}>Cancel</Button>
      <Button confirm {/* your code goes here */}>Save</Button>
    </section>
  </section>
</main>
  )
}

export default Form
