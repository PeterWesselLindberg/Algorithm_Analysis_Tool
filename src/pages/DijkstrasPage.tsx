import AnimationManager from "../components/AnimationManager"
import TopNavBar from "../components/TopNavBar"
import { useSearchParams } from "react-router-dom"
import generateRandomGraph from "../randGen/generateRandomGraph"
import { addToList, oneItem } from "../utils/visualItems"
import Visualization from "../types/VisualizationType"
import { Algorithm } from "../types/algorithmtypes"
import StructureColor from "../types/structureColor"

const DijkstrasPage = () => {

    const items: string[] = addToList(oneItem, [
        "Shortest path between two nodes", "Shortest path for full graph"
        ])
        
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
    
    return (
        <div>
            <TopNavBar items={items} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>Dijkstra's shortest path</h1>
            
            { selectedTab === 1 &&  (
                <>      
                    <AnimationManager input={generateRandomGraph(5, true, true)} 
                        algorithm={Algorithm.DijkstrasRand} visualizationGraphics={Visualization.DistListGraph}
                        structure={StructureColor.ShortestPathColor} />
                </>
            )}

            { selectedTab === 2 &&  (
                <>  
                    <AnimationManager input={generateRandomGraph(5, true, true)}
                        algorithm={Algorithm.DijkstrasFull} visualizationGraphics={Visualization.DistListGraph}
                        structure={StructureColor.ShortestPathColor} />
                </>
            )}

            {selectedTab === 0 && (
                <p> This text was hidden all along</p>
            )}

        </div>
    )
}

export default DijkstrasPage