import type { AlgorithmInput } from "../types/algorithmtypes";

const generateRandomArray = (length: number = 10, min: number = 1, max: number = 30) : AlgorithmInput => {
  //return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min)
  return {type: "array", data: Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min)}
}

// const generateRandomArrayCore = (length: number = 10, min: number = 1, max: number = 30) => {
//   return ;
// }

export default generateRandomArray