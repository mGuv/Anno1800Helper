import Need from "./Need";
import Service from "../Services/Service";

/**
 * Represents a Service that is Needed by Pops
 */
interface ServiceNeed extends Need {
    /**
     * The Service that is needed
     */
    serviceType: Service,
};

export default ServiceNeed;