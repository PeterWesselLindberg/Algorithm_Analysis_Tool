import NumberList from "./NumberList"
import { useState } from "react"
import insertionSort from "../algorithms/insertionSort"
import { Button } from "react-bootstrap"

interface SetupSortingProps {
  unsortedNumbers: number[],
}

const SetupSorting = ({unsortedNumbers} : SetupSortingProps) => {
  const [numbers, setNumbers] = useState(unsortedNumbers)
  const [isSorting, setIsSorting] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [compareIndex, setCompareIndex] = useState<number | undefined>();
  

  const handleSort = () => {
     if (isSorting) return;

    const steps = insertionSort(numbers);
    let i = 0;

    setIsSorting(true);

    const interval = setInterval(() => {
      setNumbers(steps[i].array);
      setActiveIndex(steps[i].activeIndex);
      setCompareIndex(steps[i].compareIndex);
      i++;

      if (i >= steps.length) {
        clearInterval(interval);
        setIsSorting(false);
      }
    }, 500); // ⏱ speed (ms)
  }
  return (
    <div>
      <NumberList 
        numbers={numbers}
        activeIndex={activeIndex}
        compareIndex={compareIndex}
      />
      <Button onClick={handleSort} disabled={isSorting}>
        Sort
      </Button>
    </div>
  )
}

export default SetupSorting