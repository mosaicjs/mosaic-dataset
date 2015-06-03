import DataSet from './DataSet';
import DerivativeDataSet from './DerivativeDataSet';

export default class DataSetFiltered extends DerivativeDataSet {
    
    _handleMainDataSetUpdate() {
        let filter = this._getOptionsValue('filter');
        if (filter){
            this.resources = this.dataSet.resources.filter(filter, this);
        } else {
            this.resources = this.dataSet.resources;
        }
    }

}
