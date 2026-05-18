import { ListGroup } from "react-bootstrap"

interface VisitedListProps{
    visitedIds: string[]
}

const VisitedList = ({ visitedIds }: VisitedListProps) => {
  return (
    <ListGroup horizontal className="custom-listgroup">
            {visitedIds.map((id, i) => (
            <div 
                key={`${id}-${i}`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {/* INDEX LABEL */}
                <small style={{ marginBottom: "4px", color: "#888" }}>
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