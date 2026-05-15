import type { VisualizationStep } from "../types/VisualizationStep";
import pushStep from "../utils/pushStep";
import toId from "../utils/toId";

const merge = (arr: number[], left: number, mid: number, right: number, steps: VisualizationStep[], sortedIds: string[]) => {

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
         pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(left + i)],
            compareIds: [toId(mid + 1 + j)],
            sortedIds: [...sortedIds]
        });

        if (lTemp[i] <= rTemp[j]) {

            arr[k] = lTemp[i];
            i++;

        } else {

            arr[k] = rTemp[j];
            j++;
        }

        // WRITE STEP
        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(k)],
            sortedIds: [...sortedIds]
        });

        k++;
    }

    //LEFTOVERS
    while (i < n1) {

        arr[k] = lTemp[i];

        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(k)],
            sortedIds: [...sortedIds]
        });

        i++;
        k++;
    }

    while (j < n2) {

        arr[k] = rTemp[j];

        pushStep(steps, {
            linear: { values: [...arr] },
            activeIds: [toId(k)],
            sortedIds: [...sortedIds]
        });

        j++;
        k++;
    }

    //THIS MERGED REGION IS NOW SORTED
    for (let idx = left; idx <= right; idx++) {

        if (!sortedIds.includes(toId(idx))) {
            sortedIds.push(toId(idx));
        }
    }

    //RECORD MERGED REGION
    pushStep(steps, {
            linear: { values: [...arr] },
            sortedIds: [...sortedIds]
        });
};

const mergeSortRecursive = (
    arr: number[],
    left: number,
    right: number,
    steps: VisualizationStep[],
    sortedIds: string[]
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
        sortedIds
    );

    mergeSortRecursive(
        arr,
        mid + 1,
        right,
        steps,
        sortedIds
    );

    merge(
        arr,
        left,
        mid,
        right,
        steps,
        sortedIds
    );
};

const mergeSort = (inputArr: number[]): VisualizationStep[] => {

    const arr = [...inputArr];
    const steps: VisualizationStep[] = [];
    const sortedIds: string[] = [];

    mergeSortRecursive(
        arr,
        0,
        arr.length - 1,
        steps,
        sortedIds
    );

    //FINAL STEP
    pushStep(steps, {
    linear: { values: [...arr] },
    sortedIds: Array.from({ length: arr.length }, (_, i) => i.toString())
    });

    return steps;
};

export default mergeSort;