function* slidingWindow(array = [], startIdx = 0, windowSize = 1, skip = 1) {
  if (array.length < 2) return 0;
  const n = array.length - 1;

  for (let i = startIdx; i < n; i += skip) {
    const endIdx = i + windowSize;
    yield array.slice(i, endIdx);
  }

  return;
}

module.exports = slidingWindow;
