import React from "react";
import "./IconButton.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    icon: IconProp;
    onClick: () => void;
}

interface State {

}

class IconButton extends React.PureComponent<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    public render(): JSX.Element {
        return (
            <div className="iconButton__container" onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} />
            </div>
        );
    }
}

export default IconButton;