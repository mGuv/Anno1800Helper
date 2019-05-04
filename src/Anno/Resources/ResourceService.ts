import Dictionary from "../../Collections/Dictionary";
import ResourceType from "./ResourceType";
import Resource from "./Resource";
import { faGlassWhiskey, faBeer, faFish, faTshirt, faQuestion, faTree, faBreadSlice, faHotdog } from '@fortawesome/free-solid-svg-icons';


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
        this.allResources.Add(ResourceType.Fish, { resourceType: ResourceType.Fish, name: "Fish", icon:faFish});
        this.allResources.Add(ResourceType.WorkerClothes, { resourceType: ResourceType.WorkerClothes, name: "Worker Clothes", icon: faTshirt });
        this.allResources.Add(ResourceType.Schnapps, { resourceType: ResourceType.Schnapps, name: "Schnapps", icon: faGlassWhiskey, });
        this.allResources.Add(ResourceType.Potatoes, { resourceType: ResourceType.Potatoes, name: "Potates", icon:faQuestion });
        this.allResources.Add(ResourceType.Timber, { resourceType: ResourceType.Timber, name: "Timber", icon:faQuestion, });
        this.allResources.Add(ResourceType.Wood, { resourceType: ResourceType.Wood, name: "Wood", icon:faTree });
        this.allResources.Add(ResourceType.Wool, { resourceType: ResourceType.Wool, name: "Wool", icon:faQuestion });
        this.allResources.Add(ResourceType.Sausages, { resourceType: ResourceType.Sausages, name: "Sausages", icon:faHotdog });
        this.allResources.Add(ResourceType.Soap, { resourceType: ResourceType.Soap, name: "Soap", icon:faQuestion });
        this.allResources.Add(ResourceType.Bread, { resourceType: ResourceType.Bread, name: "Bread", icon:faBreadSlice });
        this.allResources.Add(ResourceType.Beer, { resourceType: ResourceType.Beer, name: "Beer", icon:faBeer });

    }

    public getResource(type: ResourceType): Resource {
        return this.allResources.Get(type);
    }

    public static Get(): ResourceService {
        return this.instance || (this.instance = new ResourceService());
    }
}

export default ResourceService;