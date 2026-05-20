import type { GraphData }from "../dataStructures/GraphData"
import type { GraphNodeData } from "../dataStructures/GraphNodeData"

const generateRandomGraph = (nodeCount: number, forceConnectivity: boolean = false, weighted: boolean = false, directed: boolean = false): GraphData => {

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

            const edge = {
            to: nodes[i - 1].id,

            ...(weighted && {
                weight:
                Math.floor(Math.random() * 20) + 1
            })
            }

            const reverseEdge = {
            to: nodes[i].id,

            ...(weighted && {
                weight: edge.weight
            })
            }

            nodes[i].neighbors.push(edge)

            if (!directed) {
                 nodes[i-1].neighbors.push(reverseEdge)
            }
        }
    }

    // CREATE RANDOM EDGES
    for (let i = 0; i < nodeCount; i++) {

        for (let j = i + 1; j < nodeCount; j++) {

            // 30% chance of edge
            if (Math.random() < 0.3) {

                const edge = {
                    to: nodes[j].id,

                    ...(weighted && {
                    weight:
                        Math.floor(Math.random() * 20) + 1
                    })
                }

                const reverseEdge = {
                    to: nodes[i].id,

                    ...(weighted && {
                    weight: edge.weight
                    })
                }

                nodes[i].neighbors.push(edge)

                if (!directed) {
                    nodes[j].neighbors.push(reverseEdge)
                }
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

    const edge = {
        to: target.id,

        ...(weighted && {
            weight:
            Math.floor(Math.random() * 20) + 1
        })
        }

        const reverseEdge = {
        to: rootNode.id,

        ...(weighted && {
            weight: edge.weight
        })
        }

        rootNode.neighbors.push(edge)

        if (!directed) {
            target.neighbors.push(reverseEdge)
        }
    }

    return { nodes, directed }
}

export default generateRandomGraph