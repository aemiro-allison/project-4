import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Task from '../Task';
import './Day.css';

class Day extends Component {
  renderTask(task, key) {
    return (
      <Link
        to={`/tasks/${task.id}`}
        text={task.name}
        className={`calendar-task`}
        key={key}>
      </Link>
    );
  }

  formatHour(i) {
    return moment(i, 'HHmm').format('HH:mm');
  }

  render() {
    const date = moment().add(this.props.id, 'days').format('ddd. MMM/DD/YY');

    return (
      <div className="day">
        <div className="date">{date}</div>
          {

            this.props.day.map((task, i) => {
              if (task.attributes) {
                return this.renderTask(task, i);
              } else {
                return (
                  <div className="time-slot hidden" key={i}>
                    {this.formatHour(i)}
                  </div>
                );
              }
            })

          }
      </div>
    );
  }
}

export default Day;
