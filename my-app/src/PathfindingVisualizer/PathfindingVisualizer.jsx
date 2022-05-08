import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      isMousePressed: false,
    };
  }

  // Prevents user from seeing intermediate states
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseUp() {
    this.setState({ isMousePressed: false });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggle(this.state.grid, row, col);
    this.setState({ grid: newGrid, isMousePressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.isMousePressed) return;
    const newGrid = getNewGridWithWallToggle(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  render() {
    const { grid, isMousePressed } = this.state;

    return (
      <>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isMousePressed={isMousePressed}
                      onMouseUp={() => this.handleMouseUp()}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggle = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    // Property Spread Notation
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
