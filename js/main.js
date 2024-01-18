import createGrid from './createGrid.js';
import addGridElement from './addGridElement.js';
//import addEvent from './addEvent.js';

try {
    // Create grid
    const grid = createGrid();

    // Add elements in the grid (mine, number around the mine)
    addGridElement(grid);

    // Add events
    //addEvent(grid);
    console.table(grid);

    // Select restart button
    const restartButton = document.getElementById('restart');

    // Add event to reload the grid
    restartButton.addEventListener('click', () => {

        location.reload();

    });

} catch (error) {

    console.error("Une erreur est survenue :", error.message);

}
