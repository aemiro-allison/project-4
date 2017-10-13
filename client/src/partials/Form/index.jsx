import React from 'react';
import request from 'superagent';
import state from './form_state';
import './Form.css';

function setFormState(e) {
  state[e.target.name] = e.target.value;
  console.log(state);
}

function FormContainer(props) {
  return (
    <form
      action={props.action}
      method={props.method}
      id={props.id}
      onSubmit={(e) => props.onSubmit(e, state)}>

      { props.children }

    </form>
  );
}

function Field(props) {
  return (
    <div className="field">
      <label htmlFor={props.name}>{props.name}</label>
      <input
        type={props.type}
        name={props.name}
        onChange={setFormState} />
    </div>
  );
}

function Submit(props) {
  return (
    <button type="submit" className="action">
      { props.text }
    </button>
  );
}

export default {
  Container: FormContainer,
  Field,
  Submit,
};
