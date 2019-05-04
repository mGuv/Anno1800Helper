import PopType from "./PopType";
import ResourceNeed from "./ResourceNeed";
import ServiceNeed from "./ServiceNeed";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/**
 * Represents the type of Reisdents in the game
 */
interface Pop {
    /** The type of Pop this instance represents */
    popType: PopType,

    /** The display name of this pop */
    name: string

    /** The required Resources consumed by this Pop */
    resourceNeeds: ResourceNeed[],

    /** The required Services utilised by this Pop */
    serviceNeeds: ServiceNeed[],

    /** The icon that represents this Pop */
    icon:IconProp,
};

export default Pop;