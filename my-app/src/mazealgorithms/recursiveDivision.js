let nodeWalls;

function getLength(len) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
}

export function recursivedivision(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return [];
  }
  let height = getLength(grid[0].length);
  let width = getLength(grid.length);
  nodeWalls = [];
  getRecursiveWalls(height, width, grid, startNode, finishNode);
  for (let i = 0; i < nodeWalls.length; i++) {
    const currNode = grid[nodeWalls[i][0]][nodeWalls[i][1]];
    nodeWalls[i] = currNode;
  }
  return nodeWalls;
}

function getRecursiveWalls(height, width, grid, startNode, finishNode) {
  if (height.length < 2 || width.length < 2) {
    return;
  }

  let direction, position;

  if (height.length > width.length) {
    direction = 0;
    position = generateRandomNumber(height);
  }

  if (height.length <= width.length) {
    direction = 1;
    position = generateRandomNumber(width);
  }

  if (direction === 0) {
    addWall(direction, position, height, width, startNode, finishNode);
    getRecursiveWalls(
      height.slice(0, height.indexOf(position)),
      width,
      grid,
      startNode,
      finishNode
    );
    getRecursiveWalls(
      height.slice(height.indexOf(position) + 1),
      width,
      grid,
      startNode,
      finishNode
    );
  } else {
    addWall(direction, position, height, width, startNode, finishNode);
    getRecursiveWalls(
      height,
      width.slice(0, width.indexOf(position)),
      grid,
      startNode,
      finishNode
    );
    getRecursiveWalls(
      height,
      width.slice(width.indexOf(position) + 1),
      grid,
      startNode,
      finishNode
    );
  }
}

function generateRandomNumber(tempArray) {
  let maxNum = tempArray.length - 1;
  let randomIndex =
    Math.floor(Math.random() * (maxNum / 2)) +
    Math.floor(Math.random() * (maxNum / 2));
  if (randomIndex % 2 === 0) {
    if (randomIndex === maxNum) {
      randomIndex -= 1;
    } else {
      randomIndex += 1;
    }
  }
  return tempArray[randomIndex];
}

function addWall(direction, position, height, width, startNode, finishNode) {
  let isFinished = false;
  let tempWalls = [];
  if (direction === 0) {
    if (width.length === 2) return;
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
  } else {
    if (height.length === 2) return;
    for (let eachIndex of height) {
      if (
        (position === startNode.row && eachIndex === startNode.col) ||
        (position === finishNode.row && eachIndex === finishNode.col)
      ) {
        isFinished = true;
        continue;
      }
      tempWalls.push([position, eachIndex]);
    }
  }
  if (!isFinished) {
    tempWalls.splice(generateOddRandomNumber(tempWalls.length), 1);
  }
  for (let eachWall of tempWalls) {
    nodeWalls.push(eachWall);
  }
}

function generateOddRandomNumber(maxNum) {
  let ranNum =
    Math.floor(Math.random() * (maxNum / 2)) +
    Math.floor(Math.random() * (maxNum / 2));
  if (ranNum % 2 !== 0) {
    if (ranNum === maxNum) {
      ranNum -= 1;
    } else {
      ranNum += 1;
    }
  }
  return ranNum;
}
