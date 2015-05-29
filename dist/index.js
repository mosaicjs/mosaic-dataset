(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mosaic-adapters"));
	else if(typeof define === 'function' && define.amd)
		define(["mosaic-adapters"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("mosaic-adapters")) : factory(root["mosaic-adapters"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	exports['default'] = {
	    Resource: _libResource2['default']
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
	            var data = this.data;
	            var type = undefined;
	            if (data.properties) {
	                type = data.properties.type;
	            }
	            if (!type) {
	                type = data.type;
	            }
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
	    }]);

	    return Resource;
	})(_mosaicAdapters.Adaptable);

	exports['default'] = Resource;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;