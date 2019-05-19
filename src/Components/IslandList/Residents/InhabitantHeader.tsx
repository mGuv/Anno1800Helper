import React from "react";
import Inhabitant from "../../../Anno/Island/Inhabitant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Props required for the Residents Component */
interface Props {
    inhabitant:Inhabitant
}

/** State required by the Residents Component */
interface State {
    amount:number,
}

/**
 * Component to represent a single Inhabitant on an Island
 */
class InhabitantHeader extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            amount: props.inhabitant.amount.getValue(),
        };

        props.inhabitant.amount.registerOnChange(this.updateAmount);
    }

    /** @inheritdoc */
    public componentWillUnmount= () => {
        this.props.inhabitant.amount.deregisterOnChange(this.updateAmount);
    }

    /**
     * Handle the Amount of this Inhabitant changing
     */
    private updateAmount = (oldValue:number, newValue:number) => {
        this.setState({
            amount: newValue
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <div><FontAwesomeIcon icon={this.props.inhabitant.pop.icon}/> {this.props.inhabitant.amount.getValue()}</div>
        );
    }
}

export default InhabitantHeader;