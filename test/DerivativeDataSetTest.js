import expect from 'expect.js';
import { AdapterManager } from 'mosaic-adapters';
import { DataSet, DerivativeDataSet } from '..';

describe('DerivativeDataSet', function() {
    let adapters = new AdapterManager();
    function check(first, second){
        expect(JSON.stringify(first)).to.eql(JSON.stringify(second));
    }
    
    it('should listen for modifications', function(done) {
        let dataSet = new DataSet({adapters});
        let set = new DerivativeDataSet({dataSet});
        let handled;
        dataSet.on('update', function(intent){
            handled = true;
            intent.then(function(){
               handled = true;
               check(dataSet.items, set.items);
            }).then(function(){ done(); }, done); 
        });
        let list = [];
        let count = 1000;
        for (let i = 0; i < count; i++) {
            let data = {
                id : 'id-' + i,
                msg: 'item - ' + i
            };
            list.push(data);
        }
        expect(handled).to.be(undefined);
        dataSet.items = list;
        expect(handled).to.be(true);
    });
});



function report(msg, action){
    let start = Date.now();
    action();
    let stop = Date.now();
// console.log(msg, (stop - start) + 'ms');
}
