import React from "react";
import EventValue from "../../../../EventValue";
import "../Input.scss";
import handleClickOutside from 'react-click-outside';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactResizeDetector from 'react-resize-detector';
import InputProps from "../InputProps";
import Theme from "../Theme";

/**
 * Required Props to use the Select Box
 */
interface Props<T> extends InputProps {
    /** The value to bind to for when the Select Box changes */
    value: EventValue<T>,
    /** The available options to display in the menu, T most override ToString to make sense */
    options: T[],
    /** Optional name to display next to the input */
    name?: string,
}

/**
 * Required State for the Select Box
 */
interface State<T> {
    /** The currently selected value */
    currentValue: T,
    /** Whether or not the options should be displayed */
    isOpen: boolean,
    /** Width used internally to correct size select options as they are rendered using display:fixed */
    width: number,
}

/**
 * Component that represents a drop down menu, can display optional label and shows currently selected value
 */
class SelectBox<T> extends React.PureComponent<Props<T>, State<T>> {
    /** @inheritdoc */
    public constructor(props: Props<T>) {
        super(props);
        this.state = {
            currentValue: props.value.getValue(),
            isOpen: false,
            width: 0,
        };

        // As the value could change externally, we want to ensure we stay in sync
        this.props.value.registerOnChange(this.handleValueChanged);
    }

    /** Click handler for closing the options when someone clicks off the component */
    public handleClickOutside = () => {
        this.close();
    }

    /** Used to remove the lisenter on the selected value when no longer required */
    public componentWillUnmount = () => {
        this.props.value.deregisterOnChange(this.handleValueChanged);
    };

    /** Trigger for when the Value has changed (as can change externally) */
    private handleValueChanged = (oldValue: T, newValue: T) => {
        this.setState({
            currentValue: newValue
        });
    };

    /** Opens the Options to be visible */
    private open = () => {
        this.setState({
            isOpen: true
        });
    }

    /** Closes the options so they are no longer visible */
    private close = () => {
        this.setState({
            isOpen: false
        });
    }

    /** Callback to select the given option */
    private select = (value: T) => {
        this.props.value.setValue(value);
        this.setState({
            isOpen: false
        });
    };

    /** Handler for when the select box is resized for any reason to keep options the same width  */
    private setWidth = (width: number) => {
        this.setState({
            width: width
        });
    }

    /** @inheritdoc */
    public render(): JSX.Element {
        // If a name isn't present - it still requires an element to correctly render
        const name: string = this.props.name || "";
        const labelElement: JSX.Element | null = name.length > 0 ? (<div className="input__label">{this.props.name}: </div>) : null;
        const fillerElement: JSX.Element | null = name.length > 0 ? (<div className="filler"></div>) : null;

        const classes:string[] = [
            "input__container",
        ];

        const options:string[] = [
            "options"
        ];

        if(this.props.theme === Theme.Primary) {
            classes.push("input__container--primary");
            options.push("options--primary");
        } else {
            classes.push("input__container--default");
            options.push("options--default");
        }


        const currentValue:string = this.state.currentValue ? this.state.currentValue.toString() : "";

        // Render just the selected value
        if (!this.state.isOpen) {
            return (
                <div className="selectBox__container" onClick={this.open}>
                    <div className={classes.join(" ")}>
                        {labelElement}
                        <div className="input__value">
                            <span className="value">{currentValue}</span>
                            <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                        <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.setWidth} />
                    </div>
                </div>
            );
        }

        // Render the selected value and all the options
        return (
            <div className="selectBox__container">
                <div className={classes.join(" ")}>
                    {labelElement}
                    <div className="input__value" onClick={this.close}>
                        <span className="value">{currentValue}</span>
                        <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span>                    
                    </div>
                    <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.setWidth} />
                </div>
                <div className="options__container" style={{ width: this.state.width }}>
                    {fillerElement}
                    <div className={options.join(" ")}>
                    {
                        this.props.options.map((value) => {
                            return <div className="option" key={value.toString()} onClick={() => { this.select(value) }}>{value.toString()}</div>;
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}



export default handleClickOutside(SelectBox);