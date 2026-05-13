import type { SortingType } from "../types/sortingType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"

interface SortingGraphicsProps {
  numbers: number[],
  activeIndex : number | undefined,
  compareIndex: number | undefined,
  sortedIndices: number[] | undefined,
  sortingType : SortingType
}

/** Decides, which sorting graphics to use for which algoritm based on limited input strings */
const SortingGraphics = ( {numbers, activeIndex, compareIndex, sortedIndices, sortingType} : SortingGraphicsProps ) => {
  switch(sortingType) {
    case "list/bar": 
        return (
        <>
            <BarsList 
                numbers={numbers}
                activeIndex={activeIndex}
                compareIndex={compareIndex}
                sortedIndices={sortedIndices}

            />
            <hr></hr>
            <NumberList
                numbers={numbers}
                activeIndex={activeIndex}
                compareIndex={compareIndex}
                sortedIndices={sortedIndices}
            />
            <br></br>
        </>
  )

  } 
  
    
}

export default SortingGraphics