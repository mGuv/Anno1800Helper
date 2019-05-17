import Resource from "../Resources/Resource";

/** The output of an Industry */
interface Produce {
    /** The Resource the Industry created */
    resource: Resource,

    /** How many of that Resource are created */
    amount: number,

    /** How much the building can store internally before production stops */
    storage: number
}

export default Produce;