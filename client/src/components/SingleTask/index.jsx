import React from 'react';
import Task from '../../components/Task';
import './SingleTask.css';

function SingleTask(props) {
  return (
    <div className="single-task">
      <div className="title">
        <h1>This is a task.</h1>
      </div>

      <Task task={props.task} />
    </div>
  );
}

export default SingleTask;
