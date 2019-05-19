import React from "react";
import Dictionary from "../../Collections/Dictionary";
import Resource from "../../Anno/Resources/Resource";
import DemandEntry from "../DemandTab/DemandEntry";

/** Props required for the Residents Component */
interface Props {
    demand:Dictionary<Resource, number>
    suppy:Dictionary<Resource, number>
}

/** State required by the Residents Component */
interface State {
}

/**
 * Component to represent all the Residents in the Empire
 */
class SupplyEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
        };
    }

    /** @inheritdoc */
    public render():JSX.Element {

        // Calculate stuff
        const overall:Dictionary<Resource, number> = new Dictionary();
        this.props.demand.All.forEach(kvp => {
            overall.Add(kvp.key, -kvp.value);
        });
        this.props.suppy.All.forEach(kvp => {
            if(!overall.Has(kvp.key)) {
                overall.Add(kvp.key, 0);
            }

            overall.Add(kvp.key, overall.Get(kvp.key) + kvp.value);
        });

        return (
            <>
                {
                    overall.All.map(kvp => {
                        if(kvp.value != 0) {
                            return <div>{kvp.key.name} {kvp.value}</div>
                        }
                    })
                }
            </>
        );
    }
}

export default SupplyEntry;