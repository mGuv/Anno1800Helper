import React from "react";
import Island from "../../Anno/Island/Island";
import IslandService from "../../Anno/Island/IslandService";
import IndustryRow from "./IndustryRow";
import IslandIndustry from '../../Anno/Island/IslandIndustry';
import PopUp from "../PopUp/PopUp";
import IndustryPanel from "./IndustryPanel";

const islandService: IslandService = IslandService.Get();

interface Props {

}

interface State {
    island: Island | null,
    selectedIndustry: IslandIndustry | null,
}

class Industry extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);

        islandService.activeIsland.registerOnChange(this.updateIsland);

        this.state = {
            island: islandService.activeIsland.getValue(),
            selectedIndustry: null,
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

    private clearIndustry = () => {
        this.setState({
            selectedIndustry: null
        });
    }

    private selectIndustry = (industry:IslandIndustry) => {
        this.setState({
            selectedIndustry: industry
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
                        return <IndustryRow selectIndustry={this.selectIndustry} islandIndustry={industry}  />
                    })
                }
                {
                    this.state.selectedIndustry && <IndustryPanel industry={this.state.selectedIndustry} handleClose={this.clearIndustry}/>
                }
            </div>
        );
    }
}
    
export default Industry;