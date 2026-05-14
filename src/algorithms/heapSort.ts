import type { SortStep } from "../types/SortStep";

const heapify = (arr : number[], n : number , i : number) => {

  let largest = i;

  let leftIndex = 2 * i + 1;
  let rightIndex = 2 * i + 2;

  if(leftIndex < n && arr[leftIndex] > arr[largest]) {
    largest = leftIndex;
  }

  if(rightIndex < n && arr[rightIndex] > arr[largest]) {
    largest = rightIndex;
  }

  if (largest != i ) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr , n, largest)
  }

}

const heapSort = (inputArr : number[]) : void => {
  const arr = [...inputArr];
  const steps: SortStep[] = [];
  let n: number = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  };

  for (let i = n - 1; i > 0; i--) {

    [arr[0], arr[i]] = [arr[i], arr[0]];

    heapify(arr, i, 0);
  }
  
  
  return
}

export default heapSort