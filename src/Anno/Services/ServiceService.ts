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
        this.allServices.Add(ServiceType.Pub, { serviceType: ServiceType.Pub, name: "Pub" });
        this.allServices.Add(ServiceType.School, { serviceType: ServiceType.School, name: "School" });
        this.allServices.Add(ServiceType.Church, { serviceType: ServiceType.Church, name: "Church" });
    }

    public getService(type:ServiceType) : Service {
        return this.allServices.Get(type);
    }

    /** Gets the singleton of this Service */
    public static Get():ServiceService {
        return this.instance || (this.instance = new ServiceService());
    }
}

export default ServiceService;