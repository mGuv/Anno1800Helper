import React from "react";
import "./Tabs.scss"

interface Props {
    label: string;
    selected: boolean;
    selectTab: (index:number) => void;
    index:number;
}

interface State {
    
}

class Tab extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);

        this.state = {
            
        }
    }

    private select = () => {
        this.props.selectTab(this.props.index);
    }

    public render():JSX.Element {

        const classes:string[] = [
            "tab__container"
        ];

        if(this.props.selected) { 
            classes.push("tab__container--selected");
        }

        return <div className={classes.join(" ")} onClick={this.select}>{this.props.label}</div>
    }
}
 
export default Tab;