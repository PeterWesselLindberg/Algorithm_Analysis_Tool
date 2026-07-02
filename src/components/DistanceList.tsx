import { ListGroup } from "react-bootstrap"

interface DistanceListProps {
    distances?: Record<string, number>
}

const DistanceList = ({
    distances = {}
}: DistanceListProps) => {

    return (
        <ListGroup horizontal className="custom-listgroup">

            {Object.entries(distances).map(
                ([nodeId, distance], i) => (

                    <div key={`${nodeId}-${i}`} className="custom-listelm">

                        {/* Index label */}
                        <small className="index-label">
                            {nodeId}
                        </small>

                        {/* Distance value */}
                        <ListGroup.Item>

                            {distance === Infinity
                              ? "∞"
                              : distance}

                        </ListGroup.Item>

                    </div>
                )
            )}

        </ListGroup>
    )
}

export default DistanceList