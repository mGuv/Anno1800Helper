import PopType from "../Population/PopType";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import ResourceNeed from "../Population/ResourceNeed";
import PopService from "../Population/PopService";
import Pop from "../Population/Pop";
import ServiceNeed from "../Population/ServiceNeed";

class IslandPop {
    public pop: Pop;
    public residents: EventValue<number>;

    public readonly enabledResourceNeeds:Dictionary<ResourceNeed, EventValue<boolean>>;
    public readonly enabledServiceNeeds:Dictionary<ServiceNeed, EventValue<boolean>>;

    public constructor(pop:Pop) {
        this.pop = pop;
        this.residents = new EventValue(0);

        this.enabledResourceNeeds = new Dictionary();
        this.enabledServiceNeeds = new Dictionary();

        pop.resourceNeeds.forEach((need) => {
            this.enabledResourceNeeds.Add(need, new EventValue<boolean>(false));
        });

        pop.serviceNeeds.forEach((need) => {
            this.enabledServiceNeeds.Add(need, new EventValue<boolean>(false));
        });
    }
}

export default IslandPop;