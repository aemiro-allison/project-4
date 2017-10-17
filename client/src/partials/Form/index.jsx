import React, { Component } from 'react';
import request from 'superagent';
import state from './form_state';
import './Form.css';

function setFormState(e) {
  state[e.target.name] = e.target.value;
}

function FormContainer(props) {
  return (
    <form
      id={props.id}
      onSubmit={(e) => props.onSubmit(e, state)}>

      { props.children }

    </form>
  );
}

class Field extends Component {
  componentDidMount() {
    state[this.props.name] = this.props.initialValue;
  }

  render() {
    return (
      <div className="field">
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <input
          type={this.props.type}
          name={this.props.name}
          defaultValue={this.props.initialValue}
          onChange={setFormState} />
      </div>
    );
  }
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
