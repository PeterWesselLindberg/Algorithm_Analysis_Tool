import type { AlgorithmInput } from "../types/algorithmtypes";

const generateRandomArray = (length: number = 10, min: number = 1, max: number = 30) : AlgorithmInput => {
  //return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min)
  return {type: "array", data: Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min)}
}

export const generateRandomArrayWithTarget = (length: number = 10, min: number = 1, max: number = 30, targetExists: boolean = true, allowDuplicates: boolean = false) : AlgorithmInput => {
  if (!allowDuplicates && length > (max - min + 1)) {
    throw new Error("Range too small for unique values")
  }
  
  let target =
    Math.floor(Math.random() * (max - min + 1)) + min

  const data: number[] = []
  const used = new Set<number>()

  while (data.length < length) {

    const value =
      Math.floor(Math.random() * (max - min + 1)) + min

    if (!allowDuplicates && used.has(value)) {
      continue
    }

    data.push(value)
    used.add(value)
  }

  // ensure target exists
  if (targetExists && !data.includes(target)) {

    const randomIndex =
      Math.floor(Math.random() * length)

    // remove replaced value from used set
    if (!allowDuplicates) {
      used.delete(data[randomIndex])
    }

    data[randomIndex] = target
    used.add(target)
  }

  return {
    type: "search",
    data,
    target
  }
}

export default generateRandomArray