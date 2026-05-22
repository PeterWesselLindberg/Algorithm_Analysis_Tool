import { ListGroup }
from "react-bootstrap"

interface MSTEdgeListProps {
  edges: string[]
}

const MSTEdgeList = ({
  edges
}: MSTEdgeListProps) => {

  return (
    <ListGroup
      horizontal
      className="custom-listgroup"
    >

      {edges.map((edge, i) => (

        <div
          key={`${edge}-${i}`}

          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >

          <small
            style={{
              marginBottom: "4px",
              color: "#888"
            }}
          >
            {i}
          </small>

          <ListGroup.Item>
            {edge}
          </ListGroup.Item>

        </div>
      ))}
    </ListGroup>
  )
}

export default MSTEdgeList