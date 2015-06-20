import Data from './lib/Data';
import DataSet from './lib/DataSet';
import DerivativeDataSet from './lib/DerivativeDataSet';
import DataSetFiltered from './lib/DataSetFiltered';
import DataSetPaginated from './lib/DataSetPaginated';
import DataSetSelection from './lib/DataSetSelection';

export default {
    Data,
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