import PopService from "../../Anno/Population/PopService";
import IndustryService from "../../Anno/Industry/IndustryService";
import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";

const popService: PopService = PopService.Get();
const industryService: IndustryService = IndustryService.Get();
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
            <div>{this.state.island.name} - Demands</div>
        );
    }
}

export default Demand;