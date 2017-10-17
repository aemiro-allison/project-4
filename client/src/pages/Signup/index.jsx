import React from 'react';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import authService from '../../api/authService';
import Form from '../../partials/Form';
import './Signup.css';

function Signup(props) {

  // API REQUEST
  function handleSubmit(e, state) {
    e.preventDefault();
    authService.register(state, (data) => {
      props.history.push('/login');
    });
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <Form.Container
        id="signup"
        onSubmit={handleSubmit}>

          <Form.Field type="text" name="username" />
          <Form.Field type="text" name="email" />
          <Form.Field type="text" name="password" />
          <Form.Submit text="Sign Up!" />

      </Form.Container>
    </div>
  );
}

export default withRouter(Signup);
