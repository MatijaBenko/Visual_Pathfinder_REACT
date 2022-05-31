export function dijkstra(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return [];
  }
  
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvistedNodes = getAllNodes(grid);
  while (!!unvistedNodes.length) {
    sortNodesByDistance(unvistedNodes);
    const closestNode = unvistedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const eachRow of grid) {
    for (const eachCol of eachRow) {
      nodes.push(eachCol);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvistedNodes) {
  unvistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvistedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrderDijkstra(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
