import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import type { SortStep } from "../types/SortStep"
import type { AlgorithmTypes } from "../types/algorithmtypes"
import algorithmTypes from "../types/algorithmtypes"
import type { SortingType } from "../types/sortingType"
import SortingGraphics from "./SortingGraphics"
import { FaSquare, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa"

interface AnimationManagerProps {
  unsortedNumbers: number[],
  algorithm: AlgorithmTypes,
  sortingGraphics: SortingType
}

const AnimationManager = ({unsortedNumbers, algorithm, sortingGraphics} : AnimationManagerProps) => {
  const clonedUnsortedNumbers = unsortedNumbers.slice() // Clones the input list for use with the restartSort function
  
  const selectedAlgorithm = algorithmTypes[algorithm] // Initialises the given algoritmhtype for the limited types
  const initialSteps = selectedAlgorithm(unsortedNumbers) // Initialises the the input list with the selected algoritm

  const [numbers, setNumbers] = useState(unsortedNumbers) 
  const [speed, setSpeed] = useState(5) // The speed stat used for speeding up and slowing down the algorithm animation
  
  // The booleans used for determining when the animation is starting, stopping or finished 
  const [isSorting, setIsSorting] = useState(false) 
  const [isPaused, setIsPaused] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  // The steps used in the algorithm animation
  const [steps, setSteps] = useState<SortStep[]>(initialSteps)
  const [currentStep, setCurrentStep] = useState(0)

  // The current element index and the index of the element it is compared to
  const [activeIndex, setActiveIndex] = useState<number | undefined>()
  const [compareIndex, setCompareIndex] = useState<number | undefined>()
  const [sortedIndices, setSortedIndices] = useState<number[] | undefined>()

  const [btnText, setBtnText] = useState(<FaPlay/>) // Changes the text on the buttons
  const [btnValue, setBtnvalue] = useState("start") // changes the current state of the buttons in order to update the symbols
  
  const animationDelay = 1100 - speed * 100


  useEffect(() => {
    if (!isSorting || isPaused) return

    if (currentStep >= steps.length) {
      setIsSorting(false)
      setIsPaused(false)
      setIsFinished(true)
      setBtnText(<FaPlay/>)

      setActiveIndex(undefined)
      setCompareIndex(undefined)
      setSortedIndices(undefined)
      return
    }

    const timeout = setTimeout(() => {
    const step = steps[currentStep]

    setNumbers(step.array)
    setActiveIndex(step.activeIndex)
    setCompareIndex(step.compareIndex)
    setSortedIndices(step.sortedIndices)

    setCurrentStep((prev) => prev + 1)
    }, animationDelay) // speed in ms

    return () => clearTimeout(timeout)
}, [currentStep, isSorting, isPaused, steps, speed])

  /** Intialises the steps of the algorithm and decides if it is starting in a stopped state or a running state */
  const initialiseSteps = (startState: "pause" | "run") => {
        
        setSteps(initialSteps)
        setCurrentStep(0)
        

        if (startState === "pause") {
          setIsPaused(true)
        }
        else if (startState === "run") {
          setIsPaused(false)
        }

  }
  /** Start and stops the animations for the sorting algorithm */
  const startStopSort = (btnState: string) => {

    switch(btnState) {
      case "start":
        
        initialiseSteps("run")
        setIsSorting(true)
        setIsFinished(false)
        setBtnText(<FaPause/>)
        break

      case "stop":
        setIsPaused(true)
        setBtnText(<FaPlay/>)
        break
      
      case "resume":
        setIsPaused(false)
        setBtnText(<FaPause/>)
        break
      
      default:
        console.log("Error: You shouldn't be here")
        break
    }
    
  }

  /** Changes the current state and text of the start/resume button*/
  const handleButtonValue = () => {
    if (!isFinished) {
      if (btnValue === "start") {setBtnvalue("stop")}
      
      else if (btnValue === "stop") {setBtnvalue("resume")}

      else if (btnValue === "resume") {setBtnvalue("stop")}
    }
    else if (isFinished) {}
  }
  
  /** The function responsible for restarting the algorithm and it's animation when the reset button is pressed */
  const restartSort = () => {
    setBtnText(<FaPlay/>)
    setBtnvalue("start")
    setNumbers(clonedUnsortedNumbers)
    setIsFinished(false)
    setIsSorting(false)
    initialiseSteps("pause")
  }

  /** Goes the current step when sliding the steps slider */
  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return

    const step = steps[stepIndex]

    setNumbers(step.array)
    setActiveIndex(step.activeIndex)
    setCompareIndex(step.compareIndex)
    setSortedIndices(step.sortedIndices)

    setCurrentStep(stepIndex)
  }

  /** Determines what happens when you press the next or previous step buttons */
  const stepSort = (direction: "prev" | "next") => {
    
    let newStep = currentStep

    switch(direction) {
      case "prev":
        if (currentStep === 0 ) return

        startStopSort("stop")
  
        if (currentStep >= steps.length - 1) {
          setIsFinished(false)
          setIsSorting(true)}
        
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
    
      goToStep(newStep)
    
  }
  
  // Shows the progress of the sorting in percentage
  const progress =
  steps.length > 1
    ? Math.round((currentStep / (steps.length - 1)) * 100)
    : 0

  return (
    
    <div>
      <SortingGraphics numbers={numbers} activeIndex={activeIndex} compareIndex={compareIndex} sortedIndices={sortedIndices} sortingType={sortingGraphics}/>
      <Button onClick={() => restartSort()}>
        <FaSquare/>
      </Button>

      <Button onClick={() => {handleButtonValue(); startStopSort(btnValue)}} disabled={isFinished}>
        {btnText}
      </Button>
      
      <Button onClick={() => stepSort("prev")}
        disabled={currentStep === 0}>
        <FaChevronLeft />
      </Button>

      <Button onClick={() => stepSort("next")}
        disabled={isFinished}>
        <FaChevronRight />
      </Button>

      <div style={{ marginTop: "1rem"}}>
        <label>
          Speed: {speed}ms
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ marginRight: "1rem"}}
          />

          <label>
          Step: {currentStep} / {Math.max(steps.length - 1, 0)}
          {" "}({progress}%)
          
        </label>

        <input
          type="range"
          min="0"
          max={Math.max(steps.length - 1, 0)}
          value={currentStep}
          onChange={(e) => {
            const stepIndex = Number(e.target.value)

            setIsPaused(true)
            setIsSorting(false) 

            goToStep(stepIndex)
          }}
          style={{ width: "400px"}}
        />
      </div>
     
    </div>
  )
}

export default AnimationManager