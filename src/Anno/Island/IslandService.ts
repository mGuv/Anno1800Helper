import Island from "./Island";
import EventValue from "../../EventValue";

/**
 * High level service for interacting with the Player's Islands
 */
class IslandService {
    /** Singleton of the service */
    private static instance: IslandService;

    /** The set of Islands this Player has */
    public readonly islands: EventValue<Island[]> = new EventValue<Island[]>([]);

    /** The watchable/editable Island that is currently selected */
    public readonly activeIsland: EventValue<Island | null> = new EventValue<Island | null>(null);

    /**
     * Gets the singleton instance of this class
     */
    public static Get(): IslandService {
        return this.instance || (this.instance = new IslandService());
    }
}

export default IslandService;