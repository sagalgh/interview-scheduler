import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "./Confirm";
import Status from "./Status";
import useVisualMode from "helpers/hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";  
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRMING";
  const EDIT= "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }
  function remove(name, interviewer){
    transition(DELETING);
    const interview = {
      student: name,
      interviewer
    };
    props.cancelInterview(props.id,interview)
    .then(() => transition(EMPTY))
  }
 function edit(name, interview){
    transition(EDIT)
 }
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === DELETING &&
      <Status message={"Deleting"} />}
    
     {mode === CONFIRM &&
      <Confirm message ={"Are you sure you would like to delete?"} onCancel= {()=> back()} onConfirm={remove}/>}

      {mode === SAVING &&
      <Status />}
      
      {mode === EDIT &&
      <Form    
      interviewers={props.interviewers}
      onCancel= {()=> back()}
      onSave={save}
      student={props.interview.student}/>}

      {mode === SHOW && (
        <Show
          interviewers={props.interviewers}
          onEdit={edit}
          onDelete={()=>transition(CONFIRM)}
          interview={props.interview}
        />
      )}

      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE &&
      <Form 
      interviewers={props.interviewers}
      onCancel= {()=> back()}
      onSave={save}
      
      />}
      

    </article>
  );
};

export default Appointment;
