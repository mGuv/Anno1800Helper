import IslandType from "./Region";
import Region from "./Region";
import Inhabitant from "./Inhabitant";
import { PopServiceSingleton, PopService } from "../../Services/PopService";
import PopType from "../Population/PopType";
import Dictionary from "../../Collections/Dictionary";
import EventValue from "../../EventValue";
import Resource from "../Resources/Resource";
import IslandIndustry from "./IslandIndustry";
import Industry from "../Industry/Industry";
import IndustryService from "../Industry/IndustryService";
import IndustryType from "../Industry/IndustryType";

const popService:PopService = PopServiceSingleton;
const industryService:IndustryService = IndustryService.Get();

/** Represents an instance of a Player's Island */
class Island {
    /** The island's name */
    public readonly name: string;

    /** What region the island is in */
    public readonly islandType: Region;

    /** The population of the island */
    public readonly inhabitants:Inhabitant[] = [];

    /** The industries on this island */
    public readonly industries:IslandIndustry[] = [];

    public readonly demand:EventValue<Dictionary<Resource, number>> = new EventValue(new Dictionary());
    public readonly supply:EventValue<Dictionary<Resource, number>> = new EventValue(new Dictionary());



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

        // Not ideal but being lazy
        industryService.All().forEach(industry => {
            this.addIndustry(industry.industryType);
        });
    }

    private addIndustry = (industryType:IndustryType) => {
        const newIndustry:IslandIndustry = new IslandIndustry(industryService.Get(industryType));
        this.industries.push(newIndustry);
        newIndustry.amount.registerOnChange(this.recalculateSupply);
        newIndustry.workRatio.registerOnChange(this.recalculateSupply);
        newIndustry.amount.registerOnChange(this.recalculateDemand);
        newIndustry.workRatio.registerOnChange(this.recalculateDemand);
    }

    private recalculateSupply = () => {
        const supply:Dictionary<Resource, number> = new Dictionary();
        this.industries.forEach(industry => {
            const ratio:number =  (1 / industry.industry.productionTime) * (industry.workRatio.getValue() / 100) * industry.amount.getValue();
            industry.industry.produces.forEach(produce => {
                if(!supply.Has(produce.resource)) {
                    supply.Add(produce.resource, 0);
                }

                supply.Add(produce.resource, supply.Get(produce.resource) + (ratio * produce.amount));
            });
        });

        this.supply.setValue(supply);
    }

    private addInhabitant = (popType:PopType) => {
        const newInhabitant:Inhabitant = new Inhabitant(popService.pops.Get(popType));
        this.inhabitants.push(newInhabitant);
        newInhabitant.requiredHouses.registerOnChange(this.recalculateDemand);
        newInhabitant.suppliedResources.All.forEach(kvp => {
            kvp.value.registerOnChange(this.recalculateDemand);
        });
    }

    private recalculateDemand = () => {
        const newDemand:Dictionary<Resource, number> = new Dictionary();
        // loop through all pops, look at what is enabled, go from there
        this.inhabitants.forEach(inhabitant => {
            inhabitant.suppliedResources.All.forEach(kvp => {
                if(!kvp.value.getValue()) {
                    return;
                }

                if(!newDemand.Has(kvp.key.resourceType)) {
                    newDemand.Add(kvp.key.resourceType, 0);
                }

                newDemand.Add(kvp.key.resourceType, newDemand.Get(kvp.key.resourceType) + (kvp.key.consumptionPerHouseholdPerSecond * inhabitant.requiredHouses.getValue()));
            });
        });

        // And industry demand
        this.industries.forEach(industry => {

            if(industry.amount.getValue() === 0 ) {
                return;
            }

            const ratio:number =  (1 / industry.industry.productionTime) * (industry.workRatio.getValue() / 100) * industry.amount.getValue();
            industry.industry.resources.forEach(resource => {
                if(!newDemand.Has(resource)) {
                    newDemand.Add(resource, 0);
                }

                newDemand.Add(resource, newDemand.Get(resource) + (ratio));
            });
        });

        this.demand.setValue(newDemand);
    }
}

export default Island;