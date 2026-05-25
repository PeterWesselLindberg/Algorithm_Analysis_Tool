import type {VisualizationType } from "../types/VisualizationType"
import BarsList from "./BarsList"
import NumberList from "./NumberList"
import type { VisualizationStep } from "../types/VisualizationStep"
import TreeVisualizer from "./TreeVisualizer"
import ExtendedNumberList from "./ExtendedNumbersList"
import VisitedList from "./VisitedList"
import GraphVisualizer from "./GraphVisualizer"
import DistanceList from "./DistanceList"
import MSTEdgeList from "./MSTEdgeList"
import { ListGroup } from "react-bootstrap"

interface VisualizerProps {
  step: VisualizationStep
  visualizationType: VisualizationType
}

/** Decides, which sorting graphics to use for which algoritm based on limited input strings */
const Visualizer = ( {step, visualizationType} : VisualizerProps ) => {
  const numbers = step.linear?.values ?? []
  const linears = step.linears ?? []
  const activeIds = step.activeIds ?? []
  const compareIds = step.compareIds ?? []
  const sortedIds = step.sortedIds ?? []
  switch(visualizationType) {
    case "list/bar": 
        return (
         <>
          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />

          <hr />

          <NumberList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
        </>
      )
    case "list/bar/tree": 
        return (
         <>
          <TreeVisualizer
            step={step}
            tree={step.tree}
            numbers={numbers}
          />
          <hr />

          <BarsList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />

          <hr />

          <NumberList
            numbers={numbers}
            activeIds={activeIds}
            compareIds={compareIds}
            sortedIds={sortedIds}
          />
        </>
      )

    case "list/list/list":
      return (
        <>
          {linears?.map((linear) => (

          <div key={linear.id}>
            <h5>{linear.label}</h5>

            <ExtendedNumberList
              idPrefix={linear.id}
              numbers={linear.values}

              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />

            <hr />
          </div>

        ))}
        </>
      )
    
    case "list":
      return (
        <>
            <NumberList
              numbers={numbers}
              activeIds={activeIds}
              compareIds={compareIds}
              sortedIds={sortedIds}
            />
            
            <hr />
        </>
      )
    
    case "list/tree":
      return (
        <>
          <TreeVisualizer
          step={step}
          tree={step.tree}
          numbers={numbers}
          />
          <hr />

          <VisitedList visitedIds={step.visitedIds ?? []} />
            
          
        </>
      )
    
    case "list/exTree":
      return (
        <>
          <TreeVisualizer
          step={step}
          tree={step.tree}
          numbers={numbers}
          />
          <hr />

          {linears?.map((linear) => (

            <div key={linear.id}>
              <h5>{linear.label}</h5>

              <ExtendedNumberList
                idPrefix={linear.id}
                numbers={linear.values}

                activeIds={activeIds}
                compareIds={compareIds}
                sortedIds={sortedIds}
              />
            </div>
          ))}
          
        </>
      )

    case "TVList/tree":
      return (
        <>
          <TreeVisualizer
          step={step}
          tree={step.tree}
          numbers={numbers}
          />
          {step.message && (
          <p
            style={{
              marginTop: "1rem",
              fontWeight: "bold"
            }}
          >
            {step.message}
          </p>
          )}
          <hr />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "2rem",
              marginTop: "1rem"
            }}
          >

            <div
              style={{
                minWidth: "180px"
              }}
            >

              {step.target !== undefined && (
                <>
                  <h5>Target:</h5>

                  <ListGroup horizontal className="custom-listgroup">

                    <div
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
                        Target
                      </small>

                      <ListGroup.Item
                        style={{
                          fontWeight: "bold",
                          minWidth: "100px",
                          textAlign: "center"
                        }}
                      >
                        {step.target}
                      </ListGroup.Item>

                    </div>

                  </ListGroup>
                </>
              )}

            </div>

            <div style={{ flex: 1 }}>

              {step.visitedIds && (
                <>
                  <h5>Visited list:</h5>

                  <VisitedList
                    visitedIds={step.visitedIds ?? []}
                  />
                </>
              )}

            </div>

          </div>

        </>
      )

    case "list/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          {step.message && (
          <p
            style={{
              marginTop: "1rem",
              fontWeight: "bold"
            }}
          >
            {step.message}
          </p>
          )}
          <hr />

          <VisitedList visitedIds={step.visitedIds ?? []} />

        </>
      )
    
    case "distList/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          {step.message && (
          <p
            style={{
              marginTop: "1rem",
              fontWeight: "bold"
            }}
          >
            {step.message}
          </p>
          )}
          <hr />

          <DistanceList distances={step.distances }/>

        </>
      )

    case "mstList/graph":
      return (
        <>
          <GraphVisualizer
            step={step}
            graph={step.graph}
          />
          {step.message && (
          <p
            style={{
              marginTop: "1rem",
              fontWeight: "bold"
            }}
          >
            {step.message}
          </p>
          )}
          <hr />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "2rem",
              marginTop: "1rem"
            }}
          >

            <div
              style={{
                minWidth: "180px"
              }}
            >

              {step.mstWeight !== undefined && (
                <>
                  <h5>Total Weight:</h5>

                  <ListGroup horizontal className="custom-listgroup">

                    <div
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
                        Total
                      </small>

                      <ListGroup.Item
                        style={{
                          fontWeight: "bold",
                          minWidth: "100px",
                          textAlign: "center"
                        }}
                      >
                        {step.mstWeight}
                      </ListGroup.Item>

                    </div>

                  </ListGroup>
                </>
              )}

            </div>

            <div style={{ flex: 1 }}>

              {step.mstEdges && (
                <>
                  <h5>MST Edges:</h5>

                  <MSTEdgeList
                    edges={step.mstEdges}
                  />
                </>
              )}

            </div>

          </div>

        </>
      )

  } 
  
    
}

export default Visualizer