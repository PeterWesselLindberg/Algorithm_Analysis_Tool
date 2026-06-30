import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"

const inputId = (i: number) => `input-${i}`
const countId = (i: number) => `count-${i}`
const outputId = (i: number) => `output-${i}`

const getMax = (arr: number[]) => {
    let max = arr[0]

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }

    return max
}

/** Helper function for counting sort of arr[]*/
const countSortByDigit = (
    arr: number[],
    exp: number,
    steps: VisualizationStep[]
) => {

    const n = arr.length
    const output = new Array(n).fill(0)
    const count = new Array(10).fill(0)

    const buildLinears = () => [
        {
            id: "input",
            label: `Working Array (exp=${exp})`,
            values: [...arr]
        },

        {
            id: "count",
            label: "Digit Count",
            values: [...count]
        },

        {
            id: "output",
            label: "Output Array",
            values: [...output]
        }
    ]

    // Count digits
    for (let i = 0; i < n; i++) {

        const digit = Math.floor(arr[i] / exp) % 10

        // Show digit access
        pushStep(steps, {
            linears: buildLinears(),
            activeIds: [inputId(i), countId(digit)]
        })

        count[digit]++

        // Show updated count
        pushStep(steps, {
            linears: buildLinears(),
            sortedIds: [countId(digit)]
        })
    }

    // Prefix sum
    for (let i = 1; i < 10; i++) {

        pushStep(steps, {
            linears: buildLinears(),
            activeIds: [countId(i)],
            compareIds: [countId(i - 1)]
        })

        count[i] += count[i - 1]

        pushStep(steps, {
            linears: buildLinears(),
            sortedIds: [countId(i)]
        })
    }

    // Build output
    for (let i = n - 1; i >= 0; i--) {

        const digit = Math.floor(arr[i] / exp) % 10
        const pos = count[digit] - 1

        // Show target position
        pushStep(steps, {
            linears: buildLinears(),
            activeIds: [inputId(i), countId(digit), outputId(pos)]
        })

        output[pos] = arr[i]
        
        count[digit]--

        // Show inserted value
        pushStep(steps, {
            linears: buildLinears(),
            sortedIds: [outputId(pos)],
            activeIds: [countId(digit)]
        })
    }

    // Copy back
    for (let i = 0; i < n; i++) {

        pushStep(steps, {
            linears: buildLinears(),
            activeIds: [outputId(i), inputId(i)]
        })

        arr[i] = output[i]

        pushStep(steps, {
            linears: buildLinears(),
            sortedIds: [inputId(i)]
        })
    }
}

const radixSort = (input: AlgorithmInput): VisualizationStep[] => {

    // Radix sort only supports arrays
    if (input.type !== "array") {
        return []
    }
  
    const inputArr = input.data
    const arr = [...inputArr]
    const steps: VisualizationStep[] = []
    const maxNumber = getMax(arr)

    // Process each digit
    for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10) {
        countSortByDigit(arr, exp, steps)
    }

    // Final step
    pushStep(steps, {
        linears: [{
            id: "input",
            label: "Sorted Array",
            values: [...arr]
        }],

        sortedIds: Array.from(
            { length: arr.length },
            (_, i) => inputId(i)
        )
    })

    return steps
}

export default radixSort