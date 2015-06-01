import DataSet from './DataSet';

export default class DerivativeDataSet extends DataSet {

    constructor(options, ...args){
        super(options, ...args);
        if (!options) {
            throw new Error('Parameters are not defined');
        }
        var dataSet = this.dataSet = options.object || options.dataSet;
        if (!this.adapters && dataSet) {
            this.adapters = dataSet.adapters;
        }
        this._onMainDataSetUpdate = this._onMainDataSetUpdate.bind(this);
        dataSet.on('update', this._onMainDataSetUpdate);
    }

    close() {
        super.close();
        var dataSet = this.dataSet;
        dataSet.off('update', this._onMainDataSetUpdate, this);
        delete this._dataSet;
    }

    /** Access to the internal dataset */
    set dataSet(set){ this._dataSet = set; }
    get dataSet() { return this._dataSet; }
    
    /**
     * This method should be overloaded in subclasses to define exact behaveour
     * of objects when the parent set changes.
     */
    _onMainDataSetUpdate(intent) {
        intent.then(function() {
            var dataSet = this.dataSet;
            var values = [].concat(this.dataSet.children);
            this.children = values;
        }.bind(this));
    }

}
