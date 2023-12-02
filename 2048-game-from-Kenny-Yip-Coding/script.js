let board;
let score = 0;
const rows = 4;
const columns = 4;

window.onload = () => {
  setGame();
};

const setGame = () => {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // board = [
  //   [2, 2, 2, 2],
  //   [2, 2, 2, 2],
  //   [4, 4, 8, 8],
  //   [4, 4, 8, 8],
  // ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = `${r}-${c}`;
      let num = board[r][c];

      updateTile(tile, num);

      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
};

const setTwo = () => {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] === 0) {
      board[r][c] = 2;
      let tile = document.getElementById(`${r}-${c}`);
      tile.innerText = "2";
      tile.classList.add("tile-2");
      found = true;
    }
  }
};

const hasEmptyTile = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        return true;
      }
    }
  }
  return false;
};

const updateTile = (tile, num) => {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    num <= 4096
      ? tile.classList.add(`tile-${num}`)
      : tile.classList.add("tile-8192");
  }
};

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (event.code === "ArrowRight") {
    slideRight();
    setTwo();
  } else if (event.code === "ArrowUp") {
    slideUp();
    setTwo();
  } else if (event.code === "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

const slideLeft = () => {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
};

const slideRight = () => {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
};

const slideUp = () => {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
};

const slideDown = () => {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
};

const slide = (row) => {
  row = filterZero(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row);

  while (row.length < columns) {
    row.push(0);
  }

  return row;
};

const filterZero = (row) => {
  return row.filter((num) => num != 0);
};
