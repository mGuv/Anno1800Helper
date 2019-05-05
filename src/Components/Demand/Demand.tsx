import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";
import PopDemand from "./PopDemand";
import "./PopDemand.scss";
import TotalDemand from "./TotalDemand";

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
                        <div className="demand__container">
                            {
                                this.state.island.population.All.map((kvp) => {
                                    return <PopDemand key={kvp.value.pop.name} islandPop={kvp.value}/>
                                })
                            }
                            <TotalDemand/>
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