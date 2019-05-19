import React from "react";
import Island from "../../Anno/Island/Island";
import Dictionary from "../../Collections/Dictionary";
import IslandEntry from "./IslandEntry";
import "./IslandList.scss";

/** Props required for the Residents Component */
interface Props {
    islands: Island[];
    islandHeader: React.ComponentType<{island: Island}>;
    islandBody: React.ComponentType<{island: Island}>;
}

/** State required by the Residents Component */
interface State {
    isIslandOpen: Dictionary<string, boolean>
}

/**
 * Component to represent all the Residents in the Empire
 */
class IslandList extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            isIslandOpen: new Dictionary()
        };

        this.props.islands.forEach(island => {
            this.state.isIslandOpen.Add(island.id, false);
        });
    }

    public componentDidUpdate = (prevProps: Props) => {
        if(prevProps.islands === this.props.islands) {
            return;
        }

        const newIsIslandOpenState:Dictionary<string, boolean> = new Dictionary();
        this.props.islands.forEach(island => {
            if(this.state.isIslandOpen.Has(island.id)) {
                newIsIslandOpenState.Add(island.id, this.state.isIslandOpen.Get(island.id));
            } else {
                newIsIslandOpenState.Add(island.id, false);
            }
        });

        this.setState({
            isIslandOpen: newIsIslandOpenState
        });
    }

    private toggleIsland = (island:Island) => {
        const newOpenState: Dictionary<string, boolean> = this.state.isIslandOpen.Clone();
        newOpenState.Add(island.id, !newOpenState.Get(island.id));
        this.setState({
            isIslandOpen: newOpenState
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <div className="islandList__container">
                {
                    this.props.islands.map((island) => {
                        return <IslandEntry toggle={this.toggleIsland} isOpen={this.state.isIslandOpen.Get(island.id)} island={island} islandBody={this.props.islandBody} islandHeader={this.props.islandHeader} />
                    })
                }
            </div>
        );
    }
}

export default IslandList;