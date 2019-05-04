import React from "react";
import InputProps from "../InputProps";
import "./Button.scss";
import Theme from "../Theme";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends InputProps {
    name: string;
    onClick: () => void;
    iconLeft?: IconProp;
    iconRight?: IconProp;
}

interface State {

}

class Button extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public render():JSX.Element {

        const classes:string[] = [
            "input__container"
        ]

        if(this.props.theme === Theme.Primary) {
            classes.push("input__container--primary");
        } else {
            classes.push("input__container--default");
        }

        return (
        <div onClick={this.props.onClick} className={classes.join(" ")}>
            <div className="input__value--button">
                { this.props.iconLeft !== undefined && <FontAwesomeIcon className={"button__icon--left"} icon={this.props.iconLeft}/> }
                {this.props.name}
                { this.props.iconRight !== undefined && <FontAwesomeIcon className={"button__icon--right"} icon={this.props.iconRight}/> }
            </div>
        </div>
        );
    }
}

export default Button;