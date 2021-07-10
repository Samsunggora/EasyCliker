let $start = document.querySelector('#start')
let $game = document.querySelector("#game")
let score = 0
let $time = document.querySelector('#time')
let isGameStarted = false
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')

function setGameTime() {
    let time = 5
    $time.textContent = time.toFixed(1)

}

function setGameScore() {
    $result.textContent = score.toString()
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function endGame() {
    $timeHeader.classList.add('hide')
    setGameScore()
    $resultHeader.classList.remove('hide')
    isGameStarted = false
    $start.classList.remove('hide')
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''

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
    box.style.backgroundColor = "#000"
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', "true")
    $game.insertAdjacentElement('afterbegin', box)
}

function startGame() {
    score = 0
    setGameTime()
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
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
    $start.classList.add('hide')
    renderBox()

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


