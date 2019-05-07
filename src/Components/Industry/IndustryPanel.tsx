import React from "react";
import PopUp from "../PopUp/PopUp";
import NumberField from "../Inputs/NumberField/NumberField";
import IslandIndustry from '../../Anno/Island/IslandIndustry';

/** Props required to display a popup */
interface Props {
    industry: IslandIndustry;
    handleClose: () => void;
}

/** Required state for Popup */
interface State {
}

/** 
 * Component that represents a small window within the application and can contain any content
 */
class IndustryPanel extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props: Props) {
        super(props);
        this.state = {
        };
    }
    
    /** @inheritdoc */
    public render(): JSX.Element {
        return (
            <PopUp onClose={this.props.handleClose} title={this.props.industry.industry.name}>
                <NumberField name="Amount" value={this.props.industry.amount}/>
                <NumberField name="Ratio" value={this.props.industry.workRatio}/>
            </PopUp>
        );
    }
}

export default IndustryPanel;