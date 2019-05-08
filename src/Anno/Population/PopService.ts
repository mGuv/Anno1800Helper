import Dictionary from "../../Collections/Dictionary";
import PopType from "./PopType";
import Pop from "./Pop";
import ResourceType from "../Resources/ResourceType";
import ServiceType from "../Services/ServiceType";
import { faTractor, faHammer } from '@fortawesome/free-solid-svg-icons';
import ResourceService from "../Resources/ResourceService";
import ServiceService from "../Services/ServiceService";

const resourceService:ResourceService = ResourceService.Get();
const serviceService:ServiceService = ServiceService.Get();

/** High Level service for interacting with the available Pop types */
class PopService {

    /** Singleton instance of this Service */
    private static instance: PopService;

    /** The look up of each Pop by Type */
    private allPops: Dictionary<PopType, Pop> = new Dictionary();

    /** Creates a new Pop Service */
    private constructor() {
        // Build a set of all the available pops
        // TODO: Consider feeding from API
        this.allPops.Add(
            PopType.Farmer,
            {
                name: "Farmer",
                popType: PopType.Farmer,
                resourceNeeds: [
                    {
                        resourceType: resourceService.getResource(ResourceType.Fish),
                        isLuxury: false,
                        popsGenerated: 3,
                        incomeGenerated: 1,
                        consumptionPerHouseholdPerSecond: 0.0004166667,

                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.WorkerClothes),
                        isLuxury: false,
                        popsGenerated: 2,
                        incomeGenerated: 4,
                        consumptionPerHouseholdPerSecond: 0.000512821
                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.Schnapps),
                        isLuxury: true,
                        popsGenerated: 0,
                        incomeGenerated: 4,
                        consumptionPerHouseholdPerSecond: 0.000555556
                    }
                ],
                serviceNeeds: [
                    
                    {
                        serviceType: serviceService.getService(ServiceType.Market),
                        popsGenerated: 5,
                        incomeGenerated: 0,
                        isLuxury: false
                    },
                    {
                        incomeGenerated: 2,
                        popsGenerated: 0,
                        isLuxury: true,
                        serviceType: serviceService.getService(ServiceType.Pub)
                    }
                ],
                icon: faTractor
            },
        );

        this.allPops.Add(
            PopType.Worker,
            {
                name: "Worker",
                popType: PopType.Worker,
                resourceNeeds: [
                    {
                        resourceType: resourceService.getResource(ResourceType.Fish),
                        isLuxury: false,
                        popsGenerated: 3,
                        incomeGenerated: 3,
                        consumptionPerHouseholdPerSecond: 0.0008333334,

                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.WorkerClothes),
                        isLuxury: false,
                        popsGenerated: 2,
                        incomeGenerated: 7,
                        consumptionPerHouseholdPerSecond: 0.001025642,
                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.Schnapps),
                        isLuxury: true,
                        popsGenerated: 0,
                        incomeGenerated: 7,
                        consumptionPerHouseholdPerSecond: 0.001111112
                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.Sausages),
                        isLuxury: false,
                        popsGenerated: 3,
                        incomeGenerated: 5,
                        consumptionPerHouseholdPerSecond: 0.000333334,
                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.Bread),
                        isLuxury: false,
                        popsGenerated: 3,
                        incomeGenerated: 5,
                        consumptionPerHouseholdPerSecond: 0.00030303
                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.Soap),
                        isLuxury: false,
                        popsGenerated: 2,
                        incomeGenerated: 5,
                        consumptionPerHouseholdPerSecond: 0.000138889
                    },
                    {
                        resourceType: resourceService.getResource(ResourceType.Beer),
                        isLuxury: true,
                        popsGenerated: 0,
                        incomeGenerated: 13,
                        consumptionPerHouseholdPerSecond: 0.00025641
                    },
                ],
                serviceNeeds: [
                    {
                        serviceType: serviceService.getService(ServiceType.Market),
                        popsGenerated: 5,
                        incomeGenerated: 0,
                        isLuxury: false
                    },
                    {
                        serviceType: serviceService.getService(ServiceType.School),
                        popsGenerated: 2,
                        incomeGenerated: 0,
                        isLuxury: false,
                    },
                    {
                        serviceType: serviceService.getService(ServiceType.Pub),
                        popsGenerated: 0,
                        incomeGenerated: 3,
                        isLuxury: true,
                    },
                    {
                        serviceType: serviceService.getService(ServiceType.Church),
                        incomeGenerated: 0,
                        popsGenerated: 0,
                        isLuxury: true,
                    },
                    
                    
                    
                ],
                icon: faHammer
            }
        );

    }

    public getPop(pop:PopType):Pop {
        return this.allPops.Get(pop);
    }

    /** Gets the singleton of this Service */
    public static Get(): PopService {
        return this.instance || (this.instance = new PopService());
    }
}

export default PopService;