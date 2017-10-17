import React from 'react';
import Group from '../../components/Group';
import './SingleGroup.css';

function SingleGroup(props) {
  return (
    <div className="single-group">
      <div className="title">
        <h1>This is a group.</h1>
      </div>

      <Group group={props.group} />
    </div>
  );
}

export default SingleGroup;
