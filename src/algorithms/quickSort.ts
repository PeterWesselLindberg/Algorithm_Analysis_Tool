import type { AlgorithmInput } from "../types/algorithmtypes";
import type { VisualizationStep } from "../types/VisualizationStep";
import { pushStep } from "../utils/pushStep";
import toId from "../utils/toId";

/** Helper function for quicksort to partition the list */
const partition = (arr: number[], low : number, high : number, steps: VisualizationStep[], sortedIds: string[]) : number => {

    const pivotId = toId(high);
    let pivotValue = arr[high];

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {

        // Comparison with pivot
        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(j)],
            compareIds: [pivotId],
            sortedIds: [...sortedIds]
        });

        if (arr[j] < pivotValue) {
            i++;
            swap(arr, i, j);

            // Record swap
            pushStep(steps, {
                linear: { values: [...arr] },
                activeIds: [toId(i)],
                compareIds: [toId(j)],
                sortedIds: [...sortedIds]
            });
        }
    }

    // Place pivot
    swap(arr, i + 1, high);

    pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [toId(i + 1)],
        compareIds: [pivotId],
        sortedIds: [...sortedIds]
    });

    return i + 1;
}

/** Helper function for swapping */
const swap = (inputArr : number[], i : number, j : number) : void => {
    let temp = inputArr[i];
    inputArr[i] = inputArr[j];
    inputArr[j] = temp;
}


/** Helper function for tracing */
const quickSortRecursive = (
    arr: number[],
    low: number,
    high: number,
    steps: VisualizationStep[],
    sortedIds: string[]
) => {

    if (low < high) {

        const pIndex = partition(arr, low, high, steps, sortedIds);

            // Pivot now sorted
             sortedIds.push(toId(pIndex));

            // Record sorted pivot
            pushStep(steps, {
                linear: { values: [...arr] },
                sortedIds: [...sortedIds]
            });

        
        quickSortRecursive(arr, low, pIndex - 1, steps, sortedIds);
        quickSortRecursive(arr, pIndex + 1, high, steps, sortedIds);
    }
};


const quickSort = (input : AlgorithmInput, low : number = 0, high : number = 0) : VisualizationStep[] => {

    // Quick sort only supports arrays
    if (input.type !== "array") {
        return []
    }
    
    const inputArr = input.data
    const arr = [...inputArr];
    const steps: VisualizationStep[] = [];
    const n: number = arr.length;
    const sortedIds: string[] = [];
    
    let localHigh = high > 0 ? high : n - 1;

    quickSortRecursive(arr, low, localHigh, steps, sortedIds);

    // Final step
    pushStep(steps, {
        linear: { values: [...arr] },
        sortedIds: Array.from({ length: arr.length }, (_, i) => i.toString())
    });

    return steps
}

export default quickSort