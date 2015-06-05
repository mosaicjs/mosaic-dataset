import expect from 'expect.js';
import { DataSet } from '..';

describe('DataSet', function() {
    function check(first, second){
        expect(JSON.stringify(first)).to.eql(JSON.stringify(second));
    }
    
    it('should add/remove entities one-by-one', function(done) {
        let dataSet = new DataSet();
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
                  let id = 'id-' + i;
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
        let dataSet = new DataSet();
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
        let counter = 0;
        function newItems(number) {
            let list = []; 
            for (let i = 0; i < number; i++) {
                let id = counter++;
                let data = {
                        id : 'id-' + id,
                        title: 'item-' + id
                };
                list.push(data);
            }
            return list;
        }
        let dataSet = new DataSet({data:{id:'root',title:'Root'}});
        let a = new DataSet({dataSet, data:{id: 'a', title: 'First folder'}});
        a.resources = newItems(5);
        let b = new DataSet({dataSet, data:{id: 'b', title: 'Folder two'}});
        b.resources = newItems(10);
        let c = new DataSet({dataSet, data:{id: 'c', title: 'Folder three'}});
        c.resources = newItems(5);
        
        let list = [a, b, c].concat(newItems(5));
        dataSet.resources = list;
        
        let str = '';
        dataSet.visit({
            depth : 0,
            prev : null,
            _getShift : function(){
                let result = '\n';  
                for (let i=0; i<this.depth; i++) {
                    result += '    ';
                }
                return result;
            },
            before : function(r){
                let shift = this._getShift();
                this.print(shift + '<' + r.data.id + ' title="' + r.data.title + '">');
                this.depth++;
                this.prev = r; 
            },
            after : function(r){
                this.depth--;
                let shift = '';
                if (r !== this.prev) {
                    shift = this._getShift();
                }
                this.print(shift + '</' + r.data.id + '>');
                this.prev = r;
            },
            print : function(msg){
                str += msg;
            }
        });
        let control = [
            '',
            '<root title="Root">',
            '    <a title="First folder">',
            '        <id-0 title="item-0"></id-0>',
            '        <id-1 title="item-1"></id-1>',
            '        <id-2 title="item-2"></id-2>',
            '        <id-3 title="item-3"></id-3>',
            '        <id-4 title="item-4"></id-4>',
            '    </a>',
            '    <b title="Folder two">',
            '        <id-5 title="item-5"></id-5>',
            '        <id-6 title="item-6"></id-6>',
            '        <id-7 title="item-7"></id-7>',
            '        <id-8 title="item-8"></id-8>',
            '        <id-9 title="item-9"></id-9>',
            '        <id-10 title="item-10"></id-10>',
            '        <id-11 title="item-11"></id-11>',
            '        <id-12 title="item-12"></id-12>',
            '        <id-13 title="item-13"></id-13>',
            '        <id-14 title="item-14"></id-14>',
            '    </b>',
            '    <c title="Folder three">',
            '        <id-15 title="item-15"></id-15>',
            '        <id-16 title="item-16"></id-16>',
            '        <id-17 title="item-17"></id-17>',
            '        <id-18 title="item-18"></id-18>',
            '        <id-19 title="item-19"></id-19>',
            '    </c>',
            '    <id-20 title="item-20"></id-20>',
            '    <id-21 title="item-21"></id-21>',
            '    <id-22 title="item-22"></id-22>',
            '    <id-23 title="item-23"></id-23>',
            '    <id-24 title="item-24"></id-24>',
            '</root>',
        ].join('\n');
        expect(str).to.eql(control);
    })
});

function report(msg, action){
    let start = Date.now();
    action();
    let stop = Date.now();
// console.log(msg, (stop - start) + 'ms');
}
