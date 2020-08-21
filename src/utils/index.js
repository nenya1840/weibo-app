export const uniq = (array) => {
  const map = {};
  const result = [];
  array.forEach((item) => {
    const { id } = item;
    if (!map[id]) {
      map[id] = 1;
      result.push(item);
    }
  });
  return result;
}