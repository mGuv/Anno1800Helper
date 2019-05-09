import React, { RefObject } from "react";
import EventValue from "../../../../EventValue";
import "../Input.scss";
import InputProps from "../InputProps";
import Theme from "../Theme";

/** Required props to use the TextField */
interface Props extends InputProps {
    /** Optional name to display next to the input */
    name?: string;
    /** The Event Number this NumberField controls */
    value: EventValue<number>;
    /** Whether or not the field should be in focus on render */
    autoFocus?:boolean;
    /** The placeholder text to show when there is no value */
    placeholder?:string;
}

/** Required state for the TextField */
interface State {
    /** The current entered value in the number box but not yet submitted */
    currentValue:number;
    focused: boolean;
}

class NumberField extends React.PureComponent<Props, State> {
    /** Reference to the actual Input itself for helping with controlling focus */
    private ref: RefObject<HTMLInputElement>;

    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);
        this.state = {
            currentValue: props.value.getValue(),
            focused: false,
        };

        // As the value can change externally, we want to ensure we stay in sync
        this.props.value.registerOnChange(this.handleValueChange);

        this.ref = React.createRef<HTMLInputElement>();
    }

    /** Tidy up listeners on unmount */
    public componentWillUnmount = () => {
        this.props.value.deregisterOnChange(this.handleValueChange);
    }

    /** Handle the Event String changing externally */
    private handleValueChange = (oldValue:number, newValue:number) => {
        this.setState({
            currentValue: newValue
        });
    }

    /** Handle a user change updating the current entered value */
    private handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const asNumber:number = Number(event.target.value)
        if(isNaN(asNumber)) {
            return;
        }

        this.setState({
            currentValue: asNumber
        });
    }

    /** Set the input as focused */
    private focus = () => {
        this.setState({
            focused: true
        });
    }

    /** Set the input as unfocused */
    private blur = () => {
        this.props.value.setValue(this.state.currentValue);
        this.setState({
            focused: false
        });
    }

    /** Handler for when the TextField is clicked */
    private onClick = () => {
        if(this.ref.current) {
            this.ref.current.focus();
        }
    };

    /** @inheritdoc */
    public render() : JSX.Element {
        const classes:string[] = [
            "textField__container",
            "input__container"
        ];

        if(this.state.focused) {
            classes.push("textField__container--focused");
        }

        if(this.props.theme === Theme.Primary) {
            classes.push('input__container--primary');
        } else {
            classes.push('input__container--default');
        }

        const autoFocus:boolean = this.props.autoFocus || false;
        const placeholder:string = this.props.placeholder || "";
        const name:string = this.props.name || "";

        const labelElement:JSX.Element | null = name.length > 0 ? (<div className="input__label">{this.props.name}: </div>) : null;

        return (
            <div className={classes.join(" ")} onClick={this.onClick}>
                {labelElement}
                <div className="input__value input__value--text">
                    <input placeholder={placeholder} autoFocus={autoFocus} ref={this.ref} onFocus={this.focus} onBlur={this.blur} className="textField" type="text" value={this.state.currentValue} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default NumberField;