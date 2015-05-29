module.exports = {
    entry : __dirname + '/index.js',
    output : {
        path : __dirname + '/dist',
        filename : 'index.js',
        libraryTarget : 'umd'
    },
    externals : [ 'mosaic-adapters', 'mosaic-intents' ],
    module : {
        loaders : [ {
            test : /\.jsx?$/,
            loader : 'babel'
        } ]
    },
};
