import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import Form from '../../partials/Form';
import state from '../../partials/Form/form_state';
import './EditTaskView.css';

class EditTaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      groups: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    request
      .get(`/tasks/${this.props.match.params.id}`)
      .query({ user_id: state.user.user_id })
      .then(res => {
        state.task = res.body.task;

        this.setState(prevState => ({
          task: res.body.task,
          groups: res.body.groups,
        }));
      })
      .catch(err => console.error(err));
  }

  handleSubmit(history) {
    const self = this;

    return function(e, state) {
      e.preventDefault();
      console.log(state);
      request
        .put(`/tasks/${self.props.match.params.id}`)
        .send(state)
          .then((res) => {
            history.push(`/tasks/${self.state.task.id}`);
          })
          .catch(err => console.log(err));
    }
  }

  render() {
    if (this.state.task.attributes) {
      return (
              <div className="edit-task">
                <Form.Container
                  id="edit-task"
                  onSubmit={this.handleSubmit(this.props.history)}>

                    <Form.Field
                      type="text"
                      name="attributes.status"
                      initialValue={this.state.task.attributes.status}
                    />

                    <Form.Field
                      type="text"
                      name="name"
                      initialValue={this.state.task.name}
                    />

                    <Form.Field
                      type="text"
                      name="description"
                      initialValue={this.state.task.description}
                    />

                    <Form.Field
                      type="number"
                      name="attributes.priority_lvl"
                      initialValue={this.state.task.attributes.priority_lvl}
                    />

                    <Form.Submit text="EDIT task" />

                </Form.Container>
              </div>
            );
    } else {
      return null;
    }
  }
}

export default withRouter(EditTaskView);
