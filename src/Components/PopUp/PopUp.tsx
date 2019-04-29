import React from "react";
import './PopUp.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IconButton from "../Inputs/IconButton/IconButton";



interface Props {
    title:string;
    onClose: () => void
}

interface State {
    
}

class PopUp extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    public render(): JSX.Element {
        return (
            <div className="popUp__background">
                <div className="popUp__container">
                    <div className="popUp__header">{this.props.title}<IconButton icon={faTimes} onClick={this.props.onClose}/> </div>
                    <div className="popUp__content">{this.props.children}</div>
                    <div className="popUp__footer"><div>ok</div></div>
                </div>
            </div>
        )
    }
}

export default PopUp;