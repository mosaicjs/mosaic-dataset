import expect from 'expect.js';
import { AdapterManager } from 'mosaic-adapters';
import { Resource } from '..';

describe('Resource', function() {
    let adapters = new AdapterManager();
    it('Should generate type keys', function() {
        let resource = new Resource({adapters});
        expect(resource.data).to.eql({});
    });
    it('Should automatically generate a new ID', function() {
        let set = {};
        let count = 10;
        for (let i = 0; i < count; i++) {
            let resource = new Resource({adapters});
            expect(resource.id in set).to.be(false);
            expect(resource.id).to.not.be(undefined);
            set[resource.id] = true;
        }
    });
    it('Should contain a not-empty data object', function() {
        let resource = new Resource({adapters});
        expect(resource.data).to.eql({});
        resource.data = { msg: 'Hello, world '};
        expect(resource.data).to.eql({ msg: 'Hello, world '});
    });
    it('Should return an identifier contained in data', function() {
        let resource = new Resource({adapters,data:{id:'helloworld'}});
        expect(resource.id).to.eql('helloworld');
    });
    it('Should be change to adapt the ID when a new data stored', function() {
        let resource = new Resource({adapters});
        expect(resource.id).to.not.eql('helloworld');
        resource.data = {id:'helloworld'};
        expect(resource.id).to.eql('helloworld');
    });
    it('Should provide a system type key if the type is not defined', function() {
        let resource = new Resource({adapters});
        expect(resource.type.key).to.eql('Object/Adapter/Adaptable/Resource');
        resource.data = { type : 'MyType' }
        expect(resource.getTypeKey().key).to.eql('MyType');
        expect(resource.type.key).to.eql('MyType');
    });
    it('Should give priorities for the type defined in the "properties" field', function() {
        let resource = new Resource({adapters});
        resource.data = { type : 'MyType' };        
        expect(resource.type.key).to.eql('MyType');
        expect(resource.data).to.eql({ type : 'MyType' });
        resource.data.properties = {
            type : 'AnotherType',
            msg: 'Hello, world!'
        };
        expect(resource.type.key).to.eql('AnotherType');
        expect(resource.data).to.eql({
            type : 'MyType',
            properties : {
                type : 'AnotherType',
                msg: 'Hello, world!'
            }
        });
    });
    it('Should give access to fields by paths', function() {
        let resource = new Resource({adapters});
        resource.set('foo.bar.titi', 'Titi');
        expect(resource.data.foo.bar.titi).to.eql('Titi');
        expect(resource.get('foo.bar.titi')).to.eql('Titi');
    });
    it('Should allow to visit resource', function() {
        let resource = new Resource({adapters});
        let str = '';
        resource.visit({
            before : function(r){
                expect(r).to.be(resource);
                str += '[before]';
            },
            after : function(r){
                expect(r).to.be(resource);
                str += '[after]';
            }
        });
        expect(str).to.be('[before][after]');
        resource.set('foo.bar.titi', 'Titi');
        expect(resource.data.foo.bar.titi).to.eql('Titi');
        expect(resource.get('foo.bar.titi')).to.eql('Titi');
    });
});

