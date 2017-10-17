export const days = Array(31).fill(
  Array.from(Array(24).keys())
);

let taskHrs = [];

export function populateWithConstants(constants) {
  return function (day) {
    const timeSlots = day.slice(0);

    // put in constants using time attributes such as
    // start and end and fill that range.
    // with each constant.
    constants.forEach((constant, i) => {
      constant.forEach((timeSlot, i) => {
        const range = timeSlot.end - timeSlot.start;

        for (let j = 0; j <= range; j += 1) {
          timeSlots[timeSlot.start + j] = timeSlot;
        }
      })
    });

    return timeSlots;
  }
}

export function populate(sortedTasks) {
  taskHrs = sortedTasks.map(task => +task.attributes.estimate_time);

  return function(day) {
    // put sorted tasks in a day
    const timeSlots = day.slice(0);

    let i = 0;
    let j = 0;

    while (taskHrs[j] + i < timeSlots.length && taskHrs[j] !== undefined) {
      console.log(timeSlots[i])
      if (timeSlots[i] && timeSlots[i].start !== undefined) {
        console.log('found a  constant', timeSlots[i]);
        const range = timeSlots[i].end - timeSlots[i].start;
        i += range;
      } else {
        timeSlots[i] = sortedTasks[j];
        i += taskHrs[j];
        j++;
      }
    }

    taskHrs.splice(0,j+1);
    return timeSlots;
  }
}

export function sort(arr, prop, method = 'ASC') {
  const sortByMethod = (a, b) => {
    const props = prop.split('.');
    if (method === 'ASC') return a[props[0]][props[1]] - b[props[0]][props[1]];
    if (method === 'DESC') return b[props[0]][props[1]] - a[props[0]][props[1]];
  };
  return arr.sort(sortByMethod);
}

export function filter(arr, prop, value) {
  if (prop.includes('.')) {
    const props = prop.split('.');
    return arr.filter(el => el[props[0]][props[1]] === value);
  } else {
    return arr.filter(el => el[prop] === value);
  }
}



// export function getHighestList(arr, prop) {
//   let highest = {
//     value: getHighestValue(arr, prop),
//     indices: [],
//   };

//   return arr.filter(el => el[prop] === highest.value);
// }

// export function getHighestValue(arr, prop) {
//   return arr.reduce((acc, val) => {
//     if (val[prop] > acc[prop]) return val[prop];
//   });
// }

export default {
  days,
  sort,
  filter,
  populate,
  populateWithConstants,
};
