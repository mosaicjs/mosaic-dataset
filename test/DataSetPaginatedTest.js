import expect from 'expect.js';

import { AdapterManager } from 'mosaic-adapters';
import { DataSet, DataSetPaginated, registerDataSetAdapters } from '..';

describe('DataSetPaginated', function() {
    it('should give access to individual paged data items', function(){
        let adapters = new AdapterManager();
        registerDataSetAdapters(adapters);
        
        let pageSize = 12;
        let dataSet = new DataSet({adapters, pageSize});
        let list = [];
        let count = 1000;
        for (let i = 0; i < count; i++) {
            list.push({
                id : 'id-' + i,
                msg: 'item - ' + i
            });
        }
        dataSet.items = list;
        expect(dataSet.length).to.eql(count);
        
        var paginated = dataSet.getAdapter(DataSetPaginated);
        expect(!!paginated).to.be(true);
        expect(paginated.pageSize).to.eql(pageSize);
        let pageIdx = 5;
        paginated.pageIdx = pageIdx;
        expect(paginated.pageIdx).to.be(pageIdx);
        expect(paginated.pagePos).to.be(pageIdx * pageSize);
        expect(paginated.length).to.be(pageSize);
        for (let i = 0; i < pageSize; i++) {
            let item = paginated.items[i];
            expect(!!item).to.be(true);
            expect(item instanceof dataSet.DataType).to.be(true);
            expect(item.data).to.be(list[i + pageIdx * pageSize]);
        }
        
        let lastPageIdx = Math.floor(count / pageSize);
        let lastPageSize = count % pageSize;
        paginated.pageIdx = lastPageIdx;
        expect(paginated.length).to.be(lastPageSize);
        expect(paginated.pagePos).to.be(lastPageIdx * pageSize);
        
    });
});