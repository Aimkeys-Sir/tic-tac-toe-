const board = document.querySelector(".row")
const end = document.querySelector('.end')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6720fd1680msh24bd9fc4828fef4p1799f1jsnd932a9177f39',
        'X-RapidAPI-Host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com'
    }
};

const tictacwins = ['147', '123', '258', '369', '456', '789', '159', '357']
let thereIsWin = false
let thereIsDraw = false
let starScore=0
let oScore=0
const scoreX=document.getElementById("x-score")
const scoreO=document.getElementById("o-score")
let cells = []
for (let i = 1; i < 10; i++) {
    cells.push(document.getElementById(`${i}`))
}
for (let i = 0; i < 9; i++) {
    cells[i].addEventListener("click", onClick)
}
function clearBoard(){
    cells.forEach(cell=>cell.innerHTML="")
    end.innerHTML=""
    end.style.zIndex="-1"
    board.style.opacity="1"
    thereIsDraw=false
    thereIsWin=false
}
function endGame(win,turn,form) {
    const guys = document.createElement("div")
    guys.className = "guys"
    const wow = document.createElement("div")
    wow.className = "wow"
    const wowText = document.createElement("h2")
    wow.append(wowText)
    const again = document.createElement("div")
    const againText = document.createElement("h3")
    againText.innerText = "Play Again"
    again.append(againText)
    again.addEventListener('click', clearBoard)
    again.className = "again"
    if (win) {
        form=form.split("")
        let others=[]
        let winners=[]
        for(let i=1;i<10;i++){
            if(!form.find(num=>num==i))
            { 
                others.push(i-1)
                if(cells[i-1].lastChild)
                {
                    cells[i-1].lastChild.style.animation="fade-out 2s"
                }
               
            }else{
                winners.push(i-1)
                cells[i-1].lastChild.style.animation="zoom 1s"
                cells[i-1].lastChild.style.animationIterationCount="2"
            }
        }
        const winner=document.createElement("img")
        winner.className="winner"
        if(turn=="O"){
            oScore +=1
            scoreO.innerText=oScore
            winner.src="./images/mrsO.png"
        }else{
            starScore +=1
            scoreX.innerText=starScore
            winner.src="./images/mrstar.png"
        }
        wowText.innerText="Our Winner!!"
        setTimeout((()=>{
             board.style.opacity="0.3"
             guys.append(winner)
             end.style.zIndex="1"
             end.append(wow,guys,again)
        }),2000)

    } else {
        if (end.firstChild) return
        console.log("its a draw")
        const mrsO = document.createElement('img')
        const mrStar = document.createElement('img')
        const ref = document.createElement('img')
        mrsO.src = "./images/mrsO.png"
        mrStar.src = "./images/mrstar.png"
        ref.src = "./images/ref.png"
        ref.className = "ref"
        mrsO.className = "end-image"
        mrStar.className = "end-image"
        guys.append(mrStar, ref, mrsO)
        board.style.animation = "fade-out 2s"

        setTimeout((() => {
            wowText.innerText = "It's a draw!!"
            board.style.opacity = 0.3
            end.style.zIndex = "1"
            end.append(wow, guys, again)
        }), 2000)
    }
}
function isAwin(state, turn) {
    let form = ""
    for (let i = 0; i < 9; i++) {
        if (state.split("")[i] == turn) {
            form += `${i + 1}`
        }
    }
    checkWin(form)

    if (!state.split("").find(empty => empty === "-") && !thereIsWin) {
        thereIsDraw = true
        endGame(false, false)
    }


    function checkWin(theForm) {
        if (theForm.length < 4) {
            let win = tictacwins.find(aForm => aForm === theForm)
            if (win) {
                thereIsWin = true
                console.log(`${turn} Wins!!`)
               endGame(true, turn,win)
            }
            else {
                console.log(`${turn} not yet!`)
            }
        } else {
            for (let i = 0; i < 4; i++) {
                let winning = false
                for (let j = 1; j < 4; j++) {
                    for (let k = 2; k < 4; k++) {
                        winning = checkWin(theForm[i] + theForm[j] + theForm[k])
                        if (winning) return
                    }
                }
            }
        }

    }


}
async function computerTurn(state, turn) {
    console.log(board.style.pointerEvents)
    board.style.pointerEvents = "none"
    await fetch(`https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com//${state}/${turn}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            inputCell("O", cells[response.recommendation], "O")

        })
        .catch(err => console.error(err));
    if (isAwin(whatState(), "O")) return isAwin(whatState(), "O")
    board.style.pointerEvents = ""
}
function whatState() {
    let state = ''
    for (let i = 0; i < 9; i++) {
        if (cells[i].firstChild) {
            state += cells[i].firstChild.innerText
        } else {
            state += "-"
        }

    }
    return state
}


function onClick(e) {

    if (e.target.firstChild) return
    if (thereIsWin || thereIsDraw) return
    inputCell("X", e.target, "tar")
    if (thereIsWin || thereIsDraw) return
    computerTurn(whatState(), "O")
}
function inputCell(input, target, mrs) {
    const h1 = document.createElement('h1')
    const image = document.createElement('img')
    image.className = "mrs"
    image.src = `./images/mrs${mrs}.png`
    h1.className = "my-h1"
    h1.innerText = input

    target.append(h1, image)
}
