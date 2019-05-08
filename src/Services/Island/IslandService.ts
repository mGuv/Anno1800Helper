import EventValue from "../../EventValue";
import Island from "../../Anno/Island/Island";

/**
 * High level Service for interacting with available Islands
 */
class IslandService {
    public readonly Islands:EventValue<Island[]> = new EventValue<Island[]>([]);
}

const singleton:IslandService = new IslandService();

export { IslandService };
export { singleton as IslandServiceSingleton };