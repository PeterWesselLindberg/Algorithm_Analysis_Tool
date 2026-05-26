const generateRandomBalancedValues = (
  length: number = 10,
  hasDuplicates: boolean = true,
  targetExists: boolean = false,
  forceRootValue: boolean = false
) => {
  const min = 0
  const max = 30

  const used = new Set<number>()
  const values: number[] = []

 
  // Generate base pool
  while (values.length < length) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min

    if (!hasDuplicates && used.has(value)) continue

    values.push(value)
    used.add(value)
  }

  // Force root value
  if (forceRootValue) {
    const rootValue = values[0]
    values.splice(values.indexOf(rootValue), 1)
    values.unshift(rootValue)
  }

  
  // Handle target existence
  let target = Math.floor(Math.random() * (max - min + 1)) + min

  if (targetExists) {
    
    // ensure target is in list
    if (!values.includes(target)) {
      values[Math.floor(Math.random() * values.length)] = target
    }
  }

  // BALANCED BST ORDER
  const sorted = [...values].sort((a, b) => a - b)

  const result: number[] = []

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