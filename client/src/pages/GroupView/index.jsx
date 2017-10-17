import React, { Component } from 'react';
import List from '../../components/List';
import Group from '../../components/Group';
import request from 'superagent';
import './GroupView.css';

class GroupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    request.get(`/groups`)
      .then(res => {
        this.setState(prevState => ({
          groups: res.body.groups,
        }));
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="group-view">
        <List.Container name="groups">
          {
            this.state.groups.map((group, i) => (
              <List.Item key={group.id} path={`/groups/${group.id}`}>
                <Group group={group} />
              </List.Item>
            ))
          }
        </List.Container>
      </div>
    );
  }
}

export default GroupView;
