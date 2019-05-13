import React from "react";
import Dictionary from "../../Collections/Dictionary";
import Resource from "../../Anno/Resources/Resource";

/** Props required for the Residents Component */
interface Props {
    demand:Dictionary<Resource, number>
}

/** State required by the Residents Component */
interface State {
}

/**
 * Component to represent all the Residents in the Empire
 */
class DemandEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
        };
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <>
                {
                    this.props.demand.All.map(kvp => {
                        return kvp.key.name + " " + kvp.value.toPrecision(2) + "/s"
                    })
                }
            </>
        );
    }
}

export default DemandEntry;