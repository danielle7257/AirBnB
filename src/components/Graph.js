import {XYPlot, LineSeries, MarkSeries, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import 'react-vis/dist/style.css';

function Graph(props) {

    switch(props.type){
        case "scatter":
            return (
                <XYPlot height={500} width={650}>
                    <XAxis label="Listing Index" />
                    <YAxis label="Price"/>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <MarkSeries
                        data={props.graphData}
                        color={props.color}
                    />
                </XYPlot>
            );
        case "bar":
            return (
                <XYPlot height={500} width={650}>
                    <XAxis label="Listing Index" />
                    <YAxis label="Price"/>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <VerticalBarSeries
                        data={props.graphData} 
                        color={props.color}
                    />
                </XYPlot>
            );
        default: 
            return (
                <XYPlot height={500} width={650}>
                    <XAxis label="Listing Index" />
                    <YAxis label="Price"/>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <LineSeries 
                        data={props.graphData} 
                        color={props.color}
                        style={{strokeWidth: 2}}
                    />
                </XYPlot>
            );
    }
}

export default Graph;