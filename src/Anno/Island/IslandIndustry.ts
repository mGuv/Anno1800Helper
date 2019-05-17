import EventValue from "../../EventValue";
import Industry from "../Industry/Industry";


/** Represents a single Population assignment on an Island */
class IslandIndustry {
    public readonly industry:Industry;
    public readonly amount:EventValue<number> = new EventValue(0);
    public readonly workRatio:EventValue<number> = new EventValue(100);    

    /**
     * Build a new Island with the given parameters
     * 
     * @param pop The population being represented by this inhabitant entry
     */
    public constructor(industry:Industry) {
        this.industry = industry
    }
}

export default IslandIndustry;