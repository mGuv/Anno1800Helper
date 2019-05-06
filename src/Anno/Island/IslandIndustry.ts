import EventValue from "../../EventValue";
import Industry from "../Industry/Industry";

class IslandIndustry {
    public readonly industry:Industry;
    public readonly amount:EventValue<number>;
    public readonly workRatio:EventValue<number>;

    public constructor(industry:Industry) {
        this.industry = industry;
        this.amount = new EventValue(0);
        this.workRatio = new EventValue(1);
    }
}

export default IslandIndustry;