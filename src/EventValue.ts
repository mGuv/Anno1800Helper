class EventValue<TValue> {

    private value: TValue;
    private callbacks: ((value: TValue) => void)[];

    public constructor(value: TValue) {
        this.value = value;
        this.callbacks = [];
    }

    public setValue(value: TValue) {
        this.value = value;
        console.log("triggered");
        this.callbacks.forEach((callback) => {
            console.log("fire");
            callback(this.value);
        });
    }

    public getValue = () => {
        return this.value;
    };

    public registerOnChange(callback: (value: TValue) => void): void {
        console.log("bound");
        this.callbacks.push(callback);
    }

    public deregisterOnChange(callback: (value: TValue) => void): void {
        this.callbacks.splice(this.callbacks.indexOf(callback), 1);
    }
}

export default EventValue;