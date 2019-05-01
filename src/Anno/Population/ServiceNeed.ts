import ServiceType from "../Services/ServiceType";
import Need from "./Need";

/**
 * Represents a Service that is Needed by Pops
 */
interface ServiceNeed extends Need {
    /**
     * The Service that is needed
     */
    serviceType: ServiceType,
};

export default ServiceNeed;