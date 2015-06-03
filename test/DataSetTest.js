import expect from 'expect.js';
import { AdapterManager } from 'mosaic-adapters';
import { DataSet } from '..';

describe('DataSet', function() {
    let adapters = new AdapterManager();
    function check(first, second){
        expect(JSON.stringify(first)).to.eql(JSON.stringify(second));
    }
    
    it('should add/remove entities one-by-one', function(done) {
        let dataSet = new DataSet({adapters});
        let index = {};
        let list = [];
        let count = 1000;
        report('Generate ' + count + ' objects and set them in a DataSet', function(){
            for (let i = 0; i < count; i++) {
                let data = {
                    id : 'id-' + i,
                    msg: 'item - ' + i
                };
                list.push(data);
                index[data.id] = data;
                dataSet.add(data);
            }
        });
        expect(dataSet.size()).to.eql(count);
        expect(dataSet.length).to.eql(count);
        
        report('Load ' + count + ' objects by position and by their index', function(){
            let positions = [];
            for (let i = 0; i < list.length; i++) {
                let r1 = dataSet.resources[i];
                if (!r1) expect().fail();
                if (r1.data !== list[i]) expect().fail();

                let id = 'id-' + i;
                let r2 = dataSet.byId(id);
                if (r2 !== r1) expect().fail();

                let pos = dataSet.posById(id);
                if (pos !== i) expect().fail();
            }
        });
        
        report('Delete ' + count + ' objects by their id', function(){
            for (let i = count - 1; i >= 0; i--) {
                  var id = 'id-' + i;
                  let first = dataSet.get(i);
                  if (!first) expect().fail();
                  let second = dataSet.byId(id);
                  if (!second || first !== second) expect().fail();
                  
                  dataSet.removeById(id);
                  
                  first = dataSet.get(i);
                  if (first !== undefined) expect().fail();
                  second = dataSet.byId(id);
                  if (second !== undefined) expect().fail();
            }
            if (dataSet.length !== 0) expect().fail();
        })

        done();
    });
    it('should add/remove entities by batch', function(done) {
        let dataSet = new DataSet({adapters});
        let index = {};
        let list = []; 
        let count = 1000;
        report('Generate ' + count + ' objects', function(){
            for (let i = 0; i < count; i++) {
                let data = {
                        id : 'id-' + i,
                        msg: 'item - ' + i
                };
                index[data.id] = data;
                list.push(data);
            }
        });
        report('Set ' + count + ' objects in a DataSet', function(){
            dataSet.resources = list;
        });
        expect(dataSet.size()).to.eql(count);
        expect(dataSet.length).to.eql(count);
        
        for (let id in index) {
            let data = index[id];
            let resource = dataSet.byId(id);
            if (resource.data !== data) expect().fail();
        }
        
        for (let i = 0; i < count; i++) {
            let data = index['id-' + i];
            let resource1 = dataSet.get(i);
            if (!resource1) expect().fail();
            if (resource1.data !== data) expect().fail();
            let resource2 = dataSet.resources[i];
            if (resource2 !== resource1) expect().fail();
        }
        done();
    });
    
    it('should visit all resources', function(){
        var dataSet = new DataSet({adapters});
        var a = new DataSet({adapters, data:{id: 'a', title: 'First folder'}});
        var b = new DataSet({adapters, data:{id: 'b', title: 'Folder two'}});
        dataSet.add(a);
        dataSet.add(b);
        
    })
});



function report(msg, action){
    let start = Date.now();
    action();
    let stop = Date.now();
// console.log(msg, (stop - start) + 'ms');
}
