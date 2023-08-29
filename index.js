window.addEventListener("keydown", checkKey)

let player = document.getElementById("player")
let enemy = document.getElementById("enemy")
let scoreElement = document.getElementById("scoreId")

let score = 0

let isJumping = false

function checkKey(info) {

    if (isJumping) {
        return
    }


    if (info.key == " ") {
        isJumping = true
        player.classList.add("animate")
        setTimeout(endOfJump, 1000)
    }
} 

function endOfJump() {
    isJumping = false
    player.classList.remove("animate")
    score++
    scoreElement.innerHTML = "Your score: " + score
}

let touchInterval = setInterval(checkIfDead, 100)

function checkIfDead() {
    if (elementsOverlap(player, enemy)) {
        clearInterval(touchInterval)
        let best = localStorage.getItem("best")
        if (!best || best < score) {
            localStorage.setItem("best", score)
            best = score
        }


        document.body.innerHTML = `
            <center>
                <h1 id="overId"> Game Over </h1>
                <p id="result"> Your score is ${score} </p>
                <p> Your best is... ${best} </p>
            </center>

        `
    }
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}