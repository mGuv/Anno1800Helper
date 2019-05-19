/**
 * High level class to represent a look up of TKey -> TValue
 * 
 * Designed to somewhat emulate how C#'s Dictionary behaves. Note that it doesn't translate directly
 * due to the way objects are handled between the two langauges, and TypeScript does not support
 * overriding the equivalent of GetHashCode and Equals - so this tries to mimic it by stringifying/parsing
 * objects.
 * 
 * So you need to be careful as anytime the key is parsed back in to an object, it is a new reference of the original
 */
class Dictionary<TKey, TValue>
{
    /** Internal object that stores the values */
    private lookup: { [key: string]: TValue } = {};

    /**
     * Creates a new Dictionary with the given paramters
     * 
     * @param entries The starting entries found within this dictionary
     */
    public constructor(entries: { key: TKey, value: TValue }[] = []) {
        entries.forEach(({ key, value }) => {
            this.Add(key, value);
        });
    }

    /**
     * Returns the entire contents of the dictionary as a key value pair
     */
    get All(): { key: TKey, value: TValue }[] {
        return Object.keys(this.lookup).map((key: string) => {
            return { key: JSON.parse(key), value: this.lookup[key] };
        });
    }

    /**
     * Gets just the keys from the Dictionary
     */
    get Keys(): TKey[] {
        return Object.keys(this.lookup).map((key: string) => {
            return JSON.parse(key);
        });
    }

    /**
     * Gets just the values from the Dictionary
     */
    get Values(): TValue[] {
        return Object.keys(this.lookup).map((key: string) => {
            return this.lookup[key];
        });
    }

    /**
     * Gets the specified element from the Dictionary
     * 
     * @param key The element to get
     */
    public Get(key: TKey): TValue {
        if (!this.Has(key)) {
            throw new Error("Element with key " + JSON.stringify(key) + " does not exist");
        }
        return this.lookup[JSON.stringify(key)];
    }

    /**
     * Adds a value to the Dictionary with the given key
     * 
     * @param key The key to set this value against
     * @param value The value to use
     */
    public Add(key: TKey, value: TValue) {
        this.lookup[JSON.stringify(key)] = value;
    }

    /**
     * Checks if the given key is inside the Dictionary
     * 
     * @param key The key to look for
     */
    public Has(key: TKey): boolean {
        return this.lookup.hasOwnProperty(JSON.stringify(key));
    }


    /**
     * Removes the given key from the Dictionary
     * 
     * @param key The key to remove
     */
    public Delete(key: TKey) {
        delete this.lookup[JSON.stringify(key)];
    }

    /**
     * Makes an entire copy of the Dictionary for Immutability
     */
    public Clone(): Dictionary<TKey, TValue> {
        const clone: Dictionary<TKey, TValue> = new Dictionary();

        this.Keys.forEach(key => {
            clone.Add(key, this.Get(key));
        });

        return clone;
    }
}

export default Dictionary;