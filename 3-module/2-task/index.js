function filterRange(arr, a, b) {
  return arr.filter(num => num >= Math.min(a, b) && num <= Math.max(a, b));
}
