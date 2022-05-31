export function breadthfirstsearch(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return [];
    }
  
    const visitedNodesInOrder = [];
    const unvisitedNodes = [];
    unvisitedNodes.push(startNode);
  
    while (unvisitedNodes.length !== 0) {
      let nearestNode = unvisitedNodes.shift();
      if (nearestNode.isWall) continue;
      if (nearestNode === finishNode) return visitedNodesInOrder;
      visitedNodesInOrder.push(nearestNode);
      nearestNode.isVisited = true;
      let unvisitedNeighbours = getAllNeighbours(grid, nearestNode);
      for (let eachNeighbour of unvisitedNeighbours) {
        eachNeighbour.previousNode = nearestNode;
        if (neighbourNodeNotInUnvisitedNodes(eachNeighbour, unvisitedNodes)) {
            unvisitedNodes.push(eachNeighbour);
        }
      }
    }
    return visitedNodesInOrder;
  }
  
  function getAllNeighbours(grid, nearestNode) {
    let allNeighbourNodes = [];
    let { row, col } = nearestNode;
    if (col !== 0) allNeighbourNodes.push(grid[row][col - 1]);
    if (row !== 0) allNeighbourNodes.push(grid[row - 1][col]);
    if (col !== grid[0].length - 1) allNeighbourNodes.push(grid[row][col + 1]);
    if (row !== grid.length - 1) allNeighbourNodes.push(grid[row + 1][col]);
    return allNeighbourNodes.filter((eachNode) => !eachNode.isVisited);
  }

  function neighbourNodeNotInUnvisitedNodes(eachNode, unvistedNodes) {
    for (let eachUnvisitedNode of unvistedNodes) {
      if (eachUnvisitedNode.row === eachNode.row && eachUnvisitedNode.col === eachNode.col) {
        return false;
      }
    }
    return true;
  }
  
  export function getNodesInShortestPathOrderBFS(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }