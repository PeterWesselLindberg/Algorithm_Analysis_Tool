import type { VisualizationStep } from "../types/VisualizationStep";
import buildHeapTree from "../utils/buildHeapTree";
import pushStep from "../utils/pushStep";
import toId from "../utils/toId";


const heapify = (arr : number[], n : number , i : number, steps : VisualizationStep[], sortedIds : string[]) => {

  let largest = i;

  let leftIndex = 2 * i + 1;
  let rightIndex = 2 * i + 2;

  if (leftIndex < n) {

     pushStep(steps, {
      linear: { values: [...arr] },

      tree: buildHeapTree(arr),

      activeIds: [toId(largest)],
      compareIds: [toId(leftIndex)],

      sortedIds: [...sortedIds]
    });

    if (arr[leftIndex] > arr[largest]) {
        largest = leftIndex;
    }
  }

  if (rightIndex < n) {

     pushStep(steps, {
      linear: { values: [...arr] },

      tree: buildHeapTree(arr),

      activeIds: [toId(largest)],
      compareIds: [toId(rightIndex)],

      sortedIds: [...sortedIds]
    });

    if (arr[rightIndex] > arr[largest]) {
        largest = rightIndex;
    }
  }

  if (largest !== i) {

    [arr[i], arr[largest]] =
        [arr[largest], arr[i]];

    pushStep(steps, {
      linear: { values: [...arr] },

      tree: buildHeapTree(arr),

      activeIds: [toId(i)],
      compareIds: [toId(largest)],

      sortedIds: [...sortedIds]
    });

    heapify(
        arr,
        n,
        largest,
        steps,
        sortedIds
    );
  }

}

const heapSort = (inputArr : number[]) : VisualizationStep[] => {
  const arr = [...inputArr];
  const steps: VisualizationStep[] = [];
  const sortedIds: string[] = [];
  let n: number = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps, sortedIds);
  };

  for (let i = n - 1; i > 0; i--) {

    [arr[0], arr[i]] = [arr[i], arr[0]];

    sortedIds.push(toId(i));

    pushStep(steps, {
      linear: { values: [...arr] },
      
      tree: buildHeapTree(arr),

      activeIds: [toId(0)],
      compareIds: [toId(i)],

      sortedIds: [...sortedIds]
    });

    heapify(arr, i, 0, steps, sortedIds);
  }
  
  sortedIds.push(toId(0));
  pushStep(steps, {
    linear: { values: [...arr] },
    tree: buildHeapTree(arr),

    sortedIds: [...sortedIds]
  });


  return steps
}

export default heapSort