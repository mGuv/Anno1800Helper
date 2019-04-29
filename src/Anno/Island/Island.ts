import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";
import EventValue from "../../EventValue";

class Island {
    public name: EventValue<string>;
    public population: Dictionary<PopType, number>;    

    public constructor(name: EventValue<string>, pops: Dictionary<PopType, number>) {
        this.name = name;
        this.population = pops;
    }

    public toString = () => {
        return this.name.getValue();
    }
}

export default Island;