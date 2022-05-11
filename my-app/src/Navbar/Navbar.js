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
            <button
              className="dropbtn"
              color="#de354c"
              onClick={clickDropDownMenuAlgorithm}
            >
              Algorithms ▼
            </button>
            <div className="dropdown-content-algorithm" id="algorithmDropDownMenu">
              <a href="/#" id="startButtonDijkstra">
                Dijkstra's Algorithm
              </a>
              <a href="/#" id="startButtonAStar">
                A* Search
              </a>
            </div>
            <button
              className="dropbtn"
              color="#de354c"
              onClick={clickDropDownMenuMaze}
            >
              Generated Mazes ▼
            </button>
            <div className="dropdown-content-maze" id="mazeDropDownMenu">
              <a href="/#" id="startButtonRandomMaze">
                Basic Random Maze
              </a>
              <a href="/#" id="startButtonRecursiveDivision">
                Recursive Division
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function clickDropDownMenuAlgorithm() {
  document.getElementById("algorithmDropDownMenu").classList.toggle("show");
  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var myDropdown = document.getElementById("algorithmDropDownMenu");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
  };
}

function clickDropDownMenuMaze() {
  document.getElementById("mazeDropDownMenu").classList.toggle("show");
  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var myDropdown = document.getElementById("mazeDropDownMenu");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
  };
}
