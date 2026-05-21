import type { GraphData } from "../dataStructures/GraphData"

const choooseRandomNodes = (
  graph: GraphData
) : [number, number] => {

  const startIndex =
    Math.floor(
      Math.random() * graph.nodes.length
    )

  let targetIndex =
    Math.floor(
      Math.random() * graph.nodes.length
    )

  // ensure different nodes
  while (targetIndex === startIndex) {

    targetIndex =
      Math.floor(
        Math.random() * graph.nodes.length
      )
  }

  return [startIndex, targetIndex]
}

export default choooseRandomNodes