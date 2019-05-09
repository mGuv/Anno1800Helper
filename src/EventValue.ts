/**
 * A value that is wrapped in an object reference and has some event handling around it.
 * 
 * This is designed to allow the programmer to decide when to publish/react to a value changing, 
 * rather than relying on something Redux for state management.
 */
class EventValue<TValue> {
    /** The currentl actual value */
    private value: TValue;
    /** The set of callbacks interested in this variable */
    private callbacks: ((oldValue: TValue, newValue: TValue) => void)[];

    /**
     * Build a new Event Value with the given paramters
     * @param value The starting value
     */
    public constructor(value: TValue) {
        this.value = value;
        this.callbacks = [];
    }

    /**
     * Updates the value and triggers the callbacks
     * @param value The new value of this Event Value
     */
    public setValue(value: TValue) {
        const oldValue: TValue = this.value;
        this.value = value;
        this.callbacks.forEach((callback) => {
            callback(oldValue, this.value);
        });
    }

    /**
     * Returns the current value.
     * 
     * NOTE: If the value is an object and you mutate the object, it will NOT trigger any listeners.
     * Values must always be set via setValue, so either use an immutable object and publish the change via the parent object,
     * or, give the parent object a full set of EventValue itself.
     */
    public getValue = () => {
        return this.value;
    };

    /**
     * Registers the given callback to be triggerd when the value changes
     * @param callback The callback to register
     */
    public registerOnChange(callback: (oldValue: TValue, newValue:TValue) => void): void {
        this.callbacks.push(callback);
    }

    /** 
     * Deregisters a previouslu registered callback. Very important to remember to do when an object is leaving scope or a component unmounts.
     * @param callback The callback to deregister
     * */
    public deregisterOnChange(callback: (oldValue: TValue, newValue:TValue) => void): void {
        this.callbacks.splice(this.callbacks.indexOf(callback), 1);
    }
}

export default EventValue;