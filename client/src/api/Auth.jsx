import React from 'react';
import { withRouter } from 'react-router-dom';
import authService from './authService';

export default function Auth(Component1, Component2) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: null,
        whichCompToRender: null,
      };
    }

    componentWillMount() {
      // attempt to check if user is logged in.
      authService.authenticate((err, user) => {
        if (err) {
          this.determineComponentToRender(null);
        } else if (Component1 && !Component2) {
          this.shouldRedirect(user);
        } else if (Component1 && Component2) {
          this.determineComponentToRender(user);
        }
      });
    }

    shouldRedirect(user) {
      if(!user) {
        console.log('user not logged in.');
        this.props.history.push(`/login`);
      } else {
        console.log('user is logged in');
        this.setState({
          user,
          whichCompToRender: 1,
        });
      }
    }

    determineComponentToRender(user) {
      if (!user) {
        console.log('user not logged in.');
        this.setState({
          whichCompToRender: 1,
        });
      } else {
        console.log('user is logged in');
        this.setState({
          user,
          whichCompToRender: 2,
        })
      }
    }

    render() {
      if (this.state.whichCompToRender === 1) {
        return <Component1 {...this.props} />
      } else if (this.state.whichCompToRender === 2) {
        return <Component2 user={this.state.user} {...this.props} />
      } else {
        return null;
      }
    }
  }

  // this function passes in this.props.history.
  return withRouter(AuthenticatedComponent);
}
