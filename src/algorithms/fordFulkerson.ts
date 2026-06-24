import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { ResidualNode } from "../dataStructures/ResidualNode"
import type { AlgorithmInput } from "../types/algorithmtypes"
import type { VisualizationStep } from "../types/VisualizationStep"
import { pushStep } from "../utils/pushStep"
import buildResidualGraph, {reconstructPath} from "../utils/buildResidualGraph"
import bfsEdmondsKarp from "./edmondsKarp"
import type { AlgorithmFunction } from "../types/algorithmtypes"
import type { GraphData } from "../dataStructures/GraphData"

const dfs = (
    current: string,
    sink: string,
    nodeMap: Map<string, ResidualNode>,
    visited: Set<string>,
    parent: Map<string, string>,
    graph: GraphData,
    steps: VisualizationStep[]
): boolean => {

    if (current === sink)
        return true

    visited.add(current)

    const node = nodeMap.get(current)!

    for (const edge of node.neighbors) {
        
        const residualCapacity =
            edge.capacity- edge.flow

        if (residualCapacity > 0 && !visited.has(edge.to)) {
            pushStep(steps, {
                graph: structuredClone(graph),
                visitedIds: [...visited],
                activeIds: [edge.to],
                activeEdgeIds: [`${current}->${edge.to}`],
                message: `Visited ${edge.to}`
            })
            parent.set(edge.to, current)

            pushStep(steps, {
                graph: structuredClone(graph),
                visitedIds: [...visited],
                activeIds: [edge.to],
                message: `Visited ${edge.to}`
            })
            if (
                dfs(
                    edge.to,
                    sink,
                    nodeMap,
                    visited,
                    parent,
                    graph,
                    steps
                )
            ) {
                return true
            }
        }
    }

    return false
}

const findAugmentingPath = (
    residual: ResidualNode[],
    source: string,
    sink: string,
    graph: GraphData,
    steps: VisualizationStep[],
    isEdmonsKarp: boolean = false
): string[] | null => {

    const nodeMap = new Map(
        residual.map(node => [node.id, node])
    )

    const visited = new Set<string>()

    const parent = new Map<string, string>()

    let found: Boolean

    if (isEdmonsKarp) {
        found = bfsEdmondsKarp(
            source,
            sink,
            nodeMap,
            parent,
            graph,
            steps
        )
    }
    else {found = dfs(
        source,
        sink,
        nodeMap,
        visited,
        parent,
        graph,
        steps
    )}

    if (!found)
        return null

    return reconstructPath(
        source,
        sink,
        parent
    )
}

const findBottleneck = (
    residual: ResidualNode[],
    path: string[]
): number => {

    const nodeMap = new Map(
        residual.map(node => [node.id, node])
    )

    let bottleneck = Infinity

    for (let i = 0; i < path.length - 1; i++) {

        const from = nodeMap.get(path[i])!

        const edge = from.neighbors.find(
            e => e.to === path[i + 1]
        )!

        const residualCapacity =
            edge.capacity - edge.flow

        bottleneck = Math.min(
            bottleneck,
            residualCapacity
        )
    }

    return bottleneck
}

const augmentFlow = (
    residual: ResidualNode[],
    path: string[],
    bottleneck: number
) => {

    const nodeMap = new Map(
        residual.map(node => [node.id, node])
    )

    for (let i = 0; i < path.length - 1; i++) {

        const from = nodeMap.get(path[i])!
        const to = nodeMap.get(path[i + 1])!

        // Forward edge
        const forward = from.neighbors.find(
            e => e.to === to.id
        )!

        // Reverse edge
        const reverse = to.neighbors.find(
            e => e.to === from.id
        )!

        forward.flow += bottleneck
        reverse.flow -= bottleneck
    }
}

const applyFlowToGraph = (
    graph: GraphNodeData[],
    residual: ResidualNode[]
) => {

    const residualMap = new Map(
        residual.map(node => [node.id, node])
    )

    for (const node of graph) {

        const residualNode = residualMap.get(node.id)!

        for (const edge of node.neighbors) {

            const residualEdge = residualNode.neighbors.find(
                e => e.to === edge.to
            )!

            edge.flow = residualEdge.flow
        }
    }
}

const updateActiveEdges = (path: string[]) => {
    return (path.slice(0, -1).map((_, i) => `${path[i]}->${path[i + 1]}`))
}

export const fordFulkersonCore = (
    input: AlgorithmInput, 
    isEdmonsKarp: boolean = false
): VisualizationStep[] => {

    if (input.type !== "graph") {
        return []
    }

    const graph = structuredClone(input.data)
    const steps: VisualizationStep[] = []

    const sourceId = graph.nodes[0].id
    const sinkId = graph.nodes[graph.nodes.length - 1].id
    const augmentingPaths: string[] = []
    const augmentingPathsIds: string[] = []

    let maxFlow = 0

    pushStep(steps, {
        graph: structuredClone(graph),
        message: "Initial flow network.",
        mstWeight: maxFlow,
        mstEdges: [...augmentingPaths]
    })

    const residual = buildResidualGraph(graph.nodes)!

    while (true) {

        const path = findAugmentingPath(
            residual,
            sourceId,
            sinkId,
            graph,
            steps,
            isEdmonsKarp
        )

        if (!path) {
            break
        }

        // Step 1: Show augmenting path
        pushStep(steps, {
            graph: structuredClone(graph),
            activeIds: path,
            activeEdgeIds: updateActiveEdges(path),
            message: isEdmonsKarp ? "Shortest augmenting path found" : "Augmenting path found",
            mstEdges: [...augmentingPaths],
            mstEdgeIds: [...augmentingPathsIds],
            mstWeight: maxFlow

        })

        const bottleneck = findBottleneck(residual, path)

        // Step 2: Show bottleneck
        pushStep(steps, {
            graph: structuredClone(graph),
            activeIds: path,
            activeEdgeIds: updateActiveEdges(path),
            message: `Bottleneck = ${bottleneck}`,
            mstEdges: [...augmentingPaths],
            mstWeight: maxFlow
        })

        augmentFlow(residual, path, bottleneck)

        maxFlow += bottleneck

        applyFlowToGraph(graph.nodes, residual)

        const pathString = `${path.join(" → ")} | +${bottleneck}`

        augmentingPaths.push(pathString)

        augmentingPathsIds.push(
            ...path.slice(0, -1).map((_, i) =>
                `${path[i]}->${path[i + 1]}`
            )
        )

        // Step 3: Show flow increase
        pushStep(steps, {
            graph: structuredClone(graph),
            activeIds: path,
            mstEdges: [...augmentingPaths],
            mstEdgeIds: [...augmentingPathsIds],
            mstWeight: maxFlow,
            message: `Flow increased by ${bottleneck}. Total = ${maxFlow}`
        })

    }

    // Final step
    pushStep(steps, {
        graph: structuredClone(graph),
        message: `Finished. Max flow = ${maxFlow}`,
        mstEdges: [...augmentingPaths],
        mstEdgeIds: [...augmentingPathsIds],
        mstWeight: maxFlow
    })

    return steps
}

/** Wrapper for Ford-Fulkerson */
const fordFulkerson: AlgorithmFunction = (input) => {
return fordFulkersonCore(input, false)
}

/** Wrapper function used for Edmonds-Karp */
export const edmondsKarp: AlgorithmFunction = (input) =>
  fordFulkersonCore(input, true)


  
export default fordFulkerson
