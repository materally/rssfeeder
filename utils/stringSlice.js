function stringSlice(text, charCount = 10) {
  if (text.length <= charCount) return text;

  return `${text.slice(0, charCount)}...`;
}

exports.stringSlice = stringSlice;
