const generateRandomArray = (length: number = 10, min: number = 1, max: number = 30) => {
  return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export default generateRandomArray