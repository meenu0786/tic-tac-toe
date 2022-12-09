var prompt = require('prompt');
prompt.start();
//--------------some variables initialize---------------------------------------//
let player = 'ai';
let player1;
let player2;
let area = [];
let pattern;
let playGround;
let repeat = false

const func = () => {
  prompt.get(['symbol1', 'symbol2', 'pattern'], (err, res) => {
    player1 = res.symbol1;
    player2 = res.symbol2;
    pattern = res.pattern
    playGround = setupBoard(pattern)
    mainFunc();
  })
}
//----------------pattern setting defination-----------------------------------// 
const setupBoard = (pattern) => {
  for (let i = 0; i < pattern; i++) {
    area.push([])
    for (let j = 0; j < pattern; j++) {
      area[i].push(null);
    }
  }
  return area
}
//---------------- main function defination-----------------------------------//

const mainFunc = (coordinates) => {
  if (player !== "ai") {
    if (playGround[coordinates[0]][coordinates[1]]) {
      console.log("position not vacant: please try again");
      repeat = true
    }
  }
  switch (player) {
    case "ai":
      let randomCoordinate = aiController()
      playGround[randomCoordinate[0]][randomCoordinate[1]] = "ai";
      console.log(playGround);
      var isTie = checkTie();
      if (isTie) {
        console.log("match tie")
        return
      }
      var { isWin, finalWin } = checkWin(player);
      if (isWin) {
        console.log(finalWin + ": winner winner")
        return
      }
      player = "user1";
      break;
    case "user1":
      { !repeat ? (playGround[coordinates[0]][coordinates[1]] = player1) : "" };
      console.log(playGround);
      var isTie = checkTie();
      if (isTie) {
        console.log("match tie")
        return
      }
      var { isWin, finalWin } = checkWin(player);
      if (isWin) {
        console.log(finalWin + ": winner winner")
        return
      }
      { !repeat && (player = "user2") };
      repeat = false
      break;
    case "user2":
      { !repeat ? playGround[coordinates[0]][coordinates[1]] = player2 : '' };
      console.log(playGround);
      var isTie = checkTie();
      if (isTie) {
        console.log("match tie")
        return
      }
      var { isWin, finalWin } = checkWin(player);
      if (isWin) {
        console.log(finalWin + ": winner winner")
        return
      }
      { !repeat && (player = "ai") };
      repeat = false
      break;
    default: playGround = playGround;
  }
  console.log(`this is ${player} turn`)
  if (player === "ai") {
    mainFunc();
  } else {
    prompt.get(['coordinate1', 'coordinate2'], (error, result) => {
      mainFunc([result.coordinate1, result.coordinate2])
    })
  }
}
//--------------------check win condition----------------------------------------------//

const checkWin = (user) => {
  const isRow = checkRow(user);
  const isDiagonal = checkDiagonal();
  const isReverseDiagonal = checkReverseDiagonal();
  if (isRow || isReverseDiagonal || isDiagonal) {
    let obj = {
      isWin: true,
      finalWin: user
    }
    return obj
  }
  obj = {
    isWin: false,
    finalWin: user
  }
  return obj
}

const checkRow = () => {
  for (let i = 0; i < playGround.length; i++) {
    if (playGround[i].every((el) => el === playGround[i][0] && el)) {
      return true
    }
    let start_col_val = playGround[0][i];
    let count = 1;
    for (let j = 1; j < playGround.length; j++) {
      if (start_col_val === playGround[j][i] && start_col_val) {
        count++;
      }
    }
    if (count === playGround.length) {
      return true;
    }
  }
  return false
}

const checkDiagonal = () => {
  let count = 1;
  let corner = playGround[0][0];
  for (let i = 1; i < playGround.length - 1; i++) {
    if (playGround[i][i] === corner && corner) {
      count++
    }
  }
  if (count === playGround.length) {
    return true
  }
  return false
}

const checkReverseDiagonal = () => {
  let rev_i = 0;
  let rev_j = playGround.length - 1;
  let rev_val = playGround[rev_i][rev_j];

  while (rev_i < playGround.length) {
    if (!playGround[rev_i][rev_j]) {
      break;
    }
    if (rev_val !== playGround[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  if (rev_i === playGround.length) {
    return true;
  }
  return false
}

//--------------------- CHECK TIE CONDITION ------------------------------------------//

const checkTie = () => {
  let count = 0
  for (let i = 0; i < playGround.length; i++) {
    for (let j = 0; j < playGround.length; j++) {
      if (playGround[i][j] === null) {
        count++;
      }
    }
  }
  if (count == 0) {
    return true
  } else {
    return false
  }
}

//------------------------------------------------------------------------------------//


const aiController = () => {
  let randomCoordinate;
  do {
    randomCoordinate = [[Math.floor(Math.random() * pattern)], [Math.floor(Math.random() * pattern)]];
  } while (playGround[randomCoordinate[0]][randomCoordinate[1]])
  return randomCoordinate;
}

//------------------------------------------------------------------------------------//

//-------main defination calling------------------------------------------------------//
func();
//-------main defination calling-----------------------------------------------------//