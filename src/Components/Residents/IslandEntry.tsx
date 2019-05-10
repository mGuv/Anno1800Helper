import React from "react";
import Island from "../../Anno/Island/Island";
import InhabitantEntry from "./InhabitantEntry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

/** Props required for the Island Row Component */
interface Props {
    island: Island
}

/** State required by the Island Row Component */
interface State {
    isOpen: boolean
}

/**
 * Component to represent a single island from the Resident list
 */
class IslandEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            isOpen: false,
        }

    }

    /**
     * Opens the entry to see the full residental details of this island
     */
    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <React.Fragment>
            <div onClick={this.toggle} className="islandEntry__container">
                <span>{ this.props.island.name }</span>
                <FontAwesomeIcon icon={this.state.isOpen ? faAngleUp : faAngleDown} />
            </div>
            {
                this.state.isOpen && 
                this.props.island.inhabitants.map(inhabitant => {
                    return <InhabitantEntry inhabitant={inhabitant}/>
                })
            }
            </React.Fragment>
        );
    }
}

export default IslandEntry;