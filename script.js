var CURRENT_PLAYER = 0;
var MOVES = 0;
const sign = ["X", "O"];
const boxes = document.querySelectorAll(".board>div");
const board = document.querySelector(".board");
const win = document.querySelector(".win");
const winner = document.querySelector(".winner");
let players = [[], []];

function switch_player() {
  CURRENT_PLAYER = CURRENT_PLAYER === 0 ? 1 : 0;
}

function checkWin(c) {
  function checkPos(p, poss) {
    for (const i of poss) {
      if (!p.includes(i)) {
        return false;
      }
    }
    return true;
  }
  const Wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const player = players[c];
  for (const i of Wins) {
    if (checkPos(player, i)) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  boxes.forEach((box) => {
    box.removeEventListener("click", move);
  });
  setTimeout(() => {
    MOVES = 0;
    players = [[], []];
    board.style.display = "none";
    win.style.display = "flex";
  }, 500);
}

function move(e) {
  box = e.target;
  if (box.innerText === "") {
    box.innerText = sign[CURRENT_PLAYER];
    pos = box.getAttribute("pos");
    players[CURRENT_PLAYER].push(parseInt(pos));
    MOVES++;
    if (checkWin(CURRENT_PLAYER)) {
      winner.innerText = `${sign[CURRENT_PLAYER]} Won!!!`;
      gameOver();
    }
    switch_player();
    if (MOVES >= 9) {
      if (winner.innerText === "") {
        winner.innerText = `Draw`;
      }
      gameOver();
    }
  }
}

function start() {
  if (board.style.display === "none") {
    board.style.display = "grid";
    win.style.display = "none";
    winner.innerText = "";
  }
  boxes.forEach((box) => {
    box.innerText = "";
    box.addEventListener("click", move);
  });
}

start();
