import type { VisualizationStep } from "../types/VisualizationStep";
import pushStep from "../utils/pushStep";
import toId from "../utils/toId";

const partition = (arr: number[], low : number, high : number, steps: VisualizationStep[], sortedIds: string[]) : number => {

    const pivotId = toId(high);
    let pivotValue = arr[high];

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {

        //COMPARISON WITH PIVOT
        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(j)],
            compareIds: [pivotId],
            sortedIds: [...sortedIds]
        });

        if (arr[j] < pivotValue) {
            i++;
            swap(arr, i, j);

            //RECORD SWAP
            pushStep(steps, {
                linear: { values: [...arr] },
                activeIds: [toId(i)],
                compareIds: [toId(j)],
                sortedIds: [...sortedIds]
            });
        }
    }

    // PLACE PIVOT
    swap(arr, i + 1, high);

    pushStep(steps, {
        linear: { values: [...arr] },
        activeIds: [toId(i + 1)],
        compareIds: [pivotId],
        sortedIds: [...sortedIds]
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
    steps: VisualizationStep[],
    sortedIds: string[]
) => {

    if (low < high) {

        const pIndex = partition(arr, low, high, steps, sortedIds);

            //PIVOT NOW SORTED
             sortedIds.push(toId(pIndex));

            // RECORD SORTED PIVOT
            pushStep(steps, {
                linear: { values: [...arr] },
                sortedIds: [...sortedIds]
            });

        
        quickSortRecursive(arr, low, pIndex - 1, steps, sortedIds);
        quickSortRecursive(arr, pIndex + 1, high, steps, sortedIds);
    }
};


const quickSort = (inputArr : number[], low : number = 0, high : number = 0) : VisualizationStep[] => {
    const arr = [...inputArr];
    const steps: VisualizationStep[] = [];
    const n: number = arr.length;
    const sortedIds: string[] = [];
    
    let localHigh = high > 0 ? high : n - 1;

    quickSortRecursive(arr, low, localHigh, steps, sortedIds);

    // FINAL ALL-SORTED STEP
    pushStep(steps, {
    linear: { values: [...arr] },
    sortedIds: Array.from({ length: arr.length }, (_, i) => i.toString())
    });

    return steps
}

export default quickSort