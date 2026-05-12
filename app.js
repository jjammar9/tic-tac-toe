const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let board = Array(9).fill(""),
  turn = "X",
  over = false,
  score = { X: 0, O: 0, D: 0 };
const cells = [...document.querySelectorAll(".cell")];
const status = document.getElementById("status");

function render() {
  cells.forEach((c, i) => {
    c.textContent = board[i];
    c.className = "cell" + (board[i] ? " taken" : "");
    if (board[i] === "X") c.classList.add("x");
    if (board[i] === "O") c.classList.add("o");
  });
}

function checkWin() {
  for (let [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      [a, b, c].forEach((i) => cells[i].classList.add("win"));
      return board[a];
    }
  }
  if (board.every(Boolean)) return "D";
  return null;
}

cells.forEach((c) =>
  c.addEventListener("click", () => {
    const i = +c.dataset.i;
    if (over || board[i]) return;
    board[i] = turn;
    render();
    const result = checkWin();
    if (result) {
      over = true;
      if (result === "D") {
        score.D++;
        status.innerHTML = "It's a <span>Draw!</span>";
      } else {
        score[result]++;
        status.innerHTML = `Player <span>${result}</span> wins!`;
      }
      document.getElementById("sx").textContent = score.X;
      document.getElementById("so").textContent = score.O;
      document.getElementById("sd").textContent = score.D;
    } else {
      turn = turn === "X" ? "O" : "X";
      status.innerHTML = `Player <span>${turn}</span>'s turn`;
    }
  }),
);

document.getElementById("reset").addEventListener("click", () => {
  board = Array(9).fill("");
  turn = "X";
  over = false;
  render();
  status.innerHTML = `Player <span>X</span>'s turn`;
});
