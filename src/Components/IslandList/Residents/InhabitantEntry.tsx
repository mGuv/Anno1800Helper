import React from "react";
import Inhabitant from "../../../Anno/Island/Inhabitant";
import InhabitantPopUp from "./InhabitantPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Dictionary from "../../../Collections/Dictionary";
import ResourceType from "../../../Anno/Resources/ResourceType";
import ServiceType from "../../../Anno/Services/ServiceType";

/** Props required for the Residents Component */
interface Props {
    inhabitant:Inhabitant
}

/** State required by the Residents Component */
interface State {
    amount:number,
    requiredHouses:number,
    popUpOpen:boolean,
    resources: Dictionary<ResourceType, boolean>,
    services: Dictionary<ServiceType, boolean>,
}

/**
 * Component to represent a single Inhabitant on an Island
 */
class InhabitantEntry extends React.PureComponent<Props, State> {
    /** @inheritdoc */
    public constructor(props:Props) {
        super(props);

        const resources: Dictionary<ResourceType, boolean> = new Dictionary();
        props.inhabitant.suppliedResources.All.forEach(kvp => {
            resources.Add(kvp.key.resourceType.resourceType, kvp.value.getValue());
            kvp.value.registerOnChange(this.updateResources);
        });

        const services: Dictionary<ServiceType, boolean> = new Dictionary();
        props.inhabitant.suppliedServices.All.forEach(kvp => {
            services.Add(kvp.key.serviceType.serviceType, kvp.value.getValue());
            kvp.value.registerOnChange(this.updateServices);
        });

        this.state = {
            amount: props.inhabitant.amount.getValue(),
            requiredHouses: props.inhabitant.requiredHouses.getValue(),
            popUpOpen: false,
            resources,
            services,
        };

        props.inhabitant.amount.registerOnChange(this.updateAmount);
        props.inhabitant.requiredHouses.registerOnChange(this.updateRequiredHouses);
    }

    /** @inheritdoc */
    public componentWillUnmount= () => {
        this.props.inhabitant.amount.deregisterOnChange(this.updateAmount);
        this.props.inhabitant.requiredHouses.deregisterOnChange(this.updateAmount);
        this.props.inhabitant.suppliedResources.All.forEach(kvp => {
            kvp.value.deregisterOnChange(this.updateResources);
        });
        this.props.inhabitant.suppliedServices.All.forEach(kvp => {
            kvp.value.deregisterOnChange(this.updateServices);
        });
    }

    /** Handle the Resource needs changing */
    private updateResources = (oldValue:boolean, newValue:boolean) => {
        const resources: Dictionary<ResourceType, boolean> = new Dictionary();
        this.props.inhabitant.suppliedResources.All.forEach(kvp => {
            resources.Add(kvp.key.resourceType.resourceType, kvp.value.getValue());
        });

        this.setState({
            resources
        });
    }

    /** Handle the Services needs changing */
    private updateServices = (oldValue:boolean, newValue:boolean) => {
        const services: Dictionary<ServiceType, boolean> = new Dictionary();
        this.props.inhabitant.suppliedServices.All.forEach(kvp => {
            services.Add(kvp.key.serviceType.serviceType, kvp.value.getValue());
        });

        this.setState({
            services
        });
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

    /**
     * Opens the edit pop up
     */
    private openPopUp = () => {
        this.setState({
            popUpOpen: true
        });
    }

    /**
     * Closes the edit pop up
     */
    private closePopUp =() => {
        this.setState({
            popUpOpen: false
        });
    }

    /** @inheritdoc */
    public render():JSX.Element {
        return (
            <React.Fragment>
            <div className="inhabitantEntry__body" onClick={this.openPopUp}>
                <div>
                    {this.props.inhabitant.pop.name}
                </div>
                <div><FontAwesomeIcon icon={this.props.inhabitant.pop.icon}/> {this.state.amount}</div>
                <div><FontAwesomeIcon icon={faHome}/> {this.state.requiredHouses}</div>
                {
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
                }
            </div>
            {
                this.state.popUpOpen && <InhabitantPopUp onClose={this.closePopUp} inhabitant={this.props.inhabitant}  />
            }
            </React.Fragment>
        );
    }
}

export default InhabitantEntry;