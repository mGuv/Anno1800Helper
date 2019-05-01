import ServiceType from "./ServiceType";

/** Represents an in world Service the player can supply */
interface Service {
    /** The type of Service */
    serviceType: ServiceType,
    /** The display name of the Service */
    name: string
}

export default Service;