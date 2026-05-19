import type { GraphData } from "../dataStructures/GraphData"
import type { VisualizationStep } from "../types/VisualizationStep"
import GraphEdges from "./GraphEdges"
import GraphNodes from "./GraphNodes"

interface GraphVisualizerProps {
    step: VisualizationStep
    graph?: GraphData
}

const GraphVisualizer = ({step, graph}: GraphVisualizerProps) => {

    if (!graph) return null
    return (
        <svg width="100%" height="600">

        <GraphEdges graph={graph}  activeEdgeIds={step.activeEdgeIds}/>

        <GraphNodes
            graph={graph}
            activeIds={step.activeIds}
            compareIds={step.compareIds}
            sortedIds={step.sortedIds}
            />

        </svg>
    )
}

export default GraphVisualizer