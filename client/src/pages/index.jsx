import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// import pages.
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
// group views
import GroupView from './GroupView';
import SingleGroupView from './SingleGroupView';
import NewGroupView from './NewGroupView';
import EditGroupView from './EditGroupView';
// task views
import TaskView from './TaskView';
import SingleTaskView from './SingleTaskView';
import NewTaskView from './NewTaskView';
import EditTaskView from './EditTaskView';
// calendar view
import Calendar from '../components/Calendar';
// Auth component
import Auth from '../api/Auth';

function Index() {
  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/calendar" component={Auth(Calendar)} />

        <Route exact path="/groups/edit/:id" component={Auth(EditGroupView)} />
        <Route exact path="/groups/new" component={Auth(NewGroupView)} />
        <Route exact path="/groups/:id" component={Auth(SingleGroupView)} />
        <Route exact path="/groups" component={Auth(GroupView)} />

        <Route exact path="/tasks/edit/:id" component={Auth(EditTaskView)} />
        <Route exact path="/tasks/undefined" component={(props) => {
          props.history.push('/tasks');
          return null;
        }} />
        <Route exact path="/tasks/new" component={Auth(NewTaskView)} />
        <Route exact path="/tasks/:id" component={Auth(SingleTaskView)} />
        <Route exact path="/tasks" component={Auth(TaskView)} />
        <Redirect to="/" />
      </Switch>
  );
}

export default Index;
