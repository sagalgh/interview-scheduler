import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "./Status";
import useVisualMode from "helpers/hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";  
  const SAVING = "SAVING";

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
 
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SAVING &&
      <Status />}
      {mode === SHOW && (
        <Show
          interviewer={props.interviewers}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          student={props.interview.student}
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
