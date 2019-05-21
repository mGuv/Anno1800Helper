import InputProps from "../InputProps";
import React from "react";
import EventValue from "../../../../EventValue";
import Theme from "../Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CheckboxIconButton.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends InputProps {
    icon: IconProp;
    value:EventValue<boolean>;
}

interface State {
    checked:boolean;
}

class CheckboxIconButton extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);
        this.state = {
            checked: props.value.getValue()
        };

        this.props.value.registerOnChange(this.updateState);
    }

    public componentWillUnmount = () => {
        this.props.value.deregisterOnChange(this.updateState);
    }

    private updateState = (oldValue:boolean, newValue:boolean) => {
        this.setState({
            checked: newValue
        });
    }

    private toggleState = () => {
        this.props.value.setValue(!this.props.value.getValue());
    }

    public render(): JSX.Element {
        const classes:string[] = [
            "checkboxIconButton__container",
            "input__container"
        ];

        if(this.props.theme === Theme.Primary) {
            classes.push('input__container--primary');
        } else {
            classes.push('input__container--default');
        }

        let modifier:string = "input__value input__value--true";
        if(!this.state.checked) {
            modifier = "input__value input__value--false";
        }

        return (
            <div className={classes.join(" ")} onClick={this.toggleState}>
                <div className={modifier}>
                    <FontAwesomeIcon icon={this.props.icon}/>
                </div>
            </div>
        );
    }
}

export default CheckboxIconButton;