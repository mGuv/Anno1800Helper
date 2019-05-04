import ResourceType from "./ResourceType";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/** Represents a Resource the player can obtain */
interface Resource {
    /** The type of Resource */
    resourceType: ResourceType,
    /** The display name of the Resource */
    name: string,
    /** The display icon for this resource */
    icon: IconProp,
}

export default Resource;