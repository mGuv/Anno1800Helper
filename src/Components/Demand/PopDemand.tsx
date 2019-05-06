import IslandPop from "../../Anno/Island/IslandPop";
import Resource from "../../Anno/Resources/Resource";
import Dictionary from "../../Collections/Dictionary";
import React from "react";
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import DemandIcon from "./DemandIcon";

interface Props {
    islandPop: IslandPop
}

interface State {
    demand: Dictionary<Resource, number>,
    housesRequired: number,
}

class PopDemand extends React.PureComponent<Props, State> {

    public constructor(props:Props) {
        super(props);

        this.state = {
            demand: props.islandPop.demand.getValue(),
            housesRequired: props.islandPop.requiredHouses.getValue(),
        };

        this.props.islandPop.demand.registerOnChange(this.updateDemand);
        this.props.islandPop.requiredHouses.registerOnChange(this.updateHouses);

    }

    public componentWillUpdate = (nextProps:Props) => {
        if(nextProps.islandPop === this.props.islandPop) {
            return;
        }

        this.props.islandPop.demand.deregisterOnChange(this.updateDemand);
        this.props.islandPop.requiredHouses.deregisterOnChange(this.updateHouses);

        nextProps.islandPop.demand.registerOnChange(this.updateDemand);
        nextProps.islandPop.requiredHouses.registerOnChange(this.updateHouses);

        this.setState({
            demand: nextProps.islandPop.demand.getValue(),
            housesRequired: nextProps.islandPop.requiredHouses.getValue(),
        });
    }

    public componentWillUnmount = () => {
        this.props.islandPop.demand.deregisterOnChange(this.updateDemand);
        this.props.islandPop.requiredHouses.deregisterOnChange(this.updateHouses);

    }

    private updateHouses = (housesRequired:number) => {
        this.setState({
            housesRequired
        });
    }

    private updateDemand = (demand: Dictionary<Resource, number>) => {
        this.setState({
            demand
        });
    }

    public render() : JSX.Element {
        return (
            <React.Fragment>
            <div className="demand__row">
                <DemandIcon value={this.props.islandPop.residents.getValue().toString()} icon={this.props.islandPop.pop.icon}/>
                <DemandIcon value={this.state.housesRequired.toString()} icon={faHome}/>
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

export default PopDemand;