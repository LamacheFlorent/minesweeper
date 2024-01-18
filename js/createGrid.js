const createGrid = () => {
    const gridSize = 8;

    const grid = [...Array(gridSize).keys()].map(() => {
        return [...Array(gridSize).keys()].map(() => {
            return 0; 
        });
    });

    const container = document.querySelector('.game');
    const html = [];

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const divEl = document.createElement('div');
            divEl.classList.add('cell', 'cell-hidden', `cell-row-${row}-col-${col}`);
            divEl.dataset.rowIndex = row; 
            divEl.dataset.colIndex = col; 

            container.appendChild(divEl);
            html.push(divEl);
        }
    }

    return grid;
};

export default createGrid;