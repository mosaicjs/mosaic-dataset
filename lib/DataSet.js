import { Intents } from 'mosaic-intents';
import { AdapterManager } from 'mosaic-adapters';
import Resource from './Resource';

export default class DataSet extends Resource {

    /**
     * Class constructor. It defines resource array and registers event
     * listeners updating internal resource indexes.
     */  
    constructor(options, ...args){
        super(options, ...args);
        Intents(this);
        this.options = options || {};
        if (!this.adapters){
            this.adapters = new AdapterManager(); 
        }
        this.resources = this.options.resources;
    }
    
    /** Do-nothing destructor */
    close(){}

    /** Returns an options value. */
    _getOptionsValue(key, defaultValue){
        return this.options[key] || defaultValue;
    }
    
    /**
     * Returns a list of all managed resources.
     */
    get resources(){
        return this._resources;
    }
    
    /**
     * Sets new resources. If the specified list contains non-resource instances
     * then they are wrapped in the Resource container.
     */
    set resources(list){
        return this.setResources(list);
    }
    
    /**
     * Sets new resources. If the specified list contains non-resource instances
     * then they are wrapped in the Resource container.
     */
    setResources(list) {
        return this.update(function() {
            this._resources = [];
            this._index = {};
            let len = list ? list.length || 0 : 0; 
            for (let pos = 0; pos < len; pos++) {
                let r = this._wrap(list[pos]);
                this._resources[pos] = r; 
                this._index[r.id] = [r,pos];
            }
            return true;
        });
    }

    /**
     * Returns an entity from the specified position. Basically it returns value
     * this.resources[pos].
     */
    get(pos) {
        let resources = this.resources;
        if (pos < 0 || pos >= resources.length)
            return;
        return resources[pos];
    }

    /**
     * Returns <code>true</code> if the specified resource exists in this
     * dataset.
     */
    has(d) { return this.pos(d) >= 0; }

    /**
     * Sets a new value in the specified position
     */
    set(d, pos) {
        return this.update(function() {
            if (pos === undefined) {
                pos = this._resources.length;
            }
            pos = Math.max(0, Math.min(this._resources.length, +pos));
            var prev = this._resources[pos];
            if (prev) {
                delete this._index[prev[0].id];
            }
            var r = this._wrap(d);
            this._resources[pos] = r;
            this._index[r.id] = [r,pos];
            return true;
        });
    }

    /**
     * Adds a new resource at the end of the list.
     */
    add(d) {
        return this.set(d, this.size());
    }

    /**
     * Returns position (index) of the specified resource.
     */
    pos(d) {
        if (!d)
            return -1;
        d = this._wrap(d);
        return this.posById(d.id);
    }

    /** Returns position of the element corresponding to the specified ID. */
    posById(id){
        let slot = this._index[id];
        return slot ? slot[1] : -1
    }

    /**
     * Returns an array containing the specified number of resources starting
     * from the given position.
     */ 
    slice(first, last) {
        return this._resources.slice(first, last);
    }
    
    /**
     * Removes a resource from the specified position
     */ 
    remove(pos) {
        return this.update(function(){
            let resources = this._resources;
            if (pos === undefined || pos < 0 || pos >= resources.length) {
                return false;
            }
            let r = resources[pos];
            delete this._index[r.id]
            resources.splice(pos, 1);
            for (let i = pos; i < resources.length; i++) {
                let r = resources[i];
                let slot = this._index[r.id];
                if (!slot)
                    throw new Error('DataSet index is broken');
                slot[1]--;
            }
            return true;
        });
    }
    
    /**
     * Removes an resource corresponding to the specified identifier.
     */
    removeById(id){
        let pos = this.posById(id);
        return this.remove(pos);
    }

    /**
     * Returns the number of elements in this set.
     */
    get length(){
        return this.resources.length;
    }
    
    /**
     * Returns the size of this set (length of the underlying array with
     * resources).
     */
    size() {
        return this.resources.length;
    }

    /**
     * Returns a resource by its identifier.
     */
    byId(id) {
        let slot = this._index[id];
        return slot ? slot[0] : undefined;
    }
    
    // ----------------------------------------------------------------------

    /**
     * Iterates over all resources and calls the specified visitor function in
     * the given context. If the specified visitor function returns
     * <code>false</code> then the iteration processes stops.
     */
    each(visitor, context) {
        return this.resources.forEach(visitor, context);
    }

    /**
     * Calls the specified visitor function with each resource in the list and
     * returns a list of results. If the visitor returns an undefined value then
     * it is not added to the resulting list.
     */
    map(visitor, context) {
        return this.resources.map(visitor, context);
    }

    /**
     * Calls the specified visitor function with each resource in the list and
     * returns a list of results. If the visitor returns an undefined value then
     * it is not added to the resulting list.
     */
    filter(visitor, context) {
        return this.resources.filter(visitor, context);
    }
        
    /**
     * Iterates over all resources until the specified visitor method returns a
     * non-empty result. This method returns the first non-empty visitor result
     * or <code>undefined</code> if the visitor returns empty results for all
     * resources.
     */
    find(visitor, context) {
        let resources = this.resources;
        let result = false;
        context = context || this;
        for (let i = 0, len = resources.length; !result && i < len; i++) {
            result = visitor.call(context, resources[i], i);
        }
        return result;
    }

    // ----------------------------------------------------------------------

    /**
     * Performs an update action on this dataset
     */
    update(action){
        this.version = (this.version || 0) + 1;
        return this.action('update', function(intent){
            return action.call(this);
        });
    }

    /**
     * Checks that the specified object has a good type. Otherwise it wraps it
     * in a Resource instance.
     */
    _wrap(data) {
        let resource = data;
        var ResourceType = this.ResourceType;
        if (!(data instanceof ResourceType)) {
            resource = new ResourceType({
                dataSet : this,
                adapters : this.adapters,
                data : data
            });
        }
        return resource;
    }

    /**
     * Creates and returns a new empty copy of this data set.
     */
    createNew(options, ...args) {
        let Type = this.constructor;
        if (!options.adapters){
            options.adapters = this.adapters;
        }
        let result = new Type(options, ...args);
        Type.Resource = this.Resource;
        return result;
    }

    /**
     * Returns the default type of instances managed by this data set.
     */
    get ResourceType(){
        return Resource;
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
        var result;
        if (visitor.before) {
            result = visitor.before.call(visitor, this);
        }
        if (result !== 'false') {
            this.each(function(resource){
                return resource.visit(visitor);
            });
        }
        if (visitor.after) {
            visitor.after.call(visitor, this);
        }
        return result;
        
    }

}
Intents.addTo(DataSet);

