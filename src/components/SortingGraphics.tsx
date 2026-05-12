import type { sortingType } from "../types/sortingType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"

interface SortingGraphicsProps {
  numbers: number[],
  activeIndex : number | undefined,
  compareIndex: number | undefined,
  sortingType : sortingType
}


const SortingGraphics = ( {numbers, activeIndex, compareIndex, sortingType} : SortingGraphicsProps ) => {
  switch(sortingType) {
    case "list/bar": 
        return (
        <>
            <BarsList 
                numbers={numbers}
                activeIndex={activeIndex}
                compareIndex={compareIndex}
            />
            <hr></hr>
            <NumberList
                numbers={numbers}
                activeIndex={activeIndex}
                compareIndex={compareIndex}
            />
            <br></br>
        </>
  )

  } 
  
    
}

export default SortingGraphics