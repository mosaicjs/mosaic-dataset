import DataSet from './DataSet';

const DATA_SET_KEY = Symbol('_dataSet');
export default class DerivativeDataSet extends DataSet {

    constructor(options, ...args){
        super(options, ...args);
        if (!options) {
            throw new Error('Parameters are not defined');
        }
        var dataSet = this.dataSet = options.dataSet || this.adaptable;
        if (!this.adapters && dataSet) {
            this.adapters = dataSet.adapters;
        }
        this._onMainDataSetUpdate = this._onMainDataSetUpdate.bind(this);
        dataSet.on('update', this._onMainDataSetUpdate);
        this._handleMainDataSetUpdate();
    }

    close() {
        super.close();
        var dataSet = this.dataSet;
        dataSet.off('update', this._onMainDataSetUpdate);
        delete this._dataSet;
    }

    
    /** Returns an options value. */
    _getOptionsValue(key, defaultValue){
        var result = super._getOptionsValue(key);
        if (!result){
            var dataSet = this.dataSet;
            if (dataSet){
                result = dataSet._getOptionsValue(key, defaultValue);
            }
        }
        return result;
    }
    
    /** Access to the internal dataset */
    set dataSet(set){
        if (set instanceof DataSet) {
            this[DATA_SET_KEY] = set;
        } else {
            delete this[DATA_SET_KEY];
        }
    }
    get dataSet() { return this[DATA_SET_KEY]; }
    
    /**
     * This method is called when the parent dataset is updated.
     */
    _onMainDataSetUpdate(intent) {
        intent.then(function() {
            this._handleMainDataSetUpdate();
        }.bind(this));
    }

    /**
     * This method should be overloaded in subclasses to define exact behaveour
     * of objects when the parent set changes.
     */
    _handleMainDataSetUpdate() {
        this.resources = this.dataSet.resources;
    }

}
