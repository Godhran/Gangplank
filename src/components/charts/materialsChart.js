import {Hint, RadialChart} from "react-vis";
import 'react-vis/dist/style.css';
import useMap from "../../hooks/hooks.map";
import {useState} from "react";
import NoResultsFound from "../animations/noResultsFound";
import {getMaterialColour} from "../../utilities/utilities";

const MaterialsChart = () => {

    const [hovering, setHovering] = useState(null);

    const {
        pointsInView,
        filter,
        materials,
        setFilterData
    } = useMap();

    const getChartData = () => {
        let data = [];
        let materialCount = {};

        materials.forEach(material => {
            let foundRampsWithMaterial = pointsInView.filter(entry => entry.properties.material === material)
            materialCount[material] = !foundRampsWithMaterial ? 0 : foundRampsWithMaterial.length;
        })

        Object.keys(materialCount).forEach((material, index) => {
            if (materialCount[material] > 0) {
                data.push({
                    angle: materialCount[material],
                    count: materialCount[material],
                    color: getMaterialColour(material),
                    label: material
                })
            }
        })

        return data;
    }


    return (
        <div className={'chart-container'}>
            {pointsInView.length > 0
                // && filter.value.length === 0
                &&
                <RadialChart
                    //Forcing redraw, noticing issues in 
                    // not sure if it's related to that.
                    key={`materials_chart_${pointsInView.length}`}
                    colorType={"literal"}
                    data={getChartData()}
                    width={225}
                    height={225}
                    animation={"gentle"}
                    onValueClick={(value) => {
                        if (filter.value.length === 0) {
                            setFilterData({type: "Material", value: value.label}).then();
                        }
                    }}
                    onValueMouseOut={() => {
                        setHovering(null)
                    }}
                    onValueMouseOver={(d) => {
                        const hintData =
                            {
                                value: d
                            }
                        setHovering(hintData)
                    }}
                >
                    {hovering &&
                        <Hint {...hovering}>
                            <div className={'chart-tooltip'}>
                                <div style={{color: hovering.value.color}}>{hovering.value.label}</div>
                                <div style={{color: 'white', textAlign: 'center'}}>{hovering.value.count}</div>
                            </div>
                        </Hint>
                    }
                </RadialChart>
            }
            {pointsInView.length === 0 &&
                <NoResultsFound/>
            }
        </div>
    )
}

export default MaterialsChart
