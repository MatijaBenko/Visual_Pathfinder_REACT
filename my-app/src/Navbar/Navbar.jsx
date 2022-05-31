import React, { Component } from "react";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { algorithmType: "", mazeType: "" };

    this.handleChangeAlgorithm = this.handleChangeAlgorithm.bind(this);
    this.buttonRef = document.getElementById("visual-button");
    this.handleChangeButton = this.handleChangeButton.bind(this);
  }

  handleChangeAlgorithm(e) {
    if (e.target.value !== "Algorithm Type") {
      this.setState({ algorithmType: e.target.value });
      this.handleChangeButton(e.target.value);
    }
  }

  visualButtonClick = () => {
    if (this.state.algorithmType === "") {
      alert("Please select an Algorithm type!");
    } else {
      this.props.visualizeAlgorithm(this.state.algorithmType);
    }
  };

  resetButtonClick = () => {
    this.props.resetVisualization();
  };

  clearButtonClick = () => {
    this.props.clearVisuals();
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-header navbar-child">
            <a id="refershButton" className="navbar-brand" href="/#">
              Benko Pathfinding Visualizer
            </a>
          </div>
          <div className="navbar-child">
            <select
              value={this.state.algorithmType}
              onChange={this.handleChangeAlgorithm}
            >
              <option defaultValue="" style={{ fontWeight: "bold" }}>
                Algorithm Type
              </option>
              <option value="Dijstrka's Algorithm">Dijstrka's Algorithm</option>
              <option value="A* Algorithm">A* Algorithm</option>
              <option value="DFS Algorithm">DFS Algorithm</option>
              <option value="BFS Algorithm">BFS Algorithm</option>
            </select>
          </div>
          <div className="navbar-child">
            <button id="visual-button" onClick={this.visualButtonClick}>
              Visualize
            </button>
          </div>
          <div className="navbar-child">
            <button id="clear-button" onClick={this.clearButtonClick}>
              Clear Visuals
            </button>
          </div>
          <div className="navbar-child">
            <button id="reset-button" onClick={this.resetButtonClick}>
              Reset Board
            </button>
          </div>
        </div>
      </nav>
    );
  }

  handleChangeButton(algorithmType) {
    if (this.buttonRef === null) {
      this.buttonRef = document.getElementById("visual-button");
      this.buttonRef.textContent = "Visualize " + algorithmType;
    } else {
      this.buttonRef.textContent = "Visualize " + algorithmType;
    }
  }
}
