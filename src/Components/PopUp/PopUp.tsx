import React from "react";
import './PopUp.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IconButton from "../Inputs/IconButton/IconButton";
import Theme from "../Inputs/Theme";

/** Props required to display a popup */
interface Props {
    /** The title to show in the header of the pop up */
    title:string;
    /** The callback to use when the Close button is clicked */
    onClose: () => void
}

/** Required state for Popup */
interface State {
    
}

/** 
 * Component that represents a small window within the application and can contain any content
 */
class PopUp extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    /** @inheritdoc */
    public render(): JSX.Element {
        return (
            <div className="popUp__background">
                <div className="popUp__container">
                    <div className="popUp__header">{this.props.title}<IconButton theme={Theme.Primary} icon={faTimes} onClick={this.props.onClose}/> </div>
                    <div className="popUp__content">{this.props.children}</div>
                    <div className="popUp__footer"><div>ok</div></div>
                </div>
            </div>
        )
    }
}

export default PopUp;