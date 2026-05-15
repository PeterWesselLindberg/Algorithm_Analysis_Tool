import type { SortStep } from "../types/SortStep";

const merge = (arr: number[], left: number, mid: number, right: number, steps: SortStep[], sortedIndices: number[]) => {

    const n1 = mid - left + 1;
    const n2 = right - mid;

    const lTemp = new Array(n1);
    const rTemp = new Array(n2);

    for (let i = 0; i < n1; i++) {
        lTemp[i] = arr[left + i];
    }

    for (let j = 0; j < n2; j++) {
        rTemp[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    //MERGING
    while (i < n1 && j < n2) {

        //COMPARISON
        steps.push({
            array: [...arr],
            activeIndex: left + i,
            compareIndex: mid + 1 + j,
            sortedIndices: [...sortedIndices]
        });

        if (lTemp[i] <= rTemp[j]) {

            arr[k] = lTemp[i];
            i++;

        } else {

            arr[k] = rTemp[j];
            j++;
        }

        // WRITE STEP
        steps.push({
            array: [...arr],
            activeIndex: k,
            sortedIndices: [...sortedIndices]
        });

        k++;
    }

    //LEFTOVERS
    while (i < n1) {

        arr[k] = lTemp[i];

        steps.push({
            array: [...arr],
            activeIndex: k,
            sortedIndices: [...sortedIndices]
        });

        i++;
        k++;
    }

    while (j < n2) {

        arr[k] = rTemp[j];

        steps.push({
            array: [...arr],
            activeIndex: k,
            sortedIndices: [...sortedIndices]
        });

        j++;
        k++;
    }

    //THIS MERGED REGION IS NOW SORTED
    for (let idx = left; idx <= right; idx++) {

        if (!sortedIndices.includes(idx)) {
            sortedIndices.push(idx);
        }
    }

    //RECORD MERGED REGION
    steps.push({
        array: [...arr],
        sortedIndices: [...sortedIndices]
    });
};

const mergeSortRecursive = (
    arr: number[],
    left: number,
    right: number,
    steps: SortStep[],
    sortedIndices: number[]
) => {

    if (left >= right) return;

    const mid =
        Math.floor(
            left + (right - left) / 2
        );

    mergeSortRecursive(
        arr,
        left,
        mid,
        steps,
        sortedIndices
    );

    mergeSortRecursive(
        arr,
        mid + 1,
        right,
        steps,
        sortedIndices
    );

    merge(
        arr,
        left,
        mid,
        right,
        steps,
        sortedIndices
    );
};

const mergeSort = (inputArr: number[]): SortStep[] => {

    const arr = [...inputArr];
    const steps: SortStep[] = [];
    const sortedIndices: number[] = [];

    mergeSortRecursive(
        arr,
        0,
        arr.length - 1,
        steps,
        sortedIndices
    );

    //FINAL STEP
    steps.push({
        array: [...arr],
        sortedIndices:
            Array.from(
                { length: arr.length },
                (_, i) => i
            )
    });

    return steps;
};

export default mergeSort;