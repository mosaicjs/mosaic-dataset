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
    constructor(options){
        super(options);
        this.data = options.data;
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
        let data = this.data;
        let type;
        if (data.properties) {
            type = data.properties.type;
        }
        if (!type){
            type = data.type;
        }
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
}

