let nodeWalls;

function getLength(len) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
}

export function vertical(grid, startNode, finishNode) {
  let height = getLength(grid[0].length);
  let width = getLength(grid.length);
  nodeWalls = [];
  getHeightWalls(height, width, startNode, finishNode);
  for (let i = 0; i < nodeWalls.length; i++) {
    const currNode = grid[nodeWalls[i][0]][nodeWalls[i][1]];
    nodeWalls[i] = currNode;
  }
  return nodeWalls;
}

function getHeightWalls(height, width, startNode, finishNode) {
  if (height.length < 2) {return;}
  let position = Math.floor(Math.random() * 2);
  for (let eachIndex of height) {
    if (position === 0 && eachIndex % 2 !== 0) {
      addWall(eachIndex, width, startNode, finishNode);
    }
    if (position === 1 && eachIndex % 2 === 0) {
      addWall(eachIndex, width, startNode, finishNode);
    }
  }
}

function addWall(position, width, startNode, finishNode) {
  let isFinished = false;
  let tempWalls = [];
  for (let eachIndex of width) {
    if (
      (eachIndex === startNode.row && position === startNode.col) ||
      (eachIndex === finishNode.row && position === finishNode.col)
    ) {
      isFinished = true;
      continue;
    }
    tempWalls.push([eachIndex, position]);
  }
  if (!isFinished) {
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
  }
  for (let eachWall of tempWalls) {
    nodeWalls.push(eachWall);
  }
}
