import React from "react";
import Button from "../Inputs/Button/Button";
import { faTractor, faHammer, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import Theme from "../Inputs/Theme";
import "./PopBar.scss";
import Island from "../../Anno/Island/Island";
import PopType from "../../Anno/Population/PopType";


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
        
        props.island.population.Get(PopType.Farmer).deregisterOnChange(this.updateFarmer);
    }

    private bind = (props:Props) => {
        if(props.island === null) {
            return;
        }

        props.island.population.Get(PopType.Farmer).registerOnChange(this.updateFarmer);

        this.setState(
            {
                workerPops: props.island.population.Get(PopType.Farmer).getValue()
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
                    <Button theme={Theme.Primary} iconLeft={faTractor} name="-" onClick={()=>{}}/>
                    <Button theme={Theme.Primary} iconLeft={faHammer} name="-" onClick={()=>{}}/>
                </div>
            );    
        }

        return (
            <div className="popBar__container">
                <Button theme={Theme.Primary} iconLeft={faTractor} name={this.state.farmerPops.toString()} onClick={()=>{}}/>
                <Button theme={Theme.Primary} iconLeft={faHammer} name={this.state.workerPops.toString()} onClick={()=>{}}/>
            </div>
        );
    }
}

export default PopBar;