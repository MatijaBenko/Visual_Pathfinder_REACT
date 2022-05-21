import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import Navbar from "../Navbar/Navbar";

import "./PathfindingVisualizer.css";

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
    if (algorithmType === "Dijstrka's Algorithm") {
      this.visualizeDijkstra();
    } else if (algorithmType === "A* Algorithm") {
      this.visualizeA();
    }
  };

  clearVisualization = () => {
    clearBoard(this.state.grid);
  };

  visualizeA() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const heuristic = null;
    const visitedNodesInOrder = astar(grid, heuristic, startNode, finishNode);
    //const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateA(visitedNodesInOrder, nodesInShortestPathOrder) {
    // for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    //   if (i === visitedNodesInOrder.length) {
    //     setTimeout(() => {
    //       this.animateShortestPath(nodesInShortestPathOrder);
    //     }, 10 * i);
    //     return;
    //   }
    //   setTimeout(() => {
    //     const node = visitedNodesInOrder[i];
    //     document.getElementById(`node-${node.row}-${node.col}`).className =
    //       "node node-visited";
    //   }, 10 * i);
    // }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
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
          clearVisualization={this.clearVisualization}
        ></Navbar>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isFinish, isStart, isWall, heuristicDistance, weight } = node;
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
                      weight = {weight}
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
    isVisited: false,
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

const clearBoard = (grid) => {
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
  console.log(grid);
};
