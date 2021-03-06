import React from "react";
import IslandIndustry from "../../Anno/Island/IslandIndustry";
import { faAngleUp, faAngleDown, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../Inputs/IconButton/IconButton";
import Theme from "../Inputs/Theme";

interface Props {
    islandIndustry: IslandIndustry;
    selectIndustry: (industry:IslandIndustry) => void;
}

interface State {
    amount: number,
    ratio: number
}

class IndustryRow extends React.PureComponent<Props, State> {

    public constructor(props:Props) {
        super(props);

        this.state = {
            amount: props.islandIndustry.amount.getValue(),
            ratio: props.islandIndustry.workRatio.getValue(),
        };

        this.props.islandIndustry.amount.registerOnChange(this.updateAmount);
        this.props.islandIndustry.workRatio.registerOnChange(this.updateWorkRatio);
    }

    public componentWillUpdate = (nextProps:Props) => {
        if(nextProps.islandIndustry === this.props.islandIndustry) {
            return;
        }

        this.props.islandIndustry.amount.deregisterOnChange(this.updateAmount);
        this.props.islandIndustry.workRatio.deregisterOnChange(this.updateWorkRatio);

        nextProps.islandIndustry.amount.registerOnChange(this.updateAmount);
        nextProps.islandIndustry.workRatio.registerOnChange(this.updateWorkRatio);

        this.setState({
            amount: nextProps.islandIndustry.amount.getValue(),
            ratio: nextProps.islandIndustry.workRatio.getValue(),
        });
    }

    public componentWillUnmount = () => {
        this.props.islandIndustry.amount.deregisterOnChange(this.updateWorkRatio);
        this.props.islandIndustry.workRatio.deregisterOnChange(this.updateAmount);

    }

    private updateWorkRatio = (ratio:number) => {
        this.setState({
            ratio
        });
    }

    private updateAmount = (amount:number) => {
        this.setState({
            amount
        });
    }

    private onDown = () => {
        const newValue:number = this.props.islandIndustry.amount.getValue() === 0 ? 0 : this.props.islandIndustry.amount.getValue() - 1;
        this.props.islandIndustry.amount.setValue(newValue);
    }

    private onUp = () => {
        this.props.islandIndustry.amount.setValue(this.props.islandIndustry.amount.getValue() + 1);
    }

    private selectIndustry = () => {
        this.props.selectIndustry(this.props.islandIndustry);
    }

    public render() : JSX.Element {
        return (
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}} onClick={this.selectIndustry}>
                    {this.props.islandIndustry.industry.name}
                    {this.state.amount}                 
                ({this.state.ratio * 100}%)
                <div>
                    {
                        (1 / (this.props.islandIndustry.industry.productionTime / this.props.islandIndustry.workRatio.getValue()) * this.props.islandIndustry.amount.getValue()).toPrecision(2) + "/s"
                    }
                </div>
            </div>
        );
    }
}

export default IndustryRow;