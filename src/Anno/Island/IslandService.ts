import Island from "./Island";
import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";

class IslandService {

    private static instance: IslandService;

    public islands: EventValue<Island[]> = new EventValue([
        new Island(
            new EventValue("New Island"),
            new Dictionary<PopType, number>(
                [
                    {
                        key: PopType.Worker,
                        value: 0,
                    },
                    {
                        key: PopType.Farmer,
                        value: 0,
                    }
                ]
            )
        ),
        new Island(
            new EventValue("Debug Island"),
            new Dictionary<PopType, number>(
                [
                    {
                        key: PopType.Worker,
                        value: 0,
                    },
                    {
                        key: PopType.Farmer,
                        value: 0,
                    }
                ]
            )
        ),
        new Island(
            new EventValue("Another Island"),
            new Dictionary<PopType, number>(
                [
                    {
                        key: PopType.Worker,
                        value: 0,
                    },
                    {
                        key: PopType.Farmer,
                        value: 0,
                    }
                ]
            )
        ),
    ]);

    public activeIsland: EventValue<Island> = new EventValue(this.islands.getValue()[0]);

    public static Get(): IslandService {
        return this.instance || (this.instance = new IslandService());
    }
}

export default IslandService;