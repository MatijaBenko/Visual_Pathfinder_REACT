import React, { Component} from "react";

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
    this.setState({ algorithmType: e.target.value });
    this.handleChangeButton(e.target.value);
    this.props.handler(e.target.value);
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
              <option value="Dijstrka's Algorithm">Dijstrka's Algorithm</option>
              <option value="A* Algorithm">A* Algorithm</option>
            </select>
          </div>
          <div className="navbar-child">
            <button id="visual-button">Visualize</button>
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
