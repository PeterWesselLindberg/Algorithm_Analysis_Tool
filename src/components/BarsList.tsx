import Bar from "./Bar"

interface BarsListProps {
  numbers: number[]
  activeIndex?: number
  compareIndex?: number
  sortedIndices?: number[]
}

const BarsList = ({
  numbers,
  activeIndex,
  compareIndex,
  sortedIndices
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
      {numbers.map((num, index) => (
        <Bar
          key={index}
          value={num}
          maxValue={maxValue}
          isActive={index === activeIndex}
          isComparing={index === compareIndex}
          isSorted={sortedIndices?.includes(index)}
        />
      ))}
    </div>
  )
}

export default BarsList