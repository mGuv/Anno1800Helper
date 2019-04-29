import Island from "./Island";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import IslandType from "./IslandType";

class IslandService {

    private static instance: IslandService;

    public islands: EventValue<Island[]> = new EventValue([
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

    public activeIsland: EventValue<Island> = new EventValue(this.islands.getValue()[0]);

    public static Get(): IslandService {
        return this.instance || (this.instance = new IslandService());
    }
}

export default IslandService;