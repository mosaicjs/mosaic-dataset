import { TypeKey, Adaptable } from 'mosaic-adapters';

let idCounter = 0;
/**
 * 
 */
export default class Resource extends Adaptable {
    
    /**
     * This constructor initializes this resource and sets the internal data.
     * 
     * @param options.adapters
     *            an adapter manager used to generate resource adapters
     * @param options.data
     *            the data object
     */
    constructor(options, ...args){
        super(options, ...args);
        this.data = options ? options.data : undefined;
    }
    
    /**
     * Returns the type key for this resource. This is a shortcut for the
     * "getTypeKey" method.
     */
    get type(){
        return this.getTypeKey();
    }
    
    /**
     * Returns the type key for this resource.
     */
    getTypeKey(){
        let type = this.get('properties.type') || this.get('type');
        if (type){
            type = TypeKey.getTypeKey(type);
        } else {
            // Use the class hierarchy if type is not defined in the data
            type = TypeKey.getTypeKey.apply(this);
        }
        return type;
    }
    
    /**
     * Returns the internal data managed by this resource.
     */
    get data(){
        return this._data;
    }
    
    /**
     * Associates a new data object with this resource.
     */
    set data(d){
        this._data = d || {};
        delete this._id;
        return this._data;
    }
    
    /**
     * Returns the resource identifier. By default this method seeks the
     * identifier in the "id" field of the underlying data object. If there is
     * no such an identifier then this method generates a local ID stored in
     * this resource object.
     */
    get id(){
        let id = this.data.id;
        if (id === undefined){
            id = this._id = this._id || idCounter++;
        }
        return id;
    }
    
    /**
     * Returns a value corresponding to the specified path.
     * 
     * @param path
     *            an segment name array or a string path where individual
     *            segments are separated by the '.' symbol
     */
    get(path){
        if (typeof path === 'string') {
            let array = path.split('.');
            return this.get(array);
        }
        let data = this.data;
        let len = path ? path.length : 0;
        let i;
        for (i = 0; data && i < len; i++) {
            let segment = path[i];
            data = data[segment];
        }
        return i === len ? data : null;
    }
    
    /**
     * Sets a new value for the specified path.
     */
    set(path, value) {
        if (typeof path === 'string') {
            let array = path.split('.');
            return this.set(array, value);
        }
        let data = this.data;
        let len = path ? path.length : 0;
        let i;
        for (i = 0; i < len - 1; i++) {
            let segment = path[i];
            let next = data[segment];
            if (!next)
                break;
            data = next;
        }
        // Add missing objects
        for (; i < len - 1; i++) {
            let segment = path[i];
            data = data[segment] = {};
        }
        if (data) {
            let segment = path[path.length - 1];
            data[segment] = value;
        }
        return this;
        
    }
    
    /**
     * Visits this resource
     * 
     * @param visitor.before
     *            this method is called before this resource is visited
     * @param visitor.after
     *            this method is called after this resource is visited
     */
    visit(visitor){
        if (visitor.before) {
            visitor.before.call(visitor, this);
        }
        if (visitor.after) {
            visitor.after.call(visitor, this);
        }
    }
}

