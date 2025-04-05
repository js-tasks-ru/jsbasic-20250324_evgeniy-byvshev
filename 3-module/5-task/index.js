function getMinMax(str) {
  const elements = str.split(" ");

  const numbers = elements
    .map((element) => parseFloat(element))
    .filter((num) => !isNaN(num));

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { min, max };
}
