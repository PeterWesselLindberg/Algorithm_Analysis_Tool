import type { GraphData }from "../dataStructures/GraphData"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"
import type { AlgorithmInput } from "../types/algorithmtypes"

/** Helper function for generateRandomGraphCore, which creates a path to the last node from any node */
const forceGuaranteedPath = (
  nodes: GraphNodeData[],
  from: number,
  to: number,
  negWeights: boolean,
) => {

  for (let i = from; i < to; i++) {
    addEdge(nodes[i], nodes[i + 1], true, true, negWeights)
  }
}

/** Helper function, which adds edges and ensure no bidirectional or duplicate edges occur */
const addEdge = (
  from: GraphNodeData,
  to: GraphNodeData,
  weighted: boolean, // If the edges are weighted
  directed: boolean, // If the edges are directed
  negWeights: boolean // If the negative weights are allowed
) => {

    // Prevent duplicate edge
    if (
        from.neighbors.some(
        edge => edge.to === to.id
        )
    ) {
        return
    }

    // Prevent reverse edge in directed graph
    if (
        directed &&
        to.neighbors.some(
        edge => edge.to === from.id
        )
    ) {
        return
    }
    let weight

    if (negWeights) {
        weight =
            weighted
            ? Math.floor(Math.random() * 21) - 10
            : undefined

    }
    else {
         weight =
            weighted
            ? Math.floor(Math.random() * 20) + 1
            : undefined
    }    

    from.neighbors.push({
        to: to.id,
        weight
    })

    if (!directed) {

        to.neighbors.push({
        to: from.id,
        weight
        })
    }
}


// Generates random graphs of a given size
const generateRandomGraphCore = (
    nodeCount: number, // Amount of nodes in the graph
    forceConnectivity: boolean, // If all nodes are connected to at least one other node
    weighted: boolean, // If edges are weighted
    directed: boolean, // If edges are directed
    negWeights: boolean, // If negative edge weights are allowed
    forcePath: boolean // Forces a path between the last node and a random node and the start node
): GraphData => {

    const nodes : GraphNodeData[] = []

    const centerX = 400
    const centerY = 250

    const radius = 180
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {

        const angle =  (-Math.PI / 2) + (2 * Math.PI * i) / nodeCount

        const x =
            centerX + radius * Math.cos(angle)

        const y =
            centerY + radius * Math.sin(angle)

        nodes.push({
            id: i.toString(),

            value: i,

            x,
            y,

            neighbors: []
        })
    }

    // Forces path to last node from another node
    if(forcePath) {
        const sourceIndex = Math.floor(Math.random() * (nodeCount - 1))
        forceGuaranteedPath(nodes, sourceIndex, nodeCount - 1, negWeights)
    }

    // Guarantee connected graph
    if (forceConnectivity) {

        for (let i = 1; i < nodeCount; i++) {

            addEdge(
                nodes[i],
                nodes[i - 1],
                weighted,
                directed,
                negWeights
            )
        }
    }

    // Create random edges
    for (let i = 0; i < nodeCount; i++) {

        for (let j = i + 1; j < nodeCount; j++) {

            // 30% chance of edge
            if (Math.random() < 0.3) {

                addEdge(
                nodes[i],
                nodes[j],
                weighted,
                directed,
                negWeights
                )
            }
        }
    }

    // Guarantee node 0 is connected to at least 1 other node
    const rootNode = nodes[0]

    if (rootNode && rootNode.neighbors.length === 0 && nodeCount > 1) {

        // Random node except itself
        const randomIndex = Math.floor(Math.random() * (nodeCount - 1)) + 1

        const target = nodes[randomIndex]

        addEdge(
            rootNode,
            target,
            weighted,
            directed,
            negWeights
        )
    }

    return { nodes, directed }
}

/** Wrapper function for generating random graphs */
const generateRandomGraph = (
    nodeCount: number, // Amount of nodes in the graph
    forceConnectivity: boolean = false, // If false node aren't guaranteed to be connected to any nodes
    weighted: boolean = false, // If false edges do not have weights
    directed: boolean = false, // If false edges are not directed
    negWeights: boolean = false, // If false negative edge weights do not occur
    forcePath: boolean = false // Forces a path between a random node and the last node
) : AlgorithmInput => {
    return {type: "graph", data: generateRandomGraphCore(nodeCount, forceConnectivity, weighted, directed, negWeights, forcePath)}
}

export default generateRandomGraph