import moment from 'moment';
import _ from './helpers';

const constants = [
  [
    { name: 'sleep', start: 0, end: 2, attributes: { estimate_time: 2} },
    { name: 'sleep', start: 21, end: 23, attributes: { estimate_time: 2}},
  ],
  [
    { name: 'reading', start: 15, end: 17, attributes: { estimate_time: 2}},
  ],
];

const TimeAnalyticalEngine = {
  populate(tasks) {
    // go through each day, move group into each day.
    let days = [];

    const daysWithConstants = _.days.map(_.populateWithConstants(constants));
    days = daysWithConstants.map(_.populate(_.sort(tasks, 'attributes.priority_lvl', 'DESC')));
    console.log(days);
    return days;
  }
};

export default TimeAnalyticalEngine;
