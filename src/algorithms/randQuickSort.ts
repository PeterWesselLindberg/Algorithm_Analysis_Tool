
import type { SortStep } from "../types/SortStep";

const randPartition = (arr: number[], start : number, stop : number, steps: SortStep[], sortedIndices: number[]) : number => {
    
    let randpivot = Math.floor(Math.random() * (stop - start + 1)) + start;

    [arr[start], arr[randpivot]] = [arr[randpivot], arr[start]];
    return partition(arr, start, stop, steps, sortedIndices);
}

const partition = (arr: number[], start : number, stop : number, steps: SortStep[], sortedIndices: number[]) : number => {

    let pivot = start

    let i = start + 1;

    for (let j = start  + 1; j <= stop; j++) {

        //COMPARISON WITH PIVOT
        steps.push({
            array: [...arr],
            activeIndex: pivot, // pivot
            compareIndex: j,
            sortedIndices: [...sortedIndices]
        });

        if (arr[j] < arr[pivot]) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++;

            //RECORD SWAP
            steps.push({
                array: [...arr],
                activeIndex: i,
                compareIndex: j,
                sortedIndices: [...sortedIndices]
            });
        }
    }
    [arr[pivot], arr[i - 1]] = [arr[i - 1], arr[pivot]];
    pivot = i - 1;
    steps.push({
        array: [...arr],
        activeIndex: pivot,
        compareIndex: stop,
        sortedIndices: [...sortedIndices]
    });
    return pivot
}

// Helper function for tracing
const quickSortRecursive = (
    arr: number[],
    start: number,
    stop: number,
    steps: SortStep[],
    sortedIndices: number[]
) => {

    if (start < stop) {

        const pIndex =
            randPartition(
                arr,
                start,
                stop,
                steps,
                sortedIndices
            );

            //PIVOT NOW SORTED
            sortedIndices.push(pIndex);

            // RECORD SORTED PIVOT
            steps.push({
            array: [...arr],
            sortedIndices: [...sortedIndices]
            });

        quickSortRecursive(
            arr,
            start,
            pIndex - 1,
            steps,
            sortedIndices
        );

        quickSortRecursive(
            arr,
            pIndex + 1,
            stop,
            steps,
            sortedIndices
        );
    }
};


const randQuickSort = (inputArr : number[], low : number = 0, high : number = 0) : SortStep[] => {
    const arr = [...inputArr];
    const steps: SortStep[] = [];
    const n: number = arr.length;
    const sortedIndices: number[] = [];
    
    let localHigh = high > 0 ? high : n - 1;

    quickSortRecursive(
        arr,
        low,
        localHigh,
        steps,
        sortedIndices
    );

    // FINAL ALL-SORTED STEP
    steps.push({
        array: [...arr],
        sortedIndices:
            Array.from(
                { length: n },
                (_, i) => i
            )
    });

    return steps
}

export default randQuickSort