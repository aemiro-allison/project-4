import React, { Component } from 'react';
import List from '../../components/List';
import Task from '../../components/Task';
import request from 'superagent';
import state from '../../partials/Form/form_state';
import _ from '../../components/Calendar/helpers';
import './TaskView.css';

class TaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentSort: 'ASC',
      currentFilter: 'default',
      options: {
        filterList: [
          { value: 'default', label: 'Normal'},
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'TO_DO', label: 'To-do' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
        ],
        sortList: [
          { value: 'default', label: 'Normal'},
          { value: 'ASC', label: 'ASC' },
          { value: 'DESC', label: 'DESC' },
        ],
      },
    };
    this.filterTask = this.filterTask.bind(this);
    this.sortTask = this.sortTask.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
  }

  filterTask(option) {
    if (option.value === 'default') {
      return this.setState(prevState => ({
        tasks: state.tasks,
      }));
    }

    this.setState(prevState => ({
      currentFilter: option.value,
      tasks: _.filter(state.tasks, 'attributes.status', option.value),
    }));
  }

  sortTask(option) {
    if (option.value === 'default') {
      return this.setState(prevState => ({
        tasks: state.tasks,
      }));
    }

    this.setState(prevState => ({
      currentSort: option.value,
      tasks: _.sort(state.tasks, 'attributes.priority_lvl', option.value),
    }));
  }

  getAllTasks() {
    request
      .get(`/tasks`)
      .query({ user_id: state.user.user_id })
      .then(res => {
        state.tasks = res.body.tasks;
        this.setState(prevState => ({
          tasks: res.body.tasks,
        }));
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getAllTasks();
  }

  render() {
    return (
      <div className="task-view">
        <List.Container
          name="tasks"
          sortable={true}
          filterList={this.filterTask}
          sortList={this.sortTask}
          options={this.state.options}
        >
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

export default TaskView;
