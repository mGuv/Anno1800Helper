import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";

const islandService: IslandService = IslandService.Get();

interface Props {

}

interface State {
    island: Island | null
}

class Demand extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);

        islandService.activeIsland.registerOnChange(this.updateIsland);

        this.state = {
            island: islandService.activeIsland.getValue()
        };
    }

    public componentWillUnmount = () => {
        islandService.activeIsland.deregisterOnChange(this.updateIsland);
    };

    private updateIsland = (island: Island | null) => {
        this.setState({
            island
        });
    };

    public render(): JSX.Element {
        return (
            <div>
                {
                    this.state.island !== null &&
                    <span>{this.state.island.name.getValue()} - Demands</span>
                }
                {
                    this.state === null &&
                    <span>No Island Selected</span>
                }
            </div>
            
        );
    }
}

export default Demand;