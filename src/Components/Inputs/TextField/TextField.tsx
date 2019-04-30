import React, { RefObject } from "react";
import "./TextField.scss";
import EventValue from "../../../EventValue";

interface Props {
    name?: string;
    value: EventValue<string>;
    autoFocus?:boolean;
    placeholder?:string;
}

interface State {
    currentValue:string;
    focused: boolean;
}

class TextField extends React.PureComponent<Props, State> {

    private ref: RefObject<HTMLInputElement>;

    public constructor(props:Props) {
        super(props);
        this.state = {
            currentValue: props.value.getValue(),
            focused: false,
        };

        this.props.value.registerOnChange(this.handleValueChange);

        this.ref = React.createRef<HTMLInputElement>();
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

    private onClick = () => {
        if(this.ref.current) {
            this.ref.current.focus();
        }
    };

    public render() : JSX.Element {

        const classes:string[] = [
            "textField__container"
        ];

        if(this.state.focused) {
            classes.push("textField__container--focused");
        }

        const autoFocus:boolean = this.props.autoFocus || false;
        const placeholder:string = this.props.placeholder || "";
        const name:string = this.props.name || "";

        const labelElement:JSX.Element | null = name.length > 0 ? (<div className="label">{this.props.name}: </div>) : null;

        return (
            <div className={classes.join(" ")} onClick={this.onClick}>
                {labelElement}
                <div className="inputContainer">
                    <input placeholder={placeholder} autoFocus={autoFocus} ref={this.ref} onFocus={this.focus} onBlur={this.blur} className="textField" type="text" value={this.state.currentValue} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default TextField;