import Dictionary from "../../Collections/Dictionary";
import IndustryType from "./IndustryType";
import Industry from "./Industry";
import ResourceType from "../Resources/ResourceType";
import PopType from "../Population/PopType";

class IndustryService {

    private static instance: IndustryService;

    private allIndustrires: Dictionary<IndustryType, Industry> = new Dictionary();

    private constructor() {
        this.allIndustrires.Add(
            IndustryType.LumberjacksHut,
            {
                industryType: IndustryType.LumberjacksHut,
                name: "Lumberjack's Hut",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.Wood,
                        storage: 8,
                    }
                ],
                productionTime: 15,
                resources: [],
                runningCost: 10,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 5 }]),
            }
        );

        this.allIndustrires.Add(
            IndustryType.Sawmill,
            {
                industryType: IndustryType.Sawmill,
                name: "Sawmill",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.Timber,
                        storage: 8,
                    }
                ],
                productionTime: 15,
                resources: [ResourceType.Wood],
                runningCost: 10,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 10 }]),
            }
        );

        this.allIndustrires.Add(
            IndustryType.FishermansHut,
            {
                industryType: IndustryType.FishermansHut,
                name: "Fishery",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.Fish,
                        storage: 4,
                    }
                ],
                productionTime: 30,
                resources: [],
                runningCost: 40,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 25 }]),
            }
        );

        this.allIndustrires.Add(
            IndustryType.PotatoFarm,
            {
                industryType: IndustryType.PotatoFarm,
                name: "Potato Farm",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.Potatoes,
                        storage: 4,
                    }
                ],
                productionTime: 30,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 20 }]),
                resources: [],
                runningCost: 20
            }
        );

        this.allIndustrires.Add(
            IndustryType.SchnappsDistillery,
            {
                industryType: IndustryType.PotatoFarm,
                name: "Schnapps Distillery",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.Schnapps,
                        storage: 4,
                    }
                ],
                productionTime: 30,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 50 }]),
                resources: [ResourceType.Potatoes],
                runningCost: 40
            }
        );

        this.allIndustrires.Add(
            IndustryType.SheepFarm,
            {
                industryType: IndustryType.SheepFarm,
                name: "Sheep Farm",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.Wool,
                        storage: 4,
                    }
                ],
                productionTime: 30,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 10 }]),
                resources: [],
                runningCost: 20
            }
        );

        this.allIndustrires.Add(
            IndustryType.FrameworkKnitters,
            {
                industryType: IndustryType.FrameworkKnitters,
                name: "Framework Knitters",
                produces: [
                    {
                        amount: 1,
                        resourceType: ResourceType.WorkerClothes,
                        storage: 4,
                    }
                ],
                productionTime: 30,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 50 }]),
                resources: [ResourceType.Wool],
                runningCost: 50
            }
        );
    }


    public static Get(): IndustryService {
        return this.instance || (this.instance = new IndustryService());
    }
}

export default IndustryService;