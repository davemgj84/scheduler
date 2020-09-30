import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input 
            onChange={(event) => setName(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;