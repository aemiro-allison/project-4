import React, { Component } from 'react';
import List from '../../components/List';
import SingleTask from '../../components/SingleTask';
import Task from '../../components/Task';
import request from 'superagent';
import state from '../../partials/Form/form_state';
import './SingleTaskView.css';

class SingleTaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
    };
  }

  componentDidMount() {
    request
      .get(`/tasks/${this.props.match.params.id}`)
      .query({ user_id: state.user.user_id })
      .then(res => {
        this.setState(prevState => ({
          task: res.body.task,
        }));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="single-task-view">
        <SingleTask task={this.state.task} />
      </div>
    );
  }
}

export default SingleTaskView;
