import ResourceType from "../Resources/ResourceType";
import Need from "./Need";

/**
 * Represents a Resource that is Needed by Pops
 */
interface ResourceNeed extends Need {
    /** The Resource that is needed */
    resourceType: ResourceType,
    
    /** The rate at which this Pop consumes this resource, per HOUSEHOLD per second */
    consumptionPerHouseholdPerSecond: number
};

export default ResourceNeed;