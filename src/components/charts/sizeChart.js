import {Hint, HorizontalGridLines, VerticalBarSeries, XYPlot} from "react-vis";
import 'react-vis/dist/style.css';
import useMap from "../../hooks/hooks.map";
import Colours from "../../styles/colours";
import {useCallback, useState} from "react";
import NoResultsFound from "../animations/noResultsFound";

const MaterialsChart = () => {

    const [hovering, setHovering] = useState(null);

    const {
        pointsInView,
        filter,
        setFilterData
    } = useMap();

    const getChartData = () => {
        let data = [];

        let sizeCounts = {
            '0-50': 0,
            '50-200': 0,
            '200-526': 0,
        }

        pointsInView.forEach(point => {
            if (point.properties.area_ > 0 && point.properties.area_ < 50) {
                sizeCounts['0-50'] += 1;
            } else if (point.properties.area_ >= 50 && point.properties.area_ < 200) {
                sizeCounts['50-200'] += 1;
            } else if (point.properties.area_ >= 200) {
                sizeCounts['200-526'] += 1;
            }
        })

        Object.keys(sizeCounts).forEach((size, index) => {
            data.push({x: index, y: sizeCounts[size], count: sizeCounts[size], opacity:hovering?.value?.label===size?1:0.75, color: Colours.pink, label: size})
        })

        return data;
    }

    return (
        <div className={'chart-container'}>
            {pointsInView.length > 0 &&
                <XYPlot
                    //Forcing redraw, noticing issues in 
                    // not sure if it's related to that.
                    key={`size_chart_${pointsInView.length}_${filter.value}`}
                    width={225}
                    height={225}
                    colorType={"literal"}
                    animation={"gentle"}
                    onMouseLeave={() => {
                        setHovering(null)
                    }}
                    margin={0}
                >
                    <HorizontalGridLines/>
                    <VerticalBarSeries
                        data={getChartData()}
                        onValueClick={(value) => {
                            if (filter.value.length === 0) {
                                setFilterData({type: "Size", value: value.label}).then();
                            }
                        }}
                        onMouseLeave={() => {
                            setHovering(null)
                        }}
                        onNearestX={(d, {index}) => {
                            const hintData =
                                {
                                    value: d
                                }
                            setHovering(hintData)
                        }}
                    />

                    {hovering &&
                        <Hint {...hovering}>
                            <div className={'chart-tooltip'}>
                                <div style={{color: hovering.value.color}}>{hovering.value.label}</div>
                                <div style={{color: 'white', textAlign: 'center'}}>{hovering.value.count}</div>
                            </div>
                        </Hint>
                    }
                </XYPlot>
            }
            {pointsInView.length === 0 &&
                <NoResultsFound/>
            }
        </div>
    )
}

export default MaterialsChart
