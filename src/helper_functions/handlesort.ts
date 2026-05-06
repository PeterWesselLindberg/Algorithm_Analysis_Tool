import { useState } from "react"
import insertionSort from "../algorithms/insertionSort"

const [numbers, setNumbers] = useState([64, 34, 25, 12, 22, 11, 90])
const [isSorting, setIsSorting] = useState(false)
const [activeIndex, setActiveIndex] = useState<number | undefined>()
const [compareIndex, setCompareIndex] = useState<number | undefined>()
  

  const handleSort = () => {
     if (isSorting) return

    const steps = insertionSort(numbers);
    let i = 0;

    setIsSorting(true)

    const interval = setInterval(() => {
      setNumbers(steps[i].array)
      setActiveIndex(steps[i].activeIndex)
      setCompareIndex(steps[i].compareIndex)
      i++;

      if (i >= steps.length) {
        clearInterval(interval)
        setIsSorting(false)
      }
    }, 500) // ⏱ speed (ms)
  }