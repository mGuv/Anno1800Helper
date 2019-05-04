import React from "react";
import './PopUp.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IconButton from "../Inputs/IconButton/IconButton";
import Theme from "../Inputs/Theme";
import Button from "../Inputs/Button/Button";

/** Props required to display a popup */
interface Props {
    /** The title to show in the header of the pop up */
    title:string;
    /** The callback to use when the Close button is clicked */
    onClose: () => void;
    buttons?: {name:string, onClick:()=>void}[]
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
                    <div className="popUp__footer">
                    {
                        this.props.buttons && 
                        this.props.buttons.map((thing) => {
                            return<Button theme={Theme.Primary} name={thing.name} onClick={thing.onClick}/>
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default PopUp;