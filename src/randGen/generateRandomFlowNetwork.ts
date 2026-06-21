import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { AlgorithmInput } from "../types/algorithmtypes"


/** Helper function, which adds edges and ensure no bidirectional or duplicate edges occur */
export const addEdge = (
  from: GraphNodeData,
  to: GraphNodeData,
  directed: boolean, // If the edges are directed
  sinkId: string = "5",
  sourceId: string = "0",
  intermediateIds: string[] = ["1", "2"]
) => {

    // No direct source → sink
    if (from.id === sourceId && to.id === sinkId) return

    // No 1 or 2 → sink
    if ((from.id === intermediateIds[0] || from.id === intermediateIds[1]) && to.id === sinkId) return


    // Prevent duplicate edge
    if (from.neighbors.some(edge => edge.to === to.id)) {
        return
    }

    // Prevent reverse edge in directed graph
    if (directed && to.neighbors.some(edge => edge.to === from.id)) {
        return
    }

    
    const weight = Math.floor(Math.random() * 9) + 1
        

    from.neighbors.push({
        to: to.id,
        weight
    })
}


const addMandatoryEdges = (nodes: GraphNodeData[]) => {

    const get = (i: number) => nodes[i]

    // Source
    addEdge(get(0), get(1), true, "5")
    addEdge(get(0), get(2), true, "5")

    // Middle structure
    addEdge(get(1), get(4), true, "5")
    addEdge(get(2), get(3), true, "5")

    // Sink
    addEdge(get(3), get(5), true, "5")
    addEdge(get(4), get(5), true, "5")
}

const addRandomEdges = (nodes: GraphNodeData[]) => {

    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {

            if (i === j) continue

            // Prevent sink outgoing 
            if (i === nodes.length-1) continue

            // Prevent source incoming
            if (j === 0) continue

            if (Math.random() < 0.25) {
                addEdge(nodes[i], nodes[j], true, "5")
            }
        }
    }
}

const enforceStructure = (nodes: GraphNodeData[], intermediateIds: string[] = ["1", "2"]) => {

    const source = nodes[0]
    const sink = nodes[nodes.length - 1]

    // Source: exactly nodes 1 and 2
    source.neighbors = source.neighbors.filter(e =>
        e.to === intermediateIds[0] || e.to === intermediateIds[1]
    )

    // Sink: ensure only incoming
    for (const node of nodes) {
        if (node.id === sink.id) continue

        node.neighbors = node.neighbors.filter(e =>
            e.to !== source.id
        )
    }
}

const generateRandomFlowNetwork = (): AlgorithmInput => {

    const nodes: GraphNodeData[] = [
        {id: "0", value: 0, x: 295, y: 194, neighbors: []},
        {id: "1", value: 1, x: 505, y: 305, neighbors: []},
        {id: "2", value: 2, x: 505, y: 90, neighbors: []},
        {id: "3", value: 3, x: 705, y: 90, neighbors: []},
        {id: "4", value: 4, x: 705, y: 305, neighbors: []},
        {id: "5", value: 5, x: 905, y: 194, neighbors: []}
    ]

   // Adds mandatory edges in flow network
    addMandatoryEdges(nodes)

    // Adds random edges in the middle structure
    addRandomEdges(nodes)


    // Ensures, that the set structure is enforced
    enforceStructure(nodes)

    return {
        type: "graph",
        data: {
            nodes,
            directed: true
        }
    }
}

export default generateRandomFlowNetwork