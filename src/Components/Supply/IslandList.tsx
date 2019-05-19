import React from "react";
import Island from "../../Anno/Island/Island";
import IslandEntry from "./IslandEntry";

/** Props required for the Residents Component */
interface Props {
    islands: Island[]
}

/** State required by the Residents Component */
interface State {
}

/**
 * Component to represent all the Residents in the Empire
 */
class IslandList extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
        };

    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <div className="islandList__container">
                {
                    this.props.islands.map((island) => {
                        return <IslandEntry key={island.name} island={island}/>
                    })
                }
            </div>
        );
    }
}

export default IslandList;