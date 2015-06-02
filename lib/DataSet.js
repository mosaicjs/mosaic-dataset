import { Intents } from 'mosaic-intents';
import Resource from './Resource';

export default class DataSet extends Resource {

    /**
     * Class constructor. It defines children array and registers event
     * listeners updating internal resource indexes.
     */  
    constructor(options, ...args){
        super(options, ...args);
        Intents(this);
        this.children = options.children;
    }
    
    /** Do-nothing destructor */
    close(){}
    
    /**
     * Returns a list of all child resources.
     */
    get children(){
        return this._children;
    }
    
    /**
     * Sets new resources. If the specified list contains non-resource instances
     * then they are wrapped in the Resource container.
     */
    set children(list){
        return this.setAll(list);
    }
    
    /**
     * Sets new resources. If the specified list contains non-resource instances
     * then they are wrapped in the Resource container.
     */
    setAll(list) {
        return this.update(function() {
            this._children = [];
            this._index = {};
            let len = list ? list.length || 0 : 0; 
            for (let pos = 0; pos < len; pos++) {
                let r = this._wrap(list[pos]);
                this._children[pos] = r; 
                this._index[r.id] = [r,pos];
            }
        });
    }

    /**
     * Returns an entity from the specified position. Basically it returns value
     * this.children[pos].
     */
    get(pos) {
        let children = this.children;
        if (pos < 0 || pos >= children.length)
            return;
        return children[pos];
    }

    /**
     * Returns <code>true</code> if
     */
    has(d) {
        return this.indexOf(d) >= 0;
    }

    /**
     * Sets a new value in the specified position
     */
    set(d, pos) {
        return this.update(function() {
            if (pos === undefined) {
                pos = this._children.length;
            }
            pos = Math.max(0, Math.min(this._children.length, +pos));
            var prev = this._children[pos];
            if (prev) {
                delete this._index[prev[0].id];
            }
            var r = this._wrap(d);
            this._children[pos] = r;
            this._index[r.id] = [r,pos];
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
     * Removes a resource from the specified position
     */ 
    remove(pos) {
        return this.update(function(){
            let children = this._children;
            if (pos === undefined || pos < 0 || pos >= children.length) {
                return false;
            }
            let r = children[pos];
            delete this._index[r.id]
            children.splice(pos, 1);
            for (let i = pos; i < children.length; i++) {
                let r = children[i];
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
        return this.children.length;
    }
    
    /**
     * Returns the size of this set (length of the underlying array with
     * children).
     */
    size() {
        return this.children.length;
    }

    /**
     * Iterates over all child elements and calls the specified visitor function
     * in the given context. If the specified visitor function returns
     * <code>false</code> then the iteration processes stops.
     */
    each(visitor, context) {
        return this.children.forEach(visitor, context);
    }

    /**
     * Calls the specified visitor function with each child in the list and
     * returns a list of results. If the visitor returns an undefined value then
     * it is not added to the resulting list.
     */
    map(visitor, context) {
        return this.children.map(visitor, context);
    }

    /**
     * Calls the specified visitor function with each child in the list and
     * returns a list of results. If the visitor returns an undefined value then
     * it is not added to the resulting list.
     */
    filter(visitor, context) {
        return this.children.filter(visitor, context);
    }
    
    /**
     * Returns a child object by its identifier.
     */
    byId(id) {
        let slot = this._index[id];
        return slot ? slot[0] : undefined;
    }

    /**
     * Performs an update action on this dataset
     */
    update(action){
        return this.action('update', function(intent){
            action.call(this);
            return true;
        });
    }

    /**
     * Checks that the specified object has a good type. Otherwise it wraps it
     * in a Resource instance.
     */
    _wrap(data) {
        let resource = data;
        var ResourceType = this._getResourceType();
        if (!(data instanceof ResourceType)) {
            resource = new ResourceType({
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
    _getResourceType(){
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
            this.each(function(child){
                return child.visit(visitor);
            });
        }
        if (visitor.after) {
            visitor.after.call(visitor, this);
        }
        return result;
        
    }

}
Intents.addTo(DataSet);

