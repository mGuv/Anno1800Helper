import Dictionary from "../Collections/Dictionary";
import PopType from "../Anno/Population/PopType";
import Pop from "../Anno/Population/Pop";
import ResourceService from "../Anno/Resources/ResourceService";
import ResourceType from "../Anno/Resources/ResourceType";
import ServiceService from "../Anno/Services/ServiceService";
import ServiceType from "../Anno/Services/ServiceType";
import { faTractor, faHammer } from "@fortawesome/free-solid-svg-icons";

/**
 * High level Service for interacting with the games Pops
 */
class PopService {
    public readonly pops:Dictionary<PopType, Pop> = new Dictionary();

    /** Creates a new Pop Service */
    public constructor(resourceService:ResourceService, serviceService:ServiceService) {
        // Build a set of all the available pops
        // TODO: Consider feeding from API
        this.pops.Add(
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

        this.pops.Add(
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
}

const singleton:PopService = new PopService(ResourceService.Get(), ServiceService.Get());

export { PopService };
export { singleton as PopServiceSingleton };