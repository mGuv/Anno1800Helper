import Dictionary from "../../Collections/Dictionary";
import ResourceType from "./ResourceType";
import Resource from "./Resource";

/** High level Service for interacting with all the resources */
class ResourceService {

    /** The singleton instance of this Service */
    private static instance: ResourceService;

    /** Set of all available Resources */
    private allResources: Dictionary<ResourceType, Resource> = new Dictionary();

    /** Builds a new Resource Service */
    private constructor() {
        // Create a huge set of all resources
        // TODO: consider feeding from API
        this.allResources.Add(ResourceType.Fish, { resourceType: ResourceType.Fish, name: "Fish" });
        this.allResources.Add(ResourceType.WorkerClothes, { resourceType: ResourceType.WorkerClothes, name: "Worker Clothes" });
        this.allResources.Add(ResourceType.Schnapps, { resourceType: ResourceType.Schnapps, name: "Schnapps" });
        this.allResources.Add(ResourceType.Potatoes, { resourceType: ResourceType.Potatoes, name: "Potates" });
        this.allResources.Add(ResourceType.Timber, { resourceType: ResourceType.Timber, name: "Timber" });
        this.allResources.Add(ResourceType.Wood, { resourceType: ResourceType.Wood, name: "Wood" });
        this.allResources.Add(ResourceType.Wool, { resourceType: ResourceType.Wool, name: "Wool" });
        this.allResources.Add(ResourceType.Sausages, { resourceType: ResourceType.Sausages, name: "Sausages" });
        this.allResources.Add(ResourceType.Soap, { resourceType: ResourceType.Soap, name: "Soap" });
        this.allResources.Add(ResourceType.Bread, { resourceType: ResourceType.Bread, name: "Bread" });
        this.allResources.Add(ResourceType.Beer, { resourceType: ResourceType.Beer, name: "Beer" });
        
    }

    public getResource(type: ResourceType): Resource {
        return this.allResources.Get(type);
    }

    public static Get() : ResourceService {
        return this.instance || (this.instance = new ResourceService());
    }
}

export default ResourceService;