import IndustryType from "./IndustryType";
import Produce from "./Produce";
import PopType from "../Population/PopType";
import Dictionary from "../../Collections/Dictionary";
import Resource from "../Resources/Resource";

/**
 * Represents a Building in Anno that is built to offer a service/resource
 */
interface Industry {
    /** The type of Industry this instance represents */
    industryType: IndustryType,

    /** The display name of this Industry */
    name: string,

    /** The resources this Industry can produce */
    produces: Produce[],

    /** The base time it takes to complete a produce cycle at 100% */
    productionTime: number,

    /** The required resources to start the production cycle*/
    resources: Resource[],

    /** How much coin this Industry costs to run */
    runningCost: number,

    /** The require employees to run the Industry */
    requiredEmployees: Dictionary<PopType, number>,
};

export default Industry;