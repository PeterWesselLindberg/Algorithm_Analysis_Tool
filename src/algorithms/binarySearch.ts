import type { AlgorithmFunction  } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"

const binarySearch: AlgorithmFunction = (input) => {

    if (input.type !== "search") return []

    const steps: VisualizationStep[] = []

    const values = [...input.data].sort((a, b) => a - b)
    const target = input.target

    let left = 0
    let right = values.length - 1

    while (left <= right) {

        const mid = Math.floor((left + right) / 2)

        pushStep(steps, {
            linear: {values},
            activeIds: [mid.toString()],

            compareIds: Array.from(
                { length: right - left + 1 },
                (_, i) => (left + i).toString()
            ),

            target,
            message: `Checking ${values[mid]}`
        })

        // Found target
        if (values[mid] === target) {

            pushStep(steps, {
                linear: {values},
                activeIds: [mid.toString()],
                sortedIds: [mid.toString()],
                target,
                message: `Found ${target}`
            })

            return steps
        }

        // Search right if target is larger than the current mid value
        if (values[mid] < target) {

            pushStep(steps, {
                linear: {values},
                activeIds: [mid.toString()],

                compareIds: Array.from(
                    { length: right - mid },
                    (_, i) => (mid + 1 + i).toString()
                ),

                target,
                message: `${target} is larger than ${values[mid]} → search right half`
            })

            left = mid + 1
        }

        // Search left if target is less than the current mid value
        else {
            pushStep(steps, {
                linear: {values},
                activeIds: [mid.toString()],

                compareIds: Array.from(
                    { length: mid - left },
                    (_, i) => (left + i).toString()
                ),

                target,
                message: `${target} is smaller than ${values[mid]} → search left half`
            })

            right = mid - 1
        }
    }

    pushStep(steps, {
        linear: {values},
        target,
        message: `${target} not found`
    })

    return steps
}

export default binarySearch