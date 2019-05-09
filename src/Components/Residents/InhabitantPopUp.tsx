import React from "react";
import Inhabitant from "../../Anno/Island/Inhabitant";
import PopUp from "../Library/PopUp/PopUp";
import NumberField from "../Library/Inputs/NumberField/NumberField";
import Checkbox from "../Library/Inputs/Checkbox/Checkbox";

/** Props required for the Edit Inhabitant Component */
interface Props {
    onClose: () => void,
    inhabitant: Inhabitant
}

/** State required by the Edit Inhabitant Component */
interface State {
}

/**
 * Component to allow the User to edit their island's inhabitant
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
                    this.props.inhabitant.suppliedResources.All.map(kvp =>{
                        return <Checkbox label={kvp.key.resourceType.name} value={kvp.value}/>
                    })
                }
                {
                    this.props.inhabitant.suppliedServices.All.map(kvp =>{
                        return <Checkbox label={kvp.key.serviceType.name} value={kvp.value}/>
                    })
                }
            </PopUp>
        );
    }
}

export default InhabitantPopUp;