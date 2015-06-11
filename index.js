import Resource from './lib/Resource';
import DataSet from './lib/DataSet';
import DerivativeDataSet from './lib/DerivativeDataSet';
import DataSetFiltered from './lib/DataSetFiltered';
import DataSetPaginated from './lib/DataSetPaginated';
import DataSetSelection from './lib/DataSetSelection';

export default {
    Resource,
    DataSet,
    DerivativeDataSet,
    DataSetFiltered,
    DataSetPaginated,
    DataSetSelection,
    registerDataSetAdapters(adapters){
        adapters.registerAdapter(DataSet, DataSetFiltered);
        adapters.registerAdapter(DataSet, DataSetPaginated);
        adapters.registerAdapter(DataSet, DataSetSelection);
    }
};