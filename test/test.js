const number = function (busStops) {
  let result = 0;
  for (let i = 0; i < busStops.length; i++) {
    result += busStops[i][0] - busStops[i][1];
  }
  return result;
};

console.log(
  number([
    [10, 0],
    [5, 8],
    [3, 5],
  ])
);
