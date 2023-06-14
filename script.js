var grid = [];
var currentShape;
var currentShapeCoords;
var interval;
var score = 0;
var isGameRunning = false;

function createGrid() {
  for (var row = 0; row < 20; row++) {
    grid[row] = [];
    for (var col = 0; col < 10; col++) {
      grid[row][col] = 0;
    }
  }
}

function drawGrid() {
  var tetrisGrid = document.getElementById('tetris-grid');
  tetrisGrid.innerHTML = '';

  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      var cell = document.createElement('div');
      cell.className = grid[row][col] === 0 ? 'cell' : 'cell active';
      tetrisGrid.appendChild(cell);
    }
  }
}

function createShape() {
  var shapes = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 1, 1], [1, 0, 0]], // J
    [[1, 1, 1], [0, 0, 1]] // L
  ];

  var randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  currentShape = randomShape;
  currentShapeCoords = {
    x: 4,
    y: 0
  };
}

function drawShape() {
  var tetrisGrid = document.getElementById('tetris-grid');

  for (var row = 0; row < currentShape.length; row++) {
    for (var col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col]) {
        var cell = document.createElement('div');
        cell.className = 'shape';
        cell.style.left = (currentShapeCoords.x + col) * 20 + 'px';
        cell.style.top = (currentShapeCoords.y + row) * 20 + 'px';
        tetrisGrid.appendChild(cell);
      }
    }
  }
}

function removeShape() {
  var tetrisGrid = document.getElementById('tetris-grid');
  var shapes = tetrisGrid.getElementsByClassName('shape');

  while (shapes.length > 0) {
    shapes[0].parentNode.removeChild(shapes[0]);
  }
}

function isCollision() {
  for (var row = 0; row < currentShape.length; row++) {
    for (var col = 0; col < currentShape[row].length; col++) {
      if (
        currentShape[row][col] &&
        (currentShapeCoords.y + row >= 20 ||
          currentShapeCoords.x + col < 0 ||
          currentShapeCoords.x + col >= 10 ||
          grid[currentShapeCoords.y + row][currentShapeCoords.x + col])
      ) {
        return true;
      }
    }
  }

  return false;
}

function mergeShape() {
  for (var row = 0; row < currentShape.length; row++) {
    for (var col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col]) {
        grid[currentShapeCoords.y + row][currentShapeCoords.x + col] = 1;
      }
    }
  }
}

function checkRows() {
  for (var row = 19; row >= 0; row--) {
    if (grid[row].every((cell) => cell)) {
      score++;
      grid.splice(row, 1);
      grid.unshift(new Array(10).fill(0));
    }
  }
}

function updateScore() {
  document.getElementById('score').innerHTML = 'Score: ' + score;
}

function moveDown() {
  removeShape();
  currentShapeCoords.y++;

  if (isCollision()) {
    currentShapeCoords.y--;
    mergeShape();
    createShape();

    if (isCollision()) {
      clearInterval(interval);
      isGameRunning = false;
      alert('Game Over!');
      return;
    }
  }

  drawShape();
}

function moveLeft() {
  removeShape();
  currentShapeCoords.x--;

  if (isCollision()) {
    currentShapeCoords.x++;
  }

  drawShape();
}

function moveRight() {
  removeShape();
  currentShapeCoords.x++;

  if (isCollision()) {
    currentShapeCoords.x--;
  }

  drawShape();
}

function rotateShape() {
  removeShape();

  var rotatedShape = [];
  for (var col = 0; col < currentShape[0].length; col++) {
    var newRow = [];
    for (var row = currentShape.length - 1; row >= 0; row--) {
      newRow.push(currentShape[row][col]);
    }
    rotatedShape.push(newRow);
  }

  currentShape = rotatedShape;

  if (isCollision()) {
    rotateShape();
  }

  drawShape();
}

document.addEventListener('keydown', function (event) {
  if (isGameRunning) {
    switch (event.key) {
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case 'ArrowUp':
        rotateShape();
        break;
    }
  }
});

document.getElementById('start-button').addEventListener('click', function () {
  if (!isGameRunning) {
    isGameRunning = true;
    score = 0;
    createGrid();
    drawGrid();
    createShape();
    drawShape();
    updateScore();
    interval = setInterval(moveDown, 500);
  }
});