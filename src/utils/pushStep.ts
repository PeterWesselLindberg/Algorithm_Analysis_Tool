import type { VisualizationStep }
from "../types/VisualizationStep"

import buildHeapTree
from "../utils/buildHeapTree"

const pushStep = (
  numbers: number[],

  steps: VisualizationStep[],

  activeIds: string[] = [],
  compareIds: string[] = [],

  sortedIds: string[] = []
) => {

  steps.push({

    // LINEAR STRUCTURE
    linear: {
      values: [...numbers]
    },

    // TREE STRUCTURE
    tree:
      buildHeapTree(numbers),

    // VISUAL HIGHLIGHTS
    activeIds:
      [...activeIds],

    compareIds:
      [...compareIds],

    sortedIds:
      [...sortedIds]
  })
}

export default pushStep