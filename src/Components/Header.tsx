import React, { RefObject } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EventValue from '../EventValue';
import Island from '../Anno/Island/Island';
import IslandService from '../Anno/Island/IslandService';
import "./Header.scss";
import IconButton from './Inputs/IconButton/IconButton';
import PopUp from './PopUp/PopUp';
import IslandType from '../Anno/Island/IslandType';
import TextField from './Inputs/TextField/TextField';
import SelectBox from './Inputs/SelectBox/SelectBox';
import Theme from './Inputs/Theme';
import PopBar from './PopBar/PopBar';
import TabBar from './Tabs/TabBar';

const islandService: IslandService = IslandService.Get();

interface Props {
    selectedTab: number;
    onTabSelected: (newTab: number) => void;
};

interface State {
    height: number;
    island: Island | null;
    islands: Island[];
    newIslandOpen: boolean;
}

class Header extends React.PureComponent<Props, State> {
    private ref: RefObject<HTMLDivElement>;
    private islandTypes:IslandType[] = [IslandType.OldWorld, IslandType.NewWorld];
    private nameValue: EventValue<string> = new EventValue<string>("");
    private selectedType: EventValue<IslandType> = new EventValue<IslandType>(IslandType.OldWorld);

    public constructor(props: Props) {
        super(props);

        islandService.activeIsland.registerOnChange(this.islandChanged);
        islandService.islands.registerOnChange(this.islandsChanged);

        this.state = {
            height: 0,
            island: islandService.activeIsland.getValue(),
            islands: islandService.islands.getValue(),
            newIslandOpen: false,
        };
        this.ref = React.createRef<HTMLDivElement>();
    }

    public componentWillUnmount = () => {
        islandService.activeIsland.deregisterOnChange(this.islandChanged);
        islandService.islands.deregisterOnChange(this.islandsChanged);
    };

    private islandsChanged = (islands: Island[]) => {
        this.setState({
            islands
        });
    };

    private islandChanged = (island: Island | null) => {
        this.setState({
            island
        });
    };

    private growSpacer = (width: number, height: number) => {
        this.setState({
            height
        })
    };

    private openNewIsland = () => {
        this.setState({
            newIslandOpen: true
        })
    };

    private closeNewIsland = () => {
        this.setState({
            newIslandOpen: false
        });
    };

    private selectTab = (newTab:number) => {
       this.props.onTabSelected(newTab);
    }

    private createIsland = () => {
        const islands:Island[] = islandService.islands.getValue();
        const newIsland:Island = new Island(new EventValue(this.nameValue.getValue()), this.selectedType.getValue());
        islands.push(newIsland);
        islandService.islands.setValue(islands);
        islandService.activeIsland.setValue(newIsland);
        islandService.totalDemand.addIsland(newIsland);
        this.setState({
            newIslandOpen: false
        });
    };

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div style={{ position: "fixed", width: "100%" }}>
                    <div ref={this.ref} className="header__container">
                        <div className="islandSelect">
                            <SelectBox theme={Theme.Primary} options={this.state.islands} value={islandService.activeIsland} />
                        </div>
                        <div className="islandAdd">
                            <IconButton theme={Theme.Primary} icon={faPlus} onClick={this.openNewIsland}/>
                        </div>
                        <PopBar island={this.state.island}/>
                    </div>
                    <TabBar onSelect={this.selectTab} tabs={["RESIDENTS", "INDUSTRY"]} selected={this.props.selectedTab} />
                    <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.growSpacer} />
                </div>
                <div style={{ width: "100%", height: this.state.height + "px" }}></div>
                { 
                    this.state.newIslandOpen && (
                        <PopUp title="Add New Island" onClose={this.closeNewIsland} buttons={[{name:"Create", onClick:this.createIsland}]}>
                            <TextField name="Name" value={this.nameValue} autoFocus={true} placeholder="Island Name"/>
                            <SelectBox name="Region" options={this.islandTypes} value={this.selectedType}/>                            
                        </PopUp>
                    )
                }
            </React.Fragment>
        );
    }
}

export default Header;
