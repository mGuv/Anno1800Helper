import Pop from "../Population/Pop";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import Need from "../Population/Need";

/** Represents a single Population assignment on an Island */
class Inhabitant {
    public readonly pop:Pop;
    public readonly amount:EventValue<number> = new EventValue(0);
    public readonly requiredHouses:EventValue<number> = new EventValue(0);
    public readonly needFulfillment:Dictionary<Need, EventValue<boolean>> = new Dictionary();    

    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     */
    public constructor(pop:Pop) {
        this.pop = pop;
    }
}

export default Inhabitant;