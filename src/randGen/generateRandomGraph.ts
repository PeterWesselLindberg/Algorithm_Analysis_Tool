import type { GraphData }from "../dataStructures/GraphData"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"

const addEdge = (
  from: GraphNodeData,
  to: GraphNodeData,
  weighted: boolean,
  directed: boolean,
  negWeights: boolean
) => {

    // prevent duplicate edge
    if (
        from.neighbors.some(
        edge => edge.to === to.id
        )
    ) {
        return
    }

    // prevent reverse edge in directed graph
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
            ? Math.floor(Math.random() * 20) + 1 //? Math.floor(Math.random() * 21) - 10
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


const generateRandomGraph = (
    nodeCount: number,
    forceConnectivity: boolean = false,
    weighted: boolean = false,
    directed: boolean = false,
    negWeights: boolean = false
): GraphData => {

    const nodes : GraphNodeData[] = []

    const centerX = 400
    const centerY = 250

    const radius = 180
    
    // CREATE NODES
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

    // GUARANTEE CONNECTED GRAPH
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

    // CREATE RANDOM EDGES
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

    // GUARANTEE NODE 0 IS CONNECTED TO ATLEAST 1 OTHER NODE
    const rootNode = nodes[0]

    if (
        rootNode &&
        rootNode.neighbors.length === 0 &&
        nodeCount > 1
    ) {

        // random node except itself
        const randomIndex =
            Math.floor(
                Math.random() * (nodeCount - 1)
            ) + 1

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

export default generateRandomGraph