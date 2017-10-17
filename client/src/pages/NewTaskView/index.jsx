import React from 'react';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import Form from '../../partials/Form';
import './NewTaskView.css';

function handleSubmit(history) {
  return function(e, state) {
    e.preventDefault();

    request
      .post(`/tasks`)
      .send(state)
      .then(res => {
        console.log(res);
        history.push('/tasks');
      })
      .catch(err => console.log(err));
  }
}

function NewTaskView(props) {
  return (
    <div className="new-task">
      <Form.Container
        id="new-task"
        onSubmit={handleSubmit(props.history)}>

          <Form.Field type="text" name="name" />
          <Form.Field type="textarea" name="description" />
          <Form.Field type="text" name="attributes.status" />
          <Form.Field type="number" name="attributes.priority_lvl" />
          <Form.Field type="number" name="attributes.estimate_time" />
          <Form.Submit text="CREATE TASK" />

      </Form.Container>
    </div>
  );
}

export default withRouter(NewTaskView);
