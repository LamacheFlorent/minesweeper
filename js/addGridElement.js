const MINE_SYMBOL = "M";

const addGridElement = (grid) => {
    
    // add mines
    const maxMines = 10;
    const minesCoords = new Set();

    // Generate random coordinate
    while (minesCoords.size <= maxMines) {
        const coord = getRandomCoord(grid);
        minesCoords.add(coord);
    }

    // add mines to grid
    minesCoords.forEach(coord => {
        const { col, row } = coord;
        grid[row][col] = MINE_SYMBOL; 
    });

    // Update cells around mines
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === MINE_SYMBOL) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        updateCell(grid, newRow, newCol);
                    }
                }
            }
        }
    }
};

const getRandomCoord = (grid) => {
    const col = Math.floor(Math.random() * grid.length);
    const row = Math.floor(Math.random() * grid[0].length);

    return { col, row };
};

const updateCell = (grid, row, col) => {
    if (isValidIndex(grid, row, col) && grid[row][col] !== MINE_SYMBOL) {
        grid[row][col]++;
    }
};

const isValidIndex = (grid, row, col) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

export default addGridElement;