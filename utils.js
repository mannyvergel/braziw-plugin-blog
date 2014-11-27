
exports.trim = function trim(s) {
  if (!s) {
    return "";
  }

  return s.trim();
}

exports.isEmpty = function isEmpty(s) {
  if (!s) {
    return true;
  }

  return s.trim().length;
}

exports.getYear = function getYear() {
  return new Date().getFullYear();
}