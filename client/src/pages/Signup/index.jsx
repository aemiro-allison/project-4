import React from 'react';
import Form from '../../partials/Form';
import './Signup.css';

function Signup() {
  // API REQUEST
  function handleSubmit(e, state) {
    e.preventDefault();
  }

  return (
    <div className="signup">
      <Form.Container
        action=""
        method="GET"
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

export default Signup;
