import type { SortStep } from "../types/SortStep";

const partition = (arr: number[], low : number, high : number, steps: SortStep[], sortedIndices: number[]) : number => {

    let pivot = arr[high];

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {

        //COMPARISON WITH PIVOT
        steps.push({
            array: [...arr],
            activeIndex: high, // pivot
            compareIndex: j,
            sortedIndices: [...sortedIndices]
        });

        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);

            //RECORD SWAP
            steps.push({
                array: [...arr],
                activeIndex: i,
                compareIndex: j,
                sortedIndices: [...sortedIndices]
            });
        }
    }

    // PLACE PIVOT
    swap(arr, i + 1, high);

    steps.push({
        array: [...arr],
        activeIndex: i + 1,
        compareIndex: high,
        sortedIndices: [...sortedIndices]
    });
    return i + 1;
}

const swap = (inputArr : number[], i : number, j : number) : void => {
    let temp = inputArr[i];
    inputArr[i] = inputArr[j];
    inputArr[j] = temp;

}


// Helper function for tracing
const quickSortRecursive = (
    arr: number[],
    low: number,
    high: number,
    steps: SortStep[],
    sortedIndices: number[]
) => {

    if (low < high) {

        const pIndex =
            partition(
                arr,
                low,
                high,
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
            low,
            pIndex - 1,
            steps,
            sortedIndices
        );

        quickSortRecursive(
            arr,
            pIndex + 1,
            high,
            steps,
            sortedIndices
        );
    }
};


const quickSort = (inputArr : number[], low : number = 0, high : number = 0) : SortStep[] => {
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

export default quickSort