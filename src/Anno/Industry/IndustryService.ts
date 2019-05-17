import Dictionary from "../../Collections/Dictionary";
import IndustryType from "./IndustryType";
import Industry from "./Industry";
import ResourceType from "../Resources/ResourceType";
import PopType from "../Population/PopType";
import ResourceService from "../Resources/ResourceService";

const resourceService:ResourceService = ResourceService.Get();

/**
 * High level service for interacting with the available Industries in the game
 */
class IndustryService {
    /** Singleton of the Service */
    private static instance: IndustryService;

    /** A full set of every Industry available */
    private allIndustrires: Dictionary<IndustryType, Industry> = new Dictionary();

    /** @inheritdoc */
    private constructor() {
        // Create a giant set of all Industries
        // TODO: Consider populating from API to support updates/mods/expansions/etc
        this.allIndustrires.Add(
            IndustryType.LumberjacksHut,
            {
                industryType: IndustryType.LumberjacksHut,
                name: "Lumberjack's Hut",
                produces: [
                    {
                        amount: 1,
                        resource: resourceService.getResource(ResourceType.Wood),
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
                        resource: resourceService.getResource(ResourceType.Timber),
                        storage: 8,
                    }
                ],
                productionTime: 15,
                resources: [resourceService.getResource(ResourceType.Wood)],
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
                        resource: resourceService.getResource(ResourceType.Fish),
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
                        resource: resourceService.getResource(ResourceType.Potatoes),
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
                        resource: resourceService.getResource(ResourceType.Schnapps),
                        storage: 4,
                    }
                ],
                productionTime: 30,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 50 }]),
                resources: [resourceService.getResource(ResourceType.Potatoes)],
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
                        resource: resourceService.getResource(ResourceType.Wool),
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
                        resource: resourceService.getResource(ResourceType.WorkerClothes),
                        storage: 4,
                    }
                ],
                productionTime: 30,
                requiredEmployees: new Dictionary<PopType, number>([{ key: PopType.Farmer, value: 50 }]),
                resources: [resourceService.getResource(ResourceType.Wool)],
                runningCost: 50
            }
        );
    }

    public Get = (industryType:IndustryType) => {
        return this.allIndustrires.Get(industryType);
    } 

    public All():Industry[] {
        return this.allIndustrires.Values;
    }

    /**
     * Gets the instance of this service
     * 
     * @returns The singleton for this service
     */
    public static Get(): IndustryService {
        return this.instance || (this.instance = new IndustryService());
    }
}

export default IndustryService; 