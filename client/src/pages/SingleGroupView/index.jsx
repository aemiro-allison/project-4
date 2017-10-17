import React, { Component } from 'react';
import List from '../../components/List';
import SingleGroup from '../../components/SingleGroup';
import Task from '../../components/Task';
import request from 'superagent';
import './SingleGroupView.css';

class SingleGroupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      tasks: [],
    };
  }

  componentDidMount() {
    request.get(`/groups/${this.props.match.params.id}`)
      .then(res => {
        this.setState(prevState => ({
          group: res.body.group,
          tasks: res.body.tasks,
        }));
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="single-group-view">

        <SingleGroup group={this.state.group} />

        <List.Container name="tasks">
          {
            this.state.tasks.map((task, i) => (
              <List.Item key={task.id} path={`/tasks/${task.id}`}>
                <Task task={task} />
              </List.Item>
            ))
          }
        </List.Container>
      </div>
    );
  }
}

export default SingleGroupView;
