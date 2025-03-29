function checkSpam(str) {
  return str.toLowerCase().replaceAll(" ", "") === "1xbetnow" ||
    str.toLowerCase().replaceAll(" ", "") === "freexxxxx"
    ? true
    : false;
}
