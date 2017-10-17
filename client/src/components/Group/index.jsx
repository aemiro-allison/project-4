import React from 'react';
import { Link } from 'react-router-dom';
import state from '../../partials/Form/form_state';
import './Group.css';

function handleDelete(e, id, state) {
  e.preventDefault();
  console.log(`group ${id} deleted.`);
  // request.delete(`/groups/${id}`)
  //   .then(res => {
  //     console.log('group deleted');
  //   })
  //   .catch(err => console.error(err));
}

function Group(props) {
  return (
    <div className="group">
      <Link to={`/groups/${props.group.id}`}>VIEW</Link>
      <Link to={`/groups/edit/${props.group.id}`}>EDIT</Link>
      <button onClick={(e) => handleDelete(e, props.group.id, state)}>X</button>
      <div className="group-item">
        <span className="title">ID: </span>
        <span className="value">{ props.group.id }</span>
      </div>
      <div className="group-item">
        <span className="title">Priority Lvl: </span>
        <span className="value">{ props.group.priority_lvl }</span>
      </div>
      <div className="group-item">
        <span className="title">Estimated Time: </span>
        <span className="value">{ props.group.estimated_time }</span>
      </div>
    </div>
  );
}

export default Group;
