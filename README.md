# tic-tac-toe-
Welcome to the classical tic-tac-toe game. Enjoy playing under water with team star fish!!
## languages
The game is coded using javascript,css and html
## api
tic-tac-toe api is from [rapidApi](https://rapidapi.com/stujo/api/tic-tac-toe) by stujo. The api provides moves for the computer.
## Implementation
The player is starfish while the computer is puffer fish. Both play in turns until one wins or the game ends in a draw.
The player can play as many times as possible!

## code summary
### javascript
1. Get all nine cells and add them a click event listener.
2. On click, check if the cell has some content already, add an "X" and a starfish. Then call computers turn if the game is still alive.
3. Computer fetches the remmendation and adds an "O" and a puffer fish. The `computerTurn` function receives the game state from the `whatState` function that formats the game state as per api endpoint requirement.
4. The `isAwin` function tests if a player has a winning form (checks the form against an array of possible winning forms) or there's a draw. Then calls the `endGame` function accordingly.

### html
It contains 9 cells(`div` containers), a score board, and an end screen.
### style
uses media query to change style between phone and  desktop and make the page responsive.