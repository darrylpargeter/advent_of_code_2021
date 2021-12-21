const testTargetArea = 'x=20..30, y=-10..-5';

function formatTargetArea(targetArea) {
  const [x, y] = targetArea
    .replace('x=', '')
    .replace('y=', '')
    .split(', ')
    .map(val => {
      return val
        .split('..')
        .map(v => parseInt(v))
        .sort();
    });

  return { x, y };
}

function updateCoordsFromVelocity(coords, velocity) {
  return {
    x: coords.x + velocity.x,
    y: coords.y + velocity.y,
  }
};

function updateXVelocity(x) {
  if (x > 0) {
    return x - 1;
  }

  if (x < 0) {
    return x + 1;
  }

  return x;
}

function updateVelocity(velocity) {
  const newX = updateXVelocity(velocity.x);
  return {
    y: velocity.y - 1,
    x: newX,
  }
}

// will need to keep a list of all coords
function workoutVelocity(velocity, coords, targetArea, coordsList = []) {
  if (velocity.x === 0) {
    const beforeTargetX = coords.x < targetArea.x[0];
    const afterTargetX = coords.x > targetArea.x[1];

    const isInRangeX = !beforeTargetX && !afterTargetX;

    if (isInRangeX) {
      const afterYTarget = coords.y < targetArea.y[1];
      const beforeYTarget = coords.y > targetArea.y[0];
      // console.log({ velocity, coords, coordsList });
      console.log({ afterYTarget, beforeYTarget });
      if (!beforeYTarget && !afterYTarget) return coordsList;
    }
  }

  const updatedCoords = updateCoordsFromVelocity(coords, velocity);
  const updatedVelocity = updateVelocity(velocity);

  return workoutVelocity(updatedVelocity, updatedCoords, targetArea, [...coordsList, updatedCoords]);
}

function main() {
  const targetArea = formatTargetArea(testTargetArea);
  const coords = workoutVelocity({ x: 6, y: 9 }, { x: 0, y: 0 }, targetArea);
  console.log(coords);
}

main();
