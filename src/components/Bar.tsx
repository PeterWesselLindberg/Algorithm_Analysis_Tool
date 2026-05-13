interface BarProps {
  value: number,
  maxValue: number,
  isActive?: boolean,
  isComparing?: boolean,
  isSorted?: boolean
}

const Bar = ({
  value,
  maxValue,
  isActive,
  isComparing,
  isSorted
}: BarProps) => {

  const scaledHeight = (value / maxValue) * 300

  let backgroundColor = "#0d6efd"

  if (isSorted) backgroundColor = "#198754"
  if (isActive) backgroundColor = "#ffc107"
  if (isComparing) backgroundColor = "#dc3545"

  return (
    <div
      style={{
        height: `${scaledHeight}px`,
        width: "40px",
        backgroundColor,
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        color: "white",
        borderRadius: "4px 4px 0 0"
      }}
    >
      {value}
    </div>
  )
}

export default Bar