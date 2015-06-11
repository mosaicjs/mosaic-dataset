import DataSet from './DataSet';
import DerivativeDataSet from './DerivativeDataSet';

export default class DataSetSelected extends DerivativeDataSet {
    
    /** Updates list of selected resources. */
    _handleMainDataSetUpdate() {
        let resources = [];
        this.dataSet.each(function(r, i){
            if (this.has(r)) {
                resources.push(r);
            }
        }, this);
        return this.setResources(resources);
    }

    /**
     * Returns a filter function returning <code>true</code> if a specified
     * resource is contained in the specified list of resources.
     */
    _getSelectionFilter(resources){
        let filter;
        if (typeof resources === 'function') {
            filter = resources;
        } else if (resources instanceof DataSet) {
            filter = function(r) {
                return resources.has(r);
            };
        } else if (resources) {
            if (!Array.isArray(resources)) {
                resources = [resources];
            }
            let index = {};
            for (let key in resources) {
                let r = this._wrap(resources[key]);
                index[r.id] = key;
            }
            filter = function(r){
                return r.id in index;
            };
        }
        return filter;
    }

    /**
     * Selects the specified resources.
     */ 
    select(selection) {
        let list;
        let filter = this._getSelectionFilter(selection);
        if (filter) {
            list = this.dataSet.filter(filter, this);
        } else {
            list = [];
        }
        return this.setResources(list);
    }
    
    /**
     * Returns <code>true</code> if <em>at least one</em> specified resource
     * is contained in this selection data set.
     */
    selected(selection) {
        let filter = this._getSelectionFilter(selection);
        return this.find(filter);
    }

}
