import React from "react";
import EventValue from "../../../EventValue";
import "./SelectBox.scss";
import handleClickOutside from 'react-click-outside';
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactResizeDetector from 'react-resize-detector';

interface Props<T> {
    value: EventValue<T>,
    options: T[],
    name?: string,
}

interface State<T> {
    currentValue: T,
    isOpen: boolean,
    width: number,
}

class SelectBox2<T> extends React.PureComponent<Props<T>, State<T>> {

    public constructor(props: Props<T>) {
        super(props);
        this.state = {
            currentValue: props.value.getValue(),
            isOpen: false,
            width: 0,
        };

        this.props.value.registerOnChange(this.handleValueChanged);
    }

    public handleClickOutside = () => {
        this.setState({
            isOpen: false
        });
    }

    public componentWillUnmount = () => {
        this.props.value.deregisterOnChange(this.handleValueChanged);
    };

    private handleValueChanged = (value: T) => {
        this.setState({
            currentValue: value
        });
    };

    private open = () => {
        this.setState({
            isOpen: true
        });
    }

    private close = () => {
        this.setState({
            isOpen: false
        });
    }

    private select = (value: T) => {
        this.props.value.setValue(value);
        this.setState({
            isOpen: false
        });
    };

    private setWidth = (width: number, height: Number) => {
        this.setState({
            width: width
        });
    }

    public render(): JSX.Element {

        const name: string = this.props.name || "";
        const labelElement: JSX.Element | null = name.length > 0 ? (<div className="selectBox__label">{this.props.name}: </div>) : null;
        const fillerElement: JSX.Element | null = name.length > 0 ? (<div className="filler"></div>) : null;

        if (!this.state.isOpen) {
            return (
                <div className="selectBox__container" onClick={this.open}>
                    <div className="control__container">

                        {labelElement}
                        <div className="value__container">
                            <span className="value">{this.state.currentValue.toString()}</span>
                            <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="selectBox__container">
                <div className="control__container">
                    {labelElement}
                    <div className="value__container">
                        <span className="value">{this.state.currentValue.toString()}</span>
                        <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span>                    
                    </div>
                    <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.setWidth} />
                </div>
                <div className="options__container" style={{ width: this.state.width }}>
                    {fillerElement}
                    <div className="options">
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



export default handleClickOutside(SelectBox2);