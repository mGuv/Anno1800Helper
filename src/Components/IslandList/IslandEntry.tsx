import React from "react";
import Island from "../../Anno/Island/Island";
import Dictionary from "../../Collections/Dictionary";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Props required for the Residents Component */
interface Props {
    island: Island;
    islandHeader: React.ComponentType<{ island: Island }>;
    islandBody: React.ComponentType<{ island: Island }>;
    isOpen: boolean;
    toggle: (island: Island) => void;
}

/** State required by the Residents Component */
interface State {
}

/**
 * Component to represent all the Residents in the Empire
 */
class IslandEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props: Props) {
        super(props);

        this.state = {
        };
    }

    private toggle = () => {
        this.props.toggle(this.props.island);
    }

    /** @inheritdoc */
    public render(): JSX.Element {

        const icon:IconProp = this.props.isOpen ? faAngleUp : faAngleDown;

        return (
            <>
                <div onClick={this.toggle} className="islandEntry__container">
                    {this.props.island.name} {<this.props.islandHeader island={this.props.island} />}
                    <FontAwesomeIcon icon={icon}/>
                </div>
                <div className="islandEntry__body">
                {
                    this.props.isOpen && <this.props.islandBody island={this.props.island} />
                }
                </div>
            </>
        );
    }
}

export default IslandEntry;