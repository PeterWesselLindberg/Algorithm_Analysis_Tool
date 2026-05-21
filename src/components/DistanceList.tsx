import { ListGroup } from "react-bootstrap"

interface DistanceListProps {
  distances?: Record<string, number>
}

const DistanceList = ({
  distances = {}
}: DistanceListProps) => {

  return (
    <ListGroup
      horizontal
      className="custom-listgroup"
    >

      {Object.entries(distances).map(
        ([nodeId, distance], i) => (

        <div
          key={`${nodeId}-${i}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >

          {/* INDEX LABEL */}
          <small
            style={{
              marginBottom: "4px",
              color: "#888"
            }}
          >
            {nodeId}
          </small>

          {/* DISTANCE VALUE */}
          <ListGroup.Item>

            {distance === Infinity
              ? "∞"
              : distance}

          </ListGroup.Item>

        </div>
      ))}

    </ListGroup>
  )
}

export default DistanceList