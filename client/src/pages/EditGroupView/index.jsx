import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import Form from '../../partials/Form';
import './EditGroupView.css';

class EditGroupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      tasks: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    request
      .get(`/groups/${this.props.match.params.id}`)
      .then(res => {
        this.setState(prevState => ({
          group: res.body.group,
          tasks: res.body.tasks,
        }));
      })
      .catch(err => console.error(err));
  }

  handleSubmit(history) {
    const self = this;

    return function(e, state) {
      e.preventDefault();

      request
        .put(`/groups/${self.props.match.params.id}`)
        .send(state)
          .then((res) => {
            history.push(`/groups/${self.state.group.id}`);
          })
          .catch(err => console.log(err));
    }
  }

  render() {
    if (this.state.group.priority_lvl) {
      return (
        <div className="edit-group">
          <Form.Container
            action=""
            method="GET"
            id="edit-group"
            onSubmit={this.handleSubmit(this.props.history)}
          >

            <Form.Field
              type="text"
              name="name"
              initialValue={this.state.task.name}
            />

            <Form.Field
              type="textarea"
              name="description"
              initialValue={this.state.task.description}
            />

            <Form.Field
              type="number"
              name="attributes.priority_lvl"
              initialValue={this.state.task.attributes.priority_lvl}
            />

            <Form.Submit text="EDIT GROUP" />

          </Form.Container>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(EditGroupView);
