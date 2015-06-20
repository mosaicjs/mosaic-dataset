import DataSet from './DataSet';
import DerivativeDataSet from './DerivativeDataSet';

export default class DataSetFiltered extends DerivativeDataSet {
    
    _handleMainDataSetUpdate() {
        let filter = this._getOptionsValue('filter');
        if (filter){
            this.items = this.dataSet.items.filter(filter, this);
        } else {
            this.items = this.dataSet.items;
        }
    }

}
