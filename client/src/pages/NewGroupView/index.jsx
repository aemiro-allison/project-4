import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../../partials/Form';
import './NewGroupView.css';

function handleSubmit(history) {
  return function(e, state) {
    e.preventDefault();
  }
}

function NewGroupView(props) {
  return (
    <div className="new-group">
      <Form.Container
        action=""
        method="GET"
        id="new-group"
        onSubmit={handleSubmit(props.history)}>

          <Form.Field type="number" name="priority_lvl" />
          <Form.Field type="number" name="estimated_time" />
          <Form.Submit text="CREATE GROUP" />

      </Form.Container>
    </div>
  );
}

export default withRouter(NewGroupView);
