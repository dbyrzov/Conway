rows = 50;
cols = 100;
mainArray = new Array(rows);
tempArray = new Array(rows);

function initBoards() {
    initBoard(mainArray);
    initBoard(tempArray);
}

function initBoard(board) {
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(cols);

        for (var j = 0; j < board[i].length; j ++) {
            board[i][j] = 0;
        }
    }
}

function init() {
    // Create the arrays
    initBoards();

    // Create the board
    drawPlayGround();

    // Create initial values
    initValues();

    // The game
    playGame();
}

function initValues() {
    for (var i = 0; i < mainArray.length; i++) {
        for (var j = 0; j < mainArray[i].length; j ++) {
            if (Math.random() < 0.5) {
                mainArray[i][j] = 0;
            } else {
                mainArray[i][j] = 1;
            }
        }
    }
}

function drawPlayGround() {
    var table = document.createElement("table");
    
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + ":" + j);
            cell.setAttribute("class", "dead");
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    document.getElementById('container').appendChild(table);
}

function refreshBoard() {
    for (var i = 0; i < mainArray.length; i++) {
        for (var j = 0; j < mainArray[i].length; j ++) {
            if (mainArray[i][j] == 0) {
                document.getElementById(i + ':' + j).classList.remove('alive');
            } else {
                document.getElementById(i + ':' + j).classList.add('alive');
            }
        }
    }
}

function calcNextCycle() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }
}

function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (mainArray[row][col] == 1) {
        if (numNeighbors < 2) {
            tempArray[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            tempArray[row][col] = 1;
        } else if (numNeighbors > 3) {
            tempArray[row][col] = 0;
        }
    } else if (mainArray[row][col] == 0) {
            if (numNeighbors == 3) {
                tempArray[row][col] = 1;
            }
        }
    }
    
function countNeighbors(row, col) {
    var count = 0;
    if (row-1 >= 0) {if (mainArray[row-1][col] == 1) count++;}
    if (row-1 >= 0 && col-1 >= 0) {if (mainArray[row-1][col-1] == 1) count++;}
    if (row-1 >= 0 && col+1 < cols) {if (mainArray[row-1][col+1] == 1) count++;}
    if (col-1 >= 0) {if (mainArray[row][col-1] == 1) count++;}
    if (col+1 < cols) {if (mainArray[row][col+1] == 1) count++;}
    if (row+1 < rows) {if (mainArray[row+1][col] == 1) count++;}
    if (row+1 < rows && col-1 >= 0) {if (mainArray[row+1][col-1] == 1) count++;}
    if (row+1 < rows && col+1 < cols) {if (mainArray[row+1][col+1] == 1) count++;}
    return count;
}

function copyTempToMain() {
    for (var i = 0; i < tempArray.length; i++) {
        for (var j = 0; j < tempArray[i].length; j ++) {
            mainArray[i][j] = tempArray[i][j];
        }
    }
}

function playGame() {
    calcNextCycle();
    copyTempToMain();
    refreshBoard();
    setTimeout(playGame, 100);
}



