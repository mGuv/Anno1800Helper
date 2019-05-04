import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import ResourceNeed from "../Population/ResourceNeed";
import Pop from "../Population/Pop";
import ServiceNeed from "../Population/ServiceNeed";
import Resource from "../Resources/Resource";

class IslandPop {
    public pop: Pop;
    public residents: EventValue<number>;

    public readonly enabledResourceNeeds:Dictionary<ResourceNeed, EventValue<boolean>>;
    public readonly enabledServiceNeeds:Dictionary<ServiceNeed, EventValue<boolean>>;

    public readonly demand:EventValue<Dictionary<Resource, number>> = new EventValue(new Dictionary());

    public readonly requiredHouses:EventValue<number> = new EventValue(0);

    public constructor(pop:Pop) {
        this.pop = pop;
        this.residents = new EventValue(0);

        this.enabledResourceNeeds = new Dictionary();
        this.enabledServiceNeeds = new Dictionary();

        pop.resourceNeeds.forEach((need) => {
            const event:EventValue<boolean> = new EventValue<boolean>(false);
            this.enabledResourceNeeds.Add(need, event);
            event.registerOnChange(this.needChanged);
        });

        pop.serviceNeeds.forEach((need) => {
            const event:EventValue<boolean> = new EventValue<boolean>(false);
            this.enabledServiceNeeds.Add(need, event);
            event.registerOnChange(this.needChanged);

        });

        this.residents.registerOnChange(this.residentsChanged);
    }


    private residentsChanged = (residents:number) => {
        this.recalculateDemand();
    }

    private needChanged = (newValue:boolean) => {
        this.recalculateDemand();
    }

    private recalculateDemand = () => {
        const houseHolds:number = this.getHousingCount();
        const required:Dictionary<Resource, number> = new Dictionary();
        this.enabledResourceNeeds.All.forEach((kvp) => {
            if(!kvp.value.getValue()) {
                return;
            }
            required.Add(kvp.key.resourceType, kvp.key.consumptionPerHouseholdPerSecond * houseHolds);
        });

        this.demand.setValue(required);
        this.requiredHouses.setValue(houseHolds);
    }

    public getHousingCount = () => {
        let perHousehold: number = 0;

        this.enabledResourceNeeds.All.forEach((kvp) => {
            if(!kvp.value.getValue()) {
                return;
            }

            perHousehold += kvp.key.popsGenerated;
        });

        this.enabledServiceNeeds.All.forEach((kvp) => {
            if(!kvp.value.getValue()) {
                return;
            }
            
            perHousehold += kvp.key.popsGenerated;
        });

        return Math.ceil(this.residents.getValue() / perHousehold);
    }
}

export default IslandPop;