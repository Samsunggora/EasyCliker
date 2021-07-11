let $start = document.querySelector('#start')
let $game = document.querySelector("#game")
let score = 0
let $time = document.querySelector('#time')
let isGameStarted = false
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let colors = ['red', 'blue', 'yellow', 'black', 'orange', 'green', 'pink', 'brown']
let randomColorIndex = getRandom(0, colors.length)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')

}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)

}

function setGameScore() {
    $result.textContent = score.toString()
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function renderBox() {
    $game.innerHTML = ""
    let boxSize = getRandom(50, 100)
    let box = document.createElement('div')
    let getSize = $game.getBoundingClientRect()
    let maxTop = getSize.height - boxSize
    let maxLeft = getSize.width - boxSize
    box.style.height = box.style.width = boxSize + "px"
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', "true")
    $game.insertAdjacentElement('afterbegin', box)
}

function startGame() {
    $gameTime.setAttribute('disabled', "true")
    score = 0
    setGameTime()
    show($timeHeader)
    hide($resultHeader)
    isGameStarted = true
    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()

        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)
    $game.style.backgroundColor = '#fff';
    hide($start)
    renderBox()

}

function endGame() {
    $gameTime.removeAttribute('disabled')
    hide($timeHeader)
    setGameScore()
    show($resultHeader)
    isGameStarted = false
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''

}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }

}

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)


