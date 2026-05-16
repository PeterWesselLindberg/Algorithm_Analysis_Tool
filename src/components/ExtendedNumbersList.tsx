import { ListGroup } from "react-bootstrap"

interface ExtendedNumberListProps {
  idPrefix: string | undefined
  numbers: number[]
  activeIds?: string[]
  compareIds?: string[]
  sortedIds?: string[]
}

const ExtendedNumberList = ({
  idPrefix,
  numbers,
  activeIds = [],
  compareIds = [],
  sortedIds = []
}: ExtendedNumberListProps) => {
    return (
        <ListGroup horizontal className="custom-listgroup">

        {numbers.map((num, index) => {

            const id = `${idPrefix}-${index}`

            let variant

            if (sortedIds.includes(id)) {
            variant = "success"
            }
            else if (activeIds.includes(id)) {
            variant = "warning"
            }
            else if (compareIds.includes(id)) {
            variant = "danger"
            }

            return (
            <ListGroup.Item
                key={id}
                variant={variant}
            >
                {num}
            </ListGroup.Item>
            )
        })}

        </ListGroup>
    )
    }

export default ExtendedNumberList