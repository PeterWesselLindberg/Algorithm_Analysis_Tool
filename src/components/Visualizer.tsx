import type { SortingType } from "../types/sortingType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"
import type { VisualizationStep } from "../types/VisualizationStep"
import TreeVisualizer from "./TreeVisualizer"
import ExtendedNumberList from "./ExtendedNumbersList"

interface VisualizerProps {
  step: VisualizationStep
  sortingType: SortingType
}

/** Decides, which sorting graphics to use for which algoritm based on limited input strings */
const Visualizer = ( {step, sortingType} : VisualizerProps ) => {
  const numbers = step.linear?.values ?? []
  const linears = step.linears ?? []
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
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
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

    case "list/list/list":
      return (
        <>
          {linears?.map((linear) => (

          <div key={linear.id}>
            <h5>{linear.label}</h5>

            <ExtendedNumberList
              idPrefix={linear.id}
              numbers={linear.values}

              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />

            <hr />
          </div>

        ))}
        </>
      )

  } 
  
    
}

export default Visualizer