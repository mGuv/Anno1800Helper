import ResourceType from "../Resources/ResourceType";
import Need from "./Need";

interface ResourceNeed extends Need {
    resourceType: ResourceType,
    requiredForUpgrade: boolean,
    consumptionPerHouseholdPerSecond: number
};

export default ResourceNeed;