const arr = [
  [3, 4],
  [3, 3],
  [3, 2],
  [3, 1],
  [3, 0],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
];

const tf = [4, 0];

const has = () => {
  let s = false;

  arr.forEach((a) => {
    if (a[0] === tf[0] && a[1] === tf[1]) {
      s = true;
    }
  });

  return s;
};

console.log(has());
