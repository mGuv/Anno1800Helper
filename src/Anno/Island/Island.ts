import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import EventValue from "../../EventValue";
import IslandType from "./IslandType";

class Island {
    public name: EventValue<string>;
    public population: Dictionary<PopType, EventValue<number>>;
    public islandType: IslandType;

    public constructor(name: EventValue<string>, islandType:IslandType, pops: Dictionary<PopType, EventValue<number>>) {
        this.name = name;
        this.population = pops;
        this.islandType = islandType;
    }

    public toString = () => {
        return this.name.getValue();
    }
}

export default Island;