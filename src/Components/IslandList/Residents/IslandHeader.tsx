import React from "react";
import Island from "../../../Anno/Island/Island";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InhabitantHeader from "./InhabitantHeader";

/** Props required for the Island Row Component */
interface Props {
    island: Island
}

/** State required by the Island Row Component */
interface State {
}

/**
 * Component to represent a single island from the Resident list
 */
class IslandHeader extends React.PureComponent<Props, State> {
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
                   this.props.island.inhabitants.map(inhabitant => {
                        return <InhabitantHeader inhabitant={inhabitant}/>
                   })
               }
            </>
        );
    }
}

export default IslandHeader;