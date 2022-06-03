export function random(grid, startNode, finishNode) {
  let tempGrid = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const currNode = grid[row][col];
      if (currNode === startNode || currNode === finishNode) continue;
      if (Math.random() < 0.33) {
        currNode.isWall = true;
        tempGrid.push(currNode);
      }
    }
  }
  return tempGrid;
}
