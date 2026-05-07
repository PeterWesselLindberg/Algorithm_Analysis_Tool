import NumberList from "./NumberList"
import { useState, useEffect } from "react"
import insertionSort from "../algorithms/insertionSort"
import { Button } from "react-bootstrap"
import type { SortStep } from "../algorithms/SortStep"

interface SetupSortingProps {
  unsortedNumbers: number[],
}

const SetupSorting = ({unsortedNumbers} : SetupSortingProps) => {
  const clonedUnsortedNumbers = unsortedNumbers.slice()

  const [numbers, setNumbers] = useState(unsortedNumbers)
  
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const [steps, setSteps] = useState<SortStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  const [activeIndex, setActiveIndex] = useState<number | undefined>()
  const [compareIndex, setCompareIndex] = useState<number | undefined>()

  const [btnText, setBtnText] = useState("Start")
  const [btnValue, setBtnvalue] = useState("start")
  


  useEffect(() => {
    if (!isSorting || isPaused) return

    if (currentStep >= steps.length) {
      setIsSorting(false)
      setIsPaused(false)
      setIsFinished(true)
      setBtnText("Resume")

      setActiveIndex(undefined)
      setCompareIndex(undefined)
      return
    }

    const timeout = setTimeout(() => {
    const step = steps[currentStep]

    setNumbers(step.array)
    setActiveIndex(step.activeIndex)
    setCompareIndex(step.compareIndex)

    setCurrentStep((prev) => prev + 1)
    }, 500) // speed in ms

    return () => clearTimeout(timeout)
}, [currentStep, isSorting, isPaused, steps])


  const initialiseSteps = (startState: "pause" | "run") => {
    const generatedSteps = insertionSort(numbers)

        setSteps(generatedSteps)
        setCurrentStep(0)
        

        if (startState === "pause") {
          setIsPaused(true)
        }
        else if (startState === "run") {
          setIsPaused(false)
        }

  }
  const startStopSort = (btnState: string) => {

    switch(btnState) {
      case "start":
        
        initialiseSteps("run")
        setIsSorting(true)
        setIsFinished(false)
        setBtnText("Pause")
        break

      case "stop":
        setIsPaused(true)
        setBtnText("Resume")
        break
      
      case "resume":
        setIsPaused(false)
        setBtnText("Stop")
        break
      
      default:
        break
    }
    
  }

  const handleButtonValue = () => {
    if (!isFinished) {
      if (btnValue === "start") {setBtnvalue("stop")}
      
      else if (btnValue === "stop") {setBtnvalue("resume")}

      else if (btnValue === "resume") {setBtnvalue("stop")}
    }
    else if (isFinished) {}
  }
  
  const restartSort = () => {
    setBtnText("Start")
    setBtnvalue("start")
    setNumbers(clonedUnsortedNumbers)
    setIsFinished(false)
    setIsSorting(false)
    initialiseSteps("pause")
  }

  // const resumeSort = () => {
    
  // }

  const stepSort = (direction: "prev" | "next") => {
    //if (direction === "prev" && !isFinished) return

    //if (direction === "next" && !isPaused) return
    
    let newStep = currentStep

    switch(direction) {
      case "prev":
        if (currentStep === 0 ) return

        startStopSort("stop")
        // setIsPaused(true)
        // setBtnText("Resume")
        if (currentStep >= steps.length - 1) {
          setIsFinished(false)
          setIsSorting(true)}
        // setIsFinished(false)
        // setIsSorting(true)
        
        
        newStep = currentStep - 1
        break
      
      case "next":
        if (currentStep === 0) {
          initialiseSteps("pause")
          
        }
        if (currentStep >= steps.length - 1) return
        startStopSort("stop")
        
        newStep = currentStep + 1
        break
    }
    
    const step = steps[newStep]

    setNumbers(step.array)
    setActiveIndex(step.activeIndex)
    setCompareIndex(step.compareIndex)

    setCurrentStep(newStep)
    
  }


  return (
    <div>
      <NumberList 
        numbers={numbers}
        activeIndex={activeIndex}
        compareIndex={compareIndex}
      />
      <Button onClick={() => restartSort()}>
        Restart
      </Button>

      <Button onClick={() => {handleButtonValue(); startStopSort(btnValue)}} disabled={isFinished}>
        {btnText}
      </Button>
      
      {/* <Button onClick={pauseSort} disabled={!isSorting || isPaused}>
        Pause
      </Button>

      <Button onClick={resumeSort} disabled={!isPaused}>
        Resume
      </Button> */}

      <Button onClick={() => stepSort("next")}
        disabled={isFinished}>
        Next step
      </Button>

      <Button onClick={() => stepSort("prev")}
        disabled={currentStep === 0}>
        Prev step
      </Button>
    </div>
  )
}

export default SetupSorting