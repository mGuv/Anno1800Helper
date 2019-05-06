import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import EventValue from "../../EventValue";
import IslandType from "./IslandType";
import IslandPop from "./IslandPop";
import PopService from "../Population/PopService";
import IndustryType from "../Industry/IndustryType";
import IslandIndustry from "./IslandIndustry";
import IndustryService from "../Industry/IndustryService";

const popService:PopService = PopService.Get();
const industryService:IndustryService = IndustryService.Get();


/** Represents an instance of a Player's Island */
class Island {
    /** Editable name of the Island */
    public name: EventValue<string>;

    /** Editable Populations of each Pop Type */
    public population: Dictionary<PopType, IslandPop>;

    /** Editable number of each Industry */
    public industry: Dictionary<IndustryType, IslandIndustry>;

    /** What region the island is in */
    public islandType: IslandType;

    /**
     * Build a new Island with the given parameters
     * 
     * @param name The Name of the Island
     * @param islandType The Region the Island is in
     */
    public constructor(name: EventValue<string>, islandType:IslandType) {
        this.name = name;
        this.islandType = islandType;
        
        this.population = new Dictionary();
        this.population.Add(PopType.Farmer, new IslandPop(popService.getPop(PopType.Farmer)));
        this.population.Add(PopType.Worker, new IslandPop(popService.getPop(PopType.Worker)));

        this.industry = new Dictionary();
        industryService.All().forEach(industry => {
            this.industry.Add(industry.industryType, new IslandIndustry(industry));
        });

    }

    /**
     * @inheritdoc
     */
    public toString = () => {
        return this.name.getValue();
    }
}

export default Island;