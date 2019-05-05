import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props { 
    icon: IconProp,
    value: string,
};
interface State { };

class DemandIcon extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {}
    }

    public render():JSX.Element {
        return (
            <div className="demand__unit">
                <FontAwesomeIcon className="demand__icon" icon={this.props.icon}/>
                <div className="demand__value">{this.props.value}</div>
            </div>
        )
    }
}

export default DemandIcon;