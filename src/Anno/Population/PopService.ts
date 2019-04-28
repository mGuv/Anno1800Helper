import Dictionary from "../../Collections/Dictionary";
import PopType from "./PopType";
import Pop from "./Pop";
import ResourceType from "../Resources/ResourceType";
import ServiceType from "../Services/ServiceType";

class PopService {

    private static instance: PopService;

    private allPops: Dictionary<PopType, Pop> = new Dictionary();

    private constructor() {
        this.allPops.Add(
            PopType.Farmer,
            {
                name: "Farmer",
                popType: PopType.Farmer,
                resourceNeeds: [
                    {
                        resourceType: ResourceType.Fish,
                        requiredForUpgrade: true,
                        popsGenerated: 3,
                        incomeGenerated: 1,
                        consumptionPerHouseholdPerSecond: 0.0004166667,

                    },
                    {
                        resourceType: ResourceType.WorkerClothes,
                        requiredForUpgrade: true,
                        popsGenerated: 2,
                        incomeGenerated: 4,
                        consumptionPerHouseholdPerSecond: 0.000512821
                    },
                    {
                        resourceType: ResourceType.Schnapps,
                        requiredForUpgrade: false,
                        popsGenerated: 0,
                        incomeGenerated: 4,
                        consumptionPerHouseholdPerSecond: 0.000555556
                    }
                ],
                serviceNeeds: [
                    {
                        serviceType: ServiceType.Market,
                        popsGenerated: 5,
                        incomeGenerated: 0,
                        required: true
                    },
                    {
                        incomeGenerated: 2,
                        popsGenerated: 0,
                        required: false,
                        serviceType: ServiceType.Pub
                    }
                ]
            }
        )

    }

    public static Get(): PopService {
        return this.instance || (this.instance = new PopService());
    }
}

export default PopService;