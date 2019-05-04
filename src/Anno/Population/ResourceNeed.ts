import Need from "./Need";
import Resource from "../Resources/Resource";

/**
 * Represents a Resource that is Needed by Pops
 */
interface ResourceNeed extends Need {
    /** The Resource that is needed */
    resourceType: Resource,
    
    /** The rate at which this Pop consumes this resource, per HOUSEHOLD per second */
    consumptionPerHouseholdPerSecond: number
};

export default ResourceNeed;