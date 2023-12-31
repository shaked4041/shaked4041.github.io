

const mainArray = [
    { src: "assets/\watermelon.png", name: "watermelon" },
    { src: "assets/\pineapple.png", name: "pineapple" },
    { src: "assets/\strawberry.png", name: "strawberry" },
    { src: "assets/\orange.png", name: "orange" },
    { src: "assets/\lemon.png", name: "lemon" },
    { src: "assets/\apple.png", name: "apple" },
    { src: "assets/\Banana.png", name: "Banana" },
    { src: "https://www.svgrepo.com/download/207730/blueberries-fruit.svg", name: "bluberry" },
    { src: "https://freesvg.org/storage/img/thumb/sssssss.png", name: "cherrries" },
    { src: "assets/\cucumber.png", name: "cucumber" },
    { src: "https://freesvg.org/img/kiwi.png", name: "kiwi" },
    { src: "https://freesvg.org/img/manggo.png", name: "mango" },
    { src: "https://freesvg.org/img/coredump-Peach.png", name: "peach" },
    { src: "https://freesvg.org/img/mini-tomato.png", name: "tomato" },
    { src: "assets/\grapes.png", name: "grapes" }
];

// let timerInterval;
function shuffle(firstArray) {

    let temp;
    for (let i = 0; i < firstArray.length * 2; i++) {
        let random1 = Math.floor(Math.random() * firstArray.length);
        let random2 = Math.floor(Math.random() * firstArray.length);
        temp = firstArray[random1];
        firstArray[random1] = firstArray[random2];
        firstArray[random2] = temp;
    }
    return firstArray;
}
const backImg = "assets/\catPic2.png"

let copyMainArray = mainArray
let updatedArray = copyMainArray.slice(0, 5);
let losses = 0;
let currentMode = 1

function init() {
    // document.getElementById("gameOver").style.display = "none"; // Add this line
    const boardElement = document.getElementsByClassName("board")[0];
    const shuffled = shuffle(updatedArray.concat(updatedArray));
    losses = 0;
    let count = 0;
    let arr = [];
    let rightArr = [];
    currentMode = 1
    shuffled.forEach((cardValue, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = `${cardValue.name}-${index}`
        cardElement.innerText = cardValue.name
        const img = document.createElement('img')
        img.src = backImg
        cardElement.appendChild(img)
        boardElement.appendChild(cardElement);

        cardElement.onclick = () => {

            if (count < 2) {
                if (count === 0) {
                    img.src = cardValue.src;
                    cardElement.style.transform = "rotateY(180deg)";
                    arr.push(cardElement);
                    count++;
                } else {
                    if (cardElement.id === arr[arr.length - 1].id) {
                        return;
                    }

                    img.src = cardValue.src;
                    cardElement.style.transform = "rotateY(180deg)";
                    arr.push(cardElement);
                    count++;

                    if (count === 2) {
                        setTimeout(() => {
                            if (arr[arr.length - 1].innerText == arr[arr.length - 2].innerText) {
                                arr[arr.length - 1].style.border = "3px solid  #FBA1A1";
                                arr[arr.length - 2].style.border = "3px solid #FBA1A1";

                                rightArr.push(arr[arr.length - 2])
                                rightArr.push(arr[arr.length - 1])
                                count = 0;

                                if (rightArr.length === shuffled.length) {
                                    document.getElementById("gameOver").style.display = "block";
                                }

                            }
                            else {
                                flipBack(arr);
                                count = 0;
                                losses++
                                updateLossesDisplay()

                            }
                        }, 300);
                    }
                }
            }

        };
    });
}


// function handleLevel(event) {

//     let copyMainArray = mainArray

//     if (event.target.id === "level1") {
//         updatedArray = copyMainArray.slice(0, 5);
//         restart(currentMode)
//     }
//     else if (event.target.id === "level2") {
//         updatedArray = copyMainArray.slice(0, 10)
//         restart(currentMode)
//     }
//     else if (event.target.id === "level3") {
//         updatedArray = copyMainArray;
//         restart(currentMode)
//     }

// }

function handleLevel(event) {
    let copyMainArray = mainArray;

    if (event.target.id === "level1") {
        updatedArray = copyMainArray.slice(0, 5);
    } else if (event.target.id === "level2") {
        updatedArray = copyMainArray.slice(0, 10);
    } else if (event.target.id === "level3") {
        updatedArray = copyMainArray;
    }

    restart(currentMode);
}


function flipBack(arr) {
    const first = arr.pop();
    const second = arr.pop();

    setTimeout(() => {
        first.style.transform = "rotateY(0deg)";
        second.style.transform = "rotateY(0deg)";
        first.childNodes[1].src = backImg;
        second.childNodes[1].src = backImg;
    }, 500);

}


function restart1Player() {
    const boardElement = document.getElementsByClassName("board")[0];
    boardElement.innerHTML = ""
    rightArr = [];

    currentMode = 1
    if (currentMode === 1) {
        updatedArray = copyMainArray.slice(0, 5);
    } else {
        updatedArray = copyMainArray.slice(0, 10);
    }
    // timerInterval = setInterval(timer(), 1000);
    init()
    resetLosses()
}


// function restart1Player() {
//     const boardElement = document.getElementsByClassName("board")[0];
//     boardElement.innerHTML = "";
//     rightArr = [];

//     currentMode = 1;
//     if (currentMode === 1) {
//         updatedArray = copyMainArray.slice(0, 5).map(item => ({ ...item }));
//     } else {
//         updatedArray = copyMainArray.slice(0, 10).map(item => ({ ...item }));
//     }

//     init();
//     resetLosses();
// }



function resetLosses() {
    const lossesDisplay = document.getElementsByClassName('lossesDisplay')[0];
    lossesDisplay.innerText = `Losses: ${0}`;
}

