import React, { RefObject } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EventValue from '../EventValue';
import Island from '../Anno/Island/Island';
import IslandService from '../Anno/Island/IslandService';
import "./Header.css";
import SelectBox from './Inputs/SelectBox/SelectBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const islandService: IslandService = IslandService.Get();

interface Props {
    selectedTab: number;
    onTabSelected: (newTab: number) => void;
};

interface State {
    height: number;
    island: Island;
    islands: Island[];
}

class Header extends React.PureComponent<Props, State> {
    private ref: RefObject<HTMLDivElement>;
    private someInput: EventValue<number> = new EventValue(0);
    private theValue: EventValue<string> = new EventValue("Test One");

    private parser = (input: string) => {
        return Number(input);
    };

    public constructor(props: Props) {
        super(props);

        islandService.activeIsland.registerOnChange(this.islandChanged);
        islandService.islands.registerOnChange(this.islandsChanged);

        this.state = {
            height: 0,
            island: islandService.activeIsland.getValue(),
            islands: islandService.islands.getValue(),
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

    private islandChanged = (island: Island) => {
        this.setState({
            island
        });
    };

    private growSpacer = (width: number, height: number) => {
        this.setState({
            height
        })
    };

    private handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
        this.props.onTabSelected(value);
    };

    public render(): JSX.Element {

        const someOptions: string[] = [
            "Test One",
            "Test Two",
            "Test Three"
        ];




        return (
            <React.Fragment>
                <div style={{ position: "fixed", width: "100%" }}>
                    <div ref={this.ref} className="header__container">
                        <div className="islandSelect">
                            <SelectBox options={this.state.islands} value={islandService.activeIsland} />
                        </div>
                        <div className="islandAdd">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.growSpacer} />
                </div>
                <div style={{ width: "100%", height: this.state.height + "px" }}></div>
            </React.Fragment>
        );
    }
}

export default Header;
