import React, { Component } from "react";

import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-navbar">
          <div className="navbar-header navbar-child">
            <a id="refershButton" className="navbar-brand" href="/#">
              Benko Pathfinding Visualizer
            </a>
          </div>
          <div className="dropdown-container navbar-child">
            <button className="dropbtn" onClick={clickDropDownMenu}>
              Algorithms
            </button>
            <div className="dropdown-content" id="algorithmDropDownMenu">
              <a href="/#" id="startButtonDijkstra">
                Dijkstra's Algorithm
              </a>
              <a href="/#" id="startButtonAStar">
                A* Search
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function clickDropDownMenu() {
    document.getElementById("algorithmDropDownMenu").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("algorithmDropDownMenu");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

