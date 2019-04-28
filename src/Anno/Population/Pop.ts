import PopType from "./PopType";
import ResourceNeed from "./ResourceNeed";
import ServiceNeed from "./ServiceNeed";

interface Pop {
    popType: PopType,
    name: string
    resourceNeeds: ResourceNeed[],
    serviceNeeds: ServiceNeed[],
};

export default Pop;