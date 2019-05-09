import React from "react";
import Island from "../../Anno/Island/Island";
import InhabitantEntry from "./InhabitantEntry";

/** Props required for the Residents Component */
interface Props {
    island: Island
}

/** State required by the Residents Component */
interface State {
    isOpen: boolean
}

/**
 * Component to represent all the Residents in the Empire
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
                { this.props.island.name }
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