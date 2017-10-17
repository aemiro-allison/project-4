import React, { Component } from 'react';
import ReactList from 'react-list';
import request from 'superagent';
import state from '../../partials/Form/form_state';
import Day from '../Day';
import Hours from '../Hours';
import './Calendar.css';

import TimeAnalyticalEngine from './TimeAnalyticalEngine';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    request
      .get(`/tasks`)
      .query({ user_id: state.user.user_id })
      .then(res => {
        const days = TimeAnalyticalEngine.populate(res.body.tasks);

        this.setState(prevState => ({
          days,
        }));
      })
      .catch(err => console.error(err));
  }

  renderItem(index, key) {
    return (
      <div className="react-list-item" key={key}>
        <Day key={key} id={key} day={this.state.days[index]} />
      </div>
    );
  }

  render() {
    return (
      <div className="react-list">
        <Hours />
        <ReactList
          itemRenderer={this.renderItem}
          length={this.state.days.length}
          axis='x'
        />
      </div>
    );
  }
}

export default Calendar;
