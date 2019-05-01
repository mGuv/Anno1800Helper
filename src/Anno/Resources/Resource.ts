import ResourceType from "./ResourceType";

/** Represents a Resource the player can obtain */
interface Resource {
    /** The type of Resource */
    resourceType: ResourceType,
    /** The display name of the Resource */
    name: string,
}

export default Resource;