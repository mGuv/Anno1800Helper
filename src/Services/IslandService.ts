import EventValue from "../EventValue";
import Island from "../Anno/Island/Island";
import Region from "../Anno/Island/Region";

/**
 * High level Service for interacting with available Islands
 */
class IslandService {
    public readonly Islands:EventValue<Island[]> = new EventValue<Island[]>([]);
}


const singleton:IslandService = new IslandService();

singleton.Islands.setValue([
    new Island("Island One", Region.OldWorld),
    new Island("Island Two", Region.OldWorld),
    new Island("Island Three", Region.OldWorld),
    new Island("New World", Region.NewWorld),
]);

export { IslandService };
export { singleton as IslandServiceSingleton };