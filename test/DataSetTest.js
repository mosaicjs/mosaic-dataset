import expect from 'expect.js';
import { DataSet, Data } from '..';

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
                let r1 = dataSet.items[i];
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
            dataSet.items = list;
        });
        expect(dataSet.size()).to.eql(count);
        expect(dataSet.length).to.eql(count);
        
        for (let id in index) {
            let data = index[id];
            let item = dataSet.byId(id);
            if (item.data !== data) expect().fail();
        }
        
        for (let i = 0; i < count; i++) {
            let data = index['id-' + i];
            let item1 = dataSet.get(i);
            if (!item1) expect().fail();
            if (item1.data !== data) expect().fail();
            let item2 = dataSet.items[i];
            if (item2 !== item1) expect().fail();
        }
        done();
    });
    
    it('should visit all items', function(){
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
        a.items = newItems(5);
        let b = new DataSet({dataSet, data:{id: 'b', title: 'Folder two'}});
        b.items = newItems(10);
        let c = new DataSet({dataSet, data:{id: 'c', title: 'Folder three'}});
        c.items = newItems(5);
        
        let list = [a, b, c].concat(newItems(5));
        dataSet.items = list;
        
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
    });
    
    it('should re-cast data objects', function(){
        class First extends Data { }
        class Second extends Data { }
        const first = new DataSet({DataType: First});
        const second = new DataSet({DataType: Second});
        first.items = [{
            id: '123',
            msg: 'One'
        }, {
            id: '234',
            msg: 'Two'
        }, {
            id: '345',
            msg: 'Three'
        }];
        expect(first.length).to.eql(3);
        expect(second.length).to.eql(0);
        for (let i=0, len=first.length; i<len; i++) {
            expect(first.get(i) instanceof First).to.be(true);
            expect(second.get(i)).to.be(undefined);
        }

        second.items = first.items;
        expect(second.length).to.eql(first.length);
        for (let i=0, len=second.length; i<len; i++) {
            expect(second.get(i) instanceof Second).to.be(true);
        }
        
        for (let i=0, len=second.length; i<len; i++) {
            expect(first.get(i).data).to.be(second.get(i).data);
            expect(first.items[i].id).to.be(second.items[i].id);
        }
        
        ['123', '234', '345'].forEach(function(id, i){
            expect(first.items[i].id).to.eql(id);
            expect(second.items[i].id).to.eql(id);
        });
    });
    
    describe('intersection method', function(){
        it('should return intersection between multiple data sets', function() {
            let first = new DataSet();
            let second = new DataSet();
            let third = new DataSet();
            first.items = [
               { msg: 'First'},
               { msg: 'Second'},
               { msg: 'Third'},
               { msg: 'Fourth'},
               { msg: 'Fifth'},
               { msg: 'Sixth'},
           ];
            second.items = [
                 first.items[0],
                 first.items[2],
                 first.items[3],
                 first.items[5]
            ];
            third.items = [
                 first.items[1],
                 first.items[2],
                 first.items[4],
                 first.items[5]
            ];
            expect(DataSet.intersection(first, second, third))
            .to.eql([first.items[2], first.items[5]]);
        });
    });
});

function report(msg, action){
    let start = Date.now();
    action();
    let stop = Date.now();
// console.log(msg, (stop - start) + 'ms');
}
