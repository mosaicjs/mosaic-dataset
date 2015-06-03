import DerivativeDataSet from './DerivativeDataSet';

export default class DataSetPaginated extends DerivativeDataSet {

    /** Initializes this paginated data set. */
    constructor(...args) {
        super(...args);
        var page = this._getOptionsValue('page', 0);
        this.pageIdx = page;
        this.pageSize = this._getOptionsValue('pageSize', 10);
    }

    // ----------------------------------------------------------------------

    /** Returns position of the first element visible in the page */
    get pagePos() {
        var result = this.pageIdx * this.pageSize;
        return result;
    }

    /**
     * Activates the page corresponding containing element in the specified
     * position.
     */
    focusPos(idx) {
        idx = idx || 0;
        idx = Math.max(0, Math.min(this.dataSet.length - 1, idx));
        var pageIdx = Math.floor(idx / this.pageSize);
        return this.setPageIdx(pageIdx);
    }

    // ----------------------------------------------------------------------
    // Page index
    
    /** Returns the index of the currently active page. */
    get pageIdx() {
        return this._pageIdx || 0;
    }

    /** Sets a new page index */
    set pageIdx(pageIdx) { this.setPageIdx(pageIdx); }
    
    /** Sets a new page index */
    setPageIdx(pageIdx) {
        pageIdx = pageIdx || 0;
        var dataSet = this.dataSet;
        var pageSize = this.pageSize;
        var size = dataSet.size();
        pageIdx = this._pageIdx = Math.max(0, Math.min(pageIdx,
                this.pageNumber - 1));
        var startPos = pageIdx * pageSize;
        var endPos = Math.min(size - 1, startPos + pageSize - 1);
        var resources = [];
        for (var i = startPos; i <= endPos; i++) {
            var resource = dataSet.get(i);
            resources.push(resource);
        }
        return this.setResources(resources);
    }

    // ----------------------------------------------------------------------
    
    /** Sets a new page size */
    set pageSize(pageSize) {
        var firstPageItemIdx = this.pagePos;
        this._pageSize = pageSize || this.defaultPageSize || 10;
        return this.focusPos(firstPageItemIdx);
    }

    /** Returns the current page size */
    get pageSize() {
        return this._pageSize || this._getOptionsValue('pageSize')
                || this.defaultPageSize;
    }

    // ----------------------------------------------------------------------
    
    /** Returns the total page number in this data set. */
    get pageNumber() {
        return Math.ceil(this.dataSet.length / this.pageSize);
    }

    // ----------------------------------------------------------------------
    
    /** Updates the list */
    _onMainDataSetUpdate(intent) {
        return intent.then(function() {
            return this.pageSize = this.pageSize;
        }.bind(this));
    }

}
