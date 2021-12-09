
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
import "components/Appointment/styles.scss";
import React from 'react'
import { useState } from "react";

const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset=()=>{
    setStudent("");
    setInterviewer(null);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value= {student}
        onChange={(event)=> {
          setStudent(event.target.value)
        }
      }
      />
    </form>
    <InterviewerList 
     interviewers ={props.interviewers}
      onChange= {(interviewer)=> {setInterviewer(interviewer)}}
      value= {interviewer}


    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button 
      danger 
      onClick={()=>{
        props.onCancel();
        reset()
      } 
        }>Cancel</Button>
      <Button confirm onClick={()=>props.onSave(interviewer,student)}>Save</Button>
    </section>
  </section>
</main>
  )
}

export default Form
