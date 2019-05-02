import React from "react";
import "./IconButton.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import InputProps from "../InputProps";
import Theme from "../Theme";

/**
 * Required props to use the Icon Button
 */
interface Props extends InputProps {
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

        const classes:string[] = [
            "input__container",
            "iconButton__container",
        ];

        if(this.props.theme === Theme.Primary) {
            classes.push("input__container--primary");
        } else {
            classes.push("input__container--default");
        }

        return (
            <div className={classes.join(" ")} onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} className="input__value"/>
            </div>
        );
    }
}

export default IconButton;