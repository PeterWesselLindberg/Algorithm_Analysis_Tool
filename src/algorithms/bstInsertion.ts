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

    // GO LEFT
    if (value < current.value) {

        if (!current.children?.[0]) {

        const newNode: TreeNodeData = {
            id: index.toString(),
            value,
            x: 0,
            y: 0,
            children: []
        }

        current.children = current.children ?? []
        current.children[0] = newNode

        insertedValues.push(value)

        layoutTree(root)

        pushStep(steps, {
            tree: structuredClone(root),
            activeIds: [newNode.id],
            activeEdgeIds: [`${current.id}->${newNode.id}`],
            linears: [
            {
                id: "inserted",
                label: "Inserted Values",
                values: [...insertedValues]
            }]
        })

        return
      }

      const child = current.children[0]

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

    // GO RIGHT
    else {

        if (!current.children?.[1]) {

            const newNode: TreeNodeData = {
                id: index.toString(),
                value,
                x: 0,
                y: 0,
                children: []
            }

            current.children = current.children ?? []
            current.children[1] = newNode

            insertedValues.push(value)

            layoutTree(root)

            pushStep(steps, {
                tree: structuredClone(root),
                activeIds: [newNode.id],
                activeEdgeIds: [`${current.id}->${newNode.id}`],
                linears: [
                {
                    id: "inserted",
                    label: "Inserted Values",
                    values: [...insertedValues]
                }]
            })

            return
        }

        const child = current.children[1]

        layoutTree(root)

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