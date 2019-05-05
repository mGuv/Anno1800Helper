import EventValue from "../../EventValue";
import Dictionary from "../../Collections/Dictionary";
import Resource from "../Resources/Resource";
import Island from "./Island";

class IslandTotal {
    // watch all islands made to make a fake total island?
    private allDemands:EventValue<Dictionary<Resource, number>>[] = [];
    public totalDemands:EventValue<Dictionary<Resource, number>> = new EventValue(new Dictionary());

    public addIsland = (newIsland:Island) => {
        newIsland.population.Values.forEach(pop => {
            this.allDemands.push(pop.demand);
            pop.demand.registerOnChange(this.recalculateTotalDemand);
        });
    }

    private recalculateTotalDemand = (changedDictionary: Dictionary<Resource, number>) => {
        const totalDemand:Dictionary<Resource, number> = new Dictionary();
        // go through all demands, group by resource
        this.allDemands.forEach(demands => {
            const asValue:Dictionary<Resource, number> = demands.getValue();
            asValue.All.forEach(demand => {
                if(!totalDemand.Has(demand.key)) {
                    totalDemand.Add(demand.key, 0);
                }

                totalDemand.Add(demand.key, totalDemand.Get(demand.key) + demand.value);
            })
        });

        this.totalDemands.setValue(totalDemand);
    }
}

export default IslandTotal; 