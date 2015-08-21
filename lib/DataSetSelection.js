import DataSet from './DataSet';
import DerivativeDataSet from './DerivativeDataSet';

export default class DataSetSelection extends DerivativeDataSet {
    
    /** Updates list of selected items. */
    _handleMainDataSetUpdate() {
        let items = [];
        this.dataSet.each(function(r, i){
            if (this.has(r)) {
                items.push(r);
            }
        }, this);
        return this.setItems(items);
    }

    /**
     * Returns a filter function returning <code>true</code> if a specified
     * item is contained in the specified list.
     */
    _getSelectionFilter(items){
        let filter;
        if (typeof items === 'function') {
            filter = items;
        } else if (items instanceof DataSet) {
            filter = function(r) {
                return items.has(r);
            };
        } else if (items) {
            if (!Array.isArray(items)) {
                items = [items];
            }
            let index = {};
            for (let key in items) {
                let item = this._wrap(items[key]);
                index[item.id] = key;
            }
            filter = function(item){
                return item.id in index;
            };
        }
        return filter;
    }

    toggle(item){
        const that = this;
        const newItems = [];
        const items = Array.isArray(item) ? item : [item];
        items.forEach(function(item){
            let pos = that.pos(item);
            if (pos < 0) {
                newItems.push(item);
            }
        });
        return that.setItems(newItems);
    }
    
    /**
     * Selects the specified items.
     */ 
    select(selection) {
        let list;
        let filter = this._getSelectionFilter(selection);
        if (filter) {
            list = this.dataSet.filter(filter, this);
        } else {
            list = [];
        }
        return this.setItems(list);
    }
    
    /**
     * Returns <code>true</code> if <em>at least one</em> specified item
     * is contained in this selection data set.
     */
    selected(selection) {
        let filter = this._getSelectionFilter(selection);
        return this.find(filter);
    }

}
