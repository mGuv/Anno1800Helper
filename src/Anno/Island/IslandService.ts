import Island from "./Island";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import IslandType from "./IslandType";

/**
 * High level service for interacting with the Player's Islands
 */
class IslandService {
    /** Singleton of the service */
    private static instance: IslandService;

    /** The set of Islands this Player has */
    public readonly islands: EventValue<Island[]> = new EventValue([
        new Island(
            new EventValue("New Island"),
            IslandType.OldWorld,
            new Dictionary<PopType, EventValue<number>>(
                [
                    {
                        key: PopType.Worker,
                        value: new EventValue(0),
                    },
                    {
                        key: PopType.Farmer,
                        value: new EventValue(0),
                    }
                ]
            )
        )
    ]);

    /** The watchable/editable Island that is currently selected */
    public readonly activeIsland: EventValue<Island> = new EventValue(this.islands.getValue()[0]);

    /**
     * Gets the singleton instance of this class
     */
    public static Get(): IslandService {
        return this.instance || (this.instance = new IslandService());
    }
}

export default IslandService;