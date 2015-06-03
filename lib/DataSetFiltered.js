import DataSet from './DataSet';
import DerivativeDataSet from './DerivativeDataSet';

export default class DataSetFiltered extends DerivativeDataSet {
    
    constructor(options, ...args){
        super(options, ...args);
        if (!options)
            return ;
        let filter = options.filter;
        if (typeof filter === 'function') {
            this._filter = filter;
        }
    }

    _handleMainDataSetUpdate() {
        let dataSet = this.dataSet;
        let result = dataSet.resources.filter(this._filter, this);
        this.resources = result; 
    }

    _filter(r) {
        return !!r;
    }

}
