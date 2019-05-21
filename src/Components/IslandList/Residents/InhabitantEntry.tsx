import React from "react";
import Inhabitant from "../../../Anno/Island/Inhabitant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import CheckboxIconButton from "../../Library/Inputs/CheckboxIconButton/CheckboxIconButton";
import Theme from "../../Library/Inputs/Theme";

/** Props required for the Residents Component */
interface Props {
    inhabitant:Inhabitant
}

/** State required by the Residents Component */
interface State {
    amount:number,
    requiredHouses:number,
    popUpOpen:boolean,
}

/**
 * Component to represent a single Inhabitant on an Island
 */
class InhabitantEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);

        this.state = {
            amount: props.inhabitant.amount.getValue(),
            requiredHouses: props.inhabitant.requiredHouses.getValue(),
            popUpOpen: false,
        };

        props.inhabitant.amount.registerOnChange(this.updateAmount);
        props.inhabitant.requiredHouses.registerOnChange(this.updateRequiredHouses);
    }

    /** @inheritdoc */
    public componentWillUnmount= () => {
        this.props.inhabitant.amount.deregisterOnChange(this.updateAmount);
        this.props.inhabitant.requiredHouses.deregisterOnChange(this.updateAmount);
    }

    /**
     * Handle the Amount of this Inhabitant changing
     */
    private updateAmount = (oldValue:number, newValue:number) => {
        this.setState({
            amount: newValue
        });
    }

    /**
     * Handle the Amount of the required houses changing
     */
    private updateRequiredHouses = (oldValue:number, newValue:number) => {
        this.setState({
            requiredHouses: newValue
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <React.Fragment>
            <div className="inhabitantEntry__body">
                <div>
                    {this.props.inhabitant.pop.name}
                </div>
                <div><FontAwesomeIcon icon={this.props.inhabitant.pop.icon}/> {this.state.amount}</div>
                <div><FontAwesomeIcon icon={faHome}/> {this.state.requiredHouses}</div>
                {
                    this.props.inhabitant.suppliedResources.All.map(kvp => {
                        return <CheckboxIconButton theme={Theme.Primary} icon={kvp.key.resourceType.icon} value={kvp.value}/>
                    })
                }

                {/* {
                    this.props.inhabitant.suppliedResources.All.map(kvp => {
                        let color:string = "red";
                        if(kvp.value.getValue()) {
                            color = "green";
                        }
                        return <div style={{color}}><FontAwesomeIcon icon={kvp.key.resourceType.icon}/></div>
                    })
                }
                {
                    this.props.inhabitant.suppliedServices.All.map(kvp => {
                        let color:string = "red";
                        if(kvp.value.getValue()) {
                            color = "green";
                        }
                        return <div style={{color}}>{kvp.key.serviceType.name}</div>
                    })
                } */}
            </div>
            </React.Fragment>
        );
    }
}

export default InhabitantEntry;