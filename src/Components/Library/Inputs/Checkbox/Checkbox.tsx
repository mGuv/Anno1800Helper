import InputProps from "../InputProps";
import React from "react";
import EventValue from "../../../../EventValue";
import Theme from "../Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import "./Checkbox.scss";

interface Props extends InputProps {
    label?:string;
    value:EventValue<boolean>;
}

interface State {
    checked:boolean;
}

class Checkbox extends React.PureComponent<Props, State> {
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

    private updateState = (value:boolean) => {
        this.setState({
            checked: value
        });
    }

    private toggleState = () => {
        this.props.value.setValue(!this.props.value.getValue());
    }

    public render(): JSX.Element {
        const classes:string[] = [
            "checkbox__container",
            "input__container"
        ];

        if(this.props.theme === Theme.Primary) {
            classes.push('input__container--primary');
        } else {
            classes.push('input__container--default');
        }

        const name:string = this.props.label || "";

        const labelElement:JSX.Element | null = name.length > 0 ? (<div className="input__label">{this.props.label}: </div>) : null;

        return (
            <div className={classes.join(" ")} onClick={this.toggleState}>
                {labelElement}
                <div className="input__value input__value--checkbox">
                    {
                        this.state.checked ? <FontAwesomeIcon icon={faCheckSquare} /> : <FontAwesomeIcon  icon={faSquare}/>
                    }
                </div>
            </div>
        );
    }
}

export default Checkbox;