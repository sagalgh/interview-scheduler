import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


const Appointment = (props) => {
 
  return (
    <article className="appointment">
    <Header time={props.time}/>
   { props.interview ? 
   <Show 
   interviewer={props.interview.interviewer} 
   onEdit={props.onEdit} 
   onDelete={props.onDelete}
   student={props.interview.student}
   /> : <Empty  /> }
    </article>
  
  )
}

export default Appointment
