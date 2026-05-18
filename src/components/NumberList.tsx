import { ListGroup } from "react-bootstrap"
import toId from "../utils/toId"

interface NumberListProps {
  numbers: number[]
  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const NumberList = ({
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = []
}: NumberListProps) => {

  return (
    
    <ListGroup horizontal className="custom-listgroup">
      {numbers.map((num, index) => {
        const id = toId(index)

        let variant: "success" | "warning" | "danger" | undefined

        if (sortedIds.includes(id)) {
          variant = "success"
        }
        if (activeIds.includes(id)) {
          variant = "warning"
        }
        if (compareIds.includes(id)) {
          variant = "danger"
        }

         return (
          <div
            key={id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* INDEX LABEL */}
            <small style={{ marginBottom: "4px", color: "#888" }}>
              {index}
            </small>

            {/* VALUE */}
            <ListGroup.Item variant={variant}>
              {num}
            </ListGroup.Item>
          </div>
        )
      })}
    </ListGroup>
  )
}

export default NumberList