import Bar from "./Bar"
import toId from "../utils/toId"

interface BarsListProps {
  numbers: number[]
  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const BarsList = ({
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = []
}: BarsListProps) => {

  const maxValue = Math.max(...numbers)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        height: "300px",
        marginTop: "2rem"
      }}
    >
      {numbers.map((num, index) => {
        const id = toId(index)

        return (
          <Bar
            key={id}
            value={num}
            maxValue={maxValue}
            isActive={activeIds.includes(id)}
            isComparing={compareIds.includes(id)}
            isSorted={sortedIds.includes(id)}
          />
        )
      })}
    </div>
  )
}

export default BarsList