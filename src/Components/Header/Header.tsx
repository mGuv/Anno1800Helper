import React, { RefObject } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import "./Header.scss";
import TabBar from '../Library/Tabs/TabBar';

interface Props {
    selectedTab: number;
    onTabSelected: (newTab: number) => void;
};

interface State {
    height: number;
}

class Header extends React.PureComponent<Props, State> {
    private ref: RefObject<HTMLDivElement>;

    public constructor(props: Props) {
        super(props);

        this.state = {
            height: 0,
        };

        this.ref = React.createRef<HTMLDivElement>();
    }

    private growSpacer = (width: number, height: number) => {
        this.setState({
            height
        })
    };

    private selectTab = (newTab:number) => {
       this.props.onTabSelected(newTab);
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div style={{ position: "fixed", width: "100%" }}>
                    <div ref={this.ref} className="header__container">
                        Header
                    </div>
                    <TabBar onSelect={this.selectTab} tabs={["RESIDENTS", "INDUSTRY"]} selected={this.props.selectedTab} />
                    <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.growSpacer} />
                </div>
                <div style={{ width: "100%", height: this.state.height + "px" }}></div>
            </React.Fragment>
        );
    }
}

export default Header;
