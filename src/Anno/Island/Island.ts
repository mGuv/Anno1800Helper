import IslandType from "./Region";
import Region from "./Region";

/** Represents an instance of a Player's Island */
class Island {
    /** Editable name of the Island */
    public name: string;

    /** What region the island is in */
    public islandType: Region;

    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     */
    public constructor(name: string, islandType:IslandType) {
        this.name = name;
        this.islandType = islandType;
    }
}

export default Island;