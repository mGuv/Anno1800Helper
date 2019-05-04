import React from "react";
import IslandPop from "../../Anno/Island/IslandPop";
import Button from "../Inputs/Button/Button";
import Theme from "../Inputs/Theme";
import PopUp from "../PopUp/PopUp";
import NumberField from "../Inputs/NumberField/NumberField";
import Checkbox from "../Inputs/Checkbox/Checkbox";
import ResourceType from "../../Anno/Resources/ResourceType";

/** Props required to display a popup */
interface Props {
    pop: IslandPop
}

/** Required state for Popup */
interface State {
    isOpen:boolean,
    residents: number;
}

/** 
 * Component that represents a small window within the application and can contain any content
 */
class IslandPanel extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props: Props) {
        super(props);
        this.state = {
            isOpen:false,
            residents: props.pop.residents.getValue(),
        };

        this.props.pop.residents.registerOnChange(this.updateCount);
    }

    public componentWillUnmount = () => {
        this.props.pop.residents.deregisterOnChange(this.updateCount);
    }

    private updateCount = (residents:number) => {
        this.setState({
            residents
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
    
    /** @inheritdoc */
    public render(): JSX.Element {
        return (
            <React.Fragment>
            <Button theme={Theme.Primary} iconLeft={this.props.pop.pop.icon} name={this.props.pop.residents.getValue().toString()} onClick={this.open}/>
                {
                    this.state.isOpen && (
                    <PopUp onClose={this.close} title={"Island's " + this.props.pop.pop.name + "s"}>
                        <NumberField name="Residents" value={this.props.pop.residents}/>
                        {
                            this.props.pop.enabledResourceNeeds.All.map((kvp) => {
                                return <Checkbox label={kvp.key.resourceType.name} value={kvp.value}/>;
                            })
                        }
                        {
                            this.props.pop.enabledServiceNeeds.All.map((kvp) => {
                                return <Checkbox label={kvp.key.serviceType.name} value={kvp.value}/>;
                            })
                        }
                    </PopUp>
                    )
                }
            </React.Fragment>
        )
    }
}

export default IslandPanel;