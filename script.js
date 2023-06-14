document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('start-button');

    const gridWidth = 10;
    const gridHeight = 20;
    const cellSize = 30;
    const emptyCell = '';

    let gridCells = [];
    let currentTetromino = null;
    let timerId = null;
    let score = 0;

    const tetrominos = [
        [
            [1, 1, 1, 1], // I
        ],
        [
            [1, 1], // O
            [1, 1],
        ],
        [
            [1, 1, 1], // T
            [0, 1, 0],
        ],
        [
            [1, 1, 1], // L
            [1, 0, 0],
        ],
        [
            [1, 1, 0], // J
            [0, 0, 1],
        ],
        [
            [0, 1, 1], // S
            [1, 1, 0],
        ],
        [
            [1, 1, 1], // Z
            [0, 1, 1],
        ],
    ];

    const tetrominoColors = [
        '#00FFFF', // Cyan
        '#FFFF00', // Yellow
        '#FF00FF', // Magenta
        '#00FF00', // Green
        '#0000FF', // Blue
        '#FFA500', // Orange
        '#FF0000', // Red
    ];

    function createGrid() {
        for (let i = 0; i < gridHeight; i++) {
            const row = [];
            for (let j = 0; j < gridWidth; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                row.push(cell);
                grid.appendChild(cell);
            }
            gridCells.push(row);
        }
    }

    function drawGrid() {
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                const cell = gridCells[i][j];
                cell.style.backgroundColor = grid[i][j] || emptyCell;
            }
        }
    }

    function rotateTetromino() {
        const rotatedTetromino = [];
        const rows = currentTetromino[0].length;
        const cols = currentTetromino.length;
        for (let i = 0; i < rows; i++) {
            const newRow = [];
            for (let j = 0; j < cols; j++) {
                newRow.push(currentTetromino[j][i]);
            }
            rotatedTetromino.push(newRow.reverse());
        }
        return rotatedTetromino;
    }

    function isCollision() {
        const tetromino = currentTetromino;
        const rowOffset = tetromino.length;
        const colOffset = tetromino[0].length;
        for (let i = 0; i < tetromino.length; i++) {
            for (let j = 0; j < tetromino[0].length; j++) {
                if (tetromino[i][j] && (grid[i + rowOffset] && grid[i + rowOffset][j + colOffset]) !== emptyCell) {
                    return true;
                }
            }
        }
        return false;
    }

    function mergeTetromino() {
        const tetromino = currentTetromino;
        const rowOffset = tetromino.length;
        const colOffset = tetromino[0].length;
        for (let i = 0; i < tetromino.length; i++) {
            for (let j = 0; j < tetromino[0].length; j++) {
                if (tetromino[i][j]) {
                    grid[i + rowOffset][j + colOffset] = tetrominoColors.indexOf(currentTetrominoColor);
                }
            }
        }
        removeFullRows();
    }

    function removeFullRows() {
        let rowsCleared = 0;
        for (let i = gridHeight - 1; i >= 0; i--) {
            if (grid[i].every(cell => cell !== emptyCell)) {
                grid.splice(i, 1);
                grid.unshift(Array(gridWidth).fill(emptyCell));
                rowsCleared++;
            }
        }
        if (rowsCleared > 0) {
            score += rowsCleared * 10;
            scoreDisplay.textContent = score;
        }
    }

    function update() {
        if (!isCollision()) {
            currentTetrominoRow++;
        } else {
            mergeTetromino();
            if (currentTetrominoRow < 0) {
                // Game Over
                clearInterval(timerId);
                alert('Game Over');
                return;
            }
            currentTetromino = getRandomTetromino();
            currentTetrominoColor = getRandomTetrominoColor();
            currentTetrominoRow = -1;
            currentTetrominoCol = Math.floor(gridWidth / 2) - Math.floor(currentTetromino[0].length / 2);
        }
        drawGrid();
    }

    function getRandomTetromino() {
        const randomIndex = Math.floor(Math.random() * tetrominos.length);
        return tetrominos[randomIndex];
    }

    function getRandomTetrominoColor() {
        const randomIndex = Math.floor(Math.random() * tetrominoColors.length);
        return tetrominoColors[randomIndex];
    }

    function startGame() {
        gridCells = [];
        grid = Array(gridHeight).fill().map(() => Array(gridWidth).fill(emptyCell));
        drawGrid();
        score = 0;
        scoreDisplay.textContent = score;
        currentTetromino = getRandomTetromino();
        currentTetrominoColor = getRandomTetrominoColor();
        currentTetrominoRow = -1;
        currentTetrominoCol = Math.floor(gridWidth / 2) - Math.floor(currentTetromino[0].length / 2);
        timerId = setInterval(update, 1000);
        startButton.disabled = true;
    }

    createGrid();

    startButton.addEventListener('click', startGame);
});
