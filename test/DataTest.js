import expect from 'expect.js';
import { AdapterManager } from 'mosaic-adapters';
import { Data } from '..';

describe('Data', function() {
    let adapters = new AdapterManager();
    it('Should generate type keys', function() {
        let item = new Data({adapters});
        expect(item.data).to.eql({});
    });
    it('Should automatically generate a new ID', function() {
        let set = {};
        let count = 10;
        for (let i = 0; i < count; i++) {
            let item = new Data({adapters});
            expect(item.id in set).to.be(false);
            expect(item.id).to.not.be(undefined);
            set[item.id] = true;
        }
    });
    it('Should contain a not-empty data object', function() {
        let item = new Data({adapters});
        expect(item.data).to.eql({});
        item.data = { msg: 'Hello, world '};
        expect(item.data).to.eql({ msg: 'Hello, world '});
    });
    it('Should return an identifier contained in data', function() {
        let item = new Data({adapters,data:{id:'helloworld'}});
        expect(item.id).to.eql('helloworld');
    });
    it('Should be change to adapt the ID when a new data stored', function() {
        let item = new Data({adapters});
        expect(item.id).to.not.eql('helloworld');
        item.data = {id:'helloworld'};
        expect(item.id).to.eql('helloworld');
    });
    it('Should provide a system type key if the type is not defined', function() {
        let item = new Data({adapters});
        expect(item.type.key).to.eql('Object/Adapter/Adaptable/Data');
        item.data = { type : 'MyType' }
        expect(item.getTypeKey().key).to.eql('MyType');
        expect(item.type.key).to.eql('MyType');
    });
    it('Should give priorities for the type defined in the "properties" field', function() {
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
    it('Should give access to fields by paths', function() {
        let item = new Data({adapters});
        item.set('foo.bar.titi', 'Titi');
        expect(item.data.foo.bar.titi).to.eql('Titi');
        expect(item.get('foo.bar.titi')).to.eql('Titi');
    });
    it('Should allow to visit data object', function() {
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
});

