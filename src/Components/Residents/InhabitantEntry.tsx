import React from "react";
import Inhabitant from "../../Anno/Island/Inhabitant";
import InhabitantPopUp from "./InhabitantPopUp";

/** Props required for the Residents Component */
interface Props {
    inhabitant:Inhabitant
}

/** State required by the Residents Component */
interface State {
    amount:number,
    requiredHouses:number,
    popUpOpen:boolean,
}

/**
 * Component to represent a single Inhabitant on an Island
 */
class InhabitantEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            amount: props.inhabitant.amount.getValue(),
            requiredHouses: props.inhabitant.requiredHouses.getValue(),
            popUpOpen: false,
        };

        props.inhabitant.amount.registerOnChange(this.updateAmount);
        props.inhabitant.requiredHouses.registerOnChange(this.updateRequiredHouses);
    }

    public componentWillUnmount= () => {
        this.props.inhabitant.amount.deregisterOnChange(this.updateAmount);
        this.props.inhabitant.requiredHouses.deregisterOnChange(this.updateAmount);
    }

    private updateAmount = (oldValue:number, newValue:number) => {
        this.setState({
            amount: newValue
        });
    }

    private updateRequiredHouses = (oldValue:number, newValue:number) => {
        this.setState({
            requiredHouses: newValue
        });
    }

    private openPopUp = () => {
        this.setState({
            popUpOpen: true
        });
    }

    private closePopUp =() => {
        this.setState({
            popUpOpen: false
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <React.Fragment>
            <div className="inhabitantEntry__container" onClick={this.openPopUp}>
                {this.props.inhabitant.pop.name} x{this.state.amount} houses: {this.state.requiredHouses}
            </div>
            {
                this.state.popUpOpen && <InhabitantPopUp onClose={this.closePopUp} inhabitant={this.props.inhabitant}  />
            }
            </React.Fragment>
        );
    }
}

export default InhabitantEntry;