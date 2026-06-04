import type { RBTreeNodeData } from "../dataStructures/RBTreeNodeData"
import layoutTree from "./layoutTree"

const buildRedBlackTree = (
    values: number[]
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

        root = insertNode(
            root,
            values[i],
            i.toString()
        )
    }

    layoutTree(root)

    return root
}

const insertNode = (
    root: RBTreeNodeData,
    value: number,
    id: string
) => {

    let current = root

    while (true) {

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
                
                return fixInsertion(root, newNode)
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

                return fixInsertion(root, newNode)
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
    node: RBTreeNodeData
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

            parent.color = "black"
            uncle.color = "black"
            grandparent.color = "red"

            current = grandparent
            continue
        }

        // Case 2 + 3 left side
        if (parentIsLeft) {

            if (current === parent.children?.[1]) {
                current = parent
                root = rotateLeft(root, current)
            }

            parent.color = "black"
            grandparent.color = "red"

            root = rotateRight(root, grandparent)
        }

        // Mirror case
        else {

            if (current === parent.children?.[0]) {
                current = parent
                root = rotateRight(root, current)
            }

            parent.color = "black"
            grandparent.color = "red"

            root = rotateLeft(root, grandparent)
        }
    }

    root.color = "black"
    return root
}

export default buildRedBlackTree