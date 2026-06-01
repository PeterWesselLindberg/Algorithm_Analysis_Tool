
import type { AlgorithmInput } from "../types/algorithmtypes";
import type { VisualizationStep } from "../types/VisualizationStep";
import pushStep from "../utils/pushStep";
import toId from "../utils/toId";

/** Helper function for choosing the random pivot for the partition of the array */
const randPartition = (arr: number[], start : number, stop : number, steps: VisualizationStep[], sortedIds: string[]) : number => {
    
    let randPivot = Math.floor(Math.random() * (stop - start + 1)) + start;

    // Show randomly chosen pivot
    pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [toId(randPivot)],
        sortedIds: [...sortedIds]
    });

    [arr[start], arr[randPivot]] = [arr[randPivot], arr[start]];

    // Show pivot after swap
    pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [toId(start)],
        compareIds: [toId(randPivot)],
        sortedIds: [...sortedIds]
    });

    return partition(arr, start, stop, steps, sortedIds);
}

/** Helper function for partioning the array */
const partition = (arr: number[], start : number, stop : number, steps: VisualizationStep[], sortedIds: string[]) : number => {

    const pivotId = toId(start);
    let pivotValue = arr[start];
    let i = start + 1;

    for (let j = start  + 1; j <= stop; j++) {

        // Comparison with pivot
        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [pivotId],
            compareIds: [toId(j)],
            sortedIds: [...sortedIds]
        });

        if (arr[j] < pivotValue) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++;

            // Record swap
            pushStep(steps, {
                linear: { values: [...arr] },
                activeIds: [toId(i)],
                compareIds: [toId(j)],
                sortedIds: [...sortedIds]
            });
        }
    }

    [arr[start], arr[i - 1]] = [arr[i - 1], arr[start]];
    pivotValue = i - 1;

    pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [pivotId],
        compareIds: [toId(stop)],
        sortedIds: [...sortedIds]
    });
    return pivotValue
}

// Helper function for tracing
const quickSortRecursive = (
    arr: number[],
    start: number,
    stop: number,
    steps: VisualizationStep[],
    sortedIds: string[]
) => {

    if (start < stop) {

        const pIndex =
            randPartition(
                arr,
                start,
                stop,
                steps,
                sortedIds
            );

            // Pivot now sorted
            sortedIds.push(toId(pIndex));

            // Record sorted pivot
            pushStep(steps, {
                linear: { values: [...arr] },
                sortedIds: [...sortedIds]
            });

        quickSortRecursive(
            arr,
            start,
            pIndex - 1,
            steps,
            sortedIds
        );

        quickSortRecursive(
            arr,
            pIndex + 1,
            stop,
            steps,
            sortedIds
        );
    }
};


const randQuickSort = (input : AlgorithmInput, low : number = 0, high : number = 0) : VisualizationStep[] => {
    
    // Random quick sort only supports arrays
    if (input.type !== "array") {
        return []
    }

    const inputArr = input.data
    const arr = [...inputArr];
    const steps: VisualizationStep[] = [];
    const n: number = arr.length;
    const sortedIds: string[] = [];
    
    let localHigh = high > 0 ? high : n - 1;

    quickSortRecursive(
        arr,
        low,
        localHigh,
        steps,
        sortedIds
    );

    // Final step
    pushStep(steps, {
        linear: { values: [...arr] },
        sortedIds: Array.from({ length: arr.length }, (_, i) => i.toString())
    });

    return steps
}

export default randQuickSort