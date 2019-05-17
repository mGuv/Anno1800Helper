import React from "react";
import PopUp from "../Library/PopUp/PopUp";
import NumberField from "../Library/Inputs/NumberField/NumberField";
import IslandIndustry from "../../Anno/Island/IslandIndustry";

/** Props required for the Edit Inhabitant Component */
interface Props {
    onClose: () => void,
    industry: IslandIndustry
}

/** State required by the Edit Inhabitant Component */
interface State {
}

/**
 * Component to allow the User to edit their island's inhabitant
 */
class IndustryPopUp extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
        };

    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <PopUp title={this.props.industry.industry.name} onClose={this.props.onClose}>
                <NumberField autoFocus={true} value={this.props.industry.amount} name={"Buildings"}/>
                <NumberField value={this.props.industry.workRatio} name={"Work Ratio"}/>
            </PopUp>
        );
    }
}

export default IndustryPopUp;