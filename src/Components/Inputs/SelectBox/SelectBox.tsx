import React from "react";
import EventValue from "../../../EventValue";
import "./SelectBox.scss";
import handleClickOutside from 'react-click-outside';
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props<T> {
    value: EventValue<T>,
    options: T[],
}

interface State<T> {
    currentValue: T,
    isOpen: boolean,
}

class SelectBox<T> extends React.PureComponent<Props<T>, State<T>> {

    public constructor(props: Props<T>) {
        super(props);
        this.state = {
            currentValue: props.value.getValue(),
            isOpen: false,
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

    public render(): JSX.Element {

        if (!this.state.isOpen) {
            return (
                <div className="selectBox__container" onClick={this.open}>
                    <div className="label__container">
                        <span className="value">{this.state.currentValue.toString()}</span>
                        <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span>
                    </div>
                </div>
            );
        }

        return (
            <div className="selectBox__container">
                <div className="label__container" onClick={this.close}>
                    <span className="value">{this.state.currentValue.toString()}</span>
                    <span className="icon"><FontAwesomeIcon icon={faChevronUp} /></span>
                </div>
                <div className="options__container">
                    {
                        this.props.options.map((value) => {
                            return <div className="option" key={value.toString()} onClick={() => { this.select(value) }}>{value.toString()}</div>;
                        })
                    }
                </div>
            </div>
        );
    }
}



export default handleClickOutside(SelectBox);