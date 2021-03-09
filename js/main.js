var today = Date.now();
var level = 1
var points = 0
var sec = 60
var goodClicks = 10
var badClicks = 0
var timer = null;
var rotateTimer = null;
var myHighscore = ""
var players = [{ player: "Lisa", score: "415", hsDate: " 15/2/1997" },
{ player: "Homer", score: "125", hsDate: " 09/6/1989" },
{ player: "Bart", score: "365", hsDate: " 26/4/1995" },
{ player: "Marge", score: "208", hsDate: " 24/11/1989" },
{ player: "Maggie", score: "512", hsDate: " 15/5/2002" }

]

var playerJSON = localStorage.getItem("players")
if (playerJSON != null) {
    var arr = JSON.parse(playerJSON)
    if (arr.length > 0) {
        players = arr
    }
}


function updateLS() {
    var playerJSON = JSON.stringify(players);
    playerJSON = localStorage.setItem("players", playerJSON);
}


document.querySelector("#main").innerHTML = ` <div id="start" onmouseenter ="getStarted()" onmouseleave="notYet()" >
Click Me to Get Started!
</div>
<div class="wrap">
<div id="screen">
<div class="point-button">click me!</div>
</div>
<div class="infoholder">
<div class="gameinfo">Score:<br /><span id="score">0</span></div>
<div class="gameinfo">missed clicks:<br /><span id="offscore">0</span></div>
<div class="gameinfo">Clicks to next level:<br /><span id="points">10</span></div>
<div class="gameinfo">Level:<br /><span id="level">1</span></div>
<div class="gameinfo">Timer:<br /><span id="timer">60</span></div>
<div class="gameinfo" id="highscores"></div>

</div>
</div>`
var start = document.getElementById("start");
var pointBar = document.querySelector(".point-button");
var blackScreen = document.querySelector("#screen");
var gameClock = document.querySelector("#timer");
var onPoints = document.querySelector("#score");
var offPoints = document.querySelector("#offscore");
var dlevel = document.querySelector("#level");
var levelClicks = document.querySelector("#points");
var scores = "";
var highScores = document.getElementById("highscores");

function createHTML() {
    
    scores = ""
    players.sort(function (a, b) { return b.score - a.score });
    players.forEach(function (players, i) {
        var i = i + 1;
        scores += `
  <div class="hsEach"> <span class="datepopup">${players.hsDate} </span> <p>${players.player} - ${players.score} </p></div>
`
        highScores.innerHTML = "<h3>High Scores:</h3>" + scores;

    });


}



createHTML()

start.addEventListener("click", gameOn);







function gameOn() {
    alert(`click the yellow button to get started. \nyou have 60 seconds to collect as many points as you can. \nA successfull click on the "click me!" bar will add 10 points times your current level. \n10 successful clicks progresses you to the next level and add 10 seconds to the timer. \n10 unsuccessful clicks reduces your points by 10 times your current level. \nBeat 5 levels to win the game. \nbeat the highscores on the board to enter the top 5. \nGOOD LUCK!`)
    start.removeEventListener("click", gameOn);
    pointBar.addEventListener("click", playBall);
    blackScreen.addEventListener("click", missedPoints);
    pointBar.addEventListener("mouseenter", animateTime);
    timer = setInterval(function () {
        gameClock.innerHTML = sec;
        sec--;

        if (sec <= 0) {
            clearInterval(timer)
            alert("Your final score is " + points + "\n you missed " + badClicks + " clicks")

            if (points > players[4].score) {
                myHighscore = prompt("Enter your name here")
                addPlayer()

                createHTML()
            }

            pointBar.removeEventListener("click", playBall);
            blackScreen.removeEventListener("click", missedPoints)
            reset()
        }
        else if(level == 6){
            alert("CONGRATULATIONS!! you beat 5 levels! \nYou finished the game!")
            clearInterval(timer)
            alert("Your final score is " + points + "\n you missed " + badClicks + " clicks")

            if (points > players[4].score) {
                myHighscore = prompt("Enter your name here")
                addPlayer()

                createHTML()}

                pointBar.removeEventListener("click", playBall);
                blackScreen.removeEventListener("click", missedPoints)
                reset()
        }
        else {
            gameClock.innerHTML = sec

        }

    }, 1000);
    console.log(pointBar)
}



function animateTime() {
    setTimeout(() => {
        pointBar.style.animation = "pointbar 2s infinite"
        pointBar.style.top = Math.floor(Math.random() * 500) + "px";
        pointBar.style.left = Math.floor(Math.random() * 500) + "px";
    }, 300)
    if (level == 2) {
        setTimeout(() => {
            pointBar.style.animation = "pointbar 1.75s infinite"

        }, 250)
        if (level == 3) {
            setTimeout(() => {
                pointBar.style.animation = "pointbar 1.5s infinite"

            }, 200)
            if (level == 4) {
                setTimeout(() => {
                    pointBar.style.animation = "pointbar 1.25s infinite"

                }, 150)
                if (level == 5) {
                    setTimeout(() => {
                        pointBar.style.animation = "pointbar 1s infinite"

                    }, 100)
                }
            }
        }
    }
}






function missedPoints(e) {
    e.stopPropagation()
    badClicks++;
    offPoints.innerHTML = badClicks;
    points -= 10 * (level * 1);
    onPoints.innerHTML = points;
}



function playBall(e) {
    e.stopPropagation()
    points += 10 * level;
    onPoints.innerHTML = points;
    goodClicks--;
    levelClicks.innerHTML = goodClicks;
    if (goodClicks == 0) {
        nextLevel()
        goodClicks += 10
    }
}


function nextLevel() {
    level++
    dlevel.innerHTML = level
    sec += 10;
}

function getStarted() {
    start.innerHTML = `START!`;
}
function notYet() {
    start.innerHTML = `Click Me to Get Started!`;
}

function reset() {
    gameClock.innerHTML = "60";
    onPoints.innerHTML = "0";
    offPoints.innerHTML = "0";
    dlevel.innerHTML = "1";
    levelClicks.innerHTML = "10"
    pointBar.style.top = "0px";
    pointBar.style.left = "0px";
    pointBar.style.animation = "pointbar 2s "
    pointBar.removeEventListener("mouseenter", animateTime)
    start.addEventListener("click", gameOn)
}

function addPlayer() {
    var newPlayer = {
        player: "",
        score: "",
        hsDate: ""
    };
    var d = new Date(today)
    newPlayer.player = myHighscore;
    newPlayer.score = points;
    newPlayer.hsDate = d.toLocaleDateString()

    players.splice(4, 1, newPlayer)
    updateLS()

    createHTML()
}