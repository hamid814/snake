const boardElem = document.querySelector('#board');

const boardSize = 10;

const u = 'up';
const d = 'down';
const r = 'right';
const l = 'left';

let length = 4;
let direction = r;
let time = 200; // ms

let loop;

let state = 'begin';

const snake = [
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
];

let apple = [];

const createBlockElem = (x, y) => {
  const block = document.createElement('div');
  block.className = 'block';
  block.id = 'b-' + x + y;
  boardElem.appendChild(block);
};

const createBoard = () => {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      createBlockElem(x, y);
    }
  }
};

const getBlock = (x, y) => {
  const block = document.querySelector(`#b-${x}${y}`);

  return block;
};

const displaySnake = () => {
  document.querySelectorAll('.block').forEach((b) => {
    b.classList.remove('snake');
    b.classList.remove('head');
  });

  snake.forEach((block, i) => {
    const boardBlock = getBlock(block[0], block[1]);
    boardBlock.classList.add('snake');
    if (i === snake.length - 1) {
      boardBlock.classList.add('head');
    }
  });
};

const startLoop = () => {
  setState('playing');
  loop = setInterval(moveSnake, time);
};

const placeApple = () => {
  document.querySelectorAll('.block').forEach((b) => {
    b.classList.remove('apple');
  });

  // get array of empty blocks
  let allBlocks = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      allBlocks.push([x, y]);
    }
  }

  allBlocks = allBlocks.filter((b) => {
    let isIn = false;
    snake.forEach((sb) => {
      if (b[0] === sb[0] && b[1] === sb[1]) {
        isIn = true;
      }
    });
    return !isIn;
  });

  const appleCoor = allBlocks[Math.floor(Math.random() * allBlocks.length)];
  apple = appleCoor;

  const ab = getBlock(appleCoor[0], appleCoor[1]);

  ab.classList.add('apple');
};

const startGame = () => {
  createBoard();
  displaySnake();
  startLoop();
  placeApple();
};

const setDirection = (d) => {
  direction = d;
};

const getNextBlockCoor = (coor) => {
  if (direction === r) {
    if (coor[1] === 9) {
      loseGame();
    } else {
      return [coor[0], coor[1] + 1];
    }
  } else if (direction === u) {
    if (coor[0] === 0) {
      loseGame();
    } else {
      return [coor[0] - 1, coor[1]];
    }
  } else if (direction === d) {
    if (coor[0] === 9) {
      loseGame();
    } else {
      return [coor[0] + 1, coor[1]];
    }
  } else if (direction === l) {
    if (coor[1] === 0) {
      loseGame();
    } else {
      return [coor[0], coor[1] - 1];
    }
  }
};

const setState = (s) => {
  state = s;
};

const loseGame = () => {
  setState('lost');
  console.log('lose');
  clearInterval(loop);
};

const eatApple = () => {
  const newBlock = snake[0];
  placeApple();
  setTimeout(() => {
    snake.unshift(newBlock);
  }, time + 5);
};

const moveSnake = () => {
  snake.forEach((sb, i) => {
    if (snake[i + 1]) {
      // not head
      snake[i] = snake[i + 1];
    } else {
      // head
      const nextBlockCoor = getNextBlockCoor(sb);
      // check if snake ate himself
      if (apple[0] === nextBlockCoor[0] && apple[1] === nextBlockCoor[1]) {
        eatApple();
      }
      let ateHimself = false;
      snake.forEach((b) => {
        if (b[0] === nextBlockCoor[0] && b[1] === nextBlockCoor[1]) {
          ateHimself = true;
        }
      });
      if (ateHimself) {
        loseGame();
      } else {
        snake[i] = nextBlockCoor;
      }
    }
  });

  if (state === 'playing') {
    displaySnake();
  }
};

const onKeyUp = (e) => {
  if (e.keyCode === 38) {
    setDirection(u);
  } else if (e.keyCode === 40) {
    setDirection(d);
  } else if (e.keyCode === 39) {
    setDirection(r);
  } else if (e.keyCode === 37) {
    setDirection(l);
  }

  console.log(e.keyCode);
};

document.addEventListener('keyup', onKeyUp);

startGame();
