import Dictionary from "../../Collections/Dictionary";
import ResourceType from "./ResourceType";
import Resource from "./Resource";

class ResourceService {

    private static instance: ResourceService;

    private allResources: Dictionary<ResourceType, Resource> = new Dictionary();

    private constructor() {
        this.allResources.Add(ResourceType.Fish, { resourceType: ResourceType.Fish, name: "Fish" });
        this.allResources.Add(ResourceType.WorkerClothes, { resourceType: ResourceType.WorkerClothes, name: "Worker Clothes" });
        this.allResources.Add(ResourceType.Schnapps, { resourceType: ResourceType.Schnapps, name: "Schnapps" });
        this.allResources.Add(ResourceType.Potatoes, { resourceType: ResourceType.Potatoes, name: "Potates" });
        this.allResources.Add(ResourceType.Timber, { resourceType: ResourceType.Timber, name: "Timber" });
        this.allResources.Add(ResourceType.Wood, { resourceType: ResourceType.Wood, name: "Wood" });
        this.allResources.Add(ResourceType.Wool, { resourceType: ResourceType.Wool, name: "Wool" });
    }

    public static get Get() {
        return this.instance || (this.instance = new ResourceService());
    }
}

export default ResourceService;