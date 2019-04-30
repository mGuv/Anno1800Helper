import React from "react";
import "./TextField.scss";
import EventValue from "../../../EventValue";

interface Props {
    name: string;
    value: EventValue<string>;
}

interface State {
    currentValue:string;
    focused: boolean;
}

class TextField extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);
        this.state = {
            currentValue: props.value.getValue(),
            focused: false,
        };

        this.props.value.registerOnChange(this.handleValueChange);
    }

    public componentWillUnmount = () => {
        this.props.value.deregisterOnChange(this.handleValueChange);
    }

    private handleValueChange = (value:string) => {
        this.setState({
            currentValue: value
        });
    }

    private handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentValue: event.target.value
        });
    }

    private focus = () => {
        this.setState({
            focused: true
        });
    }

    private blur = () => {
        this.props.value.setValue(this.state.currentValue);
        this.setState({
            focused: false
        });
    }

    public render() : JSX.Element {

        const classes:string[] = [
            "textField__container"
        ];

        if(this.state.focused) {
            classes.push("textField__container--focused");
        }

        return (
            <div className={classes.join(" ")}>
                <div className="label">
                    {this.props.name}: 
                </div>
                <div className="inputContainer">
                    <input onFocus={this.focus} onBlur={this.blur} className="textField" type="text" value={this.state.currentValue} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default TextField;