import visualItems from "../utils/visualItems"
import { useSearchParams } from "react-router-dom"
import TopNavBar from "../components/TopNavBar"
import AnimationManager from "../components/AnimationManager"
import generateRandomGraph from "../randGen/generateRandomGraph"

const KruskalsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTab = Number(searchParams.get("tab") ?? 1)

    const handleSelectTab = (_item: string, index: number) => {
        setSearchParams({ tab: index.toString() })
    }
    
    
    return (
        <div>
            <TopNavBar items={visualItems} onSelectItem={(item, index) => handleSelectTab(item, index)}/>
            <h1>Kruskal's minimum spanning tree</h1>
            { selectedTab === 1 && (
                <AnimationManager input={generateRandomGraph(7, true, true)} algorithm="kruskals" visualizationGraphics="mstList/graph" />
            )}
            
            {selectedTab === 0 && (
                <p> This text was hidden all along</p>
            )}
        </div>
    )
}

export default KruskalsPage