import React from 'react';
import Auth from '../../api/Auth';
import authService from '../../api/authService';
import ProfilePic from '../../images/profile_pic.svg';
import state from '../Form/form_state';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
  function renderLogout() {
    return (
      <div className="logged-in">
        <span><img className="profile-pic" src={ProfilePic} /></span>
        { state.user.username }
          <button className="logout" onClick={() => authService.logout()}>
            logout
          </button>
      </div>
    );
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">Ontrack</Link>
      </div>
      <nav className="header-center">
        <Link to="/tasks">tasks</Link>
        <Link to="/calendar">calendar</Link>
      </nav>
      <div className="header-right">
      {
        state.user && state.user.user_id ?
          renderLogout() :
          (<Link to="/login">login</Link>)
      }
      </div>
    </header>
  );
}

export default Header;
