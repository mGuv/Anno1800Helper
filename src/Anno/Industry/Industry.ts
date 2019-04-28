import IndustryType from "./IndustryType";
import ResourceType from "../Resources/ResourceType";
import Produce from "./Produce";
import PopType from "../Population/PopType";
import Dictionary from "../../Collections/Dictionary";

interface Industry {
    industryType: IndustryType,
    name: string,
    produces: Produce[],
    productionTime: number,
    resources: ResourceType[],
    runningCost: number,
    requiredEmployees: Dictionary<PopType, number>,
};

export default Industry;