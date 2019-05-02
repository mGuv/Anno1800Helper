import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";

const islandService: IslandService = IslandService.Get();

interface Props {

}

interface State {
    island: Island
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

    private updateIsland = (island: Island) => {
        this.setState({
            island
        });
    };

    public render(): JSX.Element {
        return (
            <div>{this.state.island.name.getValue()} - Demands</div>
        );
    }
}

export default Demand;