const buildShortestPath = (
  previous: Record<string, string | undefined>,
  targetId: string
) => {
  const shortestPathIds: string[] = []
  const shortestPathEdgeIds: string[] = []

  let currentId: string | null = targetId

  const visited = new Set<string>() // 🔥 prevents infinite loops

  while (currentId !== null && !visited.has(currentId)) {
    visited.add(currentId)

    shortestPathIds.push(currentId)

    const prev: string | undefined = previous[currentId]

    if (prev === null || prev === undefined) {
      break
    }

    shortestPathEdgeIds.push(`${prev}->${currentId}`)

    currentId = prev
  }

  shortestPathIds.reverse()
  shortestPathEdgeIds.reverse()

  return {
    shortestPathIds,
    shortestPathEdgeIds
  }
}

export default buildShortestPath