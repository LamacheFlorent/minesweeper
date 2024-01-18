const CELL_BUG_CLASS = "cell-bug";
const CELL_EMPTY_CLASS = "cell-empty";
const CELL_NUM_CLASS = "cell-num";
const CELL_HIDDEN_CLASS = "cell-hidden";
const CELL_FLAG_CLASS = "cell-flag";

let gameOver = false;
let minesFound = 0;
const maxMines = 10;

const addEvent = (grid) => {

    const gridEl = document.querySelector('.game');

    gridEl.addEventListener('click', (event) => handleCellClick(event, grid));

    gridEl.addEventListener('contextmenu', (event) => handleContextMenu(event));

};

const handleCellClick = ({ target }, grid) => {
    if (!gameOver && target.matches(`.${CELL_HIDDEN_CLASS}`)) {

        onClickCell({ target, grid });

    }

    checkWin();
};

const handleContextMenu = (event) => {
    event.preventDefault();

    const { target } = event;

    if (target.matches(`.${CELL_FLAG_CLASS}`)) {
        target.classList.add(CELL_HIDDEN_CLASS);
        target.classList.remove(CELL_FLAG_CLASS);

        updateFlagCounter(-1);
        return;
    }

    if (!target.matches(`.${CELL_HIDDEN_CLASS}`) || minesFound >= maxMines) {
        return;
    }

    target.classList.remove(CELL_HIDDEN_CLASS);
    target.classList.add(CELL_FLAG_CLASS);

    updateFlagCounter(1);
};

const updateFlagCounter = (value) => {

    minesFound += value;

    minesFound = Math.min(minesFound, maxMines);

    const flagCounter = document.getElementById('flags-left');
    flagCounter.textContent = `${minesFound}/${maxMines}`;
};


const onClickCell = ({ target, grid }) => {

    if (!target.matches(".cell-hidden")) {
        return;
    }

    const rowIndex = parseInt(target.dataset.rowIndex, 10);
    const colIndex = parseInt(target.dataset.colIndex, 10);

    if (isNaN(rowIndex) || isNaN(colIndex)) {
        console.error("Indices de ligne ou de colonne non valides.");
        return;
    }

    reveal({
        col: colIndex,
        row: rowIndex,
        grid,
        target
    });
};

const resetGame = () => {
    gameOver = false;
    minesFound = 0;
    hideGameResult();

    const flagCounter = document.getElementById('flag-number');
    flagCounter.textContent = '0';
};


const reveal = ({ col, row, grid, target }) => {
    target.classList.remove(CELL_HIDDEN_CLASS);

    switch (grid[row][col]) {
        case "M":
            handleMineReveal(target);
            break;

        case 0:
            handleEmptyCellReveal(grid, row, col);
            break;

        default:
            handleNumberCellReveal(target, grid[row][col]);
            break;
    }
};

const handleMineReveal = (target) => {
    target.classList.add(CELL_BUG_CLASS);

    minesFound++;

    if (minesFound === maxMines) {

        displayGameResult('Gagné!');
        gameOver = true;

        disableCellClick();
    } else {

        checkGameOver();
    }

    checkWin();
};


const checkWin = () => {

    const hiddenCells = document.querySelectorAll(`.${CELL_HIDDEN_CLASS}`);
    if (hiddenCells.length === 0) {

        displayGameResult('Gagné!');
        gameOver = true;

        disableCellClick();
    }
};

const checkGameOver = () => {

    if (minesFound < maxMines && !gameOver) {
        
        displayGameResult('Perdu!');
        gameOver = true;
        
        disableCellClick();
    }
};


const displayGameResult = (message) => {
    const gameMessage = document.getElementById('game-message');
    const gameMessageText = document.getElementById('game-message-text');

    gameMessageText.textContent = message;
    gameMessage.classList.remove('hidden');
};

const disableCellClick = () => {
 
    const gridEl = document.querySelector('.game');
    gridEl.removeEventListener('click', handleCellClick);
    gridEl.removeEventListener('contextmenu', handleContextMenu);
};


const isValidIndex = (grid, row, col) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

const isCellHidden = (row, col) => {
    const target = document.querySelector(`.cell-row-${row}-col-${col}`);
    return target && target.classList.contains(CELL_HIDDEN_CLASS);
};

const revealAdjacentCells = (grid, row, col) => {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (isValidIndex(grid, newRow, newCol) && isCellHidden(newRow, newCol)) {
                reveal({
                    col: newCol,
                    row: newRow,
                    grid,
                    target: document.querySelector(`.cell-row-${newRow}-col-${newCol}`)
                });
            }
        }
    }
};

const handleEmptyCellReveal = (grid, row, col) => {
    const target = document.querySelector(`.cell-row-${row}-col-${col}`);
    if (target) {
        target.classList.add(CELL_EMPTY_CLASS);
        revealAdjacentCells(grid, row, col);
    } else {
        console.error("Empty cell target is null. Row:", row, "Col:", col);
    }
};

const handleNumberCellReveal = (target, num) => {
    target.classList.add(CELL_NUM_CLASS, `cell-num-${num}`);
    target.innerText = num;
};

const updateFlagsLeft = () => {
    const flagsLeftElement = document.getElementById('flags-left');
    flagsLeftElement.textContent = maxMines - minesFound;
};


const restartGame = () => {
 
    gameOver = false;
    minesFound = 0;

    const gameMessage = document.getElementById('game-message');
    gameMessage.classList.add('hidden');

    const gridCells = document.querySelectorAll('.cell');
    gridCells.forEach(cell => {
        cell.classList.remove(CELL_BUG_CLASS, CELL_EMPTY_CLASS, CELL_NUM_CLASS, CELL_FLAG_CLASS);
        cell.textContent = '';
        if (cell.classList.contains(CELL_HIDDEN_CLASS)) {
            cell.classList.remove(CELL_HIDDEN_CLASS);
        }
    });

     createGrid();

    addEvent(grid);

};

export { addEvent as default, restartGame };