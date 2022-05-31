import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrderDijkstra } from "../algorithms/dijkstra";
import Navbar from "../Navbar/Navbar";

import "./PathfindingVisualizer.css";
import { astar, getNodesInShortestPathOrderAstar } from "../algorithms/astar";
import {
  depthfirstsearch,
  getNodesInShortestPathOrderDFS,
} from "../algorithms/depthfirstsearch";
import {
  breadthfirstsearch,
  getNodesInShortestPathOrderBFS,
} from "../algorithms/breadthfirstsearch";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
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

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeAlgorithm = (algorithmType) => {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = null;
    let nodesInShortestPathOrder = null;

    if (algorithmType === "Dijstrka's Algorithm") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      nodesInShortestPathOrder =
        getNodesInShortestPathOrderDijkstra(finishNode);
      getNodesInShortestPathOrderDijkstra(finishNode);
    } else if (algorithmType === "A* Algorithm") {
      visitedNodesInOrder = astar(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(finishNode);
    } else if (algorithmType === "DFS Algorithm") {
      visitedNodesInOrder = depthfirstsearch(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    } else if (algorithmType === "BFS Algorithm") {
      visitedNodesInOrder = breadthfirstsearch(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    }
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  clearVisuals = () => {
    clearVisuals(this.state.grid);
  };

  resetVisualization = () => {
    resetBoard(this.state.grid);
  };

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  render() {
    const { grid, isMousePressed } = this.state;

    return (
      <>
        <Navbar
          visualizeAlgorithm={this.visualizeAlgorithm}
          resetVisualization={this.resetVisualization}
          clearVisuals={this.clearVisuals}
        ></Navbar>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    heuristicDistance,
                    weight,
                  } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      heuristicDistance={heuristicDistance}
                      isMousePressed={isMousePressed}
                      weight={weight}
                      onMouseUp={() => this.handleMouseUp()}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
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
    totalDistance: Infinity,
    isVisited: false,
    isShortest: false,
    isWall: false,
    heuristicDistance: null,
    weight: 0,
    totalDistance: Infinity,
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

const resetBoard = (grid) => {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].previousNode = null;
      grid[i][j].distance = Infinity;
      grid[i][j].isWall = false;
      grid[i][j].isVisited = false;
      if (
        (i === START_NODE_ROW && j === START_NODE_COL) ||
        (i === FINISH_NODE_ROW && j === FINISH_NODE_COL)
      ) {
        if (i === START_NODE_ROW && j === START_NODE_COL) {
          grid[i][j].isStart = true;
          document.getElementById(`node-${i}-${j}`).className =
            "node node-start";
        } else {
          grid[i][j].isStart = false;
        }
        if (i === FINISH_NODE_ROW && j === FINISH_NODE_COL) {
          grid[i][j].isFinish = true;
          document.getElementById(`node-${i}-${j}`).className =
            "node node-finish";
        } else {
          grid[i][j].isFinish = false;
        }
      } else {
        document.getElementById(`node-${i}-${j}`).className = "node";
      }
    }
  }
};

const clearVisuals = (grid) => {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].previousNode = null;
      grid[i][j].distance = Infinity;
      grid[i][j].isVisited = false;
      if (
        (i === START_NODE_ROW && j === START_NODE_COL) ||
        (i === FINISH_NODE_ROW && j === FINISH_NODE_COL)
      ) {
        if (i === START_NODE_ROW && j === START_NODE_COL) {
          grid[i][j].isStart = true;
          document.getElementById(`node-${i}-${j}`).className =
            "node node-start";
        } else {
          grid[i][j].isStart = false;
        }
        if (i === FINISH_NODE_ROW && j === FINISH_NODE_COL) {
          grid[i][j].isFinish = true;
          document.getElementById(`node-${i}-${j}`).className =
            "node node-finish";
        } else {
          grid[i][j].isFinish = false;
        }
      } else {
        if (grid[i][j].isWall) {
          document.getElementById(`node-${i}-${j}`).className =
            "node node-wall";
        } else {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  }
};
