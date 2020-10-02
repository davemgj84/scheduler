import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  const deleteAppointment = () => {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  };


  return (
    
    <article className="appointment">

      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />};

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      };

      {mode === CREATE &&
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      };

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === CONFIRM &&
        <Confirm
          onCancel={() => back()}
          onConfirm={deleteAppointment}
          message={"Are you sure you would like to Delete?"}
        />
      };

      {mode === DELETE && <Status message={"Deleting"} />};

      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      };

    </article>

  );
};

export default Appointment;