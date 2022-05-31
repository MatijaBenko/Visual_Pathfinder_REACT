export function astar(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return [];
  }

  const visitedNodesInOrder = [];
  const unvistedNodes = [];
  startNode.distance = 0;
  unvistedNodes.push(startNode);

  while (unvistedNodes.length !== 0) {
    unvistedNodes.sort(
      (nodeOne, nodeTwo) => nodeOne.totalDistance - nodeTwo.totalDistance
    );
    const nearestNode = unvistedNodes.shift();
    if (nearestNode === finishNode) return visitedNodesInOrder;

    nearestNode.isVisited = true;
    visitedNodesInOrder.push(nearestNode);

    const neighbourNodes = getAllNeighbours(grid, nearestNode);
    for(let eachNode of neighbourNodes) {
      const distance = nearestNode.distance + 1;

      if (neighbourNodeNotInUnvisitedNodes(unvistedNodes, eachNode)) {
        unvistedNodes.unshift(eachNode);
        eachNode.distance = distance;
        eachNode.totalDistance = distance + manhattenDistance(eachNode, finishNode);
        eachNode.previousNode = nearestNode;
      } else if (distance < eachNode.distance) {
        eachNode.distance = distance;
        eachNode.totalDistance = distance + manhattenDistance(eachNode, finishNode);
        eachNode.previousNode = nearestNode;
      }
    }
  }
  return visitedNodesInOrder;
}

function getAllNeighbours(grid, nearestNode) {
  const allNeighbourNodes = [];
  const { row, col } = nearestNode;
  if (row !== grid.length - 1) allNeighbourNodes.push(grid[row + 1][col]);
  if (row !== 0) allNeighbourNodes.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) allNeighbourNodes.push(grid[row][col + 1]);
  if (col !== 0) allNeighbourNodes.push(grid[row][col - 1]);
  return allNeighbourNodes.filter((nodes) => !nodes.isWall && !nodes.isVisited);
}

function neighbourNodeNotInUnvisitedNodes(unvistedNodes, eachNode) {
  for (let eachUnvisitedNode of unvistedNodes) {
    if (eachUnvisitedNode.row === eachNode.row && eachUnvisitedNode.col === eachNode.col) {
      return false;
    }
  }
  return true;
}

function manhattenDistance(currNode, finishNode) {
  const x = Math.abs(currNode.row - finishNode.row);
  const y = Math.abs(currNode.col - finishNode.col);
  return x + y;
}

export function getNodesInShortestPathOrderAstar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}