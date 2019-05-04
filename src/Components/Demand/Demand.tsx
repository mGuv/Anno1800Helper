import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";
import PopDemand from "./PopDemand";

const islandService: IslandService = IslandService.Get();

interface Props {

}

interface State {
    island: Island | null,
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
                    <React.Fragment>
                        <span>{this.state.island.name.getValue()} - Demands</span>
                        <div>
                            {
                                this.state.island.population.All.map((kvp, ind) => {
                                    return <PopDemand key={kvp.value.pop.name} islandPop={kvp.value}/>
                                })
                            }
                        </div>
                    </React.Fragment>
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