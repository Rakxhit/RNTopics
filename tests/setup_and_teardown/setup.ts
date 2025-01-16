const addToArr = (array: Array<string> | null, item: string) => {
  array?.push(item);
  return array;
};

const removeFromArray = (array: Array<string>, item: string) => {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};

const arrayContains = (array: Array<string>, item: string) => {
  return array.includes(item);
};

export { addToArr, removeFromArray, arrayContains };
