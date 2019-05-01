import React from "react";
import "./IconButton.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/**
 * Required props to use the Icon Button
 */
interface Props {
    /** The icon to display */
    icon: IconProp;
    /** The function to call when clicked */
    onClick: () => void;
}

/**
 * Required state to use the Icon Button
 */
interface State {

}

/**
 * Component that renders an Icon as a button and can be clicked to trigger behaviour
 */
class IconButton extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    /** @inheritdoc */
    public render(): JSX.Element {
        return (
            <div className="iconButton__container" onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} />
            </div>
        );
    }
}

export default IconButton;