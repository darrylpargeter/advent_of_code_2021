function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

function getDieRole() {
  let roleNumber = 0;
  const temp = [100, [...new Array(99)].map((v, i) => i + 1)].flat();

  return () => {
    const output = {
      roleNumber: 0,
      roles: [],
      movment: 0,
    }

    for (let i = 0; i < 3; i += 1) {
      const newRole = temp[roleNumber % temp.length];
      output.roles.push(newRole + 1);
      roleNumber += 1;
    }
  
    output.roleNumber = roleNumber;
    output.movment = sum(output.roles);
    
    return output;
  }
}

function getPositionOnBoard(position) {
  const positions = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return positions[position % positions.length];
}

function updatePlayer(player, roleDie) {
  const newPlayerState = {...player};
  const player1Movement = roleDie();
  const player1Steps = player.currerntPosition + player1Movement.movment;
  const player1NewPos = getPositionOnBoard(player1Steps);

  newPlayerState.currerntPosition = player1NewPos;
  newPlayerState.score = player.score + player1NewPos;

  return newPlayerState;
}

function takeTurns(state, roleDie) {
  const copy = {...state};
  copy.player1 = updatePlayer(state.player1, roleDie);
  copy.totalDieRole = copy.totalDieRole + 3;

  if (copy.player1.score >= 1000) {
    return copy;
  }

  copy.player2 = updatePlayer(state.player2, roleDie);
  copy.totalDieRole = copy.totalDieRole + 3;

  if (copy.player2.score >= 1000) {
    return copy;
  }

  return takeTurns(copy, roleDie);
}

function getLowestScore(state) {
  const p1Score = state.player1.score;
  const p2Score = state.player2.score;

  return p1Score > p2Score ? p2Score : p1Score;
}

function main() {
  const roleDie = getDieRole();
  const state = {
    totalDieRole: 0,
    player1: {
      currerntPosition: 10,
      score: 0,
    },
    player2: {
      currerntPosition: 1,
      score: 0,
    },
  }

  const lastState = takeTurns(state, roleDie);
  const lowestScore = getLowestScore(lastState);
  console.log(`output: ${lowestScore * lastState.totalDieRole}`);
}

main();
