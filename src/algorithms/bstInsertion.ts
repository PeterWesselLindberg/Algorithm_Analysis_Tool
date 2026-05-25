import type { VisualizationStep }
from "../types/VisualizationStep"

import pushStep
from "../utils/pushStep"

import layoutTree from "../utils/layoutTree"
import type { AlgorithmInput } from "../types/algorithmtypes"

import type { TreeNodeData } from "../dataStructures/TreeNodedata"

export const bstInsert = (
    root: TreeNodeData,
    value: number,
    steps: VisualizationStep[],
    index: number = 1,
    insertedValues: number[] = []
) => {

  let current = root

  while (true) {

    // VISIT NODE
    layoutTree(root)

    pushStep(steps, {
        tree: structuredClone(root),
        activeIds: [current.id],

        linears: [
        {
            id: "inserted",
            label: "Inserted Values",
            values: [...insertedValues]
        }
        ]
    })

    const direction =
      value < current.value ? 0 : 1

    const child =
      current.children?.[direction]

    // INSERT
    if (!child) {

      const newNode: TreeNodeData = {
        id: index.toString(),
        value,
        x: 0,
        y: 0,
        children: []
      }

      current.children =
        current.children ?? []

      current.children[direction] =
        newNode

      insertedValues.push(value)

      layoutTree(root)

      pushStep(steps, {
        tree: structuredClone(root),
        activeIds: [newNode.id],
        activeEdgeIds: [
          `${current.id}->${newNode.id}`
        ],

        linears: [
        {
            id: "inserted",
            label: "Inserted Values",
            values: [...insertedValues]
        }
        ]
      })
      return
    }
        pushStep(steps, {
            tree: structuredClone(root),
            activeIds: [current.id],
            activeEdgeIds: [`${current.id}->${child.id}`],
            linears: [
            {
                id: "inserted",
                label: "Inserted Values",
                values: [...insertedValues]
            }]
        })

        current = child
    }
  }

const bstInsertion = (
  input: AlgorithmInput
): VisualizationStep[] => {

  // BST insertiopn only supports arrays
    if (input.type !== "array") {
        return []
    }
    const inputArr = input.data
    const steps: VisualizationStep[] = []
    const values = inputArr

    if (values.length === 0) return steps

    const insertedValues: number[] = [values[0]]

    const root: TreeNodeData = {
        id: "0",
        value: values[0],
        x: 0,
        y: 0,
        children: []
    }

    pushStep(steps, {
        tree: root,
        activeIds: [root.id],
        linears: [
        {
            id: "inserted",
            label: "Inserted Values",
            values: [...insertedValues]
        }
    ]
    })

    for (let i = 1; i < values.length; i++) {
        bstInsert(root, values[i], steps, i, insertedValues)
    }

    return steps
}

export default bstInsertion