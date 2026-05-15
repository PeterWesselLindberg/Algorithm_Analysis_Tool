import type { SortingType } from "../types/sortingType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"
import type { VisualizationStep } from "../types/VisualizationStep"
import TreeVisualizer from "./TreeVisualizer"

interface VisualizerProps {
  step: VisualizationStep
  sortingType: SortingType
}

/** Decides, which sorting graphics to use for which algoritm based on limited input strings */
const Visualizer = ( {step, sortingType} : VisualizerProps ) => {
  const numbers = step.linear?.values ?? []
  const activeIds = step.activeIds ?? []
  const compareIds = step.compareIds ?? []
  const sortedIds = step.sortedIds ?? []
  switch(sortingType) {
    case "list/bar": 
        return (
         <>
          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />

          <hr />

          <NumberList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
        </>
      )
    case "list/bar/tree": 
        return (
         <>
          <TreeVisualizer
            tree={step.tree}
            numbers={numbers}
            activeIds={step.activeIds}
            compareIds={step.compareIds}
            sortedIds={step.sortedIds}
          />
          <hr />

          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />

          <hr />

          <NumberList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
        </>
      )

    // case "tree":
    //   return step.tree ? (
    //     <TreeVisualizer
    //       tree={step.tree}
    //       activeIds={activeIds}
    //       compareIds={compareIds}
    //       sortedIds={sortedIds}
    //     />
    //   ) : null

    // default:
    //   return null
  // )

  } 
  
    
}

export default Visualizer