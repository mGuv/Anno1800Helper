import ServiceType from "../Services/ServiceType";
import Need from "./Need";

interface ServiceNeed extends Need {
    serviceType: ServiceType,
    required: boolean,
};

export default ServiceNeed;