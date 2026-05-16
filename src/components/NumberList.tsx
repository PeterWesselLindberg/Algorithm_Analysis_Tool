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
          <ListGroup.Item key={id} variant={variant}>
            {num}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default NumberList