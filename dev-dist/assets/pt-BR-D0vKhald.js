import { i as require_react, n as clsx, s as __toESM } from "./utils-B9zKDa3a.js";
import { B as isNumber, C as LabelList, D as getValueByDataKey, E as getTicksOfAxis, F as Layer, I as filterProps, L as findAllByType, N as Global, O as ErrorBar, P as warn, R as hasClipDot, S as Curve, T as getCoordinatesOfGrid, U as require_isNil, V as uniqueId, W as require_isFunction, _ as formatAxisMap, b as Dot, c as YAxis, d as getTicks, f as useArbitraryXAxis, g as useYAxisWithFiniteDomainOrRandom, h as useOffset, k as require_isEqual, l as XAxis, m as useChartWidth, p as useChartHeight, s as generateCategoricalChart, u as CartesianAxis, w as getCateCoordinateOfLine, x as es6_default, z as interpolateNumber } from "./chart-Ckd6qHww.js";
import { a as buildMatchPatternFn, c as buildFormatLongFn, o as buildMatchFn, s as buildLocalizeFn, y as addDays } from "./format-ByrK01ru.js";
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/CartesianGrid.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_isFunction = /* @__PURE__ */ __toESM(require_isFunction());
var _excluded$1 = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], _excluded2$1 = ["offset"];
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
/**
* The <CartesianGrid horizontal
*/
var Background = function Background(props) {
	var fill = props.fill;
	if (!fill || fill === "none") return null;
	var fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, ry = props.ry;
	return /* @__PURE__ */ import_react.createElement("rect", {
		x,
		y,
		ry,
		width,
		height,
		stroke: "none",
		fill,
		fillOpacity,
		className: "recharts-cartesian-grid-bg"
	});
};
function renderLineItem(option, props) {
	var lineItem;
	if (/* @__PURE__ */ import_react.isValidElement(option)) lineItem = /* @__PURE__ */ import_react.cloneElement(option, props);
	else if ((0, import_isFunction.default)(option)) lineItem = option(props);
	else {
		var x1 = props.x1, y1 = props.y1, x2 = props.x2, y2 = props.y2, key = props.key, _filterProps = filterProps(_objectWithoutProperties$1(props, _excluded$1), false);
		_filterProps.offset;
		var restOfFilteredProps = _objectWithoutProperties$1(_filterProps, _excluded2$1);
		lineItem = /* @__PURE__ */ import_react.createElement("line", _extends$1({}, restOfFilteredProps, {
			x1,
			y1,
			x2,
			y2,
			fill: "none",
			key
		}));
	}
	return lineItem;
}
function HorizontalGridLines(props) {
	var x = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
	if (!horizontal || !horizontalPoints || !horizontalPoints.length) return null;
	var items = horizontalPoints.map(function(entry, i) {
		return renderLineItem(horizontal, _objectSpread$1(_objectSpread$1({}, props), {}, {
			x1: x,
			y1: entry,
			x2: x + width,
			y2: entry,
			key: "line-".concat(i),
			index: i
		}));
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, items);
}
function VerticalGridLines(props) {
	var y = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
	if (!vertical || !verticalPoints || !verticalPoints.length) return null;
	var items = verticalPoints.map(function(entry, i) {
		return renderLineItem(vertical, _objectSpread$1(_objectSpread$1({}, props), {}, {
			x1: entry,
			y1: y,
			x2: entry,
			y2: y + height,
			key: "line-".concat(i),
			index: i
		}));
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid-vertical" }, items);
}
function HorizontalStripes(props) {
	var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal;
	if (!(_props$horizontal2 === void 0 ? true : _props$horizontal2) || !horizontalFill || !horizontalFill.length) return null;
	var roundedSortedHorizontalPoints = horizontalPoints.map(function(e) {
		return Math.round(e + y - y);
	}).sort(function(a, b) {
		return a - b;
	});
	if (y !== roundedSortedHorizontalPoints[0]) roundedSortedHorizontalPoints.unshift(0);
	var items = roundedSortedHorizontalPoints.map(function(entry, i) {
		var lineHeight = !roundedSortedHorizontalPoints[i + 1] ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
		if (lineHeight <= 0) return null;
		var colorIndex = i % horizontalFill.length;
		return /* @__PURE__ */ import_react.createElement("rect", {
			key: "react-".concat(i),
			y: entry,
			x,
			height: lineHeight,
			width,
			stroke: "none",
			fill: horizontalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, items);
}
function VerticalStripes(props) {
	var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
	if (!vertical || !verticalFill || !verticalFill.length) return null;
	var roundedSortedVerticalPoints = verticalPoints.map(function(e) {
		return Math.round(e + x - x);
	}).sort(function(a, b) {
		return a - b;
	});
	if (x !== roundedSortedVerticalPoints[0]) roundedSortedVerticalPoints.unshift(0);
	var items = roundedSortedVerticalPoints.map(function(entry, i) {
		var lineWidth = !roundedSortedVerticalPoints[i + 1] ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
		if (lineWidth <= 0) return null;
		var colorIndex = i % verticalFill.length;
		return /* @__PURE__ */ import_react.createElement("rect", {
			key: "react-".concat(i),
			x: entry,
			y,
			width: lineWidth,
			height,
			stroke: "none",
			fill: verticalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, items);
}
var defaultVerticalCoordinatesGenerator = function defaultVerticalCoordinatesGenerator(_ref, syncWithTicks) {
	var xAxis = _ref.xAxis, width = _ref.width, height = _ref.height, offset = _ref.offset;
	return getCoordinatesOfGrid(getTicks(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, CartesianAxis.defaultProps), xAxis), {}, {
		ticks: getTicksOfAxis(xAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = function defaultHorizontalCoordinatesGenerator(_ref2, syncWithTicks) {
	var yAxis = _ref2.yAxis, width = _ref2.width, height = _ref2.height, offset = _ref2.offset;
	return getCoordinatesOfGrid(getTicks(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, CartesianAxis.defaultProps), yAxis), {}, {
		ticks: getTicksOfAxis(yAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultProps = {
	horizontal: true,
	vertical: true,
	horizontalPoints: [],
	verticalPoints: [],
	stroke: "#ccc",
	fill: "none",
	verticalFill: [],
	horizontalFill: []
};
function CartesianGrid(props) {
	var _props$stroke, _props$fill, _props$horizontal3, _props$horizontalFill, _props$vertical3, _props$verticalFill;
	var chartWidth = useChartWidth();
	var chartHeight = useChartHeight();
	var offset = useOffset();
	var propsIncludingDefaults = _objectSpread$1(_objectSpread$1({}, props), {}, {
		stroke: (_props$stroke = props.stroke) !== null && _props$stroke !== void 0 ? _props$stroke : defaultProps.stroke,
		fill: (_props$fill = props.fill) !== null && _props$fill !== void 0 ? _props$fill : defaultProps.fill,
		horizontal: (_props$horizontal3 = props.horizontal) !== null && _props$horizontal3 !== void 0 ? _props$horizontal3 : defaultProps.horizontal,
		horizontalFill: (_props$horizontalFill = props.horizontalFill) !== null && _props$horizontalFill !== void 0 ? _props$horizontalFill : defaultProps.horizontalFill,
		vertical: (_props$vertical3 = props.vertical) !== null && _props$vertical3 !== void 0 ? _props$vertical3 : defaultProps.vertical,
		verticalFill: (_props$verticalFill = props.verticalFill) !== null && _props$verticalFill !== void 0 ? _props$verticalFill : defaultProps.verticalFill,
		x: isNumber(props.x) ? props.x : offset.left,
		y: isNumber(props.y) ? props.y : offset.top,
		width: isNumber(props.width) ? props.width : offset.width,
		height: isNumber(props.height) ? props.height : offset.height
	});
	var x = propsIncludingDefaults.x, y = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
	var xAxis = useArbitraryXAxis();
	var yAxis = useYAxisWithFiniteDomainOrRandom();
	if (!isNumber(width) || width <= 0 || !isNumber(height) || height <= 0 || !isNumber(x) || x !== +x || !isNumber(y) || y !== +y) return null;
	var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
	var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
	var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
	if ((!horizontalPoints || !horizontalPoints.length) && (0, import_isFunction.default)(horizontalCoordinatesGenerator)) {
		var isHorizontalValues = horizontalValues && horizontalValues.length;
		var generatorResult = horizontalCoordinatesGenerator({
			yAxis: yAxis ? _objectSpread$1(_objectSpread$1({}, yAxis), {}, { ticks: isHorizontalValues ? horizontalValues : yAxis.ticks }) : void 0,
			width: chartWidth,
			height: chartHeight,
			offset
		}, isHorizontalValues ? true : syncWithTicks);
		warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof$1(generatorResult), "]"));
		if (Array.isArray(generatorResult)) horizontalPoints = generatorResult;
	}
	if ((!verticalPoints || !verticalPoints.length) && (0, import_isFunction.default)(verticalCoordinatesGenerator)) {
		var isVerticalValues = verticalValues && verticalValues.length;
		var _generatorResult = verticalCoordinatesGenerator({
			xAxis: xAxis ? _objectSpread$1(_objectSpread$1({}, xAxis), {}, { ticks: isVerticalValues ? verticalValues : xAxis.ticks }) : void 0,
			width: chartWidth,
			height: chartHeight,
			offset
		}, isVerticalValues ? true : syncWithTicks);
		warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof$1(_generatorResult), "]"));
		if (Array.isArray(_generatorResult)) verticalPoints = _generatorResult;
	}
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid" }, /* @__PURE__ */ import_react.createElement(Background, {
		fill: propsIncludingDefaults.fill,
		fillOpacity: propsIncludingDefaults.fillOpacity,
		x: propsIncludingDefaults.x,
		y: propsIncludingDefaults.y,
		width: propsIncludingDefaults.width,
		height: propsIncludingDefaults.height,
		ry: propsIncludingDefaults.ry
	}), /* @__PURE__ */ import_react.createElement(HorizontalGridLines, _extends$1({}, propsIncludingDefaults, {
		offset,
		horizontalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(VerticalGridLines, _extends$1({}, propsIncludingDefaults, {
		offset,
		verticalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(HorizontalStripes, _extends$1({}, propsIncludingDefaults, { horizontalPoints })), /* @__PURE__ */ import_react.createElement(VerticalStripes, _extends$1({}, propsIncludingDefaults, { verticalPoints })));
}
CartesianGrid.displayName = "CartesianGrid";
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/Line.js
/**
* @fileOverview Line
*/
var import_isNil = /* @__PURE__ */ __toESM(require_isNil());
var import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
var _excluded = [
	"type",
	"layout",
	"connectNulls",
	"ref"
], _excluded2 = ["key"];
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var Line = /* @__PURE__ */ function(_PureComponent) {
	function Line() {
		var _this;
		_classCallCheck(this, Line);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper(this, Line, [].concat(args));
		_defineProperty(_this, "state", {
			isAnimationFinished: true,
			totalLength: 0
		});
		_defineProperty(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
			return "".concat(length, "px ").concat(totalLength - length, "px");
		});
		_defineProperty(_this, "getStrokeDasharray", function(length, totalLength, lines) {
			var lineLength = lines.reduce(function(pre, next) {
				return pre + next;
			});
			if (!lineLength) return _this.generateSimpleStrokeDasharray(totalLength, length);
			var count = Math.floor(length / lineLength);
			var remainLength = length % lineLength;
			var restLength = totalLength - length;
			var remainLines = [];
			for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) if (sum + lines[i] > remainLength) {
				remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
				break;
			}
			var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
			return [].concat(_toConsumableArray(Line.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
				return "".concat(line, "px");
			}).join(", ");
		});
		_defineProperty(_this, "id", uniqueId("recharts-line-"));
		_defineProperty(_this, "pathRef", function(node) {
			_this.mainCurve = node;
		});
		_defineProperty(_this, "handleAnimationEnd", function() {
			_this.setState({ isAnimationFinished: true });
			if (_this.props.onAnimationEnd) _this.props.onAnimationEnd();
		});
		_defineProperty(_this, "handleAnimationStart", function() {
			_this.setState({ isAnimationFinished: false });
			if (_this.props.onAnimationStart) _this.props.onAnimationStart();
		});
		return _this;
	}
	_inherits(Line, _PureComponent);
	return _createClass(Line, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				if (!this.props.isAnimationActive) return;
				var totalLength = this.getTotalLength();
				this.setState({ totalLength });
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				if (!this.props.isAnimationActive) return;
				var totalLength = this.getTotalLength();
				if (totalLength !== this.state.totalLength) this.setState({ totalLength });
			}
		},
		{
			key: "getTotalLength",
			value: function getTotalLength() {
				var curveDom = this.mainCurve;
				try {
					return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
				} catch (err) {
					return 0;
				}
			}
		},
		{
			key: "renderErrorBar",
			value: function renderErrorBar(needClip, clipPathId) {
				if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
				var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
				var errorBarItems = findAllByType(children, ErrorBar);
				if (!errorBarItems) return null;
				var dataPointFormatter = function dataPointFormatter(dataPoint, dataKey) {
					return {
						x: dataPoint.x,
						y: dataPoint.y,
						value: dataPoint.value,
						errorVal: getValueByDataKey(dataPoint.payload, dataKey)
					};
				};
				var errorBarProps = { clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null };
				return /* @__PURE__ */ import_react.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
					return /* @__PURE__ */ import_react.cloneElement(item, {
						key: "bar-".concat(item.props.dataKey),
						data: points,
						xAxis,
						yAxis,
						layout,
						dataPointFormatter
					});
				}));
			}
		},
		{
			key: "renderDots",
			value: function renderDots(needClip, clipDot, clipPathId) {
				if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
				var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
				var lineProps = filterProps(this.props, false);
				var customDotProps = filterProps(dot, true);
				var dots = points.map(function(entry, i) {
					var dotProps = _objectSpread(_objectSpread(_objectSpread({
						key: "dot-".concat(i),
						r: 3
					}, lineProps), customDotProps), {}, {
						index: i,
						cx: entry.x,
						cy: entry.y,
						value: entry.value,
						dataKey,
						payload: entry.payload,
						points
					});
					return Line.renderDotItem(dot, dotProps);
				});
				var dotsProps = { clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null };
				return /* @__PURE__ */ import_react.createElement(Layer, _extends({
					className: "recharts-line-dots",
					key: "dots"
				}, dotsProps), dots);
			}
		},
		{
			key: "renderCurveStatically",
			value: function renderCurveStatically(points, needClip, clipPathId, props) {
				var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
				_this$props3.ref;
				var curveProps = _objectSpread(_objectSpread(_objectSpread({}, filterProps(_objectWithoutProperties(_this$props3, _excluded), true)), {}, {
					fill: "none",
					className: "recharts-line-curve",
					clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
					points
				}, props), {}, {
					type,
					layout,
					connectNulls
				});
				return /* @__PURE__ */ import_react.createElement(Curve, _extends({}, curveProps, { pathRef: this.pathRef }));
			}
		},
		{
			key: "renderCurveWithAnimation",
			value: function renderCurveWithAnimation(needClip, clipPathId) {
				var _this2 = this;
				var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
				var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
				return /* @__PURE__ */ import_react.createElement(es6_default, {
					begin: animationBegin,
					duration: animationDuration,
					isActive: isAnimationActive,
					easing: animationEasing,
					from: { t: 0 },
					to: { t: 1 },
					key: "line-".concat(animationId),
					onAnimationEnd: this.handleAnimationEnd,
					onAnimationStart: this.handleAnimationStart
				}, function(_ref) {
					var t = _ref.t;
					if (prevPoints) {
						var prevPointsDiffFactor = prevPoints.length / points.length;
						var stepData = points.map(function(entry, index) {
							var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
							if (prevPoints[prevPointIndex]) {
								var prev = prevPoints[prevPointIndex];
								var interpolatorX = interpolateNumber(prev.x, entry.x);
								var interpolatorY = interpolateNumber(prev.y, entry.y);
								return _objectSpread(_objectSpread({}, entry), {}, {
									x: interpolatorX(t),
									y: interpolatorY(t)
								});
							}
							if (animateNewValues) {
								var _interpolatorX = interpolateNumber(width * 2, entry.x);
								var _interpolatorY = interpolateNumber(height / 2, entry.y);
								return _objectSpread(_objectSpread({}, entry), {}, {
									x: _interpolatorX(t),
									y: _interpolatorY(t)
								});
							}
							return _objectSpread(_objectSpread({}, entry), {}, {
								x: entry.x,
								y: entry.y
							});
						});
						return _this2.renderCurveStatically(stepData, needClip, clipPathId);
					}
					var curLength = interpolateNumber(0, totalLength)(t);
					var currentStrokeDasharray;
					if (strokeDasharray) {
						var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
							return parseFloat(num);
						});
						currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
					} else currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
					return _this2.renderCurveStatically(points, needClip, clipPathId, { strokeDasharray: currentStrokeDasharray });
				});
			}
		},
		{
			key: "renderCurve",
			value: function renderCurve(needClip, clipPathId) {
				var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
				var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
				if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !(0, import_isEqual.default)(prevPoints, points))) return this.renderCurveWithAnimation(needClip, clipPathId);
				return this.renderCurveStatically(points, needClip, clipPathId);
			}
		},
		{
			key: "render",
			value: function render() {
				var _filterProps;
				var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
				if (hide || !points || !points.length) return null;
				var isAnimationFinished = this.state.isAnimationFinished;
				var hasSinglePoint = points.length === 1;
				var layerClass = clsx("recharts-line", className);
				var needClipX = xAxis && xAxis.allowDataOverflow;
				var needClipY = yAxis && yAxis.allowDataOverflow;
				var needClip = needClipX || needClipY;
				var clipPathId = (0, import_isNil.default)(id) ? this.id : id;
				var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
					r: 3,
					strokeWidth: 2
				}, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
				var _ref3$clipDot = (hasClipDot(dot) ? dot : {}).clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
				var dotSize = r * 2 + strokeWidth;
				return /* @__PURE__ */ import_react.createElement(Layer, { className: layerClass }, needClipX || needClipY ? /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement("clipPath", { id: "clipPath-".concat(clipPathId) }, /* @__PURE__ */ import_react.createElement("rect", {
					x: needClipX ? left : left - width / 2,
					y: needClipY ? top : top - height / 2,
					width: needClipX ? width : width * 2,
					height: needClipY ? height : height * 2
				})), !clipDot && /* @__PURE__ */ import_react.createElement("clipPath", { id: "clipPath-dots-".concat(clipPathId) }, /* @__PURE__ */ import_react.createElement("rect", {
					x: left - dotSize / 2,
					y: top - dotSize / 2,
					width: width + dotSize,
					height: height + dotSize
				}))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
			}
		}
	], [
		{
			key: "getDerivedStateFromProps",
			value: function getDerivedStateFromProps(nextProps, prevState) {
				if (nextProps.animationId !== prevState.prevAnimationId) return {
					prevAnimationId: nextProps.animationId,
					curPoints: nextProps.points,
					prevPoints: prevState.curPoints
				};
				if (nextProps.points !== prevState.curPoints) return { curPoints: nextProps.points };
				return null;
			}
		},
		{
			key: "repeat",
			value: function repeat(lines, count) {
				var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
				var result = [];
				for (var i = 0; i < count; ++i) result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
				return result;
			}
		},
		{
			key: "renderDotItem",
			value: function renderDotItem(option, props) {
				var dotItem;
				if (/* @__PURE__ */ import_react.isValidElement(option)) dotItem = /* @__PURE__ */ import_react.cloneElement(option, props);
				else if ((0, import_isFunction.default)(option)) dotItem = option(props);
				else {
					var key = props.key, dotProps = _objectWithoutProperties(props, _excluded2);
					var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
					dotItem = /* @__PURE__ */ import_react.createElement(Dot, _extends({ key }, dotProps, { className }));
				}
				return dotItem;
			}
		}
	]);
}(import_react.PureComponent);
_defineProperty(Line, "displayName", "Line");
_defineProperty(Line, "defaultProps", {
	xAxisId: 0,
	yAxisId: 0,
	connectNulls: false,
	activeDot: true,
	dot: true,
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	fill: "#fff",
	points: [],
	isAnimationActive: !Global.isSsr,
	animateNewValues: true,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	hide: false,
	label: false
});
/**
* Compose the data of each group
* @param {Object} props The props from the component
* @param  {Object} xAxis   The configuration of x-axis
* @param  {Object} yAxis   The configuration of y-axis
* @param  {String} dataKey The unique key of a group
* @return {Array}  Composed data
*/
_defineProperty(Line, "getComposedData", function(_ref4) {
	var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
	var layout = props.layout;
	return _objectSpread({
		points: displayedData.map(function(entry, index) {
			var value = getValueByDataKey(entry, dataKey);
			if (layout === "horizontal") return {
				x: getCateCoordinateOfLine({
					axis: xAxis,
					ticks: xAxisTicks,
					bandSize,
					entry,
					index
				}),
				y: (0, import_isNil.default)(value) ? null : yAxis.scale(value),
				value,
				payload: entry
			};
			return {
				x: (0, import_isNil.default)(value) ? null : xAxis.scale(value),
				y: getCateCoordinateOfLine({
					axis: yAxis,
					ticks: yAxisTicks,
					bandSize,
					entry,
					index
				}),
				value,
				payload: entry
			};
		}),
		layout
	}, offset);
});
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/chart/LineChart.js
/**
* @fileOverview Line Chart
*/
var LineChart = generateCategoricalChart({
	chartName: "LineChart",
	GraphicalChild: Line,
	axisComponents: [{
		axisType: "xAxis",
		AxisComp: XAxis
	}, {
		axisType: "yAxis",
		AxisComp: YAxis
	}],
	formatAxisMap
});
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getRoundingMethod.js
function getRoundingMethod(method) {
	return (number) => {
		const result = (method ? Math[method] : Math.trunc)(number);
		return result === 0 ? 0 : result;
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subDays.js
/**
* The {@link subDays} function options.
*/
/**
* @name subDays
* @category Day Helpers
* @summary Subtract the specified number of days from the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of days to be subtracted.
* @param options - An object with options
*
* @returns The new date with the days subtracted
*
* @example
* // Subtract 10 days from 1 September 2014:
* const result = subDays(new Date(2014, 8, 1), 10)
* //=> Fri Aug 22 2014 00:00:00
*/
function subDays(date, amount, options) {
	return addDays(date, -amount, options);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "menos de um segundo",
		other: "menos de {{count}} segundos"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundos"
	},
	halfAMinute: "meio minuto",
	lessThanXMinutes: {
		one: "menos de um minuto",
		other: "menos de {{count}} minutos"
	},
	xMinutes: {
		one: "1 minuto",
		other: "{{count}} minutos"
	},
	aboutXHours: {
		one: "cerca de 1 hora",
		other: "cerca de {{count}} horas"
	},
	xHours: {
		one: "1 hora",
		other: "{{count}} horas"
	},
	xDays: {
		one: "1 dia",
		other: "{{count}} dias"
	},
	aboutXWeeks: {
		one: "cerca de 1 semana",
		other: "cerca de {{count}} semanas"
	},
	xWeeks: {
		one: "1 semana",
		other: "{{count}} semanas"
	},
	aboutXMonths: {
		one: "cerca de 1 mês",
		other: "cerca de {{count}} meses"
	},
	xMonths: {
		one: "1 mês",
		other: "{{count}} meses"
	},
	aboutXYears: {
		one: "cerca de 1 ano",
		other: "cerca de {{count}} anos"
	},
	xYears: {
		one: "1 ano",
		other: "{{count}} anos"
	},
	overXYears: {
		one: "mais de 1 ano",
		other: "mais de {{count}} anos"
	},
	almostXYears: {
		one: "quase 1 ano",
		other: "quase {{count}} anos"
	}
};
var formatDistance = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", String(count));
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "em " + result;
	else return "há " + result;
	return result;
};
var formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR/_lib/formatRelative.js
var formatRelativeLocale = {
	lastWeek: (date) => {
		const weekday = date.getDay();
		return "'" + (weekday === 0 || weekday === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
};
var formatRelative = (token, date, _baseDate, _options) => {
	const format = formatRelativeLocale[token];
	if (typeof format === "function") return format(date);
	return format;
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR/_lib/localize.js
var eraValues = {
	narrow: ["AC", "DC"],
	abbreviated: ["AC", "DC"],
	wide: ["antes de cristo", "depois de cristo"]
};
var quarterValues = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	wide: [
		"1º trimestre",
		"2º trimestre",
		"3º trimestre",
		"4º trimestre"
	]
};
var monthValues = {
	narrow: [
		"j",
		"f",
		"m",
		"a",
		"m",
		"j",
		"j",
		"a",
		"s",
		"o",
		"n",
		"d"
	],
	abbreviated: [
		"jan",
		"fev",
		"mar",
		"abr",
		"mai",
		"jun",
		"jul",
		"ago",
		"set",
		"out",
		"nov",
		"dez"
	],
	wide: [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	]
};
var dayValues = {
	narrow: [
		"D",
		"S",
		"T",
		"Q",
		"Q",
		"S",
		"S"
	],
	short: [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sab"
	],
	abbreviated: [
		"domingo",
		"segunda",
		"terça",
		"quarta",
		"quinta",
		"sexta",
		"sábado"
	],
	wide: [
		"domingo",
		"segunda-feira",
		"terça-feira",
		"quarta-feira",
		"quinta-feira",
		"sexta-feira",
		"sábado"
	]
};
var dayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mn",
		noon: "md",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	}
};
var formattingDayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mn",
		noon: "md",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	}
};
var ordinalNumber = (dirtyNumber, options) => {
	const number = Number(dirtyNumber);
	if (options?.unit === "week") return number + "ª";
	return number + "º";
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR.js
/**
* @category Locales
* @summary Portuguese locale (Brazil).
* @language Portuguese
* @iso-639-2 por
* @author Lucas Duailibe [@duailibe](https://github.com/duailibe)
* @author Yago Carballo [@yagocarballo](https://github.com/YagoCarballo)
*/
var ptBR = {
	code: "pt-BR",
	formatDistance,
	formatLong,
	formatRelative,
	localize: {
		ordinalNumber,
		era: buildLocalizeFn({
			values: eraValues,
			defaultWidth: "wide"
		}),
		quarter: buildLocalizeFn({
			values: quarterValues,
			defaultWidth: "wide",
			argumentCallback: (quarter) => quarter - 1
		}),
		month: buildLocalizeFn({
			values: monthValues,
			defaultWidth: "wide"
		}),
		day: buildLocalizeFn({
			values: dayValues,
			defaultWidth: "wide"
		}),
		dayPeriod: buildLocalizeFn({
			values: dayPeriodValues,
			defaultWidth: "wide",
			formattingValues: formattingDayPeriodValues,
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(ac|dc|a|d)/i,
				abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
				wide: /^(antes de cristo|depois de cristo)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				any: [/^ac/i, /^dc/i],
				wide: [/^antes de cristo/i, /^depois de cristo/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^T[1234]/i,
				wide: /^[1234](º)? trimestre/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmajsond]/i,
				abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
				wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^fev/i,
					/^mar/i,
					/^abr/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^ago/i,
					/^set/i,
					/^out/i,
					/^nov/i,
					/^dez/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^(dom|[23456]ª?|s[aá]b)/i,
				short: /^(dom|[23456]ª?|s[aá]b)/i,
				abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
				wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				short: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				narrow: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				any: [
					/^d/i,
					/^seg/i,
					/^t/i,
					/^qua/i,
					/^qui/i,
					/^sex/i,
					/^s[aá]b/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
				any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mn|^meia[-\s]noite/i,
				noon: /^md|^meio[-\s]dia/i,
				morning: /manhã/i,
				afternoon: /tarde/i,
				evening: /tarde/i,
				night: /noite/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
export { Line as a, LineChart as i, subDays as n, CartesianGrid as o, getRoundingMethod as r, ptBR as t };

//# sourceMappingURL=pt-BR-D0vKhald.js.map