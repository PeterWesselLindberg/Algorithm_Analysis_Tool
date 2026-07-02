import type { AlgorithmInput } from "../types/algorithmtypes";

/** Generates a random number array of a given*/
const generateRandomArray = (
    length: number = 10, // Length of the array
    min: number = 1, // Min value of the array
    max: number = 30 // Max value of the array
) : AlgorithmInput => {
    return {type: "array", data: Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min)}
}

/** Generates a random number array of a given length and generates a target value*/
export const generateRandomArrayWithTarget = (
    length: number = 10, // Length of the array
    min: number = 1, // Min value of the array
    max: number = 30, // Max value of the array
    targetExists: boolean = true, // Set to true if the target has to exist in the array
    allowDuplicates: boolean = false // Set to true if duplicates are allowed
) : AlgorithmInput => {

    if (!allowDuplicates && length > (max - min + 1)) {
        throw new Error("Range too small for unique values")
    }
    
    let target = Math.floor(Math.random() * (max - min + 1)) + min

    const data: number[] = []
    const used = new Set<number>()

    while (data.length < length) {

        const value = Math.floor(Math.random() * (max - min + 1)) + min

        if (!allowDuplicates && used.has(value)) {
          continue
        }

        data.push(value)
        used.add(value)
    }

    // Ensure target exists in the array if target exits is se to true
    if (targetExists && !data.includes(target)) {

        const randomIndex = Math.floor(Math.random() * length)

        // Removes replaced value from used set if allwos duplicates is set to true
        if (!allowDuplicates) {used.delete(data[randomIndex])}

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