import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";
import IndustryRow from "./IndustryRow";

const islandService: IslandService = IslandService.Get();

interface Props {

}

interface State {
    island: Island | null,
}

class Industry extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);

        islandService.activeIsland.registerOnChange(this.updateIsland);

        this.state = {
            island: islandService.activeIsland.getValue()
        };
    }

    public componentWillUnmount = () => {
        islandService.activeIsland.deregisterOnChange(this.updateIsland);
    };

    private updateIsland = (island:Island | null) => {
        this.setState({
            island
        });
    }

    public render() : JSX.Element {

        if(this.state.island === null) {
            return <div></div>;
        }

        return (
            <div>
                {
                    this.state.island.industry.Values.map(industry => {
                        return <IndustryRow islandIndustry={industry} />
                    })
                }
            </div>
        );
    }
}
    
export default Industry;