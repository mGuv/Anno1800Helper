import IslandPop from "../../Anno/Island/IslandPop";
import Resource from "../../Anno/Resources/Resource";
import Dictionary from "../../Collections/Dictionary";
import React from "react";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Button from "../Inputs/Button/Button";
import IconButton from "../Inputs/IconButton/IconButton";

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
            <div>{this.props.islandPop.pop.name}'s Demands</div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <Button name={this.state.housesRequired.toString()} onClick={()=>{}} iconLeft={faHome}/>
                {
                    this.state.demand.All.map(kvp => {
                        return <Button name={kvp.value.toFixed(2).toString() + "/s"} onClick={()=>{}} iconLeft={kvp.key.icon}/>
                    })
                }
            </div>
            </React.Fragment>
        );
    }
}

export default PopDemand;