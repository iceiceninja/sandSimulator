const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
const ratio = 25
const gridSizeX = Math.floor(canvas.width / ratio);
const gridSizeY = Math.floor(canvas.height / ratio)

console.log(gridSizeX)
console.log(gridSizeY)
const squareSize = canvas.height / gridSizeY
function makeEmptyGrid() {
    grid = []
    for (let i = 0; i < gridSizeY; i++) {
        grid.push([]);
        for (let j = 0; j < gridSizeX; j++) {
            grid[i].push('X')
        }
    }
    return grid
}

grid = makeEmptyGrid()
// grid[0][3] = 'S';
// grid[0][4] = 'S';
// grid[0][5] = 'S';
// grid[1][4] = 'S';
// grid[2][4] = 'S';
x = 0

document.addEventListener("keydown", function (event) {

    if (event.key == "ArrowRight") {
        x++
    }
    if (event.code == 'ArrowLeft') {
        x--
    }
    if (event.code == 'Space') {
        grid[0][x] = 'W'
    }
})
// [
//     ['X', 'S', 'S', 'S', 'X'],
//     ['X', 'X', 'S', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X'],
//     ['X', 'X', 'X', 'X', 'X'],
// ]

function drawRect(x, y, width, height, stroke, fill) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = stroke//"#000000"
    ctx.stroke();
    ctx.fillStyle = fill//"#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

// class Element {
//     init() {

//     }

// }
// class Solid extends Element {
//     init() {

//     }
// }
// class Sand extends Solid {
//     init() {

//     }
//     // step(oldGrid) {

//     // }

// }
function checkBelow(replacement, newGrid) {
    for (let y = grid.length - 1; y >= 0; y--) {
        for (let x = grid[0].length - 1; x >= 0; x--) {
            if (newGrid[y + 1][x] == 'X') {//oldGrid[y + 1][x] == "X" &&
                newGrid[y + 1][x] = replacement
            }
            else if (x != 0 && newGrid[y + 1][x - 1] == 'X') {//oldGrid[y + 1][x - 1] == "X" &&
                newGrid[y + 1][x - 1] = replacement
            }
            else if (x != newGrid.length - 1 && newGrid[y + 1][x + 1] == 'X') {//oldGrid[y + 1][x + 1] == "X" &&
                newGrid[y + 1][x + 1] = replacement
            }
        }
    }
    // else {
    //     newGrid[x][y] = "S"
    // }
}

function step() {
    // console.log(grid)

    oldGrid = grid
    newGrid = makeEmptyGrid()
    newGrid[0][Math.floor(gridSizeX / 2)] = 'S'
    for (let y = grid.length - 1; y >= 0; y--) {
        for (let x = grid[0].length - 1; x >= 0; x--) {
            if (oldGrid[y][x] == "S") {
                if (y == oldGrid.length - 1) {
                    newGrid[y][x] = 'S';
                }
                else if (newGrid[y + 1][x] == 'X') {
                    newGrid[y + 1][x] = "S"
                }
                else if (x != 0 && newGrid[y + 1][x - 1] == 'X') {
                    newGrid[y + 1][x - 1] = "S"
                }
                else if (x != newGrid.length - 1 && newGrid[y + 1][x + 1] == 'X') {
                    newGrid[y + 1][x + 1] = "S"
                }
                else {
                    newGrid[y][x] = "S"
                }
            } else if (oldGrid[y][x] == "W") {
                if (y == oldGrid.length - 1) {
                    newGrid[y][x] = 'W';
                }
                else if (newGrid[y + 1][x] == 'X') {
                    newGrid[y + 1][x] = "W"
                }
                else if (x != 0 && (newGrid[y + 1][x - 1] == 'X' || newGrid[y][x - 1] == 'X')) {
                    if (newGrid[y + 1][x - 1] == 'X') {
                        newGrid[y + 1][x - 1] = "W"
                    }
                    else if (newGrid[y][x - 1] == 'X') {
                        newGrid[y][x - 1] = "W"
                    }
                }
                else if (x != newGrid.length - 1 && (newGrid[y + 1][x + 1] == 'X' || newGrid[y][x + 1] == 'X')) {
                    if (newGrid[y + 1][x + 1] == 'X') {
                        newGrid[y + 1][x + 1] = "W"
                    }
                    else if (newGrid[y][x + 1] == 'X') {
                        newGrid[y][x + 1] = "W"
                    }
                }
                else {
                    newGrid[y][x] = "W"
                }
            }
        }
    }
    // console.log(newGrid)
    grid = newGrid
}
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] == 'S') {
                drawRect((j * squareSize), (i * squareSize), squareSize, squareSize, "#000000", "#FFFF00")
            }
            else if (grid[i][j] == 'W') {
                drawRect((j * squareSize), (i * squareSize), squareSize, squareSize, "#000000", "#0000FF")
            }
        }
    }
    step()
}
// setInterval(step)
setInterval(drawGrid, 50)