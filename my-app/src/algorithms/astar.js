// export function astar(grid, heuristic, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   const unvistedNodes = Object.keys(grid);
//   //console.log(unvistedNodes);
//   grid[startNode.col][startNode.row].distance = 0;
//   grid[startNode.col][startNode.row].totalDistance = 0;
//   while (unvistedNodes.length) {
//     let currNode = closestNode(grid, unvistedNodes);
//     while (currNode.isWall === true && unvistedNodes.length) {
//       currNode = closestNode(grid, unvistedNodes);
//     }
//     if (currNode.distance === Infinity) return false;
//     visitedNodesInOrder.push(currNode);
//     currNode.isVisited = true;
//     if (currNode === finishNode) {
//       return visitedNodesInOrder;
//     }
//     updateNeighbors(currNode, grid);
//   }
  
// }

// function closestNode(grid, unvisitedNodes) {
//   let currClosest, index;
//   for(let i = 0; i < unvisitedNodes.length; i++) {
//     if (!currClosest || currClosest.totalDistance > grid[unvisitedNodes[i]].totalDistance) {
//       currClosest = grid[unvisitedNodes[i]];
//       index = i;
//     } else if (currClosest.totalDistance === grid[unvisitedNodes[i]].totalDistance) {
//       if (currClosest.heuristicDistance > grid[unvisitedNodes[i]].heuristicDistance) {
//         currClosest = grid[unvisitedNodes[i]];
//         index = i;
//       }
//     }
//   }
//   unvisitedNodes.splice(index,1);
//   return currClosest
// }

// // function getAllNodes(grid) {
// //   const nodes = [];
// //   for (const eachRow of grid) {
// //     for (const eachCol of eachRow) {
// //       nodes.push(eachCol);
// //     }
// //   }
// //   return nodes;
// // }

// function getDistance(nodeOne, nodeTwo) {
//   let currentCoordinates = nodeOne.id.split("-");
//   let targetCoordinates = nodeTwo.id.split("-");
//   let x1 = parseInt(currentCoordinates[0]);
//   let y1 = parseInt(currentCoordinates[1]);
//   let x2 = parseInt(targetCoordinates[0]);
//   let y2 = parseInt(targetCoordinates[1]);
//   if (x2 < x1 && y1 === y2) {
//     if (nodeOne.direction === "up") {
//       return [1, ["f"], "up"];
//     } else if (nodeOne.direction === "right") {
//       return [2, ["l", "f"], "up"];
//     } else if (nodeOne.direction === "left") {
//       return [2, ["r", "f"], "up"];
//     } else if (nodeOne.direction === "down") {
//       return [3, ["r", "r", "f"], "up"];
//     } else if (nodeOne.direction === "up-right") {
//       return [1.5, null, "up"];
//     } else if (nodeOne.direction === "down-right") {
//       return [2.5, null, "up"];
//     } else if (nodeOne.direction === "up-left") {
//       return [1.5, null, "up"];
//     } else if (nodeOne.direction === "down-left") {
//       return [2.5, null, "up"];
//     }
//   } else if (x2 > x1 && y1 === y2) {
//     if (nodeOne.direction === "up") {
//       return [3, ["r", "r", "f"], "down"];
//     } else if (nodeOne.direction === "right") {
//       return [2, ["r", "f"], "down"];
//     } else if (nodeOne.direction === "left") {
//       return [2, ["l", "f"], "down"];
//     } else if (nodeOne.direction === "down") {
//       return [1, ["f"], "down"];
//     } else if (nodeOne.direction === "up-right") {
//       return [2.5, null, "down"];
//     } else if (nodeOne.direction === "down-right") {
//       return [1.5, null, "down"];
//     } else if (nodeOne.direction === "up-left") {
//       return [2.5, null, "down"];
//     } else if (nodeOne.direction === "down-left") {
//       return [1.5, null, "down"];
//     }
//   }
//   if (y2 < y1 && x1 === x2) {
//     if (nodeOne.direction === "up") {
//       return [2, ["l", "f"], "left"];
//     } else if (nodeOne.direction === "right") {
//       return [3, ["l", "l", "f"], "left"];
//     } else if (nodeOne.direction === "left") {
//       return [1, ["f"], "left"];
//     } else if (nodeOne.direction === "down") {
//       return [2, ["r", "f"], "left"];
//     } else if (nodeOne.direction === "up-right") {
//       return [2.5, null, "left"];
//     } else if (nodeOne.direction === "down-right") {
//       return [2.5, null, "left"];
//     } else if (nodeOne.direction === "up-left") {
//       return [1.5, null, "left"];
//     } else if (nodeOne.direction === "down-left") {
//       return [1.5, null, "left"];
//     }
//   } else if (y2 > y1 && x1 === x2) {
//     if (nodeOne.direction === "up") {
//       return [2, ["r", "f"], "right"];
//     } else if (nodeOne.direction === "right") {
//       return [1, ["f"], "right"];
//     } else if (nodeOne.direction === "left") {
//       return [3, ["r", "r", "f"], "right"];
//     } else if (nodeOne.direction === "down") {
//       return [2, ["l", "f"], "right"];
//     } else if (nodeOne.direction === "up-right") {
//       return [1.5, null, "right"];
//     } else if (nodeOne.direction === "down-right") {
//       return [1.5, null, "right"];
//     } else if (nodeOne.direction === "up-left") {
//       return [2.5, null, "right"];
//     } else if (nodeOne.direction === "down-left") {
//       return [2.5, null, "right"];
//     }
//   }
// }

// function manhattanDistance(nodeOne, nodeTwo) {
//   let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
//   let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
//   let xOne = nodeOneCoordinates[0];
//   let xTwo = nodeTwoCoordinates[0];
//   let yOne = nodeOneCoordinates[1];
//   let yTwo = nodeTwoCoordinates[1];

//   let xChange = Math.abs(xOne - xTwo);
//   let yChange = Math.abs(yOne - yTwo);

//   return (xChange + yChange);
// }