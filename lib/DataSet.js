import { Intents } from 'mosaic-intents';
import { AdapterManager } from 'mosaic-adapters';
import Data from './Data';

const DATA_SET_KEY = Symbol('_dataSet');
export default class DataSet extends Data {

    /**
     * Class constructor. It defines data array and registers event listeners
     * updating internal data indexes.
     */  
    constructor(options, ...args){
        super(options, ...args);
        Intents(this);
        this.options = options || {};
        this.items = this.options.items;
        if (this.options.DataType){
            // Re-define the type of managed data objects
            this.DataType = this.options.DataType;
        }
        if (this.adaptable && !this.adapters) {
            this.adapters = this.adaptable.adapters;
        }
        const parentDataSet = this.dataSet;
        if (parentDataSet) {
            // Tries to copy the resource type from the main adaptable instance
            this.DataType = parentDataSet.DataType || this.DataType;
            if (!this.adapters){
                this.adapters = parentDataSet.adapters; 
            }
        }
        if (!this.adapters){
            this.adapters = new AdapterManager(); 
        }
    }
    
    /** Access to the internal dataset */
    set dataSet(set){
        if (!!set) {
            this[DATA_SET_KEY] = set;
        } else {
            delete this[DATA_SET_KEY];
        }
    }
    get dataSet() {
        if (this[DATA_SET_KEY] === undefined){
            let dataSet;
            if (this.adaptable instanceof DataSet){
                dataSet = this.adaptable;
            } else if (this.options instanceof DataSet) {
                dataSet = this.options;
            } else if (this.options.dataSet instanceof DataSet){
                dataSet = this.options.dataSet;
            }
            this[DATA_SET_KEY] = dataSet; 
        }
        return this[DATA_SET_KEY];
    }
    
    
    /** Do-nothing destructor */
    close(){}

    /** Returns an options value. */
    _getOptionsValue(key, defaultValue){
        return this.options[key] || defaultValue;
    }
    
    /**
     * Returns a list of all managed data.
     */
    get items(){
        return this._items;
    }
    
    /**
     * Sets a new list of data items. If the specified list contains non Data
     * instances then they are wrapped in a Data container.
     */
    set items(items){
        return this.setItems(items);
    }
    
    /**
     * Sets a list of new data items. If the specified list contains non-Data
     * instances then they are wrapped in a Data container.
     */
    setItems(items) {
        return this.update(function() {
            this._items = [];
            this._index = {};
            let len = items ? items.length || 0 : 0; 
            for (let pos = 0; pos < len; pos++) {
                let r = this._wrap(items[pos]);
                this._items[pos] = r; 
                this._index[r.id] = [r,pos];
            }
            return true;
        });
    }

    /**
     * Returns an entity from the specified position. Basically it returns value
     * this.items[pos].
     */
    get(pos) {
        let items = this.items;
        if (pos < 0 || pos >= items.length)
            return;
        return items[pos];
    }

    /**
     * Returns <code>true</code> if the specified item exists in this dataset.
     */
    has(d) { return this.pos(d) >= 0; }

    /**
     * Sets a new value in the specified position
     */
    set(d, pos) {
        return this.update(function() {
            if (pos === undefined) {
                pos = this._items.length;
            }
            pos = Math.max(0, Math.min(this._items.length, +pos));
            var prev = this._items[pos];
            if (prev) {
                delete this._index[prev[0].id];
            }
            var r = this._wrap(d);
            this._items[pos] = r;
            this._index[r.id] = [r,pos];
            return true;
        });
    }

    /**
     * Adds a new data item at the end of the list.
     */
    add(d) {
        return this.set(d, this.size());
    }

    /**
     * Returns position (index) of the specified data item.
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
     * Returns an array containing the specified number of items starting from
     * the given position.
     */ 
    slice(first, last) {
        return this._items.slice(first, last);
    }
    
    /**
     * Removes a data item from the specified position
     */ 
    remove(pos) {
        return this.update(function(){
            let items = this._items;
            if (pos === undefined || pos < 0 || pos >= items.length) {
                return false;
            }
            let r = items[pos];
            delete this._index[r.id]
            items.splice(pos, 1);
            for (let i = pos; i < items.length; i++) {
                let r = items[i];
                let slot = this._index[r.id];
                if (!slot)
                    throw new Error('DataSet index is broken');
                slot[1]--;
            }
            return true;
        });
    }
    
    /**
     * Removes a data item corresponding to the specified identifier.
     */
    removeById(id){
        let pos = this.posById(id);
        return this.remove(pos);
    }

    /**
     * Returns the number of elements in this set.
     */
    get length(){
        return this.items.length;
    }
    
    /**
     * Returns the size of this set (length of the underlying array with items).
     */
    size() {
        return this.items.length;
    }