function updateLossesDisplay() {
    const lossesDisplay = document.getElementsByClassName('lossesDisplay')[0];
    lossesDisplay.innerText = `Losses: ${losses}`;
}


init();

function handle2Players() {
    init2Players()
}


// const startMinutes = 3;
// let time = startMinutes * 60;
// const countDown = document.querySelector('.countDown')

// function timer() {
//     const minutes = Math.floor(time / 60);
//     let seconds = time % 60;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
//     countDown.innerText = `${minutes}:${seconds}`
//     time--
//     if (time < 0) {
//         clearInterval(timerInterval);
//         countDown.innerText = "Time's up!";
//     }
// }

let player1Pairs = 0;
let player2Pairs = 0;
let currentPlayer = 1;

function init2Players() {
    currentMode = 2
    let lossesDisplay = document.getElementsByClassName("lossesDisplay")[0];
    lossesDisplay.style.display = "none";

    // document.getElementById("gameOver").style.display = "none"; // Add this line

    const boardElement = document.getElementsByClassName("board")[0];
    const shuffled = shuffle(updatedArray.concat(updatedArray));

    let count = 0;
    let arr = [];
    let rightArr = [];

    shuffled.forEach((cardValue, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = `${cardValue.name}-${index}`
        cardElement.innerText = cardValue.name
        const img = document.createElement('img')
        img.src = backImg
        cardElement.appendChild(img)
        boardElement.appendChild(cardElement);

        let playerScore = document.getElementsByClassName("playerScore")[0];
        playerScore.style.display = "block";

        document.getElementsByClassName('p1')[0].style.backgroundColor = '#4D727E';
        document.getElementsByClassName('p2')[0].style.backgroundColor = '';

        cardElement.onclick = () => {

            if (count < 2) {

                if (count === 0) {
                    img.src = cardValue.src;
                    cardElement.style.transform = "rotateY(180deg)";
                    arr.push(cardElement);
                    count++;
                } else {
                    if (cardElement.id === arr[arr.length - 1].id) {
                        return;
                    }

                    img.src = cardValue.src;
                    cardElement.style.transform = "rotateY(180deg)";
                    arr.push(cardElement);
                    count++;

                    if (count === 2) {
                        setTimeout(() => {
                            if (arr[arr.length - 1].innerText == arr[arr.length - 2].innerText) {
                                arr[arr.length - 1].style.border = "3px solid  #FBA1A1";
                                arr[arr.length - 2].style.border = "3px solid #FBA1A1";

                                updateScore();

                                rightArr.push(arr[arr.length - 2])
                                rightArr.push(arr[arr.length - 1])


                                if (rightArr.length === shuffled.length) {
                                    checkIfEnd()
                                    // document.getElementById("gameOver").style.display = "block";

                                }

                                // if (rightArr.length == shuffled.length) {
                                //     // checkIfEnd()
                                //     document.getElementById("gameOver").style.display = "block";

                                //     // document.getElementById("gameOver").style.display = "block";

                                // }
                                count = 0;

                                switchHighlight()
                            }


                            else {
                                flipBack2Players(arr);
                                count = 0;
                                switchHighlight()

                            }


                        }, 300);
                    }
                }

            }

        };
    });
}


function flipBack2Players(arr) {

    const first = arr.pop();
    const second = arr.pop();

    setTimeout(() => {
        first.style.transform = "rotateY(0deg)";
        second.style.transform = "rotateY(0deg)";
        first.childNodes[1].src = backImg;
        second.childNodes[1].src = backImg;
    }, 500);

}
function checkIfEnd() {
    let result = '';

    if (player1Pairs > player2Pairs) {
        result = 'Player 1 won!';
    } else if (player1Pairs < player2Pairs) {
        result = 'Player 2 won!';
    } else {
        result = 'It\'s a tie!';
    }

    alert(result)

    // document.getElementById("gameOver").innerText = result;
    // document.getElementById("gameOver").style.display = "block";
    document.getElementById("gameOver").style.display = "block";
}


function updateScore() {
    if (currentPlayer == 1) {
        player1Pairs++
        document.getElementsByClassName('player1')[0].textContent = 'score: ' + player1Pairs
    } else {
        player2Pairs++
        document.getElementsByClassName('player2')[0].textContent = 'score: ' + player2Pairs
    }
    // checkIfEnd()
}

function switchHighlight() {
    setTimeout(() => {
        if (currentPlayer == 1) {
            document.getElementsByClassName('p1')[0].style.backgroundColor = ''; // or null
            document.getElementsByClassName('p2')[0].style.backgroundColor = '#4D727E';
            currentPlayer = 2
        }
        else {
            document.getElementsByClassName('p2')[0].style.backgroundColor = ''; // or null
            document.getElementsByClassName('p1')[0].style.backgroundColor = '#4D727E';
            currentPlayer = 1
        }
    }, 600)
}

function restart2Players() {
    player1Pairs = 0;
    player2Pairs = 0;
    rightArr = [];
    document.getElementsByClassName('player1')[0].textContent = 'score: 0';
    document.getElementsByClassName('player2')[0].textContent = 'score: 0';
    const boardElement = document.getElementsByClassName("board")[0];
    boardElement.innerHTML = ""
    init2Players()
    // timerInterval = setInterval(timer(), 1000);
}

function restart(players) {
    const boardElement = document.getElementsByClassName("board")[0];
    boardElement.innerHTML = "";

    if (players === 2) {
        restart2Players();
        currentMode = 2
    } else {
        restart1Player()
        init();
        resetLosses();
        window.location.reload();
        currentMode = 1

    }

}

function handleRestart() {
    restart(currentMode);
}
