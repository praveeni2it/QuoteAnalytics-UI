import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";

class Header extends React.Component {
  render () {
    return (
      <div className="ui menu">
        <Link to="/quotes" className="header item" activeClassName="active">
          Quotes Analytics
        </Link>
        <a className="item">
          Quotes
        </a>
        <a className="item">
          About
        </a>
      </div>
    );
  }
}

export default Header;
