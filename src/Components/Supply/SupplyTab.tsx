import React from "react";
import Island from "../../Anno/Island/Island";
import { IslandService, IslandServiceSingleton } from "../../Services/IslandService";

import IslandList from "./IslandList";

/** Props required for the Residents Component */
interface Props {

}

/** State required by the Residents Component */
interface State {
    islands: Island[]
}

/**
 * Component to represent all the Residents in the Empire
 */
class SupplyTab extends React.PureComponent<Props, State> {
    private islandService:IslandService = IslandServiceSingleton;

    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);        

        this.state = {
            islands: this.islandService.Islands.getValue(),
        };

        this.islandService.Islands.registerOnChange(this.updateIslands);
    }

    /** :@inheritdoc */
    public componentWillUnmount = () => {
        this.islandService.Islands.deregisterOnChange(this.updateIslands);
    }

    /**
     * Reacts to the new set of Islands being published so the component can react
     */
    private updateIslands = (islands:Island[]) => {
        this.setState({
            islands
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <IslandList islands={this.state.islands}/>
        );
    }
}

export default SupplyTab;