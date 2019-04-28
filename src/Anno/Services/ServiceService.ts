import Dictionary from "../../Collections/Dictionary";
import ServiceType from "./ServiceType";
import Service from "./Service";

class ServiceService {

    private static instance: ServiceService;

    private allResources: Dictionary<ServiceType, Service> = new Dictionary();

    private constructor() {
        this.allResources.Add(ServiceType.Market, { serviceType: ServiceType.Market, name: "Market" });
        this.allResources.Add(ServiceType.Pub, { serviceType: ServiceType.Pub, name: "Worker Clothes" });
    }

    public static get Get() {
        return this.instance || (this.instance = new ServiceService());
    }
}

export default ServiceService;