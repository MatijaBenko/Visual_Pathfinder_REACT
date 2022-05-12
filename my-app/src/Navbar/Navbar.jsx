import React, { Component } from "react";

import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-header navbar-child">
            <a id="refershButton" className="navbar-brand" href="/#">
              Benko Pathfinding Visualizer
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
