const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6720fd1680msh24bd9fc4828fef4p1799f1jsnd932a9177f39',
        'X-RapidAPI-Host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com'
    }
};

///A function to put X's and O's on the board and map them
///this function should receive a number and type of input(X or O)

///A funtion to check a winner
///checks if there are three X's or O's diagonally, horizontally and vertically

const cells = document.getElementsByClassName("cell")
for (let i = 0; i < 9; i++) {
    cells[i].addEventListener("click", onClick)
}
function computerTurn(state, turn) {
    fetch(`https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com//${state}/${turn}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            inputCell("O",cells[response.recommendation])
            
        })
        .catch(err => console.error(err));
}
function whatState() {
    let state=''
    for (let i = 0; i < 9; i++) {
        if(cells[i].firstChild){
           state += cells[i].firstChild.innerText 
        }else{
            state += "-"
        }
        
    }
    return state
}


function onClick(e) {
    if(e.target.firstChild) return
    inputCell("X",e.target)
    computerTurn(whatState(),"O")
}
function inputCell(input,target)
{
    const h1 = document.createElement('h1')
    h1.className = "my-h1"
     h1.innerText = input
     target.append(h1)
}
// async function exeOrO() {
//     let choice
//     const choose = document.getElementById("choose").children
//     choose[1].addEventListener("click", chooseClick)
//     choose[2].addEventListener("click", chooseClick)
//     function chooseClick(e) {
//         choice = e.target.innerText
//     }
//     return choice
// }
//console.log(exeOrO()) 