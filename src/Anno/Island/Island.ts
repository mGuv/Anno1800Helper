import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import EventValue from "../../EventValue";
import IslandType from "./IslandType";
import IslandPop from "./IslandPop";
import PopService from "../Population/PopService";

const popService:PopService = PopService.Get();

/** Represents an instance of a Player's Island */
class Island {
    /** Editable name of the Island */
    public name: EventValue<string>;

    /** Editable Populations of each Pop Type */
    public population: Dictionary<PopType, IslandPop>;

    /** What region the island is in */
    public islandType: IslandType;

    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     * @param pops  The starting Pops of this island
     */
    public constructor(name: EventValue<string>, islandType:IslandType, pops?: Dictionary<PopType, IslandPop>) {
        this.name = name;
        this.islandType = islandType;
        if(pops === undefined) {
            pops = new Dictionary<PopType, IslandPop>();
            pops.Add(PopType.Farmer, new IslandPop(popService.getPop(PopType.Farmer)));
            pops.Add(PopType.Worker, new IslandPop(popService.getPop(PopType.Worker)));
        }
        this.population = pops;
    }

    /**
     * @inheritdoc
     */
    public toString = () => {
        return this.name.getValue();
    }
}

export default Island;