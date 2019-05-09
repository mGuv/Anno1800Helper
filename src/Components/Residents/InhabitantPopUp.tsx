import React from "react";
import Inhabitant from "../../Anno/Island/Inhabitant";
import PopUp from "../Library/PopUp/PopUp";
import NumberField from "../Library/Inputs/NumberField/NumberField";
import Checkbox from "../Library/Inputs/Checkbox/Checkbox";

/** Props required for the Residents Component */
interface Props {
    onClose: () => void,
    inhabitant: Inhabitant
}

/** State required by the Residents Component */
interface State {
}

/**
 * Component to represent all the Residents in the Empire
 */
class InhabitantPopUp extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
        };

    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <PopUp title={this.props.inhabitant.pop.name} onClose={this.props.onClose}>
                <NumberField value={this.props.inhabitant.amount} name={"Inhabitants"}/>
                {
                    this.props.inhabitant.needFulfillment.All.map(kvp =>{
                        return <Checkbox label="Test" value={kvp.value}/>
                    })
                }
            </PopUp>
        );
    }
}

export default InhabitantPopUp;