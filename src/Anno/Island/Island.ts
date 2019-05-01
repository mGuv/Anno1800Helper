import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import EventValue from "../../EventValue";
import IslandType from "./IslandType";

/** Represents an instance of a Player's Island */
class Island {
    /** Editable name of the Island */
    public name: EventValue<string>;

    /** Editable Populations of each Pop Type */
    public population: Dictionary<PopType, EventValue<number>>;

    /** What region the island is in */
    public islandType: IslandType;

    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     * @param pops  The starting Pops of this island
     */
    public constructor(name: EventValue<string>, islandType:IslandType, pops: Dictionary<PopType, EventValue<number>>) {
        this.name = name;
        this.population = pops;
        this.islandType = islandType;
    }

    /**
     * @inheritdoc
     */
    public toString = () => {
        return this.name.getValue();
    }
}

export default Island;