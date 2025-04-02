function truncate(str, maxlength) {
  return str.length < maxlength ? str : str.substr(0, maxlength - 1) + "…";
}
