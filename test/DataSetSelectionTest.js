import expect from 'expect.js';

import { AdapterManager } from 'mosaic-adapters';
import { DataSet, DataSetSelection } from '..';

describe('DataSetSelection', function() {
    let adapters = new AdapterManager();

    function generateDataItems(count){
        let list = [];
        count = count || 0;
        for (let i = 0; i < count; i++) {
            let data = {
                id : 'id-' + i,
                msg: 'item - ' + i
            };
            list.push(data);
        }
        return list;
    }
    
    function newDataSet(count){
        let dataSet = new DataSet({adapters});
        dataSet.items = generateDataItems(count);
        return dataSet;
    }
    
    it('should be available as an adapter for DataSet instances', function() {
        let dataSet = newDataSet();
        let selection = dataSet.getAdapter(DataSetSelection);
        expect(selection instanceof DataSetSelection).to.be(true);
    });

    it('should be empty initially', function() {
        let count = 100;
        let dataSet = newDataSet(count);
        let selection = dataSet.getAdapter(DataSetSelection);
        expect(dataSet.length).to.be(count);
        expect(selection.length).to.be(0);
    });

    it('should be able to select a subset of items', function() {
        let count = 100;
        let dataSet = newDataSet(count);
        let selection = dataSet.getAdapter(DataSetSelection);
        let list = dataSet.slice(count / 4, count / 2);
        
        expect(dataSet.length).to.be(count);
        expect(selection.length).to.be(0);
        selection.select(list);
        expect(selection.length).to.be(count / 4);
        expect(selection.items).to.eql(list);
        
        selection.select([]);
        expect(selection.length).to.be(0);
        expect(selection.items).to.eql([]);
    });
   
    it('the method "selected" should return <code>true</code> for all selected items', function() {
        let count = 100;
        let dataSet = newDataSet(count);
        let selection = dataSet.getAdapter(DataSetSelection);
        let list = dataSet.slice(count / 4, count / 2);
        selection.select(list);
        for (let i = 0; i < list.length; i++) {
            expect(selection.selected(list[i])).to.be(true);
        }
    });
         
});
