# Minesweeper

To train myself on javascript, I wanted to create my own version of the minesweeper game. 
The aim of the game is to find the mines by placing flags on a grid. By clicking on the squares of the grid, the player can find out where the mines are and place a flag to prevent clicking on them. If he clicks on a mine, the game is lost.

I only used html, css and javascript. 

I decided to work on my javascript code by separating it into several modules. Each module will have its own functionalities for improved maintainability and code readability


### main.js
is the main module, which initializes the application and uses the various modules.

### createGrid.js 
is the module that creates the game grid.

### addGridElement.js 
adds the elements required for the game (mines, numbers, etc.).

### addEvent.js 
manages interaction with the user interface.
