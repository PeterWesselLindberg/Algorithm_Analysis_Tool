import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import type { VisualizationStep } from "../types/VisualizationStep"
import layoutTree from "./layoutTree"
import pushStep from "./pushStep"

const buildRedBlackTree = (values: number[]
): RBTreeNodeData | undefined => {
  
    if (values.length === 0) {
        return undefined
    }

    let root: RBTreeNodeData = {
        id: "0",
        value: values[0],
        color: "black",
        x: 0,
        y: 0,
        children: []
    }

    for (let i = 1; i < values.length; i++) {

        root = insertRBNode(
            root,
            values[i],
            i.toString()
        )
    }

    layoutTree(root)

    return root
}

export const insertRBNode = (
    root: RBTreeNodeData,
    value: number,
    id: string,
    steps: VisualizationStep[] = [],
    doInsertTrace: boolean = false
) => {

    let current = root

    while (true) {

        if (doInsertTrace){
            if (current.id !== root.id) {
                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [current.id],
                    activeEdgeIds: [
                        `${current.parent?.id}->${current.id}`
                    ],
                })
            }
            

            pushStep(steps, {
                tree: structuredClone(root),
                activeIds: [current.id],

                message: `Checking ${current.value}`,
            })
        }
            
        // Left
        if (value < current.value) {

            if (!current.children?.[0]) {

                const newNode: RBTreeNodeData = {
                    id,
                    value,
                    color: "red",
                    parent: current,
                    x: 0,
                    y: 0,
                    children: []
                }

                current.children = current.children ?? []
                current.children[0] = newNode

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStep(steps, {
                        tree: structuredClone(root),
                        activeIds: [newNode.id],
                        activeEdgeIds: [
                            `${current.id}->${newNode.id}`
                        ],

                        message: `Inserted ${value} as RED`
                    })
                }

                root = fixInsertion(root, newNode, steps, doInsertTrace)

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStep(steps, {
                        tree: structuredClone(root),
                        message: "Tree rebalanced"
                    })
                }

                return root
            }

            current = current.children[0]
        }

        // Right
        else {

            if (!current.children?.[1]) {

                const newNode: RBTreeNodeData = {
                    id,
                    value,
                    color: "red",
                    parent: current,
                    x: 0,
                    y: 0,
                    children: []
                }

                current.children = current.children ?? []
                current.children[1] = newNode

                if (doInsertTrace) {
                    layoutTree(root)
                    pushStep(steps, {
                        tree: structuredClone(root),
                        activeIds: [newNode.id],
                        activeEdgeIds: [
                            `${current.id}->${newNode.id}`
                        ],
                        
                        message: `Inserted ${value} as RED`
                    })
                }
                
                root = fixInsertion(root, newNode, steps, doInsertTrace)

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStep(steps, {
                        tree: structuredClone(root),
                        message: "Tree rebalanced"
                    })
                }

                return root
            }

            current = current.children[1]
        }
    }
}

const rotateLeft = (
    root: RBTreeNodeData,
    x: RBTreeNodeData
): RBTreeNodeData => {

    const y = x.children?.[1]

    if (!y) return root

    if (y.children?.[0]) {
      x.children![1] = y.children[0]
    } 
    
    else {
        x.children!.splice(1, 1)
    }

    if (y.children?.[0]) {
        y.children[0].parent = x
    }

    y.parent = x.parent

    if (!x.parent) {
        root = y
    }

    else if (x === x.parent.children?.[0]) {
        x.parent.children![0] = y
    }
  
    else {
      x.parent.children![1] = y
    }

    y.children = y.children ?? []
    y.children[0] = x

    x.parent = y

    return root
}

const rotateRight = (
    root: RBTreeNodeData,
    y: RBTreeNodeData
): RBTreeNodeData => {

    const x = y.children?.[0]
    if (!x) return root

    // x's right subtree becomes y's left subtree
    const xRight = x.children?.[1]

    if (xRight) {
        y.children![0] = xRight
        xRight.parent = y
    } 
    
    else {
        // Remove left slot entirely instead of assigning undefined
        y.children!.splice(0, 1)
    }

    x.parent = y.parent

    if (!y.parent) {
        root = x
    }

    else if (y === y.parent.children?.[0]) {
        y.parent.children![0] = x
    } 
    
    else {
        y.parent.children![1] = x
    }

    // Perform rotation
    x.children![1] = y
    y.parent = x

    return root
}

const fixInsertion = (
    root: RBTreeNodeData,
    node: RBTreeNodeData,
    steps: VisualizationStep[] = [],
    doInsertTrace: boolean = false
): RBTreeNodeData => {

    let current = node

    while (current.parent && current.parent.color === "red") {

        const parent = current.parent
        const grandparent = parent.parent

        if (!grandparent) break

        const parentIsLeft = parent === grandparent.children?.[0]

        const uncle = parentIsLeft
            ? grandparent.children?.[1]
            : grandparent.children?.[0]

        // Case 1: uncle is red
        if (uncle?.color === "red") {
            
            if (doInsertTrace) {
                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [
                        current.id,
                        current.parent.id,
                        uncle.id,
                        grandparent.id
                    ],
                    message: "Case 1: Recoloring"
                })
            }

            parent.color = "black"
            uncle.color = "black"
            grandparent.color = "red"
            
            if (doInsertTrace) {
                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [grandparent.id],
                    message: "Recolored parent, uncle, and grandparent"
                })
            }
            
            current = grandparent
            continue
        }

        // Case 2 + 3 left side
        if (parentIsLeft) {

            if (current === parent.children?.[1]) {
                if (doInsertTrace) {
                    pushStep(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id, current.parent.id],
                        message: "Case 2: Left rotation"
                    })
                }
                
                current = parent
                root = rotateLeft(root, current)

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStep(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id],
                        message: "Left rotation completed"
                    })
                }
            }

            if (doInsertTrace) {
                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, grandparent.id],
                    message: "Case 3: Recolor and rotate right"
                })
            }

            parent.color = "black"
            grandparent.color = "red"

            root = rotateRight(root, grandparent)

            if (doInsertTrace) {
                layoutTree(root)

                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Right rotation completed"
                })
            }
        }

        // Mirror case
        else {

            if (current === parent.children?.[0]) {
                if (doInsertTrace) {
                    
                    pushStep(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id, current.parent.id],
                        message: "Case 2: Right rotation"
                    })
                }

                current = parent
                root = rotateRight(root, current)

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStep(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id],
                        message: "Right rotation completed"
                    })
                }
            }

            if (doInsertTrace) {
                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id, grandparent.id],
                    message: "Case 3: Recolor and rotate left"
                })
            }

            parent.color = "black"
            grandparent.color = "red"

            root = rotateLeft(root, grandparent)

            if (doInsertTrace) {
                layoutTree(root)

                pushStep(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Left rotation completed"
                })
            }
        }
    }
    if (root.color !== "black" && doInsertTrace) {

        root.color = "black"

        pushStep(steps, {
            tree: structuredClone(root),
            activeIds: [root.id],
            message: "Root must always be black"
        })
    }

    else {
        root.color = "black"
    }

    return root
}

export default buildRedBlackTree