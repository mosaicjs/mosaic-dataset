(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mosaic-adapters"), require("mosaic-intents"));
	else if(typeof define === 'function' && define.amd)
		define(["mosaic-adapters", "mosaic-intents"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("mosaic-adapters"), require("mosaic-intents")) : factory(root["mosaic-adapters"], root["mosaic-intents"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _libResource = __webpack_require__(1);

	var _libResource2 = _interopRequireDefault(_libResource);

	var _libDataSet = __webpack_require__(3);

	var _libDataSet2 = _interopRequireDefault(_libDataSet);

	var _libDerivativeDataSet = __webpack_require__(5);

	var _libDerivativeDataSet2 = _interopRequireDefault(_libDerivativeDataSet);

	exports['default'] = {
	    Resource: _libResource2['default'],
	    DataSet: _libDataSet2['default'],
	    DerivativeDataSet: _libDerivativeDataSet2['default']
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _mosaicAdapters = __webpack_require__(2);

	var idCounter = 0;
	/**
	 * 
	 */

	var Resource = (function (_Adaptable) {

	    /**
	     * This constructor initializes this resource and sets the internal data.
	     * 
	     * @param options.adapters
	     *            an adapter manager used to generate resource adapters
	     * @param options.data
	     *            the data object
	     */

	    function Resource(options) {
	        _classCallCheck(this, Resource);

	        _get(Object.getPrototypeOf(Resource.prototype), 'constructor', this).call(this, options);
	        this.data = options.data;
	    }

	    _inherits(Resource, _Adaptable);

	    _createClass(Resource, [{
	        key: 'type',

	        /**
	         * Returns the type key for this resource. This is a shortcut for the
	         * "getTypeKey" method.
	         */
	        get: function () {
	            return this.getTypeKey();
	        }
	    }, {
	        key: 'getTypeKey',

	        /**
	         * Returns the type key for this resource.
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
	        key: 'data',

	        /**
	         * Returns the internal data managed by this resource.
	         */
	        get: function () {
	            return this._data;
	        },

	        /**
	         * Associates a new data object with this resource.
	         */
	        set: function (d) {
	            this._data = d || {};
	            delete this._id;
	            return this._data;
	        }
	    }, {
	        key: 'id',

	        /**
	         * Returns the resource identifier. By default this method seeks the
	         * identifier in the "id" field of the underlying data object. If there is
	         * no such an identifier then this method generates a local ID stored in
	         * this resource object.
	         */
	        get: function () {
	            var id = this.data.id;
	            if (id === undefined) {
	                id = this._id = this._id || idCounter++;
	            }
	            return id;
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
	         * Visits this resource
	         * 
	         * @param visitor.before
	         *            this method is called before this resource is visited
	         * @param visitor.after
	         *            this method is called after this resource is visited
	         */
	        value: function visit(visitor) {
	            if (visitor.before) {
	                visitor.before.call(visitor, this);
	            }
	            if (visitor.after) {
	                visitor.after.call(visitor, this);
	            }
	        }
	    }]);

	    return Resource;
	})(_mosaicAdapters.Adaptable);

	exports['default'] = Resource;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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

	var _mosaicIntents = __webpack_require__(4);

	var _Resource2 = __webpack_require__(1);

	var _Resource3 = _interopRequireDefault(_Resource2);

	var DataSet = (function (_Resource) {

	    /**
	     * Class constructor. It defines children array and registers event
	     * listeners updating internal resource indexes.
	     */

	    function DataSet(options) {
	        var _get2;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        _classCallCheck(this, DataSet);

	        (_get2 = _get(Object.getPrototypeOf(DataSet.prototype), 'constructor', this)).call.apply(_get2, [this, options].concat(args));
	        (0, _mosaicIntents.Intents)(this);
	        this.children = options.children;
	    }

	    _inherits(DataSet, _Resource);

	    _createClass(DataSet, [{
	        key: 'close',

	        /** Do-nothing destructor */
	        value: function close() {}
	    }, {
	        key: 'children',

	        /**
	         * Returns a list of all child resources.
	         */
	        get: function () {
	            return this._children;
	        },

	        /**
	         * Sets new resources. If the specified list contains non-resource instances
	         * then they are wrapped in the Resource container.
	         */
	        set: function (list) {
	            return this.update(function () {
	                this._children = [];
	                this._index = {};
	                var len = list ? list.length || 0 : 0;
	                for (var pos = 0; pos < len; pos++) {
	                    var r = this._wrap(list[pos]);
	                    this._children[pos] = r;
	                    this._index[r.id] = [r, pos];
	                }
	            });
	        }
	    }, {
	        key: 'get',

	        /**
	         * Returns an entity from the specified position. Basically it returns value
	         * this.children[pos].
	         */
	        value: function get(pos) {
	            var children = this.children;
	            if (pos < 0 || pos >= children.length) return;
	            return children[pos];
	        }
	    }, {
	        key: 'has',

	        /**
	         * Returns <code>true</code> if
	         */
	        value: function has(d) {
	            return this.indexOf(d) >= 0;
	        }
	    }, {
	        key: 'set',

	        /**
	         * Sets a new value in the specified position
	         */
	        value: function set(d, pos) {
	            return this.update(function () {
	                if (pos === undefined) {
	                    pos = this._children.length;
	                }
	                pos = Math.max(0, Math.min(this._children.length, +pos));
	                var prev = this._children[pos];
	                if (prev) {
	                    delete this._index[prev[0].id];
	                }
	                var r = this._wrap(d);
	                this._children[pos] = r;
	                this._index[r.id] = [r, pos];
	            });
	        }
	    }, {
	        key: 'add',

	        /**
	         * Adds a new resource at the end of the list.
	         */
	        value: function add(d) {
	            return this.set(d, this.size());
	        }
	    }, {
	        key: 'pos',

	        /**
	         * Returns position (index) of the specified resource.
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
	        key: 'remove',

	        /**
	         * Removes a resource from the specified position
	         */
	        value: function remove(pos) {
	            return this.update(function () {
	                var children = this._children;
	                if (pos === undefined || pos < 0 || pos >= children.length) {
	                    return false;
	                }
	                var r = children[pos];
	                delete this._index[r.id];
	                children.splice(pos, 1);
	                for (var i = pos; i < children.length; i++) {
	                    var _r = children[i];
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
	         * Removes an resource corresponding to the specified identifier.
	         */
	        value: function removeById(id) {
	            var pos = this.posById(id);
	            return this.remove(pos);
	        }
	    }, {
	        key: 'length',

	        /**
	         * Returns the number of elements in this set.
	         */
	        get: function () {
	            return this.children.length;
	        }
	    }, {
	        key: 'size',

	        /**
	         * Returns the size of this set (length of the underlying array with
	         * children).
	         */
	        value: function size() {
	            return this.children.length;
	        }
	    }, {
	        key: 'each',

	        /**
	         * Iterates over all child elements and calls the specified visitor function
	         * in the given context. If the specified visitor function returns
	         * <code>false</code> then the iteration processes stops.
	         */
	        value: function each(visitor, context) {
	            var children = this.children;
	            for (var i = 0; i < children.length; i++) {
	                var child = children[i];
	                if (visitor.call(context, child, i) === false) {
	                    break;
	                }
	            }
	        }
	    }, {
	        key: 'map',

	        /**
	         * Calls the specified visitor function with each child in the list and
	         * returns a list of results. If the visitor returns an undefined value then
	         * it is not added to the resulting list.
	         */
	        value: function map(visitor, context) {
	            var result = [];
	            var children = this.children;
	            for (var i = 0; i < children.length; i++) {
	                var child = children[i];
	                var r = visitor.call(context, child, i);
	                if (r !== undefined) {
	                    result.push(r);
	                }
	            }
	            return result;
	        }
	    }, {
	        key: 'byId',

	        /**
	         * Returns a child object by its identifier.
	         */
	        value: function byId(id) {
	            var slot = this._index[id];
	            return slot ? slot[0] : undefined;
	        }
	    }, {
	        key: 'update',

	        /**
	         * Performs an update action on this dataset
	         */
	        value: function update(action) {
	            return this.action('update', function (intent) {
	                action.call(this);
	                return true;
	            });
	        }
	    }, {
	        key: '_wrap',

	        /**
	         * Checks that the specified object has a good type. Otherwise it wraps it
	         * in a Resource instance.
	         */
	        value: function _wrap(data) {
	            var resource = data;
	            var ResourceType = this._getResourceType();
	            if (!(data instanceof ResourceType)) {
	                resource = new ResourceType({
	                    adapters: this.adapters,
	                    data: data
	                });
	            }
	            return resource;
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
	            Type.Resource = this.Resource;
	            return result;
	        }
	    }, {
	        key: '_getResourceType',

	        /**
	         * Returns the default type of instances managed by this data set.
	         */
	        value: function _getResourceType() {
	            return _Resource3['default'];
	        }
	    }, {
	        key: 'visit',

	        /**
	         * Visits this resource
	         * 
	         * @param visitor.before
	         *            this method is called before this resource is visited
	         * @param visitor.after
	         *            this method is called after this resource is visited
	         */
	        value: function visit(visitor) {
	            var result;
	            if (visitor.before) {
	                result = visitor.before.call(visitor, this);
	            }
	            if (result !== 'false') {
	                this.each(function (child) {
	                    return child.visit(visitor);
	                });
	            }
	            if (visitor.after) {
	                visitor.after.call(visitor, this);
	            }
	            return result;
	        }
	    }]);

	    return DataSet;
	})(_Resource3['default']);

	exports['default'] = DataSet;

	_mosaicIntents.Intents.addTo(DataSet);
	module.exports = exports['default'];

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DataSet2 = __webpack_require__(3);

	var _DataSet3 = _interopRequireDefault(_DataSet2);

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
	        var dataSet = this.dataSet = options.object || options.dataSet;
	        if (!this.adapters && dataSet) {
	            this.adapters = dataSet.adapters;
	        }
	        this._onMainDataSetUpdate = this._onMainDataSetUpdate.bind(this);
	        dataSet.on('update', this._onMainDataSetUpdate);
	    }

	    _inherits(DerivativeDataSet, _DataSet);

	    _createClass(DerivativeDataSet, [{
	        key: 'close',
	        value: function close() {
	            _get(Object.getPrototypeOf(DerivativeDataSet.prototype), 'close', this).call(this);
	            var dataSet = this.dataSet;
	            dataSet.off('update', this._onMainDataSetUpdate, this);
	            delete this._dataSet;
	        }
	    }, {
	        key: 'dataSet',

	        /** Access to the internal dataset */
	        set: function (set) {
	            this._dataSet = set;
	        },
	        get: function () {
	            return this._dataSet;
	        }
	    }, {
	        key: '_onMainDataSetUpdate',

	        /**
	         * This method should be overloaded in subclasses to define exact behaveour
	         * of objects when the parent set changes.
	         */
	        value: function _onMainDataSetUpdate(intent) {
	            intent.then((function () {
	                var dataSet = this.dataSet;
	                var values = [].concat(this.dataSet.children);
	                this.children = values;
	            }).bind(this));
	        }
	    }]);

	    return DerivativeDataSet;
	})(_DataSet3['default']);

	exports['default'] = DerivativeDataSet;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;