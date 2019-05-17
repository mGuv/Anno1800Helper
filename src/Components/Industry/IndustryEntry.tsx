import React from "react";
import IslandIndustry from "../../Anno/Island/IslandIndustry";
import IndustryPopUp from "./IndustryPopUp";

/** Props required for the Residents Component */
interface Props {
    industry:IslandIndustry
}

/** State required by the Residents Component */
interface State {
    amount:number,
    workRatio:number,
    isOpen: boolean,
}

/**
 * Component to represent a single Inhabitant on an Island
 */
class InhabitantEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            amount: props.industry.amount.getValue(),
            workRatio: props.industry.workRatio.getValue(),
            isOpen: false,
        };

        props.industry.amount.registerOnChange(this.updateAmount);
        props.industry.workRatio.registerOnChange(this.updateWorkRatio);
    }

    /** @inheritdoc */
    public componentWillUnmount= () => {
        this.props.industry.amount.deregisterOnChange(this.updateAmount);
        this.props.industry.workRatio.deregisterOnChange(this.updateWorkRatio);
    }

    /**
     * Handle the Amount of this Inhabitant changing
     */
    private updateAmount = (oldValue:number, newValue:number) => {
        this.setState({
            amount: newValue
        });
    }

    /**
     * Handle the Amount of the required houses changing
     */
    private updateWorkRatio = (oldValue:number, newValue:number) => {
        this.setState({
            workRatio: newValue
        });
    }

    private openPopUp = () => {
        this.setState({
            isOpen: true
        });
    }

    private closePopUp = () => {
        this.setState({
            isOpen: false
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <React.Fragment>
            <div className="inhabitantEntry__container" onClick={this.openPopUp}>
                {this.props.industry.industry.name} x{this.state.amount} at {this.state.workRatio}%
            </div>
            {
                this.state.isOpen && <IndustryPopUp onClose={this.closePopUp} industry={this.props.industry}  />
            }
            </React.Fragment>
        );
    }
}

export default InhabitantEntry;