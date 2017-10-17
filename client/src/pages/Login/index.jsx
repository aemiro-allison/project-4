import React from 'react';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import authService from '../../api/authService';
import Form from '../../partials/Form';
import './Login.css';


function Login(props) {

  // API REQUEST
  function handleSubmit(e, state) {
    e.preventDefault();

    authService.login(state, (data) => {
        props.history.push('/tasks');
    });
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <Form.Container
        id="login"
        onSubmit={handleSubmit}>

          <Form.Field type="text" name="username" />
          <Form.Field type="text" name="password" />
          <Form.Submit text="Login" />

      </Form.Container>
    </div>
  );
}

export default withRouter(Login);