    /**
     * Returns a data item by its identifier.
     */
    byId(id) {
        let slot = this._index[id];
        return slot ? slot[0] : undefined;
    }
    
    // ----------------------------------------------------------------------

    /**
     * Iterates over all items and calls the specified visitor function in the
     * given context. If the specified visitor function returns
     * <code>false</code> then the iteration processes stops.
     */
    each(visitor, context) {
        return this.items.forEach(visitor, context);
    }
    forEach(visitor, context) {
        return this.items.forEach(visitor, context);
    }

    /**
     * Calls the specified visitor function with each item in the list and
     * returns a list of results. If the visitor returns an undefined value then
     * it is not added to the resulting list.
     */
    map(visitor, context) {
        return this.items.map(visitor, context);
    }

    /**
     * Calls the specified visitor function with each item in the list and
     * returns a list of results. If the visitor returns an undefined value then
     * it is not added to the resulting list.
     */
    filter(visitor, context) {
        return this.items.filter(visitor, context);
    }
        
    /**
     * Iterates over all data items until the specified visitor method returns a
     * non-empty result. This method returns the first non-empty visitor result
     * or <code>undefined</code> if the visitor returns empty results for all
     * items.
     */
    find(visitor, context) {
        let items = this.items;
        let result = false;
        context = context || this;
        for (let i = 0, len = items.length; !result && i < len; i++) {
            result = visitor.call(context, items[i], i);
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
     * in a Data instance.
     */
    _wrap(data) {
        let item = data;
        var DataType = this.DataType;
        if (!(item instanceof DataType)) {
            item = new DataType({
                dataSet : this,
                adapters : this.adapters,
                data : data
            });
        }
        return item;
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
        Type.Data = this.Data;
        return result;
    }

    /**
     * Returns the default type of instances managed by this data set.
     */
    get DataType(){
        return this._DataType || Data;
    }
    
    /**
     * Sets a new type for instances managed by this data set.
     */
    set DataType(type){
        this._DataType = type;
    }

    // ----------------------------------------------------------------------

    /**
     * Visits this items
     * 
     * @param visitor.before
     *            this method is called before this item is visited
     * @param visitor.after
     *            this method is called after this item is visited
     */
    visit(visitor){
        var result;
        if (visitor.before) {
            result = visitor.before.call(visitor, this);
        }
        if (result !== 'false') {
            this.each(function(item){
                return item.visit(visitor);
            });
        }
        if (visitor.after) {
            visitor.after.call(visitor, this);
        }
        return result;
        
    }

    // ----------------------------------------------------------------------

    /**
     * Returns a list of elements existing in all data sets.
     */
    static intersection(...list) {
        if (!list || !list.length)
            return [];
        list = list.sort(function(a, b){
            return a.length > b.length ? 1 : -1;
        });
        let result = [];
        let first = list[0];
        first.forEach(function(item){
            let contained = true;
            for (let i = 1; contained && i < list.length; i++) {
                contained = list[i].has(item);
            }
            if (contained){
                result.push(item);
            }
        });
        return result;
    }

    // ----------------------------------------------------------------------

    /**
     * Returns a diff of the data set content before and after an update intent.
     * The returned object contains the following fields: 1) "added" a list of
     * elements present in the data set after modifications 2) "removed" list of
     * elements existing only before modifications 3) "updated" list of elements
     * present in the data set before and after modifications.
     * 
     * @param intent
     *            a modification promise or intent
     */
    static diff(dataSet, intent){
        const that = this;
        let before = that._getIndex(dataSet);
        return intent.then(function(){
            let after = that._getIndex(dataSet);
            return that._delta(before, after);
        });
    }
    
    /**
     * Returns a delta object containing differences between two specified data
     * sets.
     */
    static delta(first, second){
        const firstIndex = this._getIndex(first);
        const secondIndex = this._getIndex(second);
        return this._delta(firstIndex, secondIndex);
    }
    
    /**
     * Returns an object containing identifiers with the corresponding
     * resources.
     */  
    static _getIndex(dataSet){
        let result = {};
        dataSet.forEach(function(r){
            result[r.id] = r;
        });
        return result;
    }
    
    /**
     * Makes a diff between two specified indexes and returns an object with the
     * following fields: 1) "added" a list of elements present in the second
     * index but absent in the first one 2) "removed" list of elements existing
     * only in the first index 3) "updated" list of elements present in both
     * indexes.
     */
    static _delta(first, second){
        let result = {
            added : [],
            removed : [],
            updated : []
        };
        for (let id in first){
            let a = first[id];
            let b = second[id];
            if (!!b) {
                result.updated.push(b);
                delete second[id];
            } else {
                result.removed.push(a);
            }
        }
        for (let id in second){
            let r = second[id];
            result.added.push(r);
        }
        return result;
    }    
    
}
Intents.addTo(DataSet);

