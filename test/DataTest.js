import expect from 'expect.js';
import { AdapterManager } from 'mosaic-adapters';
import { Data } from '..';

describe('Data', function() {
    let adapters = new AdapterManager();
    it('should generate type keys', function() {
        let item = new Data({adapters});
        expect(item.data).to.eql({});
    });
    it('should automatically generate a new ID', function() {
        let set = {};
        let count = 10;
        for (let i = 0; i < count; i++) {
            let item = new Data({adapters});
            expect(item.id in set).to.be(false);
            expect(item.id).to.not.be(undefined);
            set[item.id] = true;
        }
    });
    it('should contain a not-empty data object', function() {
        let item = new Data({adapters});
        expect(item.data).to.eql({});
        item.data = { msg: 'Hello, world '};
        expect(item.data).to.eql({ msg: 'Hello, world '});
    });
    it('should return an identifier contained in data', function() {
        let item = new Data({adapters,data:{id:'helloworld'}});
        expect(item.id).to.eql('helloworld');
    });
    it('should be change to adapt the ID when a new data stored', function() {
        let item = new Data({adapters});
        expect(item.id).to.not.eql('helloworld');
        item.data = {id:'helloworld'};
        expect(item.id).to.eql('helloworld');
    });
    it('should provide a system type key if the type is not defined', function() {
        let item = new Data({adapters});
        expect(item.type.key).to.eql('Object/Adapter/Adaptable/Data');
        item.data = { type : 'MyType' }
        expect(item.getTypeKey().key).to.eql('MyType');
        expect(item.type.key).to.eql('MyType');
    });
    it('should give priorities for the type defined in the "properties" field', function() {
        let item = new Data({adapters});
        item.data = { type : 'MyType' };        
        expect(item.type.key).to.eql('MyType');
        expect(item.data).to.eql({ type : 'MyType' });
        item.data.properties = {
            type : 'AnotherType',
            msg: 'Hello, world!'
        };
        expect(item.type.key).to.eql('AnotherType');
        expect(item.data).to.eql({
            type : 'MyType',
            properties : {
                type : 'AnotherType',
                msg: 'Hello, world!'
            }
        });
    });
    it('should give access to fields by paths', function() {
        let item = new Data({adapters});
        item.set('foo.bar.titi', 'Titi');
        expect(item.data.foo.bar.titi).to.eql('Titi');
        expect(item.get('foo.bar.titi')).to.eql('Titi');
    });
    it('should allow to visit data object', function() {
        let item = new Data({adapters});
        let str = '';
        item.visit({
            before : function(r){
                expect(r).to.be(item);
                str += '[before]';
            },
            after : function(r){
                expect(r).to.be(item);
                str += '[after]';
            }
        });
        expect(str).to.be('[before][after]');
        item.set('foo.bar.titi', 'Titi');
        expect(item.data.foo.bar.titi).to.eql('Titi');
        expect(item.get('foo.bar.titi')).to.eql('Titi');
    });
    it('should automatically re-wrap the data object', function(){
        class First extends Data { }
        class Second extends Data { }
        let first = new First({adapters, data: {id:'foobar', msg: 'Foo Bar'}});
        expect(first instanceof First).to.be(true);
        expect(first.id).to.be('foobar');
        const control = {id:'foobar', msg: 'Foo Bar'};
        expect(first.data).to.eql(control);
        let second = new Second({adapters});
        expect(second instanceof Second).to.be(true);
        expect(!!second.id).to.be(true);
        expect(second.id).to.not.be('foobar');
        expect(second.data).to.eql({});
        expect(second.data).to.not.eql(control);
        // It should re-wrap data
        second.data = first; 
        expect(second.id).to.be('foobar');
        expect(second.data).to.eql(control);
        expect(second.data).to.be(first.data);
    });
});

