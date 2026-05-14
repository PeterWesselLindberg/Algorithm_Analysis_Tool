import type { SortStep } from "../types/SortStep";

const heapify = (arr : number[], n : number , i : number, steps : SortStep[], sortedIndices : number[]) => {

  let largest = i;

  let leftIndex = 2 * i + 1;
  let rightIndex = 2 * i + 2;

  if (leftIndex < n) {

    steps.push({
        array: [...arr],
        activeIndex: largest,
        compareIndex: leftIndex,
        sortedIndices: [...sortedIndices]
    });

    if (arr[leftIndex] > arr[largest]) {
        largest = leftIndex;
    }
  }

  if (rightIndex < n) {

    steps.push({
        array: [...arr],
        activeIndex: largest,
        compareIndex: rightIndex,
        sortedIndices: [...sortedIndices]
    });

    if (arr[rightIndex] > arr[largest]) {
        largest = rightIndex;
    }
  }

  if (largest !== i) {

    [arr[i], arr[largest]] =
        [arr[largest], arr[i]];

    steps.push({
        array: [...arr],
        activeIndex: i,
        compareIndex: largest,
        sortedIndices: [...sortedIndices]
    });

    heapify(
        arr,
        n,
        largest,
        steps,
        sortedIndices
    );
  }

}

const heapSort = (inputArr : number[]) : SortStep[] => {
  const arr = [...inputArr];
  const steps: SortStep[] = [];
  const sortedIndices: number[] = [];
  let n: number = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps, sortedIndices);
  };

  for (let i = n - 1; i > 0; i--) {

    [arr[0], arr[i]] = [arr[i], arr[0]];

    sortedIndices.push(i);

      steps.push({
          array: [...arr],
          activeIndex: 0,
          compareIndex: i,
          sortedIndices: [...sortedIndices]
    });

    heapify(arr, i, 0, steps, sortedIndices);
  }
  
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

export default heapSort