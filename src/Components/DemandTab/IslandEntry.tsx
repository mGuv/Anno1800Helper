import React from "react";
import Island from "../../Anno/Island/Island";
import Dictionary from "../../Collections/Dictionary";
import DemandEntry from "./DemandEntry";
import Resource from "../../Anno/Resources/Resource";

/** Props required for the Residents Component */
interface Props {
    island: Island,
}

/** State required by the Residents Component */
interface State {
    isOpen: boolean,
    demand: Dictionary<Resource, number>,
}

/**
 * Component to represent all the Residents in the Empire
 */
class IslandEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            isOpen: false,
            demand: props.island.demand.getValue(),
        }

        props.island.demand.registerOnChange(this.updateDemand);
    }

    public componentWillUnmount = () => {
        this.props.island.demand.deregisterOnChange(this.updateDemand);
    }

    private updateDemand = (demand:Dictionary<Resource, number>) => {
        this.setState({
            demand
        });
    }

    /**
     * Opens the entry to see the full residental details of this island
     */
    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <React.Fragment>
            <div onClick={this.toggle} className="islandEntry__container">
                { this.props.island.name }
            </div>
            {
                this.state.isOpen && 
                <DemandEntry demand={this.state.demand}/>
            }
            </React.Fragment>
        );
    }
}

export default IslandEntry;