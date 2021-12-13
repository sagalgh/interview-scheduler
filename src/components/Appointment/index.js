import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          student={props.interview.student}
        />
      )}

      {mode === EMPTY && <Empty />}
    </article>
  );
};

export default Appointment;
