const generateRandomArray = (length : number = 10) => {
  return Array.from({length}, () => Math.floor(Math.random() * 30) + 1);
}

export default generateRandomArray