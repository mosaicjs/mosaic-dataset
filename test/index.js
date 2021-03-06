require("babel-core/register")({
    // This will override `node_modules` ignoring - you can alternatively pass
    // an array of strings to be explicitly matched or a regex / glob
    ignore : false,
    blacklist: ["strict"] 
});
require('./DataTest');
require('./DataSetTest');
require('./DerivativeDataSetTest');
require('./DataSetFilteredTest');
require('./DataSetPaginatedTest');
require('./DataSetSelectionTest');
