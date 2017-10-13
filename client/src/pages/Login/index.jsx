import React from 'react';
import Form from '../../partials/Form';
import './Login.css';

function Login() {
  // API REQUEST
  function handleSubmit(e, state) {
    e.preventDefault();
  }

  return (
    <div className="login">
      <Form.Container
        action=""
        method="GET"
        id="Login"
        onSubmit={handleSubmit}>

          <Form.Field type="text" name="username" />
          <Form.Field type="text" name="password" />
          <Form.Submit text="Login" />

      </Form.Container>
    </div>
  );
}

export default Login;
