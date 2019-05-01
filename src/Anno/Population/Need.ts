/** Represents the benefits for fulling a Need  */
interface Need {
    /** How much the Maximum population for a given house increases by when fufilled */
    popsGenerated: number,
    
    /** How much tax the given house pays for this Need when fufilled */
    incomeGenerated: number,

    /** Whether or not this Need is required before an Upgrade is available */
    required: boolean,
}

export default Need;