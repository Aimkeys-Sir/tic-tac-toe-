const board=document.querySelector(".row")
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6720fd1680msh24bd9fc4828fef4p1799f1jsnd932a9177f39',
        'X-RapidAPI-Host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com'
    }
};

const tictacwins=['147','123','258','369','456','789','159','357']
let thereIsWin=false
let cells=[]
for(let i=1;i<10;i++)
{
cells.push(document.getElementById(`${i}`))
}
console.log(cells)
for (let i = 0; i < 9; i++) {
    cells[i].addEventListener("click", onClick)
}
function isAwin(state,turn)
{
    if(!state.split("").find(empty=>empty==="-") && !thereIsWin)
    {
        console.log("its a draw")
         return "It's a draw"
    }
    let form=""
    for(let i=0;i<9;i++){
        if(state.split("")[i]==turn)
        {
            form +=`${i+1}`
        }
    }
   let win=tictacwins.find(aForm=>aForm===form)
    if(win)
    {
        thereIsWin=true
        console.log(`${turn} Wins!!`)
        return `${turn} Wins!!`
    }
    else{
        console.log(`${turn} not yet!`)
        return false
    }
}
async function computerTurn(state, turn) {
    console.log(board.style.pointerEvents)
    board.style.pointerEvents="none"
    await fetch(`https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com//${state}/${turn}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            inputCell("O",cells[response.recommendation],"O")

        })
        .catch(err => console.error(err));
        if(isAwin(whatState(),"O")) return isAwin(whatState(),"O")
        board.style.pointerEvents=""
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
    if(thereIsWin) return
  
    //if(isAwin(whatState(),"O")) return isAwin(whatState(),"O")
    inputCell("X",e.target,"tar")
    if(isAwin(whatState(),"X")) return isAwin(whatState(),"X")
    computerTurn(whatState(),"O")
}
function inputCell(input,target,mrs)
{
    const h1 = document.createElement('h1')
    const image=document.createElement('img')
    image.className="mrs"
    image.src=`./images/mrs${mrs}.png`
    h1.className = "my-h1"
     h1.innerText = input

     target.append(h1,image)
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