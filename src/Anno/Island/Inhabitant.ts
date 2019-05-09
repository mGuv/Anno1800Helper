import Pop from "../Population/Pop";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import ResourceNeed from "../Population/ResourceNeed";
import ServiceNeed from '../Population/ServiceNeed';

/** Represents a single Population assignment on an Island */
class Inhabitant {
    public readonly pop:Pop;
    public readonly amount:EventValue<number> = new EventValue(0);
    public readonly requiredHouses:EventValue<number> = new EventValue(0);
    public readonly suppliedResources:Dictionary<ResourceNeed, EventValue<boolean>> = new Dictionary();
    public readonly suppliedServices:Dictionary<ServiceNeed, EventValue<boolean>> = new Dictionary();
    

    /**
     * Build a new Island with the given parameters
     * 
     * @param pop The population being represented by this inhabitant entry
     */
    public constructor(pop:Pop) {
        this.pop = pop;
        this.pop.resourceNeeds.forEach(need => {
            this.suppliedResources.Add(need, new EventValue<boolean>(false));
            this.suppliedResources.Get(need).registerOnChange(this.handleSupplyUpdate);
        });

        this.pop.serviceNeeds.forEach(need => {
            this.suppliedServices.Add(need, new EventValue<boolean>(false));
            this.suppliedServices.Get(need).registerOnChange(this.handleSupplyUpdate);
        });

        this.amount.registerOnChange(this.handleSupplyUpdate);
    }

    /**
     * Recalculates any data that is dependent on the Inhabitant's settings
     */
    private handleSupplyUpdate = () => {
        let maxPops:number = 0;

        this.suppliedResources.All.forEach(kvp => {
            if(!kvp.value.getValue()) {
                return;
            }

            maxPops += kvp.key.popsGenerated;
        });

        this.suppliedServices.All.forEach(kvp => {
            if(!kvp.value.getValue()) {
                return;
            }

            maxPops += kvp.key.popsGenerated;
        });

        this.requiredHouses.setValue(Math.ceil(this.amount.getValue() / maxPops));
    }
}

export default Inhabitant;