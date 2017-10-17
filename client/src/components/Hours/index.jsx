import React from 'react';
import moment from 'moment';
import './Hours.css';

const hours = [0,2,4,6,8,10,12,14,16,18,20,22, 24]

function createHour(hour, key) {
  return (
    <li
      className="hour"
      key={key}>
      { moment(hour, 'H').format('ha') }
    </li>
  );
}

function Hours(props) {
  return (
    <ul className="hour-list">
      { hours.map(createHour) }
    </ul>
  );
}

export default Hours;
