import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import request from 'superagent';
import state from '../../partials/Form/form_state';
import FontAwesome from 'react-fontawesome';
import './Task.css';

function truncate (str, len = 20) {
  if (str.length > len) {
    return str.split('').splice(0, len).join('') + '...';
  }

  return str;
}

function handleDelete(e, id, state, history) {
    e.preventDefault();
    request
      .delete(`/tasks/${id}`)
      .then(res => {
        console.log('task deleted');
        history.push('/tasks');
      })
      .catch(err => console.error(err));
}

function Task(props) {

  return (
      <div className="task">
        <div className="controls">
          <Link className="control-item" to={`/tasks/edit/${props.task.id}`}>
            <FontAwesome className="control-icon" name="edit" />
          </Link>
          <button className="control-item" onClick={(e) => {
            handleDelete(e, props.task.id, state, props.history);
          }}>
            <FontAwesome className="control-icon" name="trash" />
          </button>
        </div>
        <div className="task-item">
          <span className="title">Title: </span>
          <span className="value">{ truncate(props.task.name) }</span>
        </div>
        <div className="task-item">
          <span className="title">Desc: </span>
          <span className="value">{ truncate(props.task.description) }</span>
        </div>
        <div className="task-item">
          <span className="title">Status: </span>
          <span className="value">
            { props.task.attributes? props.task.attributes.status : '--' }
          </span>
        </div>
      </div>
  );
}

export default withRouter(Task);
