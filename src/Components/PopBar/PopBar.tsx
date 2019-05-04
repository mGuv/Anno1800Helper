import React from "react";
import "./PopBar.scss";
import Island from "../../Anno/Island/Island";
import PopType from "../../Anno/Population/PopType";
import IslandPanel from "../IslandPanel/IslandPanel";


interface Props {
    island: Island | null;
}

interface State {
    farmerPops: number;
    workerPops: number;
}

class PopBar extends React.Component<Props, State> {
    public constructor(props:Props) {
        super(props);
        this.state = {
            farmerPops: 0,
            workerPops: 0,
        };

        this.bind(props);
    }

    private unbind = (props:Props) => {
        if(props.island === null) {
            return;
        }
        
        props.island.population.Get(PopType.Farmer).residents.deregisterOnChange(this.updateFarmer);
    }

    private bind = (props:Props) => {
        if(props.island === null) {
            return;
        }

        props.island.population.Get(PopType.Farmer).residents.registerOnChange(this.updateFarmer);

        this.setState(
            {
                workerPops: props.island.population.Get(PopType.Farmer).residents.getValue()
            }
        );
    }

    public componentWillUnmount = () => {
        this.unbind(this.props);
    }

    public componentDidUpdate = (oldProps:Props) => {
        if(oldProps.island === this.props.island) {
            return;
        }

        this.unbind(oldProps);
        this.bind(this.props);
    }

    private updateFarmer = (value:number) => {
        this.setState({
            farmerPops: value
        });
    }

    public render():JSX.Element {

        if(this.props.island === null) {
            return (
                <div className="popBar__container">
                </div>
            );    
        }

        return (
            <div className="popBar__container">
                <IslandPanel pop = {this.props.island.population.Get(PopType.Farmer)}/>
                <IslandPanel pop = {this.props.island.population.Get(PopType.Worker)}/>
            </div>
        );
    }
}

export default PopBar;