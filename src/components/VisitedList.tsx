import { ListGroup } from "react-bootstrap"

interface VisitedListProps{
    visitedIds: string[]
}

const VisitedList = ({ visitedIds }: VisitedListProps) => {
  return (
    <ListGroup horizontal className="custom-listgroup">
        {visitedIds.map((id, i) => (
        <div key={`${id}-${i}`} className="custom-listelm">
            {/* INDEX LABEL */}
            <small className="index-label">
                {i}
            </small>
            
            {/* VALUE */}
            <ListGroup.Item>
                {id}
            </ListGroup.Item>
        </div>
            
        ))}

    </ListGroup>
  )
}

export default VisitedList