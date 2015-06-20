(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mosaic-intents"), require("mosaic-adapters"));
	else if(typeof define === 'function' && define.amd)
		define(["mosaic-intents", "mosaic-adapters"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("mosaic-intents"), require("mosaic-adapters")) : factory(root["mosaic-intents"], root["mosaic-adapters"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _libData = __webpack_require__(5);

	var _libData2 = _interopRequireDefault(_libData);

	var _libDataSet = __webpack_require__(2);

	var _libDataSet2 = _interopRequireDefault(_libDataSet);

	var _libDerivativeDataSet = __webpack_require__(6);

	var _libDerivativeDataSet2 = _interopRequireDefault(_libDerivativeDataSet);

	var _libDataSetFiltered = __webpack_require__(1);

	var _libDataSetFiltered2 = _interopRequireDefault(_libDataSetFiltered);

	var _libDataSetPaginated = __webpack_require__(7);

	var _libDataSetPaginated2 = _interopRequireDefault(_libDataSetPaginated);

	var _libDataSetSelection = __webpack_require__(8);

	var _libDataSetSelection2 = _interopRequireDefault(_libDataSetSelection);

	exports['default'] = {
	    Data: _libData2['default'],
	    DataSet: _libDataSet2['default'],
	    DerivativeDataSet: _libDerivativeDataSet2['default'],
	    DataSetFiltered: _libDataSetFiltered2['default'],
	    DataSetPaginated: _libDataSetPaginated2['default'],
	    DataSetSelection: _libDataSetSelection2['default'],
	    registerDataSetAdapters: function registerDataSetAdapters(adapters) {
	        adapters.registerAdapter(_libDataSet2['default'], _libDataSetFiltered2['default']);
	        adapters.registerAdapter(_libDataSet2['default'], _libDataSetPaginated2['default']);
	        adapters.registerAdapter(_libDataSet2['default'], _libDataSetSelection2['default']);
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DataSet = __webpack_require__(2);

	var _DataSet2 = _interopRequireDefault(_DataSet);

	var _DerivativeDataSet2 = __webpack_require__(6);

	var _DerivativeDataSet3 = _interopRequireDefault(_DerivativeDataSet2);

	var DataSetFiltered = (function (_DerivativeDataSet) {
	    function DataSetFiltered() {
	        _classCallCheck(this, DataSetFiltered);

	        if (_DerivativeDataSet != null) {
	            _DerivativeDataSet.apply(this, arguments);
	        }
	    }

	    _inherits(DataSetFiltered, _DerivativeDataSet);

	    _createClass(DataSetFiltered, [{
	        key: '_handleMainDataSetUpdate',
	        value: function _handleMainDataSetUpdate() {
	            var filter = this._getOptionsValue('filter');
	            if (filter) {
	                this.items = this.dataSet.items.filter(filter, this);
	            } else {
	                this.items = this.dataSet.items;
	            }
	        }
	    }]);

	    return DataSetFiltered;
	})(_DerivativeDataSet3['default']);

	exports['default'] = DataSetFiltered;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var _bind = Function.prototype.bind;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _mosaicIntents = __webpack_require__(3);

	var _mosaicAdapters = __webpack_require__(4);

	var _Data2 = __webpack_require__(5);

	var _Data3 = _interopRequireDefault(_Data2);

	var DataSet = (function (_Data) {

	    /**
	     * Class constructor. It defines data array and registers event listeners
	     * updating internal data indexes.
	     */

	    function DataSet(options) {
	        var _get2;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, DataSet);

	        (_get2 = _get(Object.getPrototypeOf(DataSet.prototype), 'constructor', this)).call.apply(_get2, [this, options].concat(args));
	        (0, _mosaicIntents.Intents)(this);
	        this.options = options || {};
	        if (!this.adapters) {
	            this.adapters = new _mosaicAdapters.AdapterManager();
	        }
	        this.items = this.options.items;
	    }

	    _inherits(DataSet, _Data);

	    _createClass(DataSet, [{
	        key: 'close',

	        /** Do-nothing destructor */
	        value: function close() {}
	    }, {
	        key: '_getOptionsValue',

	        /** Returns an options value. */
	        value: function _getOptionsValue(key, defaultValue) {
	            return this.options[key] || defaultValue;
	        }
	    }, {
	        key: 'setItems',

	        /**
	         * Sets a list of new data items. If the specified list contains
	         * non-Data instances then they are wrapped in a Data container.
	         */
	        value: function setItems(items) {
	            return this.update(function () {
	                this._items = [];
	                this._index = {};
	                var len = items ? items.length || 0 : 0;
	                for (var pos = 0; pos < len; pos++) {
	                    var r = this._wrap(items[pos]);
	                    this._items[pos] = r;
	                    this._index[r.id] = [r, pos];
	                }
	                return true;
	            });
	        }
	    }, {
	        key: 'get',

	        /**
	         * Returns an entity from the specified position. Basically it returns value
	         * this.items[pos].
	         */
	        value: function get(pos) {
	            var items = this.items;
	            if (pos < 0 || pos >= items.length) return;
	            return items[pos];
	        }
	    }, {
	        key: 'has',

	        /**
	         * Returns <code>true</code> if the specified item exists in this
	         * dataset.
	         */
	        value: function has(d) {
	            return this.pos(d) >= 0;
	        }
	    }, {
	        key: 'set',

	        /**
	         * Sets a new value in the specified position
	         */
	        value: function set(d, pos) {
	            return this.update(function () {
	                if (pos === undefined) {
	                    pos = this._items.length;
	                }
	                pos = Math.max(0, Math.min(this._items.length, +pos));
	                var prev = this._items[pos];
	                if (prev) {
	                    delete this._index[prev[0].id];
	                }
	                var r = this._wrap(d);
	                this._items[pos] = r;
	                this._index[r.id] = [r, pos];
	                return true;
	            });
	        }
	    }, {
	        key: 'add',

	        /**
	         * Adds a new data item at the end of the list.
	         */
	        value: function add(d) {
	            return this.set(d, this.size());
	        }
	    }, {
	        key: 'pos',

	        /**
	         * Returns position (index) of the specified data item.
	         */
	        value: function pos(d) {
	            if (!d) return -1;
	            d = this._wrap(d);
	            return this.posById(d.id);
	        }
	    }, {
	        key: 'posById',

	        /** Returns position of the element corresponding to the specified ID. */
	        value: function posById(id) {
	            var slot = this._index[id];
	            return slot ? slot[1] : -1;
	        }
	    }, {
	        key: 'slice',

	        /**
	         * Returns an array containing the specified number of items starting
	         * from the given position.
	         */
	        value: function slice(first, last) {
	            return this._items.slice(first, last);
	        }
	    }, {
	        key: 'remove',

	        /**
	         * Removes a data item from the specified position
	         */
	        value: function remove(pos) {
	            return this.update(function () {
	                var items = this._items;
	                if (pos === undefined || pos < 0 || pos >= items.length) {
	                    return false;
	                }
	                var r = items[pos];
	                delete this._index[r.id];
	                items.splice(pos, 1);
	                for (var i = pos; i < items.length; i++) {
	                    var _r = items[i];
	                    var slot = this._index[_r.id];
	                    if (!slot) throw new Error('DataSet index is broken');
	                    slot[1]--;
	                }
	                return true;
	            });
	        }
	    }, {
	        key: 'removeById',

	        /**
	         * Removes a data item corresponding to the specified identifier.
	         */
	        value: function removeById(id) {
	            var pos = this.posById(id);
	            return this.remove(pos);
	        }
	    }, {
	        key: 'size',

	        /**
	         * Returns the size of this set (length of the underlying array with
	         * items).
	         */
	        value: function size() {
	            return this.items.length;
	        }
	    }, {
	        key: 'byId',

	        /**
	         * Returns a data item by its identifier.
	         */
	        value: function byId(id) {
	            var slot = this._index[id];
	            return slot ? slot[0] : undefined;
	        }
	    }, {
	        key: 'each',

	        // ----------------------------------------------------------------------

	        /**
	         * Iterates over all items and calls the specified visitor function in
	         * the given context. If the specified visitor function returns
	         * <code>false</code> then the iteration processes stops.
	         */
	        value: function each(visitor, context) {
	            return this.items.forEach(visitor, context);
	        }
	    }, {
	        key: 'map',

	        /**
	         * Calls the specified visitor function with each item in the list and
	         * returns a list of results. If the visitor returns an undefined value then
	         * it is not added to the resulting list.
	         */
	        value: function map(visitor, context) {
	            return this.items.map(visitor, context);
	        }
	    }, {
	        key: 'filter',

	        /**
	         * Calls the specified visitor function with each item in the list and
	         * returns a list of results. If the visitor returns an undefined value then
	         * it is not added to the resulting list.
	         */
	        value: function filter(visitor, context) {
	            return this.items.filter(visitor, context);
	        }
	    }, {
	        key: 'find',

	        /**
	         * Iterates over all data items until the specified visitor method returns a
	         * non-empty result. This method returns the first non-empty visitor result
	         * or <code>undefined</code> if the visitor returns empty results for all
	         * items.
	         */
	        value: function find(visitor, context) {
	            var items = this.items;
	            var result = false;
	            context = context || this;
	            for (var i = 0, len = items.length; !result && i < len; i++) {
	                result = visitor.call(context, items[i], i);
	            }
	            return result;
	        }
	    }, {
	        key: 'update',

	        // ----------------------------------------------------------------------

	        /**
	         * Performs an update action on this dataset
	         */
	        value: function update(action) {
	            this.version = (this.version || 0) + 1;
	            return this.action('update', function (intent) {
	                return action.call(this);
	            });
	        }
	    }, {
	        key: '_wrap',

	        /**
	         * Checks that the specified object has a good type. Otherwise it wraps it
	         * in a Data instance.
	         */
	        value: function _wrap(data) {
	            var item = data;
	            var DataType = this.DataType;
	            if (!(data instanceof DataType)) {
	                item = new DataType({
	                    dataSet: this,
	                    adapters: this.adapters,
	                    data: data
	                });
	            }
	            return item;
	        }
	    }, {
	        key: 'createNew',

	        /**
	         * Creates and returns a new empty copy of this data set.
	         */
	        value: function createNew(options) {
	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }

	            var Type = this.constructor;
	            if (!options.adapters) {
	                options.adapters = this.adapters;
	            }
	            var result = new (_bind.apply(Type, [null].concat([options], args)))();
	            Type.Data = this.Data;
	            return result;
	        }
	    }, {
	        key: 'visit',

	        /**
	         * Visits this items
	         * 
	         * @param visitor.before
	         *            this method is called before this item is visited
	         * @param visitor.after
	         *            this method is called after this item is visited
	         */
	        value: function visit(visitor) {
	            var result;
	            if (visitor.before) {
	                result = visitor.before.call(visitor, this);
	            }
	            if (result !== 'false') {
	                this.each(function (item) {
	                    return item.visit(visitor);
	                });
	            }
	            if (visitor.after) {
	                visitor.after.call(visitor, this);
	            }
	            return result;
	        }
	    }, {
	        key: 'items',

	        /**
	         * Returns a list of all managed data.
	         */
	        get: function () {
	            return this._items;
	        },

	        /**
	         * Sets a new list of data items. If the specified list contains non Data
	         * instances then they are wrapped in a Data container.
	         */
	        set: function (items) {
	            return this.setItems(items);
	        }
	    }, {
	        key: 'length',

	        /**
	         * Returns the number of elements in this set.
	         */
	        get: function () {
	            return this.items.length;
	        }
	    }, {
	        key: 'DataType',

	        /**
	         * Returns the default type of instances managed by this data set.
	         */
	        get: function () {
	            return _Data3['default'];
	        }
	    }]);

	    return DataSet;
	})(_Data3['default']);

	exports['default'] = DataSet;

	_mosaicIntents.Intents.addTo(DataSet);
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _mosaicAdapters = __webpack_require__(4);

	var idCounter = 0;
	/**
	 * 
	 */

	var Data = (function (_Adaptable) {

	    /**
	     * This constructor initializes this wrapper and sets the internal data.
	     * 
	     * @param options.adapters
	     *            an adapter manager used to generate data adapters
	     * @param options.data
	     *            the data object
	     */

	    function Data(options) {
	        var _get2;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, Data);

	        (_get2 = _get(Object.getPrototypeOf(Data.prototype), 'constructor', this)).call.apply(_get2, [this, options].concat(args));
	        this.data = options ? options.data : undefined;
	    }

	    _inherits(Data, _Adaptable);

	    _createClass(Data, [{
	        key: 'getTypeKey',

	        /**
	         * Returns the type key for this item.
	         */
	        value: function getTypeKey() {
	            var type = this.get('properties.type') || this.get('type');
	            if (type) {
	                type = _mosaicAdapters.TypeKey.getTypeKey(type);
	            } else {
	                // Use the class hierarchy if type is not defined in the data
	                type = _mosaicAdapters.TypeKey.getTypeKey.apply(this);
	            }
	            return type;
	        }
	    }, {
	        key: 'get',

	        /**
	         * Returns a value corresponding to the specified path.
	         * 
	         * @param path
	         *            an segment name array or a string path where individual
	         *            segments are separated by the '.' symbol
	         */
	        value: function get(path) {
	            if (typeof path === 'string') {
	                var array = path.split('.');
	                return this.get(array);
	            }
	            var data = this.data;
	            var len = path ? path.length : 0;
	            var i = undefined;
	            for (i = 0; data && i < len; i++) {
	                var segment = path[i];
	                data = data[segment];
	            }
	            return i === len ? data : null;
	        }
	    }, {
	        key: 'set',

	        /**
	         * Sets a new value for the specified path.
	         */
	        value: function set(path, value) {
	            if (typeof path === 'string') {
	                var array = path.split('.');
	                return this.set(array, value);
	            }
	            var data = this.data;
	            var len = path ? path.length : 0;
	            var i = undefined;
	            for (i = 0; i < len - 1; i++) {
	                var segment = path[i];
	                var next = data[segment];
	                if (!next) break;
	                data = next;
	            }
	            // Add missing objects
	            for (; i < len - 1; i++) {
	                var segment = path[i];
	                data = data[segment] = {};
	            }
	            if (data) {
	                var segment = path[path.length - 1];
	                data[segment] = value;
	            }
	            return this;
	        }
	    }, {
	        key: 'visit',

	        /**
	         * Visits this data object
	         * 
	         * @param visitor.before
	         *            this method is called before this data object is visited
	         * @param visitor.after
	         *            this method is called after this data object is visited
	         */
	        value: function visit(visitor) {
	            if (visitor.before) {
	                visitor.before.call(visitor, this);
	            }
	            if (visitor.after) {
	                visitor.after.call(visitor, this);
	            }
	        }
	    }, {
	        key: 'type',

	        /**
	         * Returns the type key for this item. This is a shortcut for the
	         * "getTypeKey" method.
	         */
	        get: function () {
	            return this.getTypeKey();
	        }
	    }, {
	        key: 'data',

	        /**
	         * Returns the internal data managed by this item.
	         */
	        get: function () {
	            return this._data;
	        },

	        /**
	         * Associates a new data object with this item.
	         */
	        set: function (d) {
	            this._data = d || {};
	            delete this._id;
	            return this._data;
	        }
	    }, {
	        key: 'id',

	        /**
	         * Returns this data object identifier. By default this method seeks the
	         * identifier in the "id" field of the underlying data object. If there is
	         * no such an identifier then this method generates a local ID stored in
	         * this data object.
	         */
	        get: function () {
	            var id = this.data.id;
	            if (id === undefined) {
	                id = this._id = this._id || idCounter++;
	            }
	            return id;
	        }
	    }]);

	    return Data;
	})(_mosaicAdapters.Adaptable);

	exports['default'] = Data;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DataSet2 = __webpack_require__(2);

	var _DataSet3 = _interopRequireDefault(_DataSet2);

	var DATA_SET_KEY = Symbol('_dataSet');

	var DerivativeDataSet = (function (_DataSet) {
	    function DerivativeDataSet(options) {
	        var _get2;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, DerivativeDataSet);

	        (_get2 = _get(Object.getPrototypeOf(DerivativeDataSet.prototype), 'constructor', this)).call.apply(_get2, [this, options].concat(args));
	        if (!options) {
	            throw new Error('Parameters are not defined');
	        }
	        var dataSet = this.dataSet = options.dataSet || this.adaptable;
	        if (!this.adapters && dataSet) {
	            this.adapters = dataSet.adapters;
	        }
	        this._onMainDataSetUpdate = this._onMainDataSetUpdate.bind(this);
	        dataSet.on('update', this._onMainDataSetUpdate);
	        this._handleMainDataSetUpdate();
	    }

	    _inherits(DerivativeDataSet, _DataSet);

	    _createClass(DerivativeDataSet, [{
	        key: 'close',
	        value: function close() {
	            _get(Object.getPrototypeOf(DerivativeDataSet.prototype), 'close', this).call(this);
	            var dataSet = this.dataSet;
	            dataSet.off('update', this._onMainDataSetUpdate);
	            delete this._dataSet;
	        }
	    }, {
	        key: '_getOptionsValue',

	        /** Returns an options value. */
	        value: function _getOptionsValue(key, defaultValue) {
	            var result = _get(Object.getPrototypeOf(DerivativeDataSet.prototype), '_getOptionsValue', this).call(this, key);
	            if (!result) {
	                var dataSet = this.dataSet;
	                if (dataSet) {
	                    result = dataSet._getOptionsValue(key, defaultValue);
	                }
	            }
	            return result;
	        }
	    }, {
	        key: '_onMainDataSetUpdate',

	        /**
	         * This method is called when the parent dataset is updated.
	         */
	        value: function _onMainDataSetUpdate(intent) {
	            intent.after((function () {
	                return this._handleMainDataSetUpdate();
	            }).bind(this));
	        }
	    }, {
	        key: '_handleMainDataSetUpdate',

	        /**
	         * This method should be overloaded in subclasses to define exact behaveour
	         * of objects when the parent set changes.
	         */
	        value: function _handleMainDataSetUpdate() {
	            this.items = this.dataSet.items;
	        }
	    }, {
	        key: 'dataSet',

	        /** Access to the internal dataset */
	        set: function (set) {
	            if (set instanceof _DataSet3['default']) {
	                this[DATA_SET_KEY] = set;
	            } else {
	                delete this[DATA_SET_KEY];
	            }
	        },
	        get: function () {
	            return this[DATA_SET_KEY];
	        }
	    }]);

	    return DerivativeDataSet;
	})(_DataSet3['default']);

	exports['default'] = DerivativeDataSet;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DerivativeDataSet2 = __webpack_require__(6);

	var _DerivativeDataSet3 = _interopRequireDefault(_DerivativeDataSet2);

	var DataSetPaginated = (function (_DerivativeDataSet) {

	    /** Initializes this paginated data set. */

	    function DataSetPaginated() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        _classCallCheck(this, DataSetPaginated);

	        _get(Object.getPrototypeOf(DataSetPaginated.prototype), 'constructor', this).apply(this, args);
	        var page = this._getOptionsValue('page', 0);
	        this.pageIdx = page;
	        this.pageSize = this._getOptionsValue('pageSize', 10);
	    }

	    _inherits(DataSetPaginated, _DerivativeDataSet);

	    _createClass(DataSetPaginated, [{
	        key: 'focusPos',

	        /**
	         * Activates the page corresponding containing element in the specified
	         * position.
	         */
	        value: function focusPos(idx) {
	            idx = idx || 0;
	            idx = Math.max(0, Math.min(this.dataSet.length - 1, idx));
	            var pageIdx = Math.floor(idx / this.pageSize);
	            return this.setPageIdx(pageIdx);
	        }
	    }, {
	        key: 'setPageIdx',

	        /** Sets a new page index */
	        value: function setPageIdx(pageIdx) {
	            pageIdx = pageIdx || 0;
	            var dataSet = this.dataSet;
	            var pageSize = this.pageSize;
	            var size = dataSet.size();
	            pageIdx = this._pageIdx = Math.max(0, Math.min(pageIdx, this.pageNumber - 1));
	            var startPos = pageIdx * pageSize;
	            var endPos = Math.min(size - 1, startPos + pageSize - 1);
	            var items = [];
	            for (var i = startPos; i <= endPos; i++) {
	                var item = dataSet.get(i);
	                items.push(item);
	            }
	            return this.setItems(items);
	        }
	    }, {
	        key: '_handleMainDataSetUpdate',

	        // ----------------------------------------------------------------------

	        /** Updates the list */
	        value: function _handleMainDataSetUpdate() {
	            return this.pageSize = this.pageSize;
	        }
	    }, {
	        key: 'pagePos',

	        // ----------------------------------------------------------------------

	        /** Returns position of the first element visible in the page */
	        get: function () {
	            var result = this.pageIdx * this.pageSize;
	            return result;
	        }
	    }, {
	        key: 'pageIdx',

	        // ----------------------------------------------------------------------
	        // Page index

	        /** Returns the index of the currently active page. */
	        get: function () {
	            return this._pageIdx || 0;
	        },

	        /** Sets a new page index */
	        set: function (pageIdx) {
	            this.setPageIdx(pageIdx);
	        }
	    }, {
	        key: 'pageSize',

	        // ----------------------------------------------------------------------

	        /** Sets a new page size */
	        set: function (pageSize) {
	            var firstPageItemIdx = this.pagePos;
	            this._pageSize = pageSize || this.defaultPageSize || 10;
	            return this.focusPos(firstPageItemIdx);
	        },

	        /** Returns the current page size */
	        get: function () {
	            return this._pageSize || this._getOptionsValue('pageSize') || this.defaultPageSize;
	        }
	    }, {
	        key: 'pageNumber',

	        // ----------------------------------------------------------------------

	        /** Returns the total page number in this data set. */
	        get: function () {
	            return Math.ceil(this.dataSet.length / this.pageSize);
	        }
	    }]);

	    return DataSetPaginated;
	})(_DerivativeDataSet3['default']);

	exports['default'] = DataSetPaginated;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DataSet = __webpack_require__(2);

	var _DataSet2 = _interopRequireDefault(_DataSet);

	var _DerivativeDataSet2 = __webpack_require__(6);

	var _DerivativeDataSet3 = _interopRequireDefault(_DerivativeDataSet2);

	var DataSetSelected = (function (_DerivativeDataSet) {
	    function DataSetSelected() {
	        _classCallCheck(this, DataSetSelected);

	        if (_DerivativeDataSet != null) {
	            _DerivativeDataSet.apply(this, arguments);
	        }
	    }

	    _inherits(DataSetSelected, _DerivativeDataSet);

	    _createClass(DataSetSelected, [{
	        key: '_handleMainDataSetUpdate',

	        /** Updates list of selected items. */
	        value: function _handleMainDataSetUpdate() {
	            var items = [];
	            this.dataSet.each(function (r, i) {
	                if (this.has(r)) {
	                    items.push(r);
	                }
	            }, this);
	            return this.setItems(items);
	        }
	    }, {
	        key: '_getSelectionFilter',

	        /**
	         * Returns a filter function returning <code>true</code> if a specified
	         * item is contained in the specified list.
	         */
	        value: function _getSelectionFilter(items) {
	            var _this = this;

	            var filter = undefined;
	            if (typeof items === 'function') {
	                filter = items;
	            } else if (items instanceof _DataSet2['default']) {
	                filter = function (r) {
	                    return items.has(r);
	                };
	            } else if (items) {
	                (function () {
	                    if (!Array.isArray(items)) {
	                        items = [items];
	                    }
	                    var index = {};
	                    for (var key in items) {
	                        var item = _this._wrap(items[key]);
	                        index[item.id] = key;
	                    }
	                    filter = function (item) {
	                        return item.id in index;
	                    };
	                })();
	            }
	            return filter;
	        }
	    }, {
	        key: 'select',

	        /**
	         * Selects the specified items.
	         */
	        value: function select(selection) {
	            var list = undefined;
	            var filter = this._getSelectionFilter(selection);
	            if (filter) {
	                list = this.dataSet.filter(filter, this);
	            } else {
	                list = [];
	            }
	            return this.setItems(list);
	        }
	    }, {
	        key: 'selected',

	        /**
	         * Returns <code>true</code> if <em>at least one</em> specified item
	         * is contained in this selection data set.
	         */
	        value: function selected(selection) {
	            var filter = this._getSelectionFilter(selection);
	            return this.find(filter);
	        }
	    }]);

	    return DataSetSelected;
	})(_DerivativeDataSet3['default']);

	exports['default'] = DataSetSelected;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;