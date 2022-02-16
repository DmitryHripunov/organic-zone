const createRandomNumber = (min, max) => {
  const range = Math.abs(max - min);
  const num = Math.random() * range;
  const minNum = Math.min(max, min);

  if ((num + Math.abs(minNum)) % 2 < 1) {
    return createRandomNumber(min, max);
  }

  const oddNum = Math.abs(Math.floor(num + minNum));

  return oddNum;
};

export default createRandomNumber;
