import Dictionary from "../../Collections/Dictionary";
import ServiceType from "./ServiceType";
import Service from "./Service";

/** High level Service to interact with in-game Servies */
class ServiceService {

    /** Singleton instance of the service */
    private static instance: ServiceService;

    /** All services available */
    private allServices: Dictionary<ServiceType, Service> = new Dictionary();

    /** Creates a new Service Service */
    private constructor() {
        // Add all services
        // TODO: consider feeding from API
        this.allServices.Add(ServiceType.Market, { serviceType: ServiceType.Market, name: "Market" });
        this.allServices.Add(ServiceType.Pub, { serviceType: ServiceType.Pub, name: "Worker Clothes" });
    }

    /** Gets the singleton of this Service */
    public static get Get() {
        return this.instance || (this.instance = new ServiceService());
    }
}

export default ServiceService;