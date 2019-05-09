import IslandType from "./Region";
import Region from "./Region";
import Inhabitant from "./Inhabitant";
import { PopServiceSingleton, PopService } from "../../Services/PopService";
import PopType from "../Population/PopType";

const popService:PopService = PopServiceSingleton;

/** Represents an instance of a Player's Island */
class Island {
    /** The island's name */
    public readonly name: string;

    /** What region the island is in */
    public readonly islandType: Region;

    public readonly inhabitants:Inhabitant[] = [];



    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     */
    public constructor(name: string, islandType:IslandType) {
        this.name = name;
        this.islandType = islandType;

        if(this.islandType === IslandType.NewWorld) {
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Obrero)));
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Jornalero)));
        } else {
            this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Farmer)));
            this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Worker)));
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Artisan)));
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Engineer)));
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Investor)));
        }
    }
}

export default Island;