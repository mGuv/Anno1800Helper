import ResourceType from "../Resources/ResourceType";

/** The output of an Industry */
interface Produce {
    /** The Resource the Industry created */
    resourceType: ResourceType,

    /** How many of that Resource are created */
    amount: number,

    /** How much the building can store internally before production stops */
    storage: number
}

export default Produce;