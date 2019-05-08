/** Represents the benefits for fulling a Need  */
interface Need {
    /** How much the Maximum population for a given house increases by when fulfilled */
    popsGenerated: number,

    /** How much Income is generated per house when fulfilled */
    incomeGenerated: number,

    /** Whether or not this Need is a bonus */
    isLuxury: boolean,
}

export default Need;