import React from "react";
import Tab from "./Tab";
import "./Tabs.scss";

interface Props {
    tabs:string[];
    selected:number;
    onSelect:(index:number) => void;
}

interface State {
    
}

class TabBar extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);

        this.state = {

        }
    }

    public render():JSX.Element {
        return (
            <div className="tabBar__container">
                {
                    this.props.tabs.map((tab, index) => {
                        return <Tab label={tab} index={index} selectTab={this.props.onSelect} selected={index === this.props.selected}/>
                    })
                }
            </div>
        )
    }
}

export default TabBar;