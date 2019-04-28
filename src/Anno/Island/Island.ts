import Dictionary from "../../Collections/Dictionary";
import PopType from "../Population/PopType";

class Island {
    public name: string;
    public population: Dictionary<PopType, number>;

    public constructor(name: string, pops: Dictionary<PopType, number>) {
        this.name = name;
        this.population = pops;
    }

    public toString = () => {
        return this.name;
    }
}

export default Island;