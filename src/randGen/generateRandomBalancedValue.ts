/** Randomly generates the node values and the target to be used with BST trees of a given length*/
const generateRandomBalancedValues = (
  length: number = 10, // Length of tree
  hasDuplicates: boolean = true, // Set to true if duplicates are allowed
  targetExists: boolean = false // Set to true if target has to exists in the tree
) => {
  const min = 0
  const max = 30

  const used = new Set<number>()
  const values: number[] = []

 
  // Generates base pool
  while (values.length < length) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min

    if (!hasDuplicates && used.has(value)) continue

    values.push(value)
    used.add(value)
  }
  
  // Handle target existence
  let target = Math.floor(Math.random() * (max - min + 1)) + min

  if (targetExists) {
    
    // Ensures target is in list
    if (!values.includes(target)) {
      values[Math.floor(Math.random() * values.length)] = target
    }
  }

  // Balanced BST order
  const sorted = [...values].sort((a, b) => a - b)

  const result: number[] = []

  // Builds the balanced order
  const buildBalanced = (left: number, right: number) => {
    if (left > right) return

    const mid = Math.floor((left + right) / 2)

    result.push(sorted[mid])

    buildBalanced(left, mid - 1)
    buildBalanced(mid + 1, right)
  }

  buildBalanced(0, sorted.length - 1)

  return {
    values: result,
    target
  }
}

export default generateRandomBalancedValues