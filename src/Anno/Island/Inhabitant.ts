import Pop from "../Population/Pop";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import Need from "../Population/Need";
import ResourceNeed from "../Population/ResourceNeed";

/** Represents a single Population assignment on an Island */
class Inhabitant {
    public readonly pop:Pop;
    public readonly amount:EventValue<number> = new EventValue(0);
    public readonly requiredHouses:EventValue<number> = new EventValue(0);
    public readonly resourceFulfillment:Dictionary<ResourceNeed, EventValue<boolean>> = new Dictionary();    

    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     */
    public constructor(pop:Pop) {
        this.pop = pop;
        this.pop.resourceNeeds.forEach(need => {
            const needValue:EventValue<boolean> = new EventValue<boolean>(false);
            this.resourceFulfillment.Add(need, needValue);
            needValue.registerOnChange(this.recalculateHouses);
        });

        this.amount.registerOnChange(this.recalculateHouses);
    }

    private recalculateHouses = () => {
        let supportedPops:number = 0;

        this.resourceFulfillment.All.forEach(kvp => {
            if(kvp.value.getValue()) {
                supportedPops += kvp.key.popsGenerated;
            }
        });

        this.requiredHouses.setValue(Math.ceil(this.amount.getValue() / supportedPops));
    }
}

export default Inhabitant;