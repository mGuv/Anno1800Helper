import IslandType from "./Region";
import Region from "./Region";
import Inhabitant from "./Inhabitant";
import { PopServiceSingleton, PopService } from "../../Services/PopService";
import PopType from "../Population/PopType";
import Dictionary from "../../Collections/Dictionary";
import EventValue from "../../EventValue";
import Resource from "../Resources/Resource";

const popService:PopService = PopServiceSingleton;

/** Represents an instance of a Player's Island */
class Island {
    /** The island's name */
    public readonly name: string;

    /** What region the island is in */
    public readonly islandType: Region;

    /** The population of the island */
    public readonly inhabitants:Inhabitant[] = [];

    public readonly demand:EventValue<Dictionary<Resource, number>> = new EventValue(new Dictionary());



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
            this.addInhabitant(PopType.Farmer);
            this.addInhabitant(PopType.Worker);
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Artisan)));
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Engineer)));
            // this.inhabitants.push(new Inhabitant(popService.pops.Get(PopType.Investor)));
        }
    }

    private addInhabitant = (popType:PopType) => {
        const newInhabitant:Inhabitant = new Inhabitant(popService.pops.Get(popType));
        this.inhabitants.push(newInhabitant);
        newInhabitant.requiredHouses.registerOnChange(this.recalculateDemand);
        newInhabitant.resourceFulfillment.All.forEach(kvp => {
            kvp.value.registerOnChange(this.recalculateDemand);
        });
    }

    private recalculateDemand = () => {
        const newDemand:Dictionary<Resource, number> = new Dictionary();
        // loop through all pops, look at what is enabled, go from there
        this.inhabitants.forEach(inhabitant => {
            inhabitant.resourceFulfillment.All.forEach(kvp => {
                if(!kvp.value.getValue()) {
                    return;
                }

                if(!newDemand.Has(kvp.key.resourceType)) {
                    newDemand.Add(kvp.key.resourceType, 0);
                }

                newDemand.Add(kvp.key.resourceType, newDemand.Get(kvp.key.resourceType) + (kvp.key.consumptionPerHouseholdPerSecond * inhabitant.requiredHouses.getValue()));
            });
        });

        this.demand.setValue(newDemand);
    }
}

export default Island;