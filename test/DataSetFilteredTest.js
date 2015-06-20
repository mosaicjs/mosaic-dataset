import expect from 'expect.js';

import { AdapterManager } from 'mosaic-adapters';
import { DataSet, DataSetFiltered } from '..';

describe('DataSetFiltered', function() {
    let adapters = new AdapterManager();
    function check(first, second){
        expect(JSON.stringify(first)).to.eql(JSON.stringify(second));
    }
    
    it('should contain a subset of elements from the parent DataSet', function(done) {
        let dataSet = new DataSet({adapters});
        let subSet = new DataSetFiltered({dataSet, filter: function(r, pos) {
            return pos % 2 === 0;
        }});
        let subsetUpdateIntent = null;
        subSet.on('update', function(intent){
            subsetUpdateIntent = intent;
        });
        let index = {};
        let list = [];
        let count = 10;
        for (let i = 0; i < count; i++) {
            let data = {
                id : 'id-' + i,
                msg: 'item - ' + i
            };
            list.push(data);
            index[data.id] = data;
        }
        expect(subsetUpdateIntent).to.be(null);
        dataSet.setItems(list).then(function(){
            expect(dataSet.length).to.eql(count);
            expect(!!subsetUpdateIntent).to.be(true);
            return subsetUpdateIntent.promise;
        }).then(function(){
            expect(subSet.length).to.eql(count / 2);
            let positions = [];
            for (let i = 0; i < list.length; i++) {
                let r1 = dataSet.items[i];
                let id = 'id-' + i;
                let r2 = subSet.byId(id);
                if (i % 2 === 0) {
                    if (dataSet.items[i] !== subSet.items[i / 2]) {
                        expect().fail();
                    }
                    if (r1 !== r2) {
                        expect().fail();
                    }
                } else {
                    if (r2) {
                        expect().fail();
                    }
                }
            }
        }).then(done, done);
    });
});
