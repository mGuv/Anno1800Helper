import React from "react";
import "./IconButton.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    icon: IconProp
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
            <FontAwesomeIcon icon={this.props.icon} />
        );
    }
}

export default IconButton;