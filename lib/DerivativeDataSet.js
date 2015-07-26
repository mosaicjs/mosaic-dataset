import DataSet from './DataSet';
export default class DerivativeDataSet extends DataSet {

    constructor(options, ...args){
        super(options, ...args);
        if (!options) {
            throw new Error('Parameters are not defined');
        }
        this._onMainDataSetUpdate = this._onMainDataSetUpdate.bind(this);
        this.dataSet.addListener('update', this._onMainDataSetUpdate);
        this._handleMainDataSetUpdate();
    }

    close() {
        super.close();
        var dataSet = this.dataSet;
        dataSet.removeListener('update', this._onMainDataSetUpdate);
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
    
    /**
     * This method is called when the parent dataset is updated.
     */
    _onMainDataSetUpdate(intent) {
        intent.after(function() {
            return this._handleMainDataSetUpdate();
        }.bind(this));
    }

    /**
     * This method should be overloaded in subclasses to define exact behaveour
     * of objects when the parent set changes.
     */
    _handleMainDataSetUpdate() {
        this.items = this.dataSet.items;
    }

}
