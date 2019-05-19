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
    new Island("1", "Island One", Region.OldWorld),
    new Island("2", "Island Two", Region.OldWorld),
    new Island("3", "Island Three", Region.OldWorld),
    new Island("4", "New World", Region.NewWorld),
]);

export { IslandService };
export { singleton as IslandServiceSingleton };