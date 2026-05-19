import type {VisualizationType } from "../types/VisualizationType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"
import type { VisualizationStep } from "../types/VisualizationStep"
import TreeVisualizer from "./TreeVisualizer"
import ExtendedNumberList from "./ExtendedNumbersList"
import VisitedList from "./VisitedList"
import GraphVisualizer from "./GraphVisualizer"

interface VisualizerProps {
  step: VisualizationStep
  visualizationType: VisualizationType
}

/** Decides, which sorting graphics to use for which algoritm based on limited input strings */
const Visualizer = ( {step, visualizationType} : VisualizerProps ) => {
  const numbers = step.linear?.values ?? []
  const linears = step.linears ?? []
  const activeIds = step.activeIds ?? []
  const compareIds = step.compareIds ?? []
  const sortedIds = step.sortedIds ?? []
  switch(visualizationType) {
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
            step={step}
            tree={step.tree}
            numbers={numbers}
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
    
    case "list":
      return (
        <>
            <NumberList
              numbers={numbers}
              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />
            
            <hr />
        </>
      )
    
    case "list/tree":
      return (
        <>
          <TreeVisualizer
          step={step}
          tree={step.tree}
          numbers={numbers}
          />
          <hr />

          <VisitedList visitedIds={step.visitedIds ?? []} />
            
          
        </>
      )

     case "list/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          <hr />

          <VisitedList visitedIds={step.visitedIds ?? []} />
            
          
        </>
      )

  } 
  
    
}

export default Visualizer