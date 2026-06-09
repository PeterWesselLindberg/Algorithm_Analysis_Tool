import type { RBTreeNodeDataNew } from "../dataStructures/RBTreeNodeDataNew"
import type { VisualizationStep } from "../types/VisualizationStep"
import layoutTree from "./layoutTree"
import pushStepTree from "./pushStep"

const buildRedBlackTree = (values: number[]
): RBTreeNodeDataNew | null => {
  
    if (values.length === 0) {
        return null
    }

    let root: RBTreeNodeDataNew = {
        id: "0",
        value: values[0],
        color: "black",
        x: 0,
        y: 0,
        children: [null, null]
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
    root: RBTreeNodeDataNew,
    value: number,
    id: string,
    steps: VisualizationStep[] = [],
    doInsertTrace: boolean = false
) => {

    let current = root

    while (true) {

        if (doInsertTrace){
            if (current.id !== root.id) {
                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [current.id],
                    activeEdgeIds: [
                        `${current.parent?.id}->${current.id}`
                    ],
                })
            }
            

            pushStepTree(steps, {
                tree: structuredClone(root),
                activeIds: [current.id],

                message: `Checking ${current.value}`,
            })
        }
            
        // Left
        if (value < current.value) {

            if (current.children[0] === null) {

                const newNode: RBTreeNodeDataNew = {
                    id,
                    value,
                    color: "red",
                    parent: current,
                    x: 0,
                    y: 0,
                    children: [null, null]
                }

                current.children[0] = newNode

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStepTree(steps, {
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

                    pushStepTree(steps, {
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

            if (current.children[1] === null) {

                const newNode: RBTreeNodeDataNew = {
                    id,
                    value,
                    color: "red",
                    parent: current,
                    x: 0,
                    y: 0,
                    children: [null, null]
                }

                current.children[1] = newNode

                if (doInsertTrace) {
                    layoutTree(root)
                    pushStepTree(steps, {
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

                    pushStepTree(steps, {
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

export const rotateLeft = (
    root: RBTreeNodeDataNew,
    x: RBTreeNodeDataNew
): RBTreeNodeDataNew => {

    const y = x.children[1]

    if (!y) return root

    const beta = y.children[0]

    // Move y up
    y.parent = x.parent

    if (!x.parent) {
        root = y
    }

    else if (x === x.parent.children[0]) {
        x.parent.children[0] = y
    }

    else {
        x.parent.children[1] = y
    }

    // Rotate
    setChild(y, 0, x)
    setChild(x, 1, beta)

    return root
}

export const rotateRight = (
    root: RBTreeNodeDataNew,
    y: RBTreeNodeDataNew
): RBTreeNodeDataNew => {

    const x = y.children[0]

    if (!x) return root

    const beta = x.children[1]

    // Move x up
    x.parent = y.parent

    if (!y.parent) {
        root = x
    }

    else if (y === y.parent.children[0]) {
        y.parent.children[0] = x
    }

    else {
        y.parent.children[1] = x
    }

    // Rotate
    setChild(x, 1, y)
    setChild(y, 0, beta)

    return root
}

const fixInsertion = (
    root: RBTreeNodeDataNew,
    node: RBTreeNodeDataNew,
    steps: VisualizationStep[] = [],
    doInsertTrace: boolean = false
): RBTreeNodeDataNew => {

    let current = node

    while (current.parent && current.parent.color === "red") {

        const parent = current.parent
        const grandparent = parent.parent

        if (!grandparent) break

        const parentIsLeft = parent === grandparent.children[0]

        const uncle = parentIsLeft
            ? grandparent.children[1]
            : grandparent.children[0]

        // Case 1: uncle is red
        if (uncle?.color === "red") {
            
            if (doInsertTrace) {
                pushStepTree(steps, {
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
                pushStepTree(steps, {
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

            if (current === parent.children[1]) {
                if (doInsertTrace) {
                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id, current.parent.id],
                        message: "Case 2: Left rotation"
                    })
                }
                
                current = parent
                root = rotateLeft(root, current)

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id],
                        message: "Left rotation completed"
                    })
                }
            }

            if (doInsertTrace) {
                pushStepTree(steps, {
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

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Right rotation completed"
                })
            }
        }

        // Mirror case
        else {

            if (current === parent.children[0]) {
                if (doInsertTrace) {
                    
                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id, current.parent.id],
                        message: "Case 2: Right rotation"
                    })
                }

                current = parent
                root = rotateRight(root, current)

                if (doInsertTrace) {
                    layoutTree(root)

                    pushStepTree(steps, {
                        tree: structuredClone(root),
                        activeIds: [current.id],
                        message: "Right rotation completed"
                    })
                }
            }

            if (doInsertTrace) {
                pushStepTree(steps, {
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

                pushStepTree(steps, {
                    tree: structuredClone(root),
                    activeIds: [parent.id],
                    message: "Left rotation completed"
                })
            }
        }
    }
    if (root.color !== "black" && doInsertTrace) {

        root.color = "black"

        pushStepTree(steps, {
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


const setChild = (
  parent: RBTreeNodeDataNew,
  index: 0 | 1,
  child: RBTreeNodeDataNew | null
) => {

  parent.children[index] = child

  if (child) {
    child.parent = parent
  }
}

export default buildRedBlackTree