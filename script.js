// Tamanho do grid
const GRID_SIZE = 100;

let isRunning = false;
let animationId = null;

function createGrid() {
    let grid = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = []
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
    }
    return grid;
}

function nextGrid(grid) {
    let newGrid = []
    for (let i = 0; i < GRID_SIZE; i++) {
        newGrid[i] = []
        for (let j = 0; j < GRID_SIZE; j++) {
            let neighbors = countNeighbors(grid, i, j);
            if (grid[i][j] && (neighbors === 2 || neighbors === 3)) {
                newGrid[i][j] = 1;
            } else if (!grid[i][j] && neighbors === 3) {
                newGrid[i][j] = 1;
            } else {
                newGrid[i][j] = 0;
            }
        }
    }
    return newGrid;
}

function countNeighbors(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let newX = x + i;
            let newY = y + j;
            if (newX >= 0 && newY >= 0 && newX < GRID_SIZE && newY < GRID_SIZE && grid[newX][newY]) {
                count++;
            }
        }
    }
    return count;
}

function update() {
  if (!isRunning) return;
  grid = nextGrid(grid);
  drawGrid(grid);
  animationId = requestAnimationFrame(update);
}

function drawGrid(grid) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j]) {
                ctx.fillRect(i * 10, j * 10, 10, 10);
                ctx.fillStyle = '#F28157';
            }
        }
    }
}

function init() {
    grid = createGrid();
    drawGrid(grid);
    setTimeout(() => {
      requestAnimationFrame(update);
    }, 5000);
}

const buttonStart = document.getElementById('start');
const buttonRestart = document.getElementById('restart');
const buttonPause = document.getElementById('pause');

buttonStart.addEventListener('click', function () {
  if (!isRunning) {
    isRunning = true;
    update();
}
});

buttonRestart.addEventListener('click', function () {
  grid = createGrid();
  if (!isRunning) {
      isRunning = true;
      update();
  }
});

buttonPause.addEventListener('click', function () {
  if (isRunning) {
    isRunning = false;
    cancelAnimationFrame(animationId);
}
});

init();