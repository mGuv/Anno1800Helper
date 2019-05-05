import IslandPop from "../../Anno/Island/IslandPop";
import Resource from "../../Anno/Resources/Resource";
import Dictionary from "../../Collections/Dictionary";
import React from "react";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import DemandIcon from "./DemandIcon";
import IslandService from "../../Anno/Island/IslandService";

const islandService:IslandService = IslandService.Get();

interface Props {

}

interface State {
    demand: Dictionary<Resource, number>,
}

class TotalDemand extends React.PureComponent<Props, State> {

    public constructor(props:Props) {
        super(props);

        this.state = {
            demand: islandService.totalDemand.totalDemands.getValue()
        };

        islandService.totalDemand.totalDemands.registerOnChange(this.updateDemand);

    }

    public componentWillUnmount = () => {
        islandService.totalDemand.totalDemands.deregisterOnChange(this.updateDemand);
    }

    private updateDemand = (demand:Dictionary<Resource, number>) => {
        this.setState({
            demand
        });
    }

    public render() : JSX.Element {
        return (
            <React.Fragment>
            <div className="demand__row demand__row--total">
                <div style={{gridColumn: 'span 2'}}></div>
                {
                    this.state.demand.All.map(kvp => {
                        return <DemandIcon value={kvp.value.toFixed(2).toString() + "/s"} icon={kvp.key.icon}/>
                    })
                }
            </div>
            </React.Fragment>
        );
    }
}

export default TotalDemand;