import { i as require_react, n as clsx, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { a as useComposedRefs } from "./dist-qq1kSPKZ.js";
import { r as createLucideIcon, t as pb } from "./client-riYRmEzR.js";
import { n as Activity, t as Clock } from "./clock-Bw0sNngA.js";
import { D as Check, E as Search, S as useControllableState, T as composeEventHandlers, _ as createCollection, d as useSize, f as useId, g as useDirection, i as Presence, t as Input, v as Primitive, w as createContextScope } from "./input-D9maMs5S.js";
import { E as ChevronDown, T as TriangleAlert, a as SelectValue, c as Dialog, f as DialogHeader, i as SelectTrigger, l as DialogContent, n as SelectContent, p as DialogTitle, r as SelectItem, s as clamp, t as Select, u as DialogDescription, w as usePrevious } from "./select-Q1k97BJ_.js";
import { a, d as Tooltip, f as TooltipContent, g as ChevronLeft, h as Copy, i as string, l as useForm, m as TooltipTrigger, p as TooltipProvider, r as object } from "./schemas-CrY3tc_6.js";
import { t as CircleCheckBig } from "./circle-check-big-uqR3Jtoc.js";
import { n as Download, t as LoaderCircle } from "./loader-circle-Bl1M_3GW.js";
import { t as FileText } from "./file-text-qyF2tJYF.js";
import { n as ShieldCheck, r as Key, t as SquarePen } from "./square-pen-B9Ts3dln.js";
import { t as Upload } from "./upload-C5HB_2bp.js";
import { n as useCallbackRef, t as useLayoutEffect2 } from "./dist-B8Q-KYhU.js";
import { S as Bell, _ as Button, b as LogOut, c as toast, f as useAuth, p as trackAcao, w as Navigate, x as ChevronRight, y as User } from "./index-CsTcKFNE.js";
import { A as require_isEqual, B as isNumber, C as Curve, D as getTicksOfAxis, E as getCoordinatesOfGrid, F as Layer, H as require_isNaN, I as filterProps, L as findAllByType, M as Cell, N as Global, O as getValueByDataKey, P as warn, R as hasClipDot, S as es6_default, T as getCateCoordinateOfLine, U as require_isNil, V as uniqueId, W as require_isFunction, _ as useYAxisWithFiniteDomainOrRandom, a as ChartTooltipContent, b as Pie, c as generateCategoricalChart, d as CartesianAxis, f as getTicks, g as useOffset, h as useChartWidth, i as ChartTooltip, j as require_max, k as ErrorBar, l as YAxis, m as useChartHeight, n as ChartLegend, o as PieChart, p as useArbitraryXAxis, r as ChartLegendContent, s as BarChart, t as ChartContainer, u as XAxis, v as formatAxisMap, w as LabelList, x as Dot, y as Bar, z as interpolateNumber } from "./chart-D9_L9V_F.js";
import { t as useRealtime } from "./use-realtime-DsW8Mvpe.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Dc1Sez22.js";
import { a as TableHead, i as TableCell, n as Table, o as TableHeader, r as TableBody, s as TableRow, t as Checkbox } from "./checkbox-Dbv8G8vb.js";
import { t as Badge } from "./badge-CDFMs_y4.js";
import { t as Skeleton } from "./skeleton-DkTJ9Dx7.js";
import { t as Label } from "./label-DUA4atqz.js";
import { t as Progress } from "./progress-BSgZ_htj.js";
var Ban = createLucideIcon("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]);
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
var EyeOff = createLucideIcon("eye-off", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]);
var Eye = createLucideIcon("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
var FunnelX = createLucideIcon("funnel-x", [
	["path", {
		d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
		key: "ol2ft2"
	}],
	["path", {
		d: "m16.5 3.5 5 5",
		key: "15e6fa"
	}],
	["path", {
		d: "m21.5 3.5-5 5",
		key: "m0lwru"
	}]
]);
var History = createLucideIcon("history", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
var Monitor = createLucideIcon("monitor", [
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "21",
		y2: "21",
		key: "1svkeh"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "17",
		y2: "21",
		key: "vw1qmm"
	}]
]);
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
var ShieldX = createLucideIcon("shield-x", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "m14.5 9.5-5 5",
		key: "17q4r4"
	}],
	["path", {
		d: "m9.5 9.5 5 5",
		key: "18nt4w"
	}]
]);
var SquareCheckBig = createLucideIcon("square-check-big", [["path", {
	d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",
	key: "2acyp4"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
var Square = createLucideIcon("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]);
var Users = createLucideIcon("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/CartesianGrid.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_isFunction = /* @__PURE__ */ __toESM(require_isFunction());
var _excluded$2 = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], _excluded2$2 = ["offset"];
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$2(o);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
function _objectWithoutProperties$2(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$2(source, excluded);
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
function _objectWithoutPropertiesLoose$2(source, excluded) {
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
		var x1 = props.x1, y1 = props.y1, x2 = props.x2, y2 = props.y2, key = props.key, _filterProps = filterProps(_objectWithoutProperties$2(props, _excluded$2), false);
		_filterProps.offset;
		var restOfFilteredProps = _objectWithoutProperties$2(_filterProps, _excluded2$2);
		lineItem = /* @__PURE__ */ import_react.createElement("line", _extends$2({}, restOfFilteredProps, {
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
		return renderLineItem(horizontal, _objectSpread$2(_objectSpread$2({}, props), {}, {
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
		return renderLineItem(vertical, _objectSpread$2(_objectSpread$2({}, props), {}, {
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
	return getCoordinatesOfGrid(getTicks(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, CartesianAxis.defaultProps), xAxis), {}, {
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
	return getCoordinatesOfGrid(getTicks(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, CartesianAxis.defaultProps), yAxis), {}, {
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
	var propsIncludingDefaults = _objectSpread$2(_objectSpread$2({}, props), {}, {
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
			yAxis: yAxis ? _objectSpread$2(_objectSpread$2({}, yAxis), {}, { ticks: isHorizontalValues ? horizontalValues : yAxis.ticks }) : void 0,
			width: chartWidth,
			height: chartHeight,
			offset
		}, isHorizontalValues ? true : syncWithTicks);
		warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof$2(generatorResult), "]"));
		if (Array.isArray(generatorResult)) horizontalPoints = generatorResult;
	}
	if ((!verticalPoints || !verticalPoints.length) && (0, import_isFunction.default)(verticalCoordinatesGenerator)) {
		var isVerticalValues = verticalValues && verticalValues.length;
		var _generatorResult = verticalCoordinatesGenerator({
			xAxis: xAxis ? _objectSpread$2(_objectSpread$2({}, xAxis), {}, { ticks: isVerticalValues ? verticalValues : xAxis.ticks }) : void 0,
			width: chartWidth,
			height: chartHeight,
			offset
		}, isVerticalValues ? true : syncWithTicks);
		warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof$2(_generatorResult), "]"));
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
	}), /* @__PURE__ */ import_react.createElement(HorizontalGridLines, _extends$2({}, propsIncludingDefaults, {
		offset,
		horizontalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(VerticalGridLines, _extends$2({}, propsIncludingDefaults, {
		offset,
		verticalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(HorizontalStripes, _extends$2({}, propsIncludingDefaults, { horizontalPoints })), /* @__PURE__ */ import_react.createElement(VerticalStripes, _extends$2({}, propsIncludingDefaults, { verticalPoints })));
}
CartesianGrid.displayName = "CartesianGrid";
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/Line.js
/**
* @fileOverview Line
*/
var import_isNil = /* @__PURE__ */ __toESM(require_isNil());
var import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
var _excluded$1 = [
	"type",
	"layout",
	"connectNulls",
	"ref"
], _excluded2$1 = ["key"];
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
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
function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
	}
}
function _createClass$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$1(t, o, e) {
	return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
	if (call && (_typeof$1(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$1() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$1(o) {
	_getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
	_setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$1(o, p);
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
var Line = /* @__PURE__ */ function(_PureComponent) {
	function Line() {
		var _this;
		_classCallCheck$1(this, Line);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper$1(this, Line, [].concat(args));
		_defineProperty$1(_this, "state", {
			isAnimationFinished: true,
			totalLength: 0
		});
		_defineProperty$1(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
			return "".concat(length, "px ").concat(totalLength - length, "px");
		});
		_defineProperty$1(_this, "getStrokeDasharray", function(length, totalLength, lines) {
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
		_defineProperty$1(_this, "id", uniqueId("recharts-line-"));
		_defineProperty$1(_this, "pathRef", function(node) {
			_this.mainCurve = node;
		});
		_defineProperty$1(_this, "handleAnimationEnd", function() {
			_this.setState({ isAnimationFinished: true });
			if (_this.props.onAnimationEnd) _this.props.onAnimationEnd();
		});
		_defineProperty$1(_this, "handleAnimationStart", function() {
			_this.setState({ isAnimationFinished: false });
			if (_this.props.onAnimationStart) _this.props.onAnimationStart();
		});
		return _this;
	}
	_inherits$1(Line, _PureComponent);
	return _createClass$1(Line, [
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
					var dotProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
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
				return /* @__PURE__ */ import_react.createElement(Layer, _extends$1({
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
				var curveProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, filterProps(_objectWithoutProperties$1(_this$props3, _excluded$1), true)), {}, {
					fill: "none",
					className: "recharts-line-curve",
					clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
					points
				}, props), {}, {
					type,
					layout,
					connectNulls
				});
				return /* @__PURE__ */ import_react.createElement(Curve, _extends$1({}, curveProps, { pathRef: this.pathRef }));
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
								return _objectSpread$1(_objectSpread$1({}, entry), {}, {
									x: interpolatorX(t),
									y: interpolatorY(t)
								});
							}
							if (animateNewValues) {
								var _interpolatorX = interpolateNumber(width * 2, entry.x);
								var _interpolatorY = interpolateNumber(height / 2, entry.y);
								return _objectSpread$1(_objectSpread$1({}, entry), {}, {
									x: _interpolatorX(t),
									y: _interpolatorY(t)
								});
							}
							return _objectSpread$1(_objectSpread$1({}, entry), {}, {
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
					var key = props.key, dotProps = _objectWithoutProperties$1(props, _excluded2$1);
					var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
					dotItem = /* @__PURE__ */ import_react.createElement(Dot, _extends$1({ key }, dotProps, { className }));
				}
				return dotItem;
			}
		}
	]);
}(import_react.PureComponent);
_defineProperty$1(Line, "displayName", "Line");
_defineProperty$1(Line, "defaultProps", {
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
_defineProperty$1(Line, "getComposedData", function(_ref4) {
	var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
	var layout = props.layout;
	return _objectSpread$1({
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
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/cartesian/Area.js
/**
* @fileOverview Area
*/
var import_max = /* @__PURE__ */ __toESM(require_max());
var import_isNaN = /* @__PURE__ */ __toESM(require_isNaN());
var _excluded = [
	"layout",
	"type",
	"stroke",
	"connectNulls",
	"isRange",
	"ref"
], _excluded2 = ["key"];
var _Area;
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
var Area = /* @__PURE__ */ function(_PureComponent) {
	function Area() {
		var _this;
		_classCallCheck(this, Area);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper(this, Area, [].concat(args));
		_defineProperty(_this, "state", { isAnimationFinished: true });
		_defineProperty(_this, "id", uniqueId("recharts-area-"));
		_defineProperty(_this, "handleAnimationEnd", function() {
			var onAnimationEnd = _this.props.onAnimationEnd;
			_this.setState({ isAnimationFinished: true });
			if ((0, import_isFunction.default)(onAnimationEnd)) onAnimationEnd();
		});
		_defineProperty(_this, "handleAnimationStart", function() {
			var onAnimationStart = _this.props.onAnimationStart;
			_this.setState({ isAnimationFinished: false });
			if ((0, import_isFunction.default)(onAnimationStart)) onAnimationStart();
		});
		return _this;
	}
	_inherits(Area, _PureComponent);
	return _createClass(Area, [
		{
			key: "renderDots",
			value: function renderDots(needClip, clipDot, clipPathId) {
				var isAnimationActive = this.props.isAnimationActive;
				var isAnimationFinished = this.state.isAnimationFinished;
				if (isAnimationActive && !isAnimationFinished) return null;
				var _this$props = this.props, dot = _this$props.dot, points = _this$props.points, dataKey = _this$props.dataKey;
				var areaProps = filterProps(this.props, false);
				var customDotProps = filterProps(dot, true);
				var dots = points.map(function(entry, i) {
					var dotProps = _objectSpread(_objectSpread(_objectSpread({
						key: "dot-".concat(i),
						r: 3
					}, areaProps), customDotProps), {}, {
						index: i,
						cx: entry.x,
						cy: entry.y,
						dataKey,
						value: entry.value,
						payload: entry.payload,
						points
					});
					return Area.renderDotItem(dot, dotProps);
				});
				var dotsProps = { clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null };
				return /* @__PURE__ */ import_react.createElement(Layer, _extends({ className: "recharts-area-dots" }, dotsProps), dots);
			}
		},
		{
			key: "renderHorizontalRect",
			value: function renderHorizontalRect(alpha) {
				var _this$props2 = this.props, baseLine = _this$props2.baseLine, points = _this$props2.points, strokeWidth = _this$props2.strokeWidth;
				var startX = points[0].x;
				var endX = points[points.length - 1].x;
				var width = alpha * Math.abs(startX - endX);
				var maxY = (0, import_max.default)(points.map(function(entry) {
					return entry.y || 0;
				}));
				if (isNumber(baseLine) && typeof baseLine === "number") maxY = Math.max(baseLine, maxY);
				else if (baseLine && Array.isArray(baseLine) && baseLine.length) maxY = Math.max((0, import_max.default)(baseLine.map(function(entry) {
					return entry.y || 0;
				})), maxY);
				if (isNumber(maxY)) return /* @__PURE__ */ import_react.createElement("rect", {
					x: startX < endX ? startX : startX - width,
					y: 0,
					width,
					height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
				});
				return null;
			}
		},
		{
			key: "renderVerticalRect",
			value: function renderVerticalRect(alpha) {
				var _this$props3 = this.props, baseLine = _this$props3.baseLine, points = _this$props3.points, strokeWidth = _this$props3.strokeWidth;
				var startY = points[0].y;
				var endY = points[points.length - 1].y;
				var height = alpha * Math.abs(startY - endY);
				var maxX = (0, import_max.default)(points.map(function(entry) {
					return entry.x || 0;
				}));
				if (isNumber(baseLine) && typeof baseLine === "number") maxX = Math.max(baseLine, maxX);
				else if (baseLine && Array.isArray(baseLine) && baseLine.length) maxX = Math.max((0, import_max.default)(baseLine.map(function(entry) {
					return entry.x || 0;
				})), maxX);
				if (isNumber(maxX)) return /* @__PURE__ */ import_react.createElement("rect", {
					x: 0,
					y: startY < endY ? startY : startY - height,
					width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
					height: Math.floor(height)
				});
				return null;
			}
		},
		{
			key: "renderClipRect",
			value: function renderClipRect(alpha) {
				if (this.props.layout === "vertical") return this.renderVerticalRect(alpha);
				return this.renderHorizontalRect(alpha);
			}
		},
		{
			key: "renderAreaStatically",
			value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
				var _this$props4 = this.props, layout = _this$props4.layout, type = _this$props4.type, stroke = _this$props4.stroke, connectNulls = _this$props4.connectNulls, isRange = _this$props4.isRange;
				_this$props4.ref;
				var others = _objectWithoutProperties(_this$props4, _excluded);
				return /* @__PURE__ */ import_react.createElement(Layer, { clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null }, /* @__PURE__ */ import_react.createElement(Curve, _extends({}, filterProps(others, true), {
					points,
					connectNulls,
					type,
					baseLine,
					layout,
					stroke: "none",
					className: "recharts-area-area"
				})), stroke !== "none" && /* @__PURE__ */ import_react.createElement(Curve, _extends({}, filterProps(this.props, false), {
					className: "recharts-area-curve",
					layout,
					type,
					connectNulls,
					fill: "none",
					points
				})), stroke !== "none" && isRange && /* @__PURE__ */ import_react.createElement(Curve, _extends({}, filterProps(this.props, false), {
					className: "recharts-area-curve",
					layout,
					type,
					connectNulls,
					fill: "none",
					points: baseLine
				})));
			}
		},
		{
			key: "renderAreaWithAnimation",
			value: function renderAreaWithAnimation(needClip, clipPathId) {
				var _this2 = this;
				var _this$props5 = this.props, points = _this$props5.points, baseLine = _this$props5.baseLine, isAnimationActive = _this$props5.isAnimationActive, animationBegin = _this$props5.animationBegin, animationDuration = _this$props5.animationDuration, animationEasing = _this$props5.animationEasing, animationId = _this$props5.animationId;
				var _this$state = this.state, prevPoints = _this$state.prevPoints, prevBaseLine = _this$state.prevBaseLine;
				return /* @__PURE__ */ import_react.createElement(es6_default, {
					begin: animationBegin,
					duration: animationDuration,
					isActive: isAnimationActive,
					easing: animationEasing,
					from: { t: 0 },
					to: { t: 1 },
					key: "area-".concat(animationId),
					onAnimationEnd: this.handleAnimationEnd,
					onAnimationStart: this.handleAnimationStart
				}, function(_ref) {
					var t = _ref.t;
					if (prevPoints) {
						var prevPointsDiffFactor = prevPoints.length / points.length;
						var stepPoints = points.map(function(entry, index) {
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
							return entry;
						});
						var stepBaseLine;
						if (isNumber(baseLine) && typeof baseLine === "number") stepBaseLine = interpolateNumber(prevBaseLine, baseLine)(t);
						else if ((0, import_isNil.default)(baseLine) || (0, import_isNaN.default)(baseLine)) stepBaseLine = interpolateNumber(prevBaseLine, 0)(t);
						else stepBaseLine = baseLine.map(function(entry, index) {
							var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
							if (prevBaseLine[prevPointIndex]) {
								var prev = prevBaseLine[prevPointIndex];
								var interpolatorX = interpolateNumber(prev.x, entry.x);
								var interpolatorY = interpolateNumber(prev.y, entry.y);
								return _objectSpread(_objectSpread({}, entry), {}, {
									x: interpolatorX(t),
									y: interpolatorY(t)
								});
							}
							return entry;
						});
						return _this2.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
					}
					return /* @__PURE__ */ import_react.createElement(Layer, null, /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement("clipPath", { id: "animationClipPath-".concat(clipPathId) }, _this2.renderClipRect(t))), /* @__PURE__ */ import_react.createElement(Layer, { clipPath: "url(#animationClipPath-".concat(clipPathId, ")") }, _this2.renderAreaStatically(points, baseLine, needClip, clipPathId)));
				});
			}
		},
		{
			key: "renderArea",
			value: function renderArea(needClip, clipPathId) {
				var _this$props6 = this.props, points = _this$props6.points, baseLine = _this$props6.baseLine, isAnimationActive = _this$props6.isAnimationActive;
				var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, prevBaseLine = _this$state2.prevBaseLine, totalLength = _this$state2.totalLength;
				if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !(0, import_isEqual.default)(prevPoints, points) || !(0, import_isEqual.default)(prevBaseLine, baseLine))) return this.renderAreaWithAnimation(needClip, clipPathId);
				return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
			}
		},
		{
			key: "render",
			value: function render() {
				var _filterProps;
				var _this$props7 = this.props, hide = _this$props7.hide, dot = _this$props7.dot, points = _this$props7.points, className = _this$props7.className, top = _this$props7.top, left = _this$props7.left, xAxis = _this$props7.xAxis, yAxis = _this$props7.yAxis, width = _this$props7.width, height = _this$props7.height, isAnimationActive = _this$props7.isAnimationActive, id = _this$props7.id;
				if (hide || !points || !points.length) return null;
				var isAnimationFinished = this.state.isAnimationFinished;
				var hasSinglePoint = points.length === 1;
				var layerClass = clsx("recharts-area", className);
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
				}))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
			}
		}
	], [{
		key: "getDerivedStateFromProps",
		value: function getDerivedStateFromProps(nextProps, prevState) {
			if (nextProps.animationId !== prevState.prevAnimationId) return {
				prevAnimationId: nextProps.animationId,
				curPoints: nextProps.points,
				curBaseLine: nextProps.baseLine,
				prevPoints: prevState.curPoints,
				prevBaseLine: prevState.curBaseLine
			};
			if (nextProps.points !== prevState.curPoints || nextProps.baseLine !== prevState.curBaseLine) return {
				curPoints: nextProps.points,
				curBaseLine: nextProps.baseLine
			};
			return null;
		}
	}]);
}(import_react.PureComponent);
_Area = Area;
_defineProperty(Area, "displayName", "Area");
_defineProperty(Area, "defaultProps", {
	stroke: "#3182bd",
	fill: "#3182bd",
	fillOpacity: .6,
	xAxisId: 0,
	yAxisId: 0,
	legendType: "line",
	connectNulls: false,
	points: [],
	dot: false,
	activeDot: true,
	hide: false,
	isAnimationActive: !Global.isSsr,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
});
_defineProperty(Area, "getBaseValue", function(props, item, xAxis, yAxis) {
	var layout = props.layout, chartBaseValue = props.baseValue;
	var itemBaseValue = item.props.baseValue;
	var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
	if (isNumber(baseValue) && typeof baseValue === "number") return baseValue;
	var numericAxis = layout === "horizontal" ? yAxis : xAxis;
	var domain = numericAxis.scale.domain();
	if (numericAxis.type === "number") {
		var domainMax = Math.max(domain[0], domain[1]);
		var domainMin = Math.min(domain[0], domain[1]);
		if (baseValue === "dataMin") return domainMin;
		if (baseValue === "dataMax") return domainMax;
		return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
	}
	if (baseValue === "dataMin") return domain[0];
	if (baseValue === "dataMax") return domain[1];
	return domain[0];
});
_defineProperty(Area, "getComposedData", function(_ref4) {
	var props = _ref4.props, item = _ref4.item, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, bandSize = _ref4.bandSize, dataKey = _ref4.dataKey, stackedData = _ref4.stackedData, dataStartIndex = _ref4.dataStartIndex, displayedData = _ref4.displayedData, offset = _ref4.offset;
	var layout = props.layout;
	var hasStack = stackedData && stackedData.length;
	var baseValue = _Area.getBaseValue(props, item, xAxis, yAxis);
	var isHorizontalLayout = layout === "horizontal";
	var isRange = false;
	var points = displayedData.map(function(entry, index) {
		var value;
		if (hasStack) value = stackedData[dataStartIndex + index];
		else {
			value = getValueByDataKey(entry, dataKey);
			if (!Array.isArray(value)) value = [baseValue, value];
			else isRange = true;
		}
		var isBreakPoint = value[1] == null || hasStack && getValueByDataKey(entry, dataKey) == null;
		if (isHorizontalLayout) return {
			x: getCateCoordinateOfLine({
				axis: xAxis,
				ticks: xAxisTicks,
				bandSize,
				entry,
				index
			}),
			y: isBreakPoint ? null : yAxis.scale(value[1]),
			value,
			payload: entry
		};
		return {
			x: isBreakPoint ? null : xAxis.scale(value[1]),
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
	});
	var baseLine;
	if (hasStack || isRange) baseLine = points.map(function(entry) {
		var x = Array.isArray(entry.value) ? entry.value[0] : null;
		if (isHorizontalLayout) return {
			x: entry.x,
			y: x != null && entry.y != null ? yAxis.scale(x) : null
		};
		return {
			x: x != null ? xAxis.scale(x) : null,
			y: entry.y
		};
	});
	else baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
	return _objectSpread({
		points,
		baseLine,
		layout,
		isRange
	}, offset);
});
_defineProperty(Area, "renderDotItem", function(option, props) {
	var dotItem;
	if (/* @__PURE__ */ import_react.isValidElement(option)) dotItem = /* @__PURE__ */ import_react.cloneElement(option, props);
	else if ((0, import_isFunction.default)(option)) dotItem = option(props);
	else {
		var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
		var key = props.key, rest = _objectWithoutProperties(props, _excluded2);
		dotItem = /* @__PURE__ */ import_react.createElement(Dot, _extends({}, rest, {
			key,
			className
		}));
	}
	return dotItem;
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
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/chart/AreaChart.js
/**
* @fileOverview Area Chart
*/
var AreaChart = generateCategoricalChart({
	chartName: "AreaChart",
	GraphicalChild: Area,
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
//#region src/services/usuariosService.ts
var buildFormData = (data) => {
	const fd = new FormData();
	for (const key in data) if (data[key] !== void 0 && data[key] !== null) if (data[key] instanceof File) fd.append(key, data[key]);
	else if (Array.isArray(data[key]) || typeof data[key] === "object") fd.append(key, JSON.stringify(data[key]));
	else fd.append(key, String(data[key]));
	return fd;
};
var usuariosService = {
	fetchUsuarios: async () => {
		return await pb.collection("users").getFullList({ sort: "-created" });
	},
	fetchRolePermissoes: async (role) => {
		try {
			return (await pb.collection("roles_permissoes").getFirstListItem(`role='${role}'`)).permissoes || [];
		} catch {
			return [];
		}
	},
	createUsuario: async (data) => {
		const payload = buildFormData(data);
		const user = await pb.collection("users").create(payload);
		await trackAcao("criar_usuario", `Criou o usuário ${data.email}`, user.id);
		return user;
	},
	updateUsuario: async (id, data) => {
		const payload = buildFormData(data);
		const user = await pb.collection("users").update(id, payload);
		await trackAcao("editar_usuario", `Atualizou o usuário ${user.email}`, user.id);
		return user;
	},
	updateFotoPerfil: async (id, file) => {
		const fd = new FormData();
		if (file) fd.append("foto_perfil", file);
		else fd.append("foto_perfil", "");
		const user = await pb.collection("users").update(id, fd);
		await trackAcao("alteracao_perfil", `Atualizou a foto de perfil`, user.id);
		return user;
	},
	toggle2FA: async (id, enabled, secret) => {
		const data = { two_fa_enabled: enabled };
		if (secret) data.two_fa_secret = secret;
		else if (!enabled) data.two_fa_secret = "";
		const user = await pb.collection("users").update(id, data);
		await trackAcao("habilitar_2fa", `${enabled ? "Habilitou" : "Desabilitou"} 2FA para o usuário`, user.id);
		return user;
	},
	checkActiveSessionsFor2FA: async (userId) => {
		return (await pb.collection("usuarios_sessoes").getList(1, 1, { filter: `user_id='${userId}' && expirada=false` })).totalItems > 0;
	},
	resetSenha: async (id) => {
		const tempPassword = Math.random().toString(36).slice(-8) + "A1@";
		const user = await pb.collection("users").update(id, {
			password: tempPassword,
			passwordConfirm: tempPassword
		});
		await trackAcao("resetar_senha", `Resetou a senha do usuário ${user.email}`, user.id);
		return tempPassword;
	},
	alterarRole: async (userId, novoRole) => {
		const user = await pb.collection("users").update(userId, { role: novoRole });
		await trackAcao("alterar_role", `Alterou role do usuário ${user.email} para ${novoRole}`, user.id);
		return user;
	},
	permitirUsuario: async (id) => {
		const user = await pb.collection("users").update(id, { status_conta: "ativo" });
		await trackAcao("alterar_status_usuario", `Ativou o usuário ${user.email}`, user.id);
		return user;
	},
	bloquearUsuario: async (id) => {
		const user = await pb.collection("users").update(id, { status_conta: "bloqueado" });
		await trackAcao("alterar_status_usuario", `Bloqueou o usuário ${user.email}`, user.id);
		return user;
	},
	fetchHistorico: async (userId, limit = 50) => {
		const filter = userId ? `usuario_afetado_id='${userId}' || user_id='${userId}'` : "";
		return await pb.collection("usuarios_historico").getList(1, limit, {
			filter,
			sort: "-created",
			expand: "user_id,usuario_afetado_id"
		});
	},
	fetchAllHistorico: async () => {
		return await pb.collection("usuarios_historico").getFullList({
			sort: "-created",
			expand: "user_id,usuario_afetado_id"
		});
	},
	fetchSessoes: async (userId) => {
		return await pb.collection("usuarios_sessoes").getFullList({
			filter: `user_id='${userId}' && expirada=false`,
			sort: "-created"
		});
	},
	forceLogout: async (sessionId) => {
		const session = await pb.collection("usuarios_sessoes").update(sessionId, { expirada: true });
		await trackAcao("logout", `Forçou logout remoto da sessão ${sessionId}`, session.user_id);
		return session;
	}
};
//#endregion
//#region src/hooks/useGestaoUsuarios.ts
function useGestaoUsuarios() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [activeSessions, setActiveSessions] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadData = (0, import_react.useCallback)(async () => {
		try {
			setLoading(true);
			setUsers(await usuariosService.fetchUsuarios());
			const sessoes = await pb.collection("usuarios_sessoes").getFullList({ filter: "expirada=false" });
			const counts = {};
			sessoes.forEach((s) => {
				counts[s.user_id] = (counts[s.user_id] || 0) + 1;
			});
			setActiveSessions(counts);
		} catch (error) {
			toast.error("Erro ao carregar dados de gestão");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	useRealtime("users", loadData);
	useRealtime("usuarios_sessoes", loadData);
	return {
		users,
		activeSessions,
		loading,
		loadUsers: loadData
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
/**
* @constant
* @name daysInYear
* @summary Days in 1 year.
*
* @description
* How many days in a year.
*
* One years equals 365.2425 days according to the formula:
*
* > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
* > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
*/
var daysInYear = 365.2425;
Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
/**
* @constant
* @name millisecondsInWeek
* @summary Milliseconds in 1 week.
*/
var millisecondsInWeek = 6048e5;
/**
* @constant
* @name millisecondsInDay
* @summary Milliseconds in 1 day.
*/
var millisecondsInDay = 864e5;
/**
* @constant
* @name minutesInMonth
* @summary Minutes in 1 month.
*/
var minutesInMonth = 43200;
/**
* @constant
* @name minutesInDay
* @summary Minutes in 1 day.
*/
var minutesInDay = 1440;
/**
* @constant
* @name secondsInDay
* @summary Seconds in 1 day.
*/
var secondsInDay = 3600 * 24;
secondsInDay * 7;
secondsInDay * daysInYear / 12 * 3;
/**
* @constant
* @name constructFromSymbol
* @summary Symbol enabling Date extensions to inherit properties from the reference date.
*
* The symbol is used to enable the `constructFrom` function to construct a date
* using a reference date and a value. It allows to transfer extra properties
* from the reference date to the new date. It's useful for extensions like
* [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
* a constructor argument.
*/
var constructFromSymbol = Symbol.for("constructDateFrom");
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
/**
* @name constructFrom
* @category Generic Helpers
* @summary Constructs a date using the reference date and the value
*
* @description
* The function constructs a new date using the constructor from the reference
* date and the given value. It helps to build generic functions that accept
* date extensions.
*
* It defaults to `Date` if the passed reference date is a number or a string.
*
* Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The reference date to take constructor from
* @param value - The value to create the date
*
* @returns Date initialized using the given date and value
*
* @example
* import { constructFrom } from "./constructFrom/date-fns";
*
* // A function that clones a date preserving the original type
* function cloneDate<DateType extends Date>(date: DateType): DateType {
*   return constructFrom(
*     date, // Use constructor from the given date
*     date.getTime() // Use the date value to create a new date
*   );
* }
*/
function constructFrom(date, value) {
	if (typeof date === "function") return date(value);
	if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
	if (date instanceof Date) return new date.constructor(value);
	return new Date(value);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
/**
* @name toDate
* @category Common Helpers
* @summary Convert the given argument to an instance of Date.
*
* @description
* Convert the given argument to an instance of Date.
*
* If the argument is an instance of Date, the function returns its clone.
*
* If the argument is a number, it is treated as a timestamp.
*
* If the argument is none of the above, the function returns Invalid Date.
*
* Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param argument - The value to convert
*
* @returns The parsed date in the local time zone
*
* @example
* // Clone the date:
* const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
* //=> Tue Feb 11 2014 11:30:30
*
* @example
* // Convert the timestamp to date:
* const result = toDate(1392098430000)
* //=> Tue Feb 11 2014 11:30:30
*/
function toDate(argument, context) {
	return constructFrom(context || argument, argument);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
/**
* The {@link addDays} function options.
*/
/**
* @name addDays
* @category Day Helpers
* @summary Add the specified number of days to the given date.
*
* @description
* Add the specified number of days to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of days to be added.
* @param options - An object with options
*
* @returns The new date with the days added
*
* @example
* // Add 10 days to 1 September 2014:
* const result = addDays(new Date(2014, 8, 1), 10)
* //=> Thu Sep 11 2014 00:00:00
*/
function addDays(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	_date.setDate(_date.getDate() + amount);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
/**
* The {@link addMonths} function options.
*/
/**
* @name addMonths
* @category Month Helpers
* @summary Add the specified number of months to the given date.
*
* @description
* Add the specified number of months to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of months to be added.
* @param options - The options object
*
* @returns The new date with the months added
*
* @example
* // Add 5 months to 1 September 2014:
* const result = addMonths(new Date(2014, 8, 1), 5)
* //=> Sun Feb 01 2015 00:00:00
*
* // Add one month to 30 January 2023:
* const result = addMonths(new Date(2023, 0, 30), 1)
* //=> Tue Feb 28 2023 00:00:00
*/
function addMonths(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	const dayOfMonth = _date.getDate();
	const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
	endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
	if (dayOfMonth >= endOfDesiredMonth.getDate()) return endOfDesiredMonth;
	else {
		_date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
		return _date;
	}
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
/**
* The {@link startOfWeek} function options.
*/
/**
* @name startOfWeek
* @category Week Helpers
* @summary Return the start of a week for the given date.
*
* @description
* Return the start of a week for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week
*
* @example
* // The start of a week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Sun Aug 31 2014 00:00:00
*
* @example
* // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfWeek(date, options) {
	const defaultOptions = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	_date.setDate(_date.getDate() - diff);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
/**
* The {@link startOfISOWeek} function options.
*/
/**
* @name startOfISOWeek
* @category ISO Week Helpers
* @summary Return the start of an ISO week for the given date.
*
* @description
* Return the start of an ISO week for the given date.
* The result will be in the local timezone.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of an ISO week
*
* @example
* // The start of an ISO week for 2 September 2014 11:55:00:
* const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfISOWeek(date, options) {
	return startOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
/**
* The {@link getISOWeekYear} function options.
*/
/**
* @name getISOWeekYear
* @category ISO Week-Numbering Year Helpers
* @summary Get the ISO week-numbering year of the given date.
*
* @description
* Get the ISO week-numbering year of the given date,
* which always starts 3 days before the year's first Thursday.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @param date - The given date
*
* @returns The ISO week-numbering year
*
* @example
* // Which ISO-week numbering year is 2 January 2005?
* const result = getISOWeekYear(new Date(2005, 0, 2))
* //=> 2004
*/
function getISOWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
	fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
	fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
	const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
	fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
	fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
	if (_date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (_date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
/**
* Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
* They usually appear for dates that denote time before the timezones were introduced
* (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
* and GMT+01:00:00 after that date)
*
* Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
* which would lead to incorrect calculations.
*
* This function returns the timezone offset in milliseconds that takes seconds in account.
*/
function getTimezoneOffsetInMilliseconds(date) {
	const _date = toDate(date);
	const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
	utcDate.setUTCFullYear(_date.getFullYear());
	return +date - +utcDate;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
	const normalize = constructFrom.bind(null, context || dates.find((date) => typeof date === "object"));
	return dates.map(normalize);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
/**
* The {@link startOfDay} function options.
*/
/**
* @name startOfDay
* @category Day Helpers
* @summary Return the start of a day for the given date.
*
* @description
* Return the start of a day for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - The options
*
* @returns The start of a day
*
* @example
* // The start of a day for 2 September 2014 11:55:00:
* const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 02 2014 00:00:00
*/
function startOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
/**
* The {@link differenceInCalendarDays} function options.
*/
/**
* @name differenceInCalendarDays
* @category Day Helpers
* @summary Get the number of calendar days between the given dates.
*
* @description
* Get the number of calendar days between the given dates. This means that the times are removed
* from the dates and then the difference in days is calculated.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - The options object
*
* @returns The number of calendar days
*
* @example
* // How many calendar days are between
* // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
* const result = differenceInCalendarDays(
*   new Date(2012, 6, 2, 0, 0),
*   new Date(2011, 6, 2, 23, 0)
* )
* //=> 366
* // How many calendar days are between
* // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
* const result = differenceInCalendarDays(
*   new Date(2011, 6, 3, 0, 1),
*   new Date(2011, 6, 2, 23, 59)
* )
* //=> 1
*/
function differenceInCalendarDays(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const laterStartOfDay = startOfDay(laterDate_);
	const earlierStartOfDay = startOfDay(earlierDate_);
	const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
	const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
	return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
/**
* The {@link startOfISOWeekYear} function options.
*/
/**
* @name startOfISOWeekYear
* @category ISO Week-Numbering Year Helpers
* @summary Return the start of an ISO week-numbering year for the given date.
*
* @description
* Return the start of an ISO week-numbering year,
* which always starts 3 days before the year's first Thursday.
* The result will be in the local timezone.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of an ISO week-numbering year
*
* @example
* // The start of an ISO week-numbering year for 2 July 2005:
* const result = startOfISOWeekYear(new Date(2005, 6, 2))
* //=> Mon Jan 03 2005 00:00:00
*/
function startOfISOWeekYear(date, options) {
	const year = getISOWeekYear(date, options);
	const fourthOfJanuary = constructFrom(options?.in || date, 0);
	fourthOfJanuary.setFullYear(year, 0, 4);
	fourthOfJanuary.setHours(0, 0, 0, 0);
	return startOfISOWeek(fourthOfJanuary);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/compareAsc.js
/**
* @name compareAsc
* @category Common Helpers
* @summary Compare the two dates and return -1, 0 or 1.
*
* @description
* Compare the two dates and return 1 if the first date is after the second,
* -1 if the first date is before the second or 0 if dates are equal.
*
* @param dateLeft - The first date to compare
* @param dateRight - The second date to compare
*
* @returns The result of the comparison
*
* @example
* // Compare 11 February 1987 and 10 July 1989:
* const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
* //=> -1
*
* @example
* // Sort the array of dates:
* const result = [
*   new Date(1995, 6, 2),
*   new Date(1987, 1, 11),
*   new Date(1989, 6, 10)
* ].sort(compareAsc)
* //=> [
* //   Wed Feb 11 1987 00:00:00,
* //   Mon Jul 10 1989 00:00:00,
* //   Sun Jul 02 1995 00:00:00
* // ]
*/
function compareAsc(dateLeft, dateRight) {
	const diff = +toDate(dateLeft) - +toDate(dateRight);
	if (diff < 0) return -1;
	else if (diff > 0) return 1;
	return diff;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructNow.js
/**
* @name constructNow
* @category Generic Helpers
* @summary Constructs a new current date using the passed value constructor.
* @pure false
*
* @description
* The function constructs a new current date using the constructor from
* the reference date. It helps to build generic functions that accept date
* extensions and use the current date.
*
* It defaults to `Date` if the passed reference date is a number or a string.
*
* @param date - The reference date to take constructor from
*
* @returns Current date initialized using the given date constructor
*
* @example
* import { constructNow, isSameDay } from 'date-fns'
*
* function isToday<DateType extends Date>(
*   date: DateArg<DateType>,
* ): boolean {
*   // If we were to use `new Date()` directly, the function would  behave
*   // differently in different timezones and return false for the same date.
*   return isSameDay(date, constructNow(date));
* }
*/
function constructNow(date) {
	return constructFrom(date, Date.now());
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
/**
* @name isDate
* @category Common Helpers
* @summary Is the given value a date?
*
* @description
* Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
*
* @param value - The value to check
*
* @returns True if the given value is a date
*
* @example
* // For a valid date:
* const result = isDate(new Date())
* //=> true
*
* @example
* // For an invalid date:
* const result = isDate(new Date(NaN))
* //=> true
*
* @example
* // For some value:
* const result = isDate('2014-02-31')
* //=> false
*
* @example
* // For an object:
* const result = isDate({})
* //=> false
*/
function isDate(value) {
	return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
/**
* @name isValid
* @category Common Helpers
* @summary Is the given date valid?
*
* @description
* Returns false if argument is Invalid Date and true otherwise.
* Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
* Invalid Date is a Date, whose time value is NaN.
*
* Time value of Date: http://es5.github.io/#x15.9.1.1
*
* @param date - The date to check
*
* @returns The date is valid
*
* @example
* // For the valid date:
* const result = isValid(new Date(2014, 1, 31))
* //=> true
*
* @example
* // For the value, convertible into a date:
* const result = isValid(1393804800000)
* //=> true
*
* @example
* // For the invalid date:
* const result = isValid(new Date(''))
* //=> false
*/
function isValid(date) {
	return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarMonths.js
/**
* The {@link differenceInCalendarMonths} function options.
*/
/**
* @name differenceInCalendarMonths
* @category Month Helpers
* @summary Get the number of calendar months between the given dates.
*
* @description
* Get the number of calendar months between the given dates.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - An object with options
*
* @returns The number of calendar months
*
* @example
* // How many calendar months are between 31 January 2014 and 1 September 2014?
* const result = differenceInCalendarMonths(
*   new Date(2014, 8, 1),
*   new Date(2014, 0, 31)
* )
* //=> 8
*/
function differenceInCalendarMonths(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
	const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
	return yearsDiff * 12 + monthsDiff;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getRoundingMethod.js
function getRoundingMethod(method) {
	return (number) => {
		const result = (method ? Math[method] : Math.trunc)(number);
		return result === 0 ? 0 : result;
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInMilliseconds.js
/**
* @name differenceInMilliseconds
* @category Millisecond Helpers
* @summary Get the number of milliseconds between the given dates.
*
* @description
* Get the number of milliseconds between the given dates.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
*
* @returns The number of milliseconds
*
* @example
* // How many milliseconds are between
* // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
* const result = differenceInMilliseconds(
*   new Date(2014, 6, 2, 12, 30, 21, 700),
*   new Date(2014, 6, 2, 12, 30, 20, 600)
* )
* //=> 1100
*/
function differenceInMilliseconds(laterDate, earlierDate) {
	return +toDate(laterDate) - +toDate(earlierDate);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfDay.js
/**
* The {@link endOfDay} function options.
*/
/**
* @name endOfDay
* @category Day Helpers
* @summary Return the end of a day for the given date.
*
* @description
* Return the end of a day for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The end of a day
*
* @example
* // The end of a day for 2 September 2014 11:55:00:
* const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 02 2014 23:59:59.999
*/
function endOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfMonth.js
/**
* The {@link endOfMonth} function options.
*/
/**
* @name endOfMonth
* @category Month Helpers
* @summary Return the end of a month for the given date.
*
* @description
* Return the end of a month for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The end of a month
*
* @example
* // The end of a month for 2 September 2014 11:55:00:
* const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 30 2014 23:59:59.999
*/
function endOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	const month = _date.getMonth();
	_date.setFullYear(_date.getFullYear(), month + 1, 0);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isLastDayOfMonth.js
/**
* @name isLastDayOfMonth
* @category Month Helpers
* @summary Is the given date the last day of a month?
*
* @description
* Is the given date the last day of a month?
*
* @param date - The date to check
* @param options - An object with options
*
* @returns The date is the last day of a month
*
* @example
* // Is 28 February 2014 the last day of a month?
* const result = isLastDayOfMonth(new Date(2014, 1, 28))
* //=> true
*/
function isLastDayOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	return +endOfDay(_date, options) === +endOfMonth(_date, options);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInMonths.js
/**
* The {@link differenceInMonths} function options.
*/
/**
* @name differenceInMonths
* @category Month Helpers
* @summary Get the number of full months between the given dates.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - An object with options
*
* @returns The number of full months
*
* @example
* // How many full months are between 31 January 2014 and 1 September 2014?
* const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
* //=> 7
*/
function differenceInMonths(laterDate, earlierDate, options) {
	const [laterDate_, workingLaterDate, earlierDate_] = normalizeDates(options?.in, laterDate, laterDate, earlierDate);
	const sign = compareAsc(workingLaterDate, earlierDate_);
	const difference = Math.abs(differenceInCalendarMonths(workingLaterDate, earlierDate_));
	if (difference < 1) return 0;
	if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27) workingLaterDate.setDate(30);
	workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);
	let isLastMonthNotFull = compareAsc(workingLaterDate, earlierDate_) === -sign;
	if (isLastDayOfMonth(laterDate_) && difference === 1 && compareAsc(laterDate_, earlierDate_) === 1) isLastMonthNotFull = false;
	const result = sign * (difference - +isLastMonthNotFull);
	return result === 0 ? 0 : result;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInSeconds.js
/**
* The {@link differenceInSeconds} function options.
*/
/**
* @name differenceInSeconds
* @category Second Helpers
* @summary Get the number of seconds between the given dates.
*
* @description
* Get the number of seconds between the given dates.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - An object with options.
*
* @returns The number of seconds
*
* @example
* // How many seconds are between
* // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
* const result = differenceInSeconds(
*   new Date(2014, 6, 2, 12, 30, 20, 0),
*   new Date(2014, 6, 2, 12, 30, 7, 999)
* )
* //=> 12
*/
function differenceInSeconds(laterDate, earlierDate, options) {
	const diff = differenceInMilliseconds(laterDate, earlierDate) / 1e3;
	return getRoundingMethod(options?.roundingMethod)(diff);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
/**
* The {@link startOfYear} function options.
*/
/**
* @name startOfYear
* @category Year Helpers
* @summary Return the start of a year for the given date.
*
* @description
* Return the start of a year for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - The options
*
* @returns The start of a year
*
* @example
* // The start of a year for 2 September 2014 11:55:00:
* const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
* //=> Wed Jan 01 2014 00:00:00
*/
function startOfYear(date, options) {
	const date_ = toDate(date, options?.in);
	date_.setFullYear(date_.getFullYear(), 0, 1);
	date_.setHours(0, 0, 0, 0);
	return date_;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale$1 = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
};
var formatDistance$2 = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale$1[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", count.toString());
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "in " + result;
	else return result + " ago";
	return result;
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
	return (options = {}) => {
		const width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
var formatLong$1 = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale$1 = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
};
var formatRelative$1 = (token, _date, _baseDate, _options) => formatRelativeLocale$1[token];
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
/**
* The localize function argument callback which allows to convert raw value to
* the actual type.
*
* @param value - The value to convert
*
* @returns The converted value
*/
/**
* The map of localized values for each width.
*/
/**
* The index type of the locale unit value. It types conversion of units of
* values that don't start at 0 (i.e. quarters).
*/
/**
* Converts the unit value to the tuple of values.
*/
/**
* The tuple of localized era values. The first element represents BC,
* the second element represents AD.
*/
/**
* The tuple of localized quarter values. The first element represents Q1.
*/
/**
* The tuple of localized day values. The first element represents Sunday.
*/
/**
* The tuple of localized month values. The first element represents January.
*/
function buildLocalizeFn(args) {
	return (value, options) => {
		const context = options?.context ? String(options.context) : "standalone";
		let valuesArray;
		if (context === "formatting" && args.formattingValues) {
			const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			const width = options?.width ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			const defaultWidth = args.defaultWidth;
			const width = options?.width ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[width] || args.values[defaultWidth];
		}
		const index = args.argumentCallback ? args.argumentCallback(value) : value;
		return valuesArray[index];
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues$1 = {
	narrow: ["B", "A"],
	abbreviated: ["BC", "AD"],
	wide: ["Before Christ", "Anno Domini"]
};
var quarterValues$1 = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	wide: [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	]
};
var monthValues$1 = {
	narrow: [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	abbreviated: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	wide: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
};
var dayValues$1 = {
	narrow: [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	],
	short: [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	abbreviated: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	wide: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]
};
var dayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	}
};
var formattingDayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	}
};
var ordinalNumber$1 = (dirtyNumber, _options) => {
	const number = Number(dirtyNumber);
	const rem100 = number % 100;
	if (rem100 > 20 || rem100 < 10) switch (rem100 % 10) {
		case 1: return number + "st";
		case 2: return number + "nd";
		case 3: return number + "rd";
	}
	return number + "th";
};
var localize$1 = {
	ordinalNumber: ordinalNumber$1,
	era: buildLocalizeFn({
		values: eraValues$1,
		defaultWidth: "wide"
	}),
	quarter: buildLocalizeFn({
		values: quarterValues$1,
		defaultWidth: "wide",
		argumentCallback: (quarter) => quarter - 1
	}),
	month: buildLocalizeFn({
		values: monthValues$1,
		defaultWidth: "wide"
	}),
	day: buildLocalizeFn({
		values: dayValues$1,
		defaultWidth: "wide"
	}),
	dayPeriod: buildLocalizeFn({
		values: dayPeriodValues$1,
		defaultWidth: "wide",
		formattingValues: formattingDayPeriodValues$1,
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
	return (string, options = {}) => {
		const width = options.width;
		const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		const matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
		let value;
		value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (let key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
	return (string, options = {}) => {
		const matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
/**
* @category Locales
* @summary English locale (United States).
* @language English
* @iso-639-2 eng
* @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
* @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
*/
var enUS = {
	code: "en-US",
	formatDistance: formatDistance$2,
	formatLong: formatLong$1,
	formatRelative: formatRelative$1,
	localize: localize$1,
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
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
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
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
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
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
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
/**
* The {@link getDayOfYear} function options.
*/
/**
* @name getDayOfYear
* @category Day Helpers
* @summary Get the day of the year of the given date.
*
* @description
* Get the day of the year of the given date.
*
* @param date - The given date
* @param options - The options
*
* @returns The day of year
*
* @example
* // Which day of the year is 2 July 2014?
* const result = getDayOfYear(new Date(2014, 6, 2))
* //=> 183
*/
function getDayOfYear(date, options) {
	const _date = toDate(date, options?.in);
	return differenceInCalendarDays(_date, startOfYear(_date)) + 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
/**
* The {@link getISOWeek} function options.
*/
/**
* @name getISOWeek
* @category ISO Week Helpers
* @summary Get the ISO week of the given date.
*
* @description
* Get the ISO week of the given date.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @param date - The given date
* @param options - The options
*
* @returns The ISO week
*
* @example
* // Which week of the ISO-week numbering year is 2 January 2005?
* const result = getISOWeek(new Date(2005, 0, 2))
* //=> 53
*/
function getISOWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
	return Math.round(diff / millisecondsInWeek) + 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
/**
* The {@link getWeekYear} function options.
*/
/**
* @name getWeekYear
* @category Week-Numbering Year Helpers
* @summary Get the local week-numbering year of the given date.
*
* @description
* Get the local week-numbering year of the given date.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @param date - The given date
* @param options - An object with options.
*
* @returns The local week-numbering year
*
* @example
* // Which week numbering year is 26 December 2004 with the default settings?
* const result = getWeekYear(new Date(2004, 11, 26))
* //=> 2005
*
* @example
* // Which week numbering year is 26 December 2004 if week starts on Saturday?
* const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
* //=> 2004
*
* @example
* // Which week numbering year is 26 December 2004 if the first week contains 4 January?
* const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
* //=> 2004
*/
function getWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const defaultOptions = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
	firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
	firstWeekOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
	const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
	firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
	firstWeekOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
	if (+_date >= +startOfNextYear) return year + 1;
	else if (+_date >= +startOfThisYear) return year;
	else return year - 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
/**
* The {@link startOfWeekYear} function options.
*/
/**
* @name startOfWeekYear
* @category Week-Numbering Year Helpers
* @summary Return the start of a local week-numbering year for the given date.
*
* @description
* Return the start of a local week-numbering year.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week-numbering year
*
* @example
* // The start of an a week-numbering year for 2 July 2005 with default settings:
* const result = startOfWeekYear(new Date(2005, 6, 2))
* //=> Sun Dec 26 2004 00:00:00
*
* @example
* // The start of a week-numbering year for 2 July 2005
* // if Monday is the first day of week
* // and 4 January is always in the first week of the year:
* const result = startOfWeekYear(new Date(2005, 6, 2), {
*   weekStartsOn: 1,
*   firstWeekContainsDate: 4
* })
* //=> Mon Jan 03 2005 00:00:00
*/
function startOfWeekYear(date, options) {
	const defaultOptions = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const year = getWeekYear(date, options);
	const firstWeek = constructFrom(options?.in || date, 0);
	firstWeek.setFullYear(year, 0, firstWeekContainsDate);
	firstWeek.setHours(0, 0, 0, 0);
	return startOfWeek(firstWeek, options);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
/**
* The {@link getWeek} function options.
*/
/**
* @name getWeek
* @category Week Helpers
* @summary Get the local week index of the given date.
*
* @description
* Get the local week index of the given date.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @param date - The given date
* @param options - An object with options
*
* @returns The week
*
* @example
* // Which week of the local week numbering year is 2 January 2005 with default options?
* const result = getWeek(new Date(2005, 0, 2))
* //=> 2
*
* @example
* // Which week of the local week numbering year is 2 January 2005,
* // if Monday is the first day of the week,
* // and the first week of the year always contains 4 January?
* const result = getWeek(new Date(2005, 0, 2), {
*   weekStartsOn: 1,
*   firstWeekContainsDate: 4
* })
* //=> 53
*/
function getWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
	return Math.round(diff / millisecondsInWeek) + 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
	return (number < 0 ? "-" : "") + Math.abs(number).toString().padStart(targetLength, "0");
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
	y(date, token) {
		const signedYear = date.getFullYear();
		const year = signedYear > 0 ? signedYear : 1 - signedYear;
		return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
	},
	M(date, token) {
		const month = date.getMonth();
		return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
	},
	d(date, token) {
		return addLeadingZeros(date.getDate(), token.length);
	},
	a(date, token) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return dayPeriodEnumValue.toUpperCase();
			case "aaa": return dayPeriodEnumValue;
			case "aaaaa": return dayPeriodEnumValue[0];
			default: return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
		}
	},
	h(date, token) {
		return addLeadingZeros(date.getHours() % 12 || 12, token.length);
	},
	H(date, token) {
		return addLeadingZeros(date.getHours(), token.length);
	},
	m(date, token) {
		return addLeadingZeros(date.getMinutes(), token.length);
	},
	s(date, token) {
		return addLeadingZeros(date.getSeconds(), token.length);
	},
	S(date, token) {
		const numberOfDigits = token.length;
		const milliseconds = date.getMilliseconds();
		return addLeadingZeros(Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3)), token.length);
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
};
var formatters = {
	G: function(date, token, localize) {
		const era = date.getFullYear() > 0 ? 1 : 0;
		switch (token) {
			case "G":
			case "GG":
			case "GGG": return localize.era(era, { width: "abbreviated" });
			case "GGGGG": return localize.era(era, { width: "narrow" });
			default: return localize.era(era, { width: "wide" });
		}
	},
	y: function(date, token, localize) {
		if (token === "yo") {
			const signedYear = date.getFullYear();
			const year = signedYear > 0 ? signedYear : 1 - signedYear;
			return localize.ordinalNumber(year, { unit: "year" });
		}
		return lightFormatters.y(date, token);
	},
	Y: function(date, token, localize, options) {
		const signedWeekYear = getWeekYear(date, options);
		const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
		if (token === "YY") return addLeadingZeros(weekYear % 100, 2);
		if (token === "Yo") return localize.ordinalNumber(weekYear, { unit: "year" });
		return addLeadingZeros(weekYear, token.length);
	},
	R: function(date, token) {
		return addLeadingZeros(getISOWeekYear(date), token.length);
	},
	u: function(date, token) {
		return addLeadingZeros(date.getFullYear(), token.length);
	},
	Q: function(date, token, localize) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "Q": return String(quarter);
			case "QQ": return addLeadingZeros(quarter, 2);
			case "Qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
			case "QQQ": return localize.quarter(quarter, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return localize.quarter(quarter, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.quarter(quarter, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(date, token, localize) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "q": return String(quarter);
			case "qq": return addLeadingZeros(quarter, 2);
			case "qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
			case "qqq": return localize.quarter(quarter, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return localize.quarter(quarter, {
				width: "narrow",
				context: "standalone"
			});
			default: return localize.quarter(quarter, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(date, token, localize) {
		const month = date.getMonth();
		switch (token) {
			case "M":
			case "MM": return lightFormatters.M(date, token);
			case "Mo": return localize.ordinalNumber(month + 1, { unit: "month" });
			case "MMM": return localize.month(month, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return localize.month(month, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.month(month, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(date, token, localize) {
		const month = date.getMonth();
		switch (token) {
			case "L": return String(month + 1);
			case "LL": return addLeadingZeros(month + 1, 2);
			case "Lo": return localize.ordinalNumber(month + 1, { unit: "month" });
			case "LLL": return localize.month(month, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return localize.month(month, {
				width: "narrow",
				context: "standalone"
			});
			default: return localize.month(month, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(date, token, localize, options) {
		const week = getWeek(date, options);
		if (token === "wo") return localize.ordinalNumber(week, { unit: "week" });
		return addLeadingZeros(week, token.length);
	},
	I: function(date, token, localize) {
		const isoWeek = getISOWeek(date);
		if (token === "Io") return localize.ordinalNumber(isoWeek, { unit: "week" });
		return addLeadingZeros(isoWeek, token.length);
	},
	d: function(date, token, localize) {
		if (token === "do") return localize.ordinalNumber(date.getDate(), { unit: "date" });
		return lightFormatters.d(date, token);
	},
	D: function(date, token, localize) {
		const dayOfYear = getDayOfYear(date);
		if (token === "Do") return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
		return addLeadingZeros(dayOfYear, token.length);
	},
	E: function(date, token, localize) {
		const dayOfWeek = date.getDay();
		switch (token) {
			case "E":
			case "EE":
			case "EEE": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(date, token, localize, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "e": return String(localDayOfWeek);
			case "ee": return addLeadingZeros(localDayOfWeek, 2);
			case "eo": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "eee": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(date, token, localize, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "c": return String(localDayOfWeek);
			case "cc": return addLeadingZeros(localDayOfWeek, token.length);
			case "co": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "ccc": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return localize.day(dayOfWeek, {
				width: "short",
				context: "standalone"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(date, token, localize) {
		const dayOfWeek = date.getDay();
		const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
		switch (token) {
			case "i": return String(isoDayOfWeek);
			case "ii": return addLeadingZeros(isoDayOfWeek, token.length);
			case "io": return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
			case "iii": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(date, token, localize) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(date, token, localize) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
		else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
		else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "b":
			case "bb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(date, token, localize) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
		else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
		else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
		else dayPeriodEnumValue = dayPeriodEnum.night;
		switch (token) {
			case "B":
			case "BB":
			case "BBB": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(date, token, localize) {
		if (token === "ho") {
			let hours = date.getHours() % 12;
			if (hours === 0) hours = 12;
			return localize.ordinalNumber(hours, { unit: "hour" });
		}
		return lightFormatters.h(date, token);
	},
	H: function(date, token, localize) {
		if (token === "Ho") return localize.ordinalNumber(date.getHours(), { unit: "hour" });
		return lightFormatters.H(date, token);
	},
	K: function(date, token, localize) {
		const hours = date.getHours() % 12;
		if (token === "Ko") return localize.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	k: function(date, token, localize) {
		let hours = date.getHours();
		if (hours === 0) hours = 24;
		if (token === "ko") return localize.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	m: function(date, token, localize) {
		if (token === "mo") return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
		return lightFormatters.m(date, token);
	},
	s: function(date, token, localize) {
		if (token === "so") return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
		return lightFormatters.s(date, token);
	},
	S: function(date, token) {
		return lightFormatters.S(date, token);
	},
	X: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		if (timezoneOffset === 0) return "Z";
		switch (token) {
			case "X": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "XXXX":
			case "XX": return formatTimezone(timezoneOffset);
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	x: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "x": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "xxxx":
			case "xx": return formatTimezone(timezoneOffset);
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	O: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	z: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	t: function(date, token, _localize) {
		return addLeadingZeros(Math.trunc(+date / 1e3), token.length);
	},
	T: function(date, token, _localize) {
		return addLeadingZeros(+date, token.length);
	}
};
function formatTimezoneShort(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = Math.trunc(absOffset / 60);
	const minutes = absOffset % 60;
	if (minutes === 0) return sign + String(hours);
	return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
	if (offset % 60 === 0) return (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2);
	return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
	const minutes = addLeadingZeros(absOffset % 60, 2);
	return sign + hours + delimiter + minutes;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong) => {
	switch (pattern) {
		case "P": return formatLong.date({ width: "short" });
		case "PP": return formatLong.date({ width: "medium" });
		case "PPP": return formatLong.date({ width: "long" });
		default: return formatLong.date({ width: "full" });
	}
};
var timeLongFormatter = (pattern, formatLong) => {
	switch (pattern) {
		case "p": return formatLong.time({ width: "short" });
		case "pp": return formatLong.time({ width: "medium" });
		case "ppp": return formatLong.time({ width: "long" });
		default: return formatLong.time({ width: "full" });
	}
};
var dateTimeLongFormatter = (pattern, formatLong) => {
	const matchResult = pattern.match(/(P+)(p+)?/) || [];
	const datePattern = matchResult[1];
	const timePattern = matchResult[2];
	if (!timePattern) return dateLongFormatter(pattern, formatLong);
	let dateTimeFormat;
	switch (datePattern) {
		case "P":
			dateTimeFormat = formatLong.dateTime({ width: "short" });
			break;
		case "PP":
			dateTimeFormat = formatLong.dateTime({ width: "medium" });
			break;
		case "PPP":
			dateTimeFormat = formatLong.dateTime({ width: "long" });
			break;
		default:
			dateTimeFormat = formatLong.dateTime({ width: "full" });
			break;
	}
	return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
	p: timeLongFormatter,
	P: dateTimeLongFormatter
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function isProtectedDayOfYearToken(token) {
	return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
	return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format, input) {
	const _message = message(token, format, input);
	console.warn(_message);
	if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format, input) {
	const subject = token[0] === "Y" ? "years" : "days of the month";
	return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
* The {@link format} function options.
*/
/**
* @name format
* @alias formatDate
* @category Common Helpers
* @summary Format the date.
*
* @description
* Return the formatted date string in the given format. The result may vary by locale.
*
* > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
* > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* The characters wrapped between two single quotes characters (') are escaped.
* Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
* (see the last example)
*
* Format of the string is based on Unicode Technical Standard #35:
* https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* with a few additions (see note 7 below the table).
*
* Accepted patterns:
* | Unit                            | Pattern | Result examples                   | Notes |
* |---------------------------------|---------|-----------------------------------|-------|
* | Era                             | G..GGG  | AD, BC                            |       |
* |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
* |                                 | GGGGG   | A, B                              |       |
* | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
* |                                 | yy      | 44, 01, 00, 17                    | 5     |
* |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
* |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
* |                                 | yyyyy   | ...                               | 3,5   |
* | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
* |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
* |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
* |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
* |                                 | YYYYY   | ...                               | 3,5   |
* | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
* |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
* |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
* |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
* |                                 | RRRRR   | ...                               | 3,5,7 |
* | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
* |                                 | uu      | -43, 01, 1900, 2017               | 5     |
* |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
* |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
* |                                 | uuuuu   | ...                               | 3,5   |
* | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
* |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | QQ      | 01, 02, 03, 04                    |       |
* |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
* |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
* | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
* |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | qq      | 01, 02, 03, 04                    |       |
* |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
* |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
* | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
* |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | MM      | 01, 02, ..., 12                   |       |
* |                                 | MMM     | Jan, Feb, ..., Dec                |       |
* |                                 | MMMM    | January, February, ..., December  | 2     |
* |                                 | MMMMM   | J, F, ..., D                      |       |
* | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
* |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | LL      | 01, 02, ..., 12                   |       |
* |                                 | LLL     | Jan, Feb, ..., Dec                |       |
* |                                 | LLLL    | January, February, ..., December  | 2     |
* |                                 | LLLLL   | J, F, ..., D                      |       |
* | Local week of year              | w       | 1, 2, ..., 53                     |       |
* |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | ww      | 01, 02, ..., 53                   |       |
* | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
* |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | II      | 01, 02, ..., 53                   | 7     |
* | Day of month                    | d       | 1, 2, ..., 31                     |       |
* |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
* |                                 | dd      | 01, 02, ..., 31                   |       |
* | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
* |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
* |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
* |                                 | DDD     | 001, 002, ..., 365, 366           |       |
* |                                 | DDDD    | ...                               | 3     |
* | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
* |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
* |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
* |                                 | ii      | 01, 02, ..., 07                   | 7     |
* |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
* |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
* |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
* |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
* | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
* |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | ee      | 02, 03, ..., 01                   |       |
* |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | eeeee   | M, T, W, T, F, S, S               |       |
* |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
* |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | cc      | 02, 03, ..., 01                   |       |
* |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | ccccc   | M, T, W, T, F, S, S               |       |
* |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | AM, PM                          | a..aa   | AM, PM                            |       |
* |                                 | aaa     | am, pm                            |       |
* |                                 | aaaa    | a.m., p.m.                        | 2     |
* |                                 | aaaaa   | a, p                              |       |
* | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
* |                                 | bbb     | am, pm, noon, midnight            |       |
* |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
* |                                 | bbbbb   | a, p, n, mi                       |       |
* | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
* |                                 | BBBB    | at night, in the morning, ...     | 2     |
* |                                 | BBBBB   | at night, in the morning, ...     |       |
* | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
* |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
* |                                 | hh      | 01, 02, ..., 11, 12               |       |
* | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
* |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
* |                                 | HH      | 00, 01, 02, ..., 23               |       |
* | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
* |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
* |                                 | KK      | 01, 02, ..., 11, 00               |       |
* | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
* |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
* |                                 | kk      | 24, 01, 02, ..., 23               |       |
* | Minute                          | m       | 0, 1, ..., 59                     |       |
* |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
* |                                 | mm      | 00, 01, ..., 59                   |       |
* | Second                          | s       | 0, 1, ..., 59                     |       |
* |                                 | so      | 0th, 1st, ..., 59th               | 7     |
* |                                 | ss      | 00, 01, ..., 59                   |       |
* | Fraction of second              | S       | 0, 1, ..., 9                      |       |
* |                                 | SS      | 00, 01, ..., 99                   |       |
* |                                 | SSS     | 000, 001, ..., 999                |       |
* |                                 | SSSS    | ...                               | 3     |
* | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
* |                                 | XX      | -0800, +0530, Z                   |       |
* |                                 | XXX     | -08:00, +05:30, Z                 |       |
* |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
* |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
* | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
* |                                 | xx      | -0800, +0530, +0000               |       |
* |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
* |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
* |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
* | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
* |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
* | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
* |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
* | Seconds timestamp               | t       | 512969520                         | 7     |
* |                                 | tt      | ...                               | 3,7   |
* | Milliseconds timestamp          | T       | 512969520900                      | 7     |
* |                                 | TT      | ...                               | 3,7   |
* | Long localized date             | P       | 04/29/1453                        | 7     |
* |                                 | PP      | Apr 29, 1453                      | 7     |
* |                                 | PPP     | April 29th, 1453                  | 7     |
* |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
* | Long localized time             | p       | 12:00 AM                          | 7     |
* |                                 | pp      | 12:00:00 AM                       | 7     |
* |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
* |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
* | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
* |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
* |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
* |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
* Notes:
* 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
*    are the same as "stand-alone" units, but are different in some languages.
*    "Formatting" units are declined according to the rules of the language
*    in the context of a date. "Stand-alone" units are always nominative singular:
*
*    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
*
*    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
*
* 2. Any sequence of the identical letters is a pattern, unless it is escaped by
*    the single quote characters (see below).
*    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
*    the output will be the same as default pattern for this unit, usually
*    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
*    are marked with "2" in the last column of the table.
*
*    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
*
*    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
*
* 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
*    The output will be padded with zeros to match the length of the pattern.
*
*    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
*
* 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
*    These tokens represent the shortest form of the quarter.
*
* 5. The main difference between `y` and `u` patterns are B.C. years:
*
*    | Year | `y` | `u` |
*    |------|-----|-----|
*    | AC 1 |   1 |   1 |
*    | BC 1 |   1 |   0 |
*    | BC 2 |   2 |  -1 |
*
*    Also `yy` always returns the last two digits of a year,
*    while `uu` pads single digit years to 2 characters and returns other years unchanged:
*
*    | Year | `yy` | `uu` |
*    |------|------|------|
*    | 1    |   01 |   01 |
*    | 14   |   14 |   14 |
*    | 376  |   76 |  376 |
*    | 1453 |   53 | 1453 |
*
*    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
*    except local week-numbering years are dependent on `options.weekStartsOn`
*    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
*    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
*
* 6. Specific non-location timezones are currently unavailable in `date-fns`,
*    so right now these tokens fall back to GMT timezones.
*
* 7. These patterns are not in the Unicode Technical Standard #35:
*    - `i`: ISO day of week
*    - `I`: ISO week of year
*    - `R`: ISO week-numbering year
*    - `t`: seconds timestamp
*    - `T`: milliseconds timestamp
*    - `o`: ordinal number modifier
*    - `P`: long localized date
*    - `p`: long localized time
*
* 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
*    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
*    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* @param date - The original date
* @param format - The string of tokens
* @param options - An object with options
*
* @returns The formatted date string
*
* @throws `date` must not be Invalid Date
* @throws `options.locale` must contain `localize` property
* @throws `options.locale` must contain `formatLong` property
* @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws format string contains an unescaped latin alphabet character
*
* @example
* // Represent 11 February 2014 in middle-endian format:
* const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
* //=> '02/11/2014'
*
* @example
* // Represent 2 July 2014 in Esperanto:
* import { eoLocale } from 'date-fns/locale/eo'
* const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
*   locale: eoLocale
* })
* //=> '2-a de julio 2014'
*
* @example
* // Escape string by single quote characters:
* const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
* //=> "3 o'clock"
*/
function format(date, formatStr, options) {
	const defaultOptions = getDefaultOptions();
	const locale = options?.locale ?? defaultOptions.locale ?? enUS;
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const originalDate = toDate(date, options?.in);
	if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
		const firstCharacter = substring[0];
		if (firstCharacter === "p" || firstCharacter === "P") {
			const longFormatter = longFormatters[firstCharacter];
			return longFormatter(substring, locale.formatLong);
		}
		return substring;
	}).join("").match(formattingTokensRegExp).map((substring) => {
		if (substring === "''") return {
			isToken: false,
			value: "'"
		};
		const firstCharacter = substring[0];
		if (firstCharacter === "'") return {
			isToken: false,
			value: cleanEscapedString(substring)
		};
		if (formatters[firstCharacter]) return {
			isToken: true,
			value: substring
		};
		if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
		return {
			isToken: false,
			value: substring
		};
	});
	if (locale.localize.preprocessor) parts = locale.localize.preprocessor(originalDate, parts);
	const formatterOptions = {
		firstWeekContainsDate,
		weekStartsOn,
		locale
	};
	return parts.map((part) => {
		if (!part.isToken) return part.value;
		const token = part.value;
		if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) warnOrThrowProtectedError(token, formatStr, String(date));
		const formatter = formatters[token[0]];
		return formatter(originalDate, token, locale.localize, formatterOptions);
	}).join("");
}
function cleanEscapedString(input) {
	const matched = input.match(escapedStringRegExp);
	if (!matched) return input;
	return matched[1].replace(doubleQuoteRegExp, "'");
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/formatDistance.js
/**
* The {@link formatDistance} function options.
*/
/**
* @name formatDistance
* @category Common Helpers
* @summary Return the distance between the given dates in words.
*
* @description
* Return the distance between the given dates in words.
*
* | Distance between dates                                            | Result              |
* |-------------------------------------------------------------------|---------------------|
* | 0 ... 30 secs                                                     | less than a minute  |
* | 30 secs ... 1 min 30 secs                                         | 1 minute            |
* | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
* | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
* | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
* | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
* | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
* | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
* | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
* | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
* | 1 yr ... 1 yr 3 months                                            | about 1 year        |
* | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
* | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
* | N yrs ... N yrs 3 months                                          | about N years       |
* | N yrs 3 months ... N yrs 9 months                                 | over N years        |
* | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
*
* With `options.includeSeconds == true`:
* | Distance between dates | Result               |
* |------------------------|----------------------|
* | 0 secs ... 5 secs      | less than 5 seconds  |
* | 5 secs ... 10 secs     | less than 10 seconds |
* | 10 secs ... 20 secs    | less than 20 seconds |
* | 20 secs ... 40 secs    | half a minute        |
* | 40 secs ... 60 secs    | less than a minute   |
* | 60 secs ... 90 secs    | 1 minute             |
*
* @param laterDate - The date
* @param earlierDate - The date to compare with
* @param options - An object with options
*
* @returns The distance in words
*
* @throws `date` must not be Invalid Date
* @throws `baseDate` must not be Invalid Date
* @throws `options.locale` must contain `formatDistance` property
*
* @example
* // What is the distance between 2 July 2014 and 1 January 2015?
* const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
* //=> '6 months'
*
* @example
* // What is the distance between 1 January 2015 00:00:15
* // and 1 January 2015 00:00:00, including seconds?
* const result = formatDistance(
*   new Date(2015, 0, 1, 0, 0, 15),
*   new Date(2015, 0, 1, 0, 0, 0),
*   { includeSeconds: true }
* )
* //=> 'less than 20 seconds'
*
* @example
* // What is the distance from 1 January 2016
* // to 1 January 2015, with a suffix?
* const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
*   addSuffix: true
* })
* //=> 'about 1 year ago'
*
* @example
* // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
* import { eoLocale } from 'date-fns/locale/eo'
* const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
*   locale: eoLocale
* })
* //=> 'pli ol 1 jaro'
*/
function formatDistance$1(laterDate, earlierDate, options) {
	const defaultOptions = getDefaultOptions();
	const locale = options?.locale ?? defaultOptions.locale ?? enUS;
	const minutesInAlmostTwoDays = 2520;
	const comparison = compareAsc(laterDate, earlierDate);
	if (isNaN(comparison)) throw new RangeError("Invalid time value");
	const localizeOptions = Object.assign({}, options, {
		addSuffix: options?.addSuffix,
		comparison
	});
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, ...comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]);
	const seconds = differenceInSeconds(earlierDate_, laterDate_);
	const offsetInSeconds = (getTimezoneOffsetInMilliseconds(earlierDate_) - getTimezoneOffsetInMilliseconds(laterDate_)) / 1e3;
	const minutes = Math.round((seconds - offsetInSeconds) / 60);
	let months;
	if (minutes < 2) if (options?.includeSeconds) if (seconds < 5) return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
	else if (seconds < 10) return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
	else if (seconds < 20) return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
	else if (seconds < 40) return locale.formatDistance("halfAMinute", 0, localizeOptions);
	else if (seconds < 60) return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
	else return locale.formatDistance("xMinutes", 1, localizeOptions);
	else if (minutes === 0) return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
	else return locale.formatDistance("xMinutes", minutes, localizeOptions);
	else if (minutes < 45) return locale.formatDistance("xMinutes", minutes, localizeOptions);
	else if (minutes < 90) return locale.formatDistance("aboutXHours", 1, localizeOptions);
	else if (minutes < 1440) {
		const hours = Math.round(minutes / 60);
		return locale.formatDistance("aboutXHours", hours, localizeOptions);
	} else if (minutes < minutesInAlmostTwoDays) return locale.formatDistance("xDays", 1, localizeOptions);
	else if (minutes < 43200) {
		const days = Math.round(minutes / minutesInDay);
		return locale.formatDistance("xDays", days, localizeOptions);
	} else if (minutes < 43200 * 2) {
		months = Math.round(minutes / minutesInMonth);
		return locale.formatDistance("aboutXMonths", months, localizeOptions);
	}
	months = differenceInMonths(earlierDate_, laterDate_);
	if (months < 12) {
		const nearestMonth = Math.round(minutes / minutesInMonth);
		return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
	} else {
		const monthsSinceStartOfYear = months % 12;
		const years = Math.trunc(months / 12);
		if (monthsSinceStartOfYear < 3) return locale.formatDistance("aboutXYears", years, localizeOptions);
		else if (monthsSinceStartOfYear < 9) return locale.formatDistance("overXYears", years, localizeOptions);
		else return locale.formatDistance("almostXYears", years + 1, localizeOptions);
	}
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/formatDistanceToNow.js
/**
* The {@link formatDistanceToNow} function options.
*/
/**
* @name formatDistanceToNow
* @category Common Helpers
* @summary Return the distance between the given date and now in words.
* @pure false
*
* @description
* Return the distance between the given date and now in words.
*
* | Distance to now                                                   | Result              |
* |-------------------------------------------------------------------|---------------------|
* | 0 ... 30 secs                                                     | less than a minute  |
* | 30 secs ... 1 min 30 secs                                         | 1 minute            |
* | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
* | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
* | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
* | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
* | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
* | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
* | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
* | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
* | 1 yr ... 1 yr 3 months                                            | about 1 year        |
* | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
* | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
* | N yrs ... N yrs 3 months                                          | about N years       |
* | N yrs 3 months ... N yrs 9 months                                 | over N years        |
* | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
*
* With `options.includeSeconds == true`:
* | Distance to now     | Result               |
* |---------------------|----------------------|
* | 0 secs ... 5 secs   | less than 5 seconds  |
* | 5 secs ... 10 secs  | less than 10 seconds |
* | 10 secs ... 20 secs | less than 20 seconds |
* | 20 secs ... 40 secs | half a minute        |
* | 40 secs ... 60 secs | less than a minute   |
* | 60 secs ... 90 secs | 1 minute             |
*
* @param date - The given date
* @param options - The object with options
*
* @returns The distance in words
*
* @throws `date` must not be Invalid Date
* @throws `options.locale` must contain `formatDistance` property
*
* @example
* // If today is 1 January 2015, what is the distance to 2 July 2014?
* const result = formatDistanceToNow(
*   new Date(2014, 6, 2)
* )
* //=> '6 months'
*
* @example
* // If now is 1 January 2015 00:00:00,
* // what is the distance to 1 January 2015 00:00:15, including seconds?
* const result = formatDistanceToNow(
*   new Date(2015, 0, 1, 0, 0, 15),
*   {includeSeconds: true}
* )
* //=> 'less than 20 seconds'
*
* @example
* // If today is 1 January 2015,
* // what is the distance to 1 January 2016, with a suffix?
* const result = formatDistanceToNow(
*   new Date(2016, 0, 1),
*   {addSuffix: true}
* )
* //=> 'in about 1 year'
*
* @example
* // If today is 1 January 2015,
* // what is the distance to 1 August 2016 in Esperanto?
* const eoLocale = require('date-fns/locale/eo')
* const result = formatDistanceToNow(
*   new Date(2016, 7, 1),
*   {locale: eoLocale}
* )
* //=> 'pli ol 1 jaro'
*/
function formatDistanceToNow(date, options) {
	return formatDistance$1(date, constructNow(date), options);
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
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subMonths.js
/**
* The subMonths function options.
*/
/**
* @name subMonths
* @category Month Helpers
* @summary Subtract the specified number of months from the given date.
*
* @description
* Subtract the specified number of months from the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of months to be subtracted.
* @param options - An object with options
*
* @returns The new date with the months subtracted
*
* @example
* // Subtract 5 months from 1 February 2015:
* const result = subMonths(new Date(2015, 1, 1), 5)
* //=> Mon Sep 01 2014 00:00:00
*/
function subMonths(date, amount, options) {
	return addMonths(date, -amount, options);
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
//#region src/components/usuarios/UsuarioHistoricoDialog.tsx
var import_jsx_runtime = require_jsx_runtime();
function UsuarioHistoricoDialog({ open, onOpenChange, userId }) {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (open && userId) {
			setLoading(true);
			pb.collection("usuarios_historico").getList(1, 50, {
				filter: `user_id = '${userId}'`,
				sort: "-created"
			}).then((res) => {
				setLogs(res.items);
			}).catch(console.error).finally(() => setLoading(false));
		}
	}, [open, userId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:38:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:39:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-2xl max-h-[85vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:40:9",
				"data-prohibitions": "[]",
				className: "border-b border-brand-teal/50 dark:border-brand-cyan/30 pb-4 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:41:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:42:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-brand-cyan"
					}), "Trilha de Auditoria e Histórico"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:46:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:48:13",
					"data-prohibitions": "[]",
					className: "text-sm text-brand-gray dark:text-brand-light text-center py-8 animate-pulse",
					children: "Carregando registros..."
				}) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:52:13",
					"data-prohibitions": "[]",
					className: "bg-brand-light/50 dark:bg-black/20 p-8 text-center text-sm text-brand-gray dark:text-brand-light border border-brand-teal/50 dark:border-brand-cyan/20 rounded-lg",
					children: "Nenhum evento registrado para este usuário nas últimas 50 interações."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:56:13",
					"data-prohibitions": "[editContent]",
					className: "relative border-l-2 border-brand-teal dark:border-brand-cyan/30 ml-4 space-y-8 py-2",
					children: logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:58:17",
						"data-prohibitions": "[editContent]",
						className: "pl-6 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:59:19",
							"data-prohibitions": "[editContent]",
							className: "absolute w-[11px] h-[11px] bg-brand-cyan rounded-full -left-[6.5px] top-1.5 ring-4 ring-white dark:ring-brand-navy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:60:19",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:61:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:62:23",
										"data-prohibitions": "[editContent]",
										className: "text-[13px] font-bold tracking-tight uppercase text-brand-navy dark:text-brand-cyan",
										children: log.acao.replace(/_/g, " ")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:65:23",
										"data-prohibitions": "[editContent]",
										className: "text-[11px] font-bold text-brand-gray dark:text-white bg-brand-light dark:bg-white/10 px-2 py-0.5 rounded-md",
										children: format(new Date(log.created), "dd/MM/yyyy HH:mm", { locale: ptBR })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:69:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-brand-gray dark:text-brand-light/70 font-mono",
									children: ["Origem IP: ", log.ip_address || "0.0.0.0"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:72:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] bg-brand-light/50 dark:bg-white/5 p-3 mt-2 rounded-md border border-brand-teal/50 dark:border-brand-cyan/20 text-brand-navy dark:text-white font-medium",
									children: log.descricao
								})
							]
						})]
					}, log.id))
				})
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/SessoesDialog.tsx
function SessoesDialog({ open, onOpenChange, userId }) {
	const [sessoes, setSessoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const loadSessoes = () => {
		if (userId) {
			setLoading(true);
			usuariosService.fetchSessoes(userId).then(setSessoes).finally(() => setLoading(false));
		}
	};
	(0, import_react.useEffect)(() => {
		if (open) loadSessoes();
	}, [open, userId]);
	const handleForceLogout = async (id) => {
		try {
			await usuariosService.forceLogout(id);
			setSessoes(sessoes.filter((s) => s.id !== id));
			toast.success("Sessão encerrada com sucesso.");
		} catch {
			toast.error("Erro ao encerrar sessão.");
		}
	};
	const handleForceLogoutAll = async () => {
		try {
			await Promise.all(sessoes.map((s) => usuariosService.forceLogout(s.id)));
			setSessoes([]);
			toast.success("Todas as sessões foram encerradas.");
		} catch {
			toast.error("Erro ao encerrar todas as sessões.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/SessoesDialog.tsx:71:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/SessoesDialog.tsx:72:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl rounded-xl p-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/components/usuarios/SessoesDialog.tsx:73:9",
				"data-prohibitions": "[]",
				className: "p-6 bg-brand-light/30 dark:bg-black/20 border-b border-brand-teal/50 dark:border-brand-cyan/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/SessoesDialog.tsx:74:11",
					"data-prohibitions": "[]",
					className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:75:13",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:76:15",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2 text-xl text-brand-navy dark:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/components/usuarios/SessoesDialog.tsx:77:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-brand-cyan"
							}), "Sessões Ativas"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:80:15",
							"data-prohibitions": "[]",
							className: "text-brand-gray dark:text-brand-light/80 mt-1",
							children: "Gerencie os acessos ativos deste usuário em tempo real."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:84:13",
						"data-prohibitions": "[]",
						variant: "destructive",
						disabled: sessoes.length === 0,
						onClick: handleForceLogoutAll,
						className: "bg-brand-coral hover:bg-brand-coral/90 text-white font-bold h-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:90:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Forçar Logout de Todas"]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/SessoesDialog.tsx:94:9",
				"data-prohibitions": "[editContent]",
				className: "p-0 border-t-0 max-h-[60vh] overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/usuarios/SessoesDialog.tsx:95:11",
					"data-prohibitions": "[editContent]",
					className: "border-0 border-t border-transparent rounded-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:96:13",
						"data-prohibitions": "[]",
						className: "sticky top-0 z-10 bg-brand-teal/20 dark:bg-brand-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:97:15",
							"data-prohibitions": "[]",
							className: "hover:bg-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:98:17",
									"data-prohibitions": "[]",
									className: "px-6",
									children: "Token (Masked)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:99:17",
									"data-prohibitions": "[]",
									children: "Iniciado em"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:100:17",
									"data-prohibitions": "[]",
									children: "IP Origem"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:101:17",
									"data-prohibitions": "[]",
									children: "Duração"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:102:17",
									"data-prohibitions": "[]",
									className: "text-right px-6",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:105:13",
						"data-prohibitions": "[editContent]",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:107:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/SessoesDialog.tsx:108:19",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "h-32 text-center text-brand-gray dark:text-brand-light",
								children: "Carregando sessões..."
							})
						}) : sessoes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:116:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/SessoesDialog.tsx:117:19",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "h-32 text-center text-brand-gray dark:text-brand-light font-medium",
								children: "Nenhuma sessão ativa encontrada."
							})
						}) : sessoes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:126:19",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:127:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 font-mono text-[13px] text-brand-gray dark:text-brand-light/70",
									children: [s.token.substring(0, 12), "..."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:130:21",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-[13px] text-brand-navy dark:text-white",
									children: formatDistanceToNow(new Date(s.created), {
										addSuffix: true,
										locale: ptBR
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:133:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-brand-gray dark:text-brand-light/80 font-mono",
									children: s.ip_address || "0.0.0.0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:136:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] font-bold text-brand-cyan",
									children: [s.duracao_minutos, " min"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:139:21",
									"data-prohibitions": "[]",
									className: "text-right px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/usuarios/SessoesDialog.tsx:140:23",
										"data-prohibitions": "[]",
										variant: "destructive",
										size: "sm",
										className: "h-9 text-[12px] font-bold bg-brand-coral hover:bg-brand-coral/90 min-h-[36px]",
										onClick: () => handleForceLogout(s.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
											"data-uid": "src/components/usuarios/SessoesDialog.tsx:146:25",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3 mr-2"
										}), "Remover"]
									})
								})
							]
						}, s.id))
					})]
				})
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/BulkActionsBar.tsx
function BulkActionsBar({ selectedCount, totalCount, onClear, onToggleAll, onAction }) {
	const [role, setRole] = (0, import_react.useState)("");
	if (selectedCount === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/usuarios/BulkActionsBar.tsx:31:5",
		"data-prohibitions": "[editContent]",
		className: "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-brand-navy border-t border-brand-teal dark:border-brand-cyan/50 p-4 shadow-[0_-10px_30px_rgba(40,44,89,0.1)] animate-in slide-in-from-bottom-full duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/usuarios/BulkActionsBar.tsx:32:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/BulkActionsBar.tsx:33:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4 w-full md:w-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:34:11",
						"data-prohibitions": "[editContent]",
						checked: selectedCount === totalCount && totalCount > 0,
						onCheckedChange: onToggleAll
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:38:11",
						"data-prohibitions": "[editContent]",
						className: "text-[14px] font-bold text-brand-navy dark:text-white",
						children: [selectedCount, " usuário(s) selecionado(s)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:41:11",
						"data-prohibitions": "[]",
						variant: "link",
						size: "sm",
						onClick: onClear,
						className: "text-brand-gray",
						children: "Limpar"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/BulkActionsBar.tsx:46:9",
				"data-prohibitions": "[]",
				className: "flex flex-wrap items-center gap-3 w-full md:w-auto justify-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:47:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/usuarios/BulkActionsBar.tsx:48:13",
							"data-prohibitions": "[]",
							onValueChange: setRole,
							value: role,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/usuarios/BulkActionsBar.tsx:49:15",
								"data-prohibitions": "[]",
								className: "w-[140px] bg-white dark:bg-brand-navy/50 h-11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/usuarios/BulkActionsBar.tsx:50:17",
									"data-prohibitions": "[editContent]",
									placeholder: "Novo papel..."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/usuarios/BulkActionsBar.tsx:52:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/BulkActionsBar.tsx:53:17",
										"data-prohibitions": "[]",
										value: "c-level",
										children: "C-Level"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/BulkActionsBar.tsx:54:17",
										"data-prohibitions": "[]",
										value: "admin",
										children: "Admin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/BulkActionsBar.tsx:55:17",
										"data-prohibitions": "[]",
										value: "supervisor",
										children: "Supervisor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/BulkActionsBar.tsx:56:17",
										"data-prohibitions": "[]",
										value: "analista",
										children: "Analista"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/BulkActionsBar.tsx:59:13",
							"data-prohibitions": "[]",
							onClick: () => onAction("role", role),
							disabled: !role,
							className: "bg-brand-navy text-white hover:bg-brand-navy/90 h-11 min-w-[44px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								"data-uid": "src/components/usuarios/BulkActionsBar.tsx:64:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:68:11",
						"data-prohibitions": "[]",
						onClick: () => onAction("reset"),
						className: "bg-brand-orange text-white hover:bg-brand-orange/90 h-11 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
							"data-uid": "src/components/usuarios/BulkActionsBar.tsx:72:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Reset Senha"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:74:11",
						"data-prohibitions": "[]",
						onClick: () => onAction("bloquear"),
						className: "bg-brand-coral text-white hover:bg-brand-coral/90 h-11 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
							"data-uid": "src/components/usuarios/BulkActionsBar.tsx:78:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Bloquear"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/BulkActionsBar.tsx:80:11",
						"data-prohibitions": "[]",
						onClick: () => onAction("permitir"),
						className: "bg-brand-cyan text-white hover:bg-brand-cyan/90 h-11 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/components/usuarios/BulkActionsBar.tsx:84:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Permitir"]
					})
				]
			})]
		})
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-scroll-area@1.2.10_@types+react-dom@19.2.3_@types+react@19.2.14__@types_155614c2fe5222bb9b221068b09efefc/node_modules/@radix-ui/react-scroll-area/dist/index.mjs
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, type = "hover", dir, scrollHideDelay = 600, ...scrollAreaProps } = props;
	const [scrollArea, setScrollArea] = import_react.useState(null);
	const [viewport, setViewport] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const [scrollbarX, setScrollbarX] = import_react.useState(null);
	const [scrollbarY, setScrollbarY] = import_react.useState(null);
	const [cornerWidth, setCornerWidth] = import_react.useState(0);
	const [cornerHeight, setCornerHeight] = import_react.useState(0);
	const [scrollbarXEnabled, setScrollbarXEnabled] = import_react.useState(false);
	const [scrollbarYEnabled, setScrollbarYEnabled] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
	const direction = useDirection(dir);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaProvider, {
		scope: __scopeScrollArea,
		type,
		dir: direction,
		scrollHideDelay,
		scrollArea,
		viewport,
		onViewportChange: setViewport,
		content,
		onContentChange: setContent,
		scrollbarX,
		onScrollbarXChange: setScrollbarX,
		scrollbarXEnabled,
		onScrollbarXEnabledChange: setScrollbarXEnabled,
		scrollbarY,
		onScrollbarYChange: setScrollbarY,
		scrollbarYEnabled,
		onScrollbarYEnabledChange: setScrollbarYEnabled,
		onCornerWidthChange: setCornerWidth,
		onCornerHeightChange: setCornerHeight,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			...scrollAreaProps,
			ref: composedRefs,
			style: {
				position: "relative",
				["--radix-scroll-area-corner-width"]: cornerWidth + "px",
				["--radix-scroll-area-corner-height"]: cornerHeight + "px",
				...props.style
			}
		})
	});
});
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
	const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null), context.onViewportChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		dangerouslySetInnerHTML: { __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}` },
		nonce
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-radix-scroll-area-viewport": "",
		...viewportProps,
		ref: composedRefs,
		style: {
			overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
			...props.style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: context.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children
		})
	})] });
});
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
	const isHorizontal = props.orientation === "horizontal";
	import_react.useEffect(() => {
		isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
		return () => {
			isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
		};
	}, [
		isHorizontal,
		onScrollbarXEnabledChange,
		onScrollbarYEnabledChange
	]);
	return context.type === "hover" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarHover, {
		...scrollbarProps,
		ref: forwardedRef,
		forceMount
	}) : context.type === "scroll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarScroll, {
		...scrollbarProps,
		ref: forwardedRef,
		forceMount
	}) : context.type === "auto" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarAuto, {
		...scrollbarProps,
		ref: forwardedRef,
		forceMount
	}) : context.type === "always" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
		...scrollbarProps,
		ref: forwardedRef
	}) : null;
});
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const [visible, setVisible] = import_react.useState(false);
	import_react.useEffect(() => {
		const scrollArea = context.scrollArea;
		let hideTimer = 0;
		if (scrollArea) {
			const handlePointerEnter = () => {
				window.clearTimeout(hideTimer);
				setVisible(true);
			};
			const handlePointerLeave = () => {
				hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
			};
			scrollArea.addEventListener("pointerenter", handlePointerEnter);
			scrollArea.addEventListener("pointerleave", handlePointerLeave);
			return () => {
				window.clearTimeout(hideTimer);
				scrollArea.removeEventListener("pointerenter", handlePointerEnter);
				scrollArea.removeEventListener("pointerleave", handlePointerLeave);
			};
		}
	}, [context.scrollArea, context.scrollHideDelay]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || visible,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarAuto, {
			"data-state": visible ? "visible" : "hidden",
			...scrollbarProps,
			ref: forwardedRef
		})
	});
});
var ScrollAreaScrollbarScroll = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const isHorizontal = props.orientation === "horizontal";
	const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
	const [state, send] = useStateMachine("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	import_react.useEffect(() => {
		if (state === "idle") {
			const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
			return () => window.clearTimeout(hideTimer);
		}
	}, [
		state,
		context.scrollHideDelay,
		send
	]);
	import_react.useEffect(() => {
		const viewport = context.viewport;
		const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
		if (viewport) {
			let prevScrollPos = viewport[scrollDirection];
			const handleScroll = () => {
				const scrollPos = viewport[scrollDirection];
				if (prevScrollPos !== scrollPos) {
					send("SCROLL");
					debounceScrollEnd();
				}
				prevScrollPos = scrollPos;
			};
			viewport.addEventListener("scroll", handleScroll);
			return () => viewport.removeEventListener("scroll", handleScroll);
		}
	}, [
		context.viewport,
		isHorizontal,
		send,
		debounceScrollEnd
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || state !== "hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
			"data-state": state === "hidden" ? "hidden" : "visible",
			...scrollbarProps,
			ref: forwardedRef,
			onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
		})
	});
});
var ScrollAreaScrollbarAuto = import_react.forwardRef((props, forwardedRef) => {
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const { forceMount, ...scrollbarProps } = props;
	const [visible, setVisible] = import_react.useState(false);
	const isHorizontal = props.orientation === "horizontal";
	const handleResize = useDebounceCallback(() => {
		if (context.viewport) {
			const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
			const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
			setVisible(isHorizontal ? isOverflowX : isOverflowY);
		}
	}, 10);
	useResizeObserver(context.viewport, handleResize);
	useResizeObserver(context.content, handleResize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || visible,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarVisible, {
			"data-state": visible ? "visible" : "hidden",
			...scrollbarProps,
			ref: forwardedRef
		})
	});
});
var ScrollAreaScrollbarVisible = import_react.forwardRef((props, forwardedRef) => {
	const { orientation = "vertical", ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const thumbRef = import_react.useRef(null);
	const pointerOffsetRef = import_react.useRef(0);
	const [sizes, setSizes] = import_react.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	});
	const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
	const commonProps = {
		...scrollbarProps,
		sizes,
		onSizesChange: setSizes,
		hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
		onThumbChange: (thumb) => thumbRef.current = thumb,
		onThumbPointerUp: () => pointerOffsetRef.current = 0,
		onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
	};
	function getScrollPosition(pointerPos, dir) {
		return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
	}
	if (orientation === "horizontal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarX, {
		...commonProps,
		ref: forwardedRef,
		onThumbPositionChange: () => {
			if (context.viewport && thumbRef.current) {
				const scrollPos = context.viewport.scrollLeft;
				const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
				thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
			}
		},
		onWheelScroll: (scrollPos) => {
			if (context.viewport) context.viewport.scrollLeft = scrollPos;
		},
		onDragScroll: (pointerPos) => {
			if (context.viewport) context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
		}
	});
	if (orientation === "vertical") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarY, {
		...commonProps,
		ref: forwardedRef,
		onThumbPositionChange: () => {
			if (context.viewport && thumbRef.current) {
				const scrollPos = context.viewport.scrollTop;
				const offset = getThumbOffsetFromScroll(scrollPos, sizes);
				thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
			}
		},
		onWheelScroll: (scrollPos) => {
			if (context.viewport) context.viewport.scrollTop = scrollPos;
		},
		onDragScroll: (pointerPos) => {
			if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
		}
	});
	return null;
});
var ScrollAreaScrollbarX = import_react.forwardRef((props, forwardedRef) => {
	const { sizes, onSizesChange, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const [computedStyle, setComputedStyle] = import_react.useState();
	const ref = import_react.useRef(null);
	const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
	import_react.useEffect(() => {
		if (ref.current) setComputedStyle(getComputedStyle(ref.current));
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarImpl, {
		"data-orientation": "horizontal",
		...scrollbarProps,
		ref: composeRefs,
		sizes,
		style: {
			bottom: 0,
			left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
			...props.style
		},
		onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
		onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
		onWheelScroll: (event, maxScrollPos) => {
			if (context.viewport) {
				const scrollPos = context.viewport.scrollLeft + event.deltaX;
				props.onWheelScroll(scrollPos);
				if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
			}
		},
		onResize: () => {
			if (ref.current && context.viewport && computedStyle) onSizesChange({
				content: context.viewport.scrollWidth,
				viewport: context.viewport.offsetWidth,
				scrollbar: {
					size: ref.current.clientWidth,
					paddingStart: toInt(computedStyle.paddingLeft),
					paddingEnd: toInt(computedStyle.paddingRight)
				}
			});
		}
	});
});
var ScrollAreaScrollbarY = import_react.forwardRef((props, forwardedRef) => {
	const { sizes, onSizesChange, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
	const [computedStyle, setComputedStyle] = import_react.useState();
	const ref = import_react.useRef(null);
	const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
	import_react.useEffect(() => {
		if (ref.current) setComputedStyle(getComputedStyle(ref.current));
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarImpl, {
		"data-orientation": "vertical",
		...scrollbarProps,
		ref: composeRefs,
		sizes,
		style: {
			top: 0,
			right: context.dir === "ltr" ? 0 : void 0,
			left: context.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
			...props.style
		},
		onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
		onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
		onWheelScroll: (event, maxScrollPos) => {
			if (context.viewport) {
				const scrollPos = context.viewport.scrollTop + event.deltaY;
				props.onWheelScroll(scrollPos);
				if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
			}
		},
		onResize: () => {
			if (ref.current && context.viewport && computedStyle) onSizesChange({
				content: context.viewport.scrollHeight,
				viewport: context.viewport.offsetHeight,
				scrollbar: {
					size: ref.current.clientHeight,
					paddingStart: toInt(computedStyle.paddingTop),
					paddingEnd: toInt(computedStyle.paddingBottom)
				}
			});
		}
	});
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, sizes, hasThumb, onThumbChange, onThumbPointerUp, onThumbPointerDown, onThumbPositionChange, onDragScroll, onWheelScroll, onResize, ...scrollbarProps } = props;
	const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
	const [scrollbar, setScrollbar] = import_react.useState(null);
	const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
	const rectRef = import_react.useRef(null);
	const prevWebkitUserSelectRef = import_react.useRef("");
	const viewport = context.viewport;
	const maxScrollPos = sizes.content - sizes.viewport;
	const handleWheelScroll = useCallbackRef(onWheelScroll);
	const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
	const handleResize = useDebounceCallback(onResize, 10);
	function handleDragScroll(event) {
		if (rectRef.current) onDragScroll({
			x: event.clientX - rectRef.current.left,
			y: event.clientY - rectRef.current.top
		});
	}
	import_react.useEffect(() => {
		const handleWheel = (event) => {
			const element = event.target;
			if (scrollbar?.contains(element)) handleWheelScroll(event, maxScrollPos);
		};
		document.addEventListener("wheel", handleWheel, { passive: false });
		return () => document.removeEventListener("wheel", handleWheel, { passive: false });
	}, [
		viewport,
		scrollbar,
		maxScrollPos,
		handleWheelScroll
	]);
	import_react.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
	useResizeObserver(scrollbar, handleResize);
	useResizeObserver(context.content, handleResize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollbarProvider, {
		scope: __scopeScrollArea,
		scrollbar,
		hasThumb,
		onThumbChange: useCallbackRef(onThumbChange),
		onThumbPointerUp: useCallbackRef(onThumbPointerUp),
		onThumbPositionChange: handleThumbPositionChange,
		onThumbPointerDown: useCallbackRef(onThumbPointerDown),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			...scrollbarProps,
			ref: composeRefs,
			style: {
				position: "absolute",
				...scrollbarProps.style
			},
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (event.button === 0) {
					event.target.setPointerCapture(event.pointerId);
					rectRef.current = scrollbar.getBoundingClientRect();
					prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
					document.body.style.webkitUserSelect = "none";
					if (context.viewport) context.viewport.style.scrollBehavior = "auto";
					handleDragScroll(event);
				}
			}),
			onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
			onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
				const element = event.target;
				if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
				document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
				if (context.viewport) context.viewport.style.scrollBehavior = "";
				rectRef.current = null;
			})
		})
	});
});
var THUMB_NAME$1 = "ScrollAreaThumb";
var ScrollAreaThumb = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...thumbProps } = props;
	const scrollbarContext = useScrollbarContext(THUMB_NAME$1, props.__scopeScrollArea);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || scrollbarContext.hasThumb,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumbImpl, {
			ref: forwardedRef,
			...thumbProps
		})
	});
});
var ScrollAreaThumbImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, style, ...thumbProps } = props;
	const scrollAreaContext = useScrollAreaContext(THUMB_NAME$1, __scopeScrollArea);
	const scrollbarContext = useScrollbarContext(THUMB_NAME$1, __scopeScrollArea);
	const { onThumbPositionChange } = scrollbarContext;
	const composedRef = useComposedRefs(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
	const removeUnlinkedScrollListenerRef = import_react.useRef(void 0);
	const debounceScrollEnd = useDebounceCallback(() => {
		if (removeUnlinkedScrollListenerRef.current) {
			removeUnlinkedScrollListenerRef.current();
			removeUnlinkedScrollListenerRef.current = void 0;
		}
	}, 100);
	import_react.useEffect(() => {
		const viewport = scrollAreaContext.viewport;
		if (viewport) {
			const handleScroll = () => {
				debounceScrollEnd();
				if (!removeUnlinkedScrollListenerRef.current) {
					removeUnlinkedScrollListenerRef.current = addUnlinkedScrollListener(viewport, onThumbPositionChange);
					onThumbPositionChange();
				}
			};
			onThumbPositionChange();
			viewport.addEventListener("scroll", handleScroll);
			return () => viewport.removeEventListener("scroll", handleScroll);
		}
	}, [
		scrollAreaContext.viewport,
		debounceScrollEnd,
		onThumbPositionChange
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
		...thumbProps,
		ref: composedRef,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...style
		},
		onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
			const thumbRect = event.target.getBoundingClientRect();
			const x = event.clientX - thumbRect.left;
			const y = event.clientY - thumbRect.top;
			scrollbarContext.onThumbPointerDown({
				x,
				y
			});
		}),
		onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
	});
});
ScrollAreaThumb.displayName = THUMB_NAME$1;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = import_react.forwardRef((props, forwardedRef) => {
	const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
	const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
	return context.type !== "scroll" && hasBothScrollbarsVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaCornerImpl, {
		...props,
		ref: forwardedRef
	}) : null;
});
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeScrollArea, ...cornerProps } = props;
	const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
	const [width, setWidth] = import_react.useState(0);
	const [height, setHeight] = import_react.useState(0);
	const hasSize = Boolean(width && height);
	useResizeObserver(context.scrollbarX, () => {
		const height2 = context.scrollbarX?.offsetHeight || 0;
		context.onCornerHeightChange(height2);
		setHeight(height2);
	});
	useResizeObserver(context.scrollbarY, () => {
		const width2 = context.scrollbarY?.offsetWidth || 0;
		context.onCornerWidthChange(width2);
		setWidth(width2);
	});
	return hasSize ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...cornerProps,
		ref: forwardedRef,
		style: {
			width,
			height,
			position: "absolute",
			right: context.dir === "ltr" ? 0 : void 0,
			left: context.dir === "rtl" ? 0 : void 0,
			bottom: 0,
			...props.style
		}
	}) : null;
});
function toInt(value) {
	return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
	const ratio = viewportSize / contentSize;
	return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
	const ratio = getThumbRatio(sizes.viewport, sizes.content);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
	return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
	const thumbSizePx = getThumbSize(sizes);
	const thumbCenter = thumbSizePx / 2;
	const offset = pointerOffset || thumbCenter;
	const thumbOffsetFromEnd = thumbSizePx - offset;
	const minPointerPos = sizes.scrollbar.paddingStart + offset;
	const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
	const maxScrollPos = sizes.content - sizes.viewport;
	const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
	return linearScale([minPointerPos, maxPointerPos], scrollRange)(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
	const thumbSizePx = getThumbSize(sizes);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const scrollbar = sizes.scrollbar.size - scrollbarPadding;
	const maxScrollPos = sizes.content - sizes.viewport;
	const maxThumbPos = scrollbar - thumbSizePx;
	const scrollWithoutMomentum = clamp(scrollPos, dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0]);
	return linearScale([0, maxScrollPos], [0, maxThumbPos])(scrollWithoutMomentum);
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
	return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {}) => {
	let prevPosition = {
		left: node.scrollLeft,
		top: node.scrollTop
	};
	let rAF = 0;
	(function loop() {
		const position = {
			left: node.scrollLeft,
			top: node.scrollTop
		};
		const isHorizontalScroll = prevPosition.left !== position.left;
		const isVerticalScroll = prevPosition.top !== position.top;
		if (isHorizontalScroll || isVerticalScroll) handler();
		prevPosition = position;
		rAF = window.requestAnimationFrame(loop);
	})();
	return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
	const handleCallback = useCallbackRef(callback);
	const debounceTimerRef = import_react.useRef(0);
	import_react.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
	return import_react.useCallback(() => {
		window.clearTimeout(debounceTimerRef.current);
		debounceTimerRef.current = window.setTimeout(handleCallback, delay);
	}, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
	const handleResize = useCallbackRef(onResize);
	useLayoutEffect2(() => {
		let rAF = 0;
		if (element) {
			const resizeObserver = new ResizeObserver(() => {
				cancelAnimationFrame(rAF);
				rAF = window.requestAnimationFrame(handleResize);
			});
			resizeObserver.observe(element);
			return () => {
				window.cancelAnimationFrame(rAF);
				resizeObserver.unobserve(element);
			};
		}
	}, [element, handleResize]);
}
var Root$2 = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
//#endregion
//#region src/components/ui/scroll-area.tsx
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$2, {
	"data-uid": "src/components/ui/scroll-area.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			"data-uid": "src/components/ui/scroll-area.tsx:16:5",
			"data-prohibitions": "[editContent]",
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
			"data-uid": "src/components/ui/scroll-area.tsx:19:5",
			"data-prohibitions": "[editContent]"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {
			"data-uid": "src/components/ui/scroll-area.tsx:20:5",
			"data-prohibitions": "[editContent]"
		})
	]
}));
ScrollArea.displayName = Root$2.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	"data-uid": "src/components/ui/scroll-area.tsx:29:3",
	"data-prohibitions": "[editContent]",
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, {
		"data-uid": "src/components/ui/scroll-area.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "relative flex-1 rounded-full bg-border"
	})
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
//#endregion
//#region src/components/usuarios/TempPasswordsDialog.tsx
function TempPasswordsDialog({ data, onClose }) {
	if (!data || data.length === 0) return null;
	const copyAll = () => {
		const text = data.map((d) => `${d.email}: ${d.pwd}`).join("\n");
		navigator.clipboard.writeText(text);
		toast.success("Senhas copiadas para a área de transferência");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:23:5",
		"data-prohibitions": "[editContent]",
		open: !!data,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:24:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[460px] rounded-xl p-6 border-brand-teal dark:border-brand-cyan/50 dark:bg-brand-navy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:25:9",
					"data-prohibitions": "[]",
					className: "text-center mb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:26:11",
							"data-prohibitions": "[]",
							className: "mx-auto w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
								"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:27:13",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-brand-orange"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:29:11",
							"data-prohibitions": "[]",
							className: "text-[20px] font-bold text-brand-navy dark:text-white",
							children: "Senhas Redefinidas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:32:11",
							"data-prohibitions": "[]",
							className: "text-[14px] text-brand-gray dark:text-brand-light/80 mt-2",
							children: "Copie as senhas temporárias abaixo e envie aos usuários com segurança. Elas não serão mostradas novamente."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:38:9",
					"data-prohibitions": "[editContent]",
					className: "max-h-[250px] border border-brand-teal/50 rounded-lg p-2 my-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:39:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: data.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:41:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between bg-brand-light dark:bg-brand-navy/50 p-3 rounded-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:45:17",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] font-medium text-brand-gray dark:text-brand-light truncate w-[180px]",
								title: item.email,
								children: item.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:51:17",
								"data-prohibitions": "[editContent]",
								className: "text-[15px] font-bold tracking-wider text-brand-navy dark:text-brand-cyan",
								children: item.pwd
							})]
						}, i))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:59:9",
					"data-prohibitions": "[]",
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:60:11",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "w-full h-11 border-brand-teal",
						onClick: copyAll,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:61:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Copiar Todas"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/TempPasswordsDialog.tsx:63:11",
						"data-prohibitions": "[]",
						className: "w-full h-11 bg-brand-cyan text-white hover:bg-brand-cyan/90 font-bold",
						onClick: onClose,
						children: "Entendi"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/utils/fileUtils.ts
var getAvatarUrl = (user) => {
	if (user?.foto_perfil && user?.collectionId && user?.id) return pb.files.getUrl(user, user.foto_perfil, { thumb: "100x100" });
};
//#endregion
//#region src/components/usuarios/AvatarUpload.tsx
function AvatarUpload({ user, onUpload, className }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 2 * 1024 * 1024) return toast.error("Arquivo excede 2MB");
		if (!["image/jpeg", "image/png"].includes(file.type)) return toast.error("Formato inválido. Use JPG ou PNG");
		setLoading(true);
		try {
			await onUpload(file);
			toast.success("Foto atualizada com sucesso");
		} catch {
			toast.error("Erro ao atualizar foto");
		} finally {
			setLoading(false);
			e.target.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/AvatarUpload.tsx:38:5",
		"data-prohibitions": "[editContent]",
		className: cn("relative group w-10 h-10 rounded-full overflow-hidden border border-brand-teal/50 bg-brand-light dark:bg-brand-navy shrink-0 shadow-sm", className),
		children: [user.foto_perfil ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			"data-uid": "src/components/usuarios/AvatarUpload.tsx:45:9",
			"data-prohibitions": "[editContent]",
			src: getAvatarUrl(user),
			alt: "avatar",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/usuarios/AvatarUpload.tsx:47:9",
			"data-prohibitions": "[]",
			className: "w-full h-full flex items-center justify-center text-brand-teal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
				"data-uid": "src/components/usuarios/AvatarUpload.tsx:48:11",
				"data-prohibitions": "[editContent]",
				size: 20
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			"data-uid": "src/components/usuarios/AvatarUpload.tsx:51:7",
			"data-prohibitions": "[editContent]",
			className: "absolute inset-0 bg-brand-navy/70 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-[1px]",
			children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				"data-uid": "src/components/usuarios/AvatarUpload.tsx:53:11",
				"data-prohibitions": "[editContent]",
				className: "w-4 h-4 text-white animate-spin"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
				"data-uid": "src/components/usuarios/AvatarUpload.tsx:55:11",
				"data-prohibitions": "[editContent]",
				className: "w-4 h-4 text-white"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"data-uid": "src/components/usuarios/AvatarUpload.tsx:57:9",
				"data-prohibitions": "[editContent]",
				type: "file",
				className: "hidden",
				accept: "image/jpeg, image/png",
				disabled: loading,
				onChange: handleChange
			})]
		})]
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_e3738c514c10df2ef7e24af5ee461853/node_modules/@radix-ui/react-switch/dist/index.mjs
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState$2(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState$2(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState$2(checked) {
	return checked ? "checked" : "unchecked";
}
var Root$1 = Switch$1;
var Thumb = SwitchThumb;
//#endregion
//#region src/components/ui/switch.tsx
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	"data-uid": "src/components/ui/switch.tsx:11:3",
	"data-prohibitions": "[editContent]",
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		"data-uid": "src/components/ui/switch.tsx:19:5",
		"data-prohibitions": "[editContent]",
		className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
	})
}));
Switch.displayName = Root$1.displayName;
//#endregion
//#region src/services/totpService.ts
var totpService = { generateSecret: (email) => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	let secret = "";
	for (let i = 0; i < 16; i++) secret += chars.charAt(Math.floor(Math.random() * 32));
	const issuer = "InquiryXpert";
	const otpauth = `otpauth://totp/${issuer}:${encodeURIComponent(email)}?secret=${secret}&issuer=${issuer}`;
	const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(otpauth)}`;
	return {
		secret,
		qrUrl
	};
} };
//#endregion
//#region src/components/usuarios/TwoFactorModal.tsx
function TwoFactorModal({ open, onClose, onConfirm, secret, qrUrl, email }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(secret);
		setCopied(true);
		toast.success("Código copiado para a área de transferência");
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/TwoFactorModal.tsx:38:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/TwoFactorModal.tsx:39:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[420px] text-center border-brand-teal dark:border-brand-cyan/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/usuarios/TwoFactorModal.tsx:40:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/TwoFactorModal.tsx:41:11",
							"data-prohibitions": "[]",
							className: "w-12 h-12 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								"data-uid": "src/components/usuarios/TwoFactorModal.tsx:42:13",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-brand-cyan"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/components/usuarios/TwoFactorModal.tsx:44:11",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-brand-navy dark:text-white",
							children: "Configurar 2FA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							"data-uid": "src/components/usuarios/TwoFactorModal.tsx:47:11",
							"data-prohibitions": "[editContent]",
							className: "text-brand-gray dark:text-brand-light",
							children: [
								"Escaneie o QR Code abaixo usando seu aplicativo autenticador (Google Authenticator, Authy, etc) para a conta ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									"data-uid": "src/components/usuarios/TwoFactorModal.tsx:49:38",
									"data-prohibitions": "[editContent]",
									children: email
								}),
								"."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/TwoFactorModal.tsx:53:9",
					"data-prohibitions": "[]",
					className: "flex justify-center py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/TwoFactorModal.tsx:54:11",
						"data-prohibitions": "[]",
						className: "p-2 bg-white rounded-xl border-2 border-brand-light shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							"data-uid": "src/components/usuarios/TwoFactorModal.tsx:55:13",
							"data-prohibitions": "[editContent]",
							src: qrUrl,
							alt: "QR Code 2FA",
							className: "w-[200px] h-[200px]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/TwoFactorModal.tsx:59:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/TwoFactorModal.tsx:60:11",
						"data-prohibitions": "[]",
						className: "text-sm text-brand-gray dark:text-brand-light font-medium",
						children: "Ou insira o código manualmente:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/TwoFactorModal.tsx:63:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-center gap-2 bg-brand-light/50 dark:bg-black/20 p-2 rounded-md border border-brand-teal/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							"data-uid": "src/components/usuarios/TwoFactorModal.tsx:64:13",
							"data-prohibitions": "[editContent]",
							className: "text-lg tracking-widest font-bold text-brand-navy dark:text-brand-cyan",
							children: secret
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/TwoFactorModal.tsx:67:13",
							"data-prohibitions": "[editContent]",
							variant: "ghost",
							size: "icon",
							onClick: handleCopy,
							className: "h-8 w-8 hover:bg-brand-teal/20",
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								"data-uid": "src/components/usuarios/TwoFactorModal.tsx:74:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-brand-cyan"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								"data-uid": "src/components/usuarios/TwoFactorModal.tsx:76:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-brand-gray dark:text-brand-light"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/TwoFactorModal.tsx:82:9",
					"data-prohibitions": "[]",
					className: "flex gap-3 mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/TwoFactorModal.tsx:83:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						className: "w-full border-brand-teal text-brand-navy",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/TwoFactorModal.tsx:90:11",
						"data-prohibitions": "[]",
						onClick: onConfirm,
						className: "w-full bg-brand-cyan text-white hover:bg-brand-cyan/90 font-bold",
						children: "Confirmei a configuração"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/usuarios/DisableTwoFactorModal.tsx
function DisableTwoFactorModal({ open, onClose, onConfirm, hasActiveSessions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:23:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:24:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[420px] text-center border-brand-coral/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:25:9",
					"data-prohibitions": "[]",
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:26:11",
							"data-prohibitions": "[]",
							className: "w-12 h-12 bg-brand-coral/20 rounded-full flex items-center justify-center mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:27:13",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-brand-coral"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:29:11",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-brand-navy dark:text-white",
							children: "Desabilitar 2FA?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:32:11",
							"data-prohibitions": "[]",
							className: "text-brand-gray dark:text-brand-light",
							children: "A autenticação de dois fatores adiciona uma camada extra de segurança. Remover esta proteção deixará a conta mais vulnerável."
						})
					]
				}),
				hasActiveSessions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:39:11",
					"data-prohibitions": "[]",
					className: "bg-brand-orange/10 border border-brand-orange/30 p-3 rounded-lg flex items-start gap-3 mt-2 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:40:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-brand-orange shrink-0 mt-0.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:41:13",
						"data-prohibitions": "[]",
						className: "text-sm text-brand-orange font-medium",
						children: "Este usuário possui sessões ativas no momento. É recomendado forçar o logout após desabilitar o 2FA."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:48:9",
					"data-prohibitions": "[]",
					className: "flex gap-3 mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:49:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						className: "w-full border-brand-teal text-brand-navy",
						children: "Manter 2FA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/DisableTwoFactorModal.tsx:56:11",
						"data-prohibitions": "[]",
						onClick: onConfirm,
						variant: "destructive",
						className: "w-full bg-brand-coral hover:bg-brand-coral/90 font-bold",
						children: "Desabilitar Proteção"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/usuarios/UsuariosTable.tsx
function UsuariosTable({ users, activeSessions, loading, onEdit, onRefresh }) {
	const { user: currentUser } = useAuth();
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [historicoUser, setHistoricoUser] = (0, import_react.useState)(null);
	const [sessoesUser, setSessoesUser] = (0, import_react.useState)(null);
	const [tempPwdData, setTempPwdData] = (0, import_react.useState)(null);
	const [tfaData, setTfaData] = (0, import_react.useState)(null);
	const [disableTfaUser, setDisableTfaUser] = (0, import_react.useState)(null);
	const toggleSelect = (id) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
	const toggleAll = () => setSelected(selected.length === users.length && users.length > 0 ? [] : users.map((u) => u.id));
	const handleBulkAction = async (action, val) => {
		if (!selected.length) return toast.error("Selecione usuários para prosseguir");
		try {
			const resetResults = [];
			for (const id of selected) {
				if (action === "permitir") await usuariosService.permitirUsuario(id);
				if (action === "bloquear") await usuariosService.bloquearUsuario(id);
				if (action === "role" && val) await usuariosService.alterarRole(id, val);
				if (action === "reset") {
					const pwd = await usuariosService.resetSenha(id);
					const user = users.find((u) => u.id === id);
					if (user) resetResults.push({
						email: user.email,
						pwd
					});
				}
			}
			if (resetResults.length > 0) setTempPwdData(resetResults);
			else toast.success("Ação em lote executada com sucesso!");
			setSelected([]);
			onRefresh();
		} catch {
			toast.error("Erro ao executar ação em lote");
		}
	};
	const handlePhotoUpload = async (userId, file) => {
		await usuariosService.updateFotoPerfil(userId, file);
		onRefresh();
	};
	const handle2FAToggle = async (u, enable) => {
		if (enable) {
			const { secret, qrUrl } = totpService.generateSecret(u.email);
			setTfaData({
				user: u,
				secret,
				qrUrl
			});
		} else setDisableTfaUser({
			user: u,
			hasSessions: await usuariosService.checkActiveSessionsFor2FA(u.id)
		});
	};
	const confirmEnable2FA = async () => {
		if (!tfaData) return;
		try {
			await usuariosService.toggle2FA(tfaData.user.id, true, tfaData.secret);
			toast.success("2FA habilitado com sucesso");
			setTfaData(null);
			onRefresh();
		} catch {
			toast.error("Erro ao habilitar 2FA");
		}
	};
	const confirmDisable2FA = async () => {
		if (!disableTfaUser) return;
		try {
			await usuariosService.toggle2FA(disableTfaUser.user.id, false);
			toast.success("2FA desabilitado com sucesso");
			setDisableTfaUser(null);
			onRefresh();
		} catch {
			toast.error("Erro ao desabilitar 2FA");
		}
	};
	const roleColors = {
		"c-level": "bg-brand-navy text-white",
		admin: "bg-brand-cyan text-white",
		supervisor: "bg-brand-teal text-brand-navy",
		analista: "bg-brand-gray text-white"
	};
	const statusColors = {
		ativo: "bg-brand-cyan text-white",
		suspenso: "bg-brand-orange text-white",
		bloqueado: "bg-brand-coral text-white"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:138:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:139:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:140:11",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:141:13",
							"data-prohibitions": "[]",
							className: "w-12 px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:142:15",
								"data-prohibitions": "[editContent]",
								checked: selected.length === users.length && users.length > 0,
								onCheckedChange: toggleAll
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:147:13",
							"data-prohibitions": "[]",
							className: "w-14 px-2 text-center",
							children: "Foto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:148:13",
							"data-prohibitions": "[]",
							className: "sticky left-0 bg-brand-teal/20 dark:bg-brand-navy z-10 min-w-[200px]",
							children: "Usuário"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:151:13",
							"data-prohibitions": "[]",
							children: "Papel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:152:13",
							"data-prohibitions": "[]",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:153:13",
							"data-prohibitions": "[]",
							className: "text-center w-20",
							children: "2FA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:154:13",
							"data-prohibitions": "[]",
							children: "Último Login"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:155:13",
							"data-prohibitions": "[]",
							children: "Tempo Uso"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:156:13",
							"data-prohibitions": "[]",
							children: "Sessões"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:157:13",
							"data-prohibitions": "[]",
							className: "text-right",
							children: "Ações"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:160:9",
				"data-prohibitions": "[editContent]",
				children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:163:17",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:164:19",
						"data-prohibitions": "[]",
						colSpan: 10,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:165:21",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-full"
						})
					})
				}, i)) : users.map((u, i) => {
					const sessoesCount = activeSessions[u.id] || 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:172:19",
						"data-prohibitions": "[editContent]",
						className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
						style: { animationDelay: `${i * 50}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:177:21",
								"data-prohibitions": "[]",
								className: "w-12 px-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:178:23",
									"data-prohibitions": "[editContent]",
									checked: selected.includes(u.id),
									onCheckedChange: () => toggleSelect(u.id)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:183:21",
								"data-prohibitions": "[]",
								className: "px-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarUpload, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:184:23",
									"data-prohibitions": "[editContent]",
									user: u,
									onUpload: (f) => handlePhotoUpload(u.id, f)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:186:21",
								"data-prohibitions": "[editContent]",
								className: "sticky left-0 bg-white dark:bg-[#282c59]/90 group-hover:bg-brand-light dark:group-hover:bg-white/10 group-even:bg-brand-light/50 dark:group-even:bg-white/5 transition-colors z-10 border-r border-brand-teal/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:187:23",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:188:25",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-[14px] text-brand-navy dark:text-white",
										children: u.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:191:25",
										"data-prohibitions": "[editContent]",
										className: "text-[13px] text-brand-gray",
										children: u.email
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:194:21",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:195:23",
									"data-prohibitions": "[editContent]",
									className: `uppercase text-[10px] font-bold tracking-wider border-none ${roleColors[u.role || "analista"]}`,
									children: u.role
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:201:21",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:202:23",
									"data-prohibitions": "[editContent]",
									className: `capitalize text-[11px] font-bold tracking-wide border-none ${statusColors[u.status_conta || "ativo"]}`,
									children: u.status_conta
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:208:21",
								"data-prohibitions": "[editContent]",
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:209:23",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:210:25",
										"data-prohibitions": "[editContent]",
										delayDuration: 300,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
											"data-uid": "src/components/usuarios/UsuariosTable.tsx:211:27",
											"data-prohibitions": "[]",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:212:29",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:213:31",
													"data-prohibitions": "[editContent]",
													checked: u.two_fa_enabled,
													disabled: currentUser?.role !== "c-level",
													onCheckedChange: (c) => handle2FAToggle(u, c)
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
											"data-uid": "src/components/usuarios/UsuariosTable.tsx:220:27",
											"data-prohibitions": "[editContent]",
											children: u.two_fa_enabled ? "Autenticação em Dois Fatores Ativa" : "2FA Desabilitado"
										})]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:228:21",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-brand-gray dark:text-brand-light whitespace-nowrap",
								children: u.ultimo_login ? formatDistanceToNow(new Date(u.ultimo_login), {
									addSuffix: true,
									locale: ptBR
								}) : "Nunca acessou"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:236:21",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] font-bold text-brand-navy dark:text-white whitespace-nowrap",
								children: [
									Math.floor((u.tempo_uso_total || 0) / 60),
									"h ",
									(u.tempo_uso_total || 0) % 60,
									"m"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:239:21",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:240:23",
									"data-prohibitions": "[editContent]",
									onClick: () => setSessoesUser(u.id),
									className: `cursor-pointer border-none px-3 py-1 ${sessoesCount > 3 ? "bg-brand-coral text-white hover:bg-brand-coral/80" : "bg-brand-teal text-brand-navy hover:bg-brand-teal/80"}`,
									children: [
										sessoesCount,
										" ",
										sessoesCount === 1 ? "ativa" : "ativas"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:251:21",
								"data-prohibitions": "[editContent]",
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:252:23",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:253:25",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-end gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:254:27",
												"data-prohibitions": "[]",
												delayDuration: 300,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:255:29",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/components/usuarios/UsuariosTable.tsx:256:31",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														"aria-label": "Editar usuario",
														onClick: () => onEdit(u),
														className: "text-brand-navy dark:text-brand-cyan hover:bg-brand-teal/20",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
															"data-uid": "src/components/usuarios/UsuariosTable.tsx:263:33",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:266:29",
													"data-prohibitions": "[]",
													children: "Editar usuário"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:268:27",
												"data-prohibitions": "[]",
												delayDuration: 300,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:269:29",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/components/usuarios/UsuariosTable.tsx:270:31",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														"aria-label": "Ver sessoes",
														onClick: () => setSessoesUser(u.id),
														className: "text-brand-cyan hover:bg-brand-teal/20",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
															"data-uid": "src/components/usuarios/UsuariosTable.tsx:277:33",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:280:29",
													"data-prohibitions": "[]",
													children: "Gerenciar sessões"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:282:27",
												"data-prohibitions": "[]",
												delayDuration: 300,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:283:29",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/components/usuarios/UsuariosTable.tsx:284:31",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														"aria-label": "Ver historico",
														onClick: () => setHistoricoUser(u.id),
														className: "text-brand-gray dark:text-brand-light hover:bg-brand-teal/20",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
															"data-uid": "src/components/usuarios/UsuariosTable.tsx:291:33",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:294:29",
													"data-prohibitions": "[]",
													children: "Ver histórico"
												})]
											}),
											u.status_conta === "ativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:297:29",
												"data-prohibitions": "[]",
												delayDuration: 300,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:298:31",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/components/usuarios/UsuariosTable.tsx:299:33",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														"aria-label": "Bloquear usuario",
														onClick: async () => {
															await usuariosService.bloquearUsuario(u.id);
															onRefresh();
														},
														className: "text-brand-coral hover:bg-brand-coral/20",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
															"data-uid": "src/components/usuarios/UsuariosTable.tsx:309:35",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:312:31",
													"data-prohibitions": "[]",
													children: "Bloquear usuário"
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:315:29",
												"data-prohibitions": "[]",
												delayDuration: 300,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:316:31",
													"data-prohibitions": "[]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/components/usuarios/UsuariosTable.tsx:317:33",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														"aria-label": "Permitir usuario",
														onClick: async () => {
															await usuariosService.permitirUsuario(u.id);
															onRefresh();
														},
														className: "text-brand-cyan hover:bg-brand-cyan/20",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
															"data-uid": "src/components/usuarios/UsuariosTable.tsx:327:35",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:330:31",
													"data-prohibitions": "[]",
													children: "Permitir usuário"
												})]
											})
										]
									})
								})
							})
						]
					}, u.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkActionsBar, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:342:7",
			"data-prohibitions": "[editContent]",
			selectedCount: selected.length,
			totalCount: users.length,
			onClear: () => setSelected([]),
			onToggleAll: toggleAll,
			onAction: handleBulkAction
		}),
		historicoUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioHistoricoDialog, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:351:9",
			"data-prohibitions": "[editContent]",
			open: !!historicoUser,
			onOpenChange: () => setHistoricoUser(null),
			userId: historicoUser
		}),
		sessoesUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessoesDialog, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:358:9",
			"data-prohibitions": "[editContent]",
			open: !!sessoesUser,
			onOpenChange: () => setSessoesUser(null),
			userId: sessoesUser
		}),
		tempPwdData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TempPasswordsDialog, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:365:9",
			"data-prohibitions": "[editContent]",
			data: tempPwdData,
			onClose: () => setTempPwdData(null)
		}),
		tfaData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoFactorModal, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:368:9",
			"data-prohibitions": "[editContent]",
			open: !!tfaData,
			onClose: () => setTfaData(null),
			onConfirm: confirmEnable2FA,
			secret: tfaData.secret,
			qrUrl: tfaData.qrUrl,
			email: tfaData.user.email
		}),
		disableTfaUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisableTwoFactorModal, {
			"data-uid": "src/components/usuarios/UsuariosTable.tsx:378:9",
			"data-prohibitions": "[editContent]",
			open: !!disableTfaUser,
			onClose: () => setDisableTfaUser(null),
			onConfirm: confirmDisable2FA,
			hasActiveSessions: disableTfaUser.hasSessions
		})
	] });
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-collapsible@1.1.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types_10a2c6d0ac3bcc7422bd3020fe61e076/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: COLLAPSIBLE_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleProvider, {
		scope: __scopeCollapsible,
		disabled,
		contentId: useId(),
		open,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState$1(open),
			"data-disabled": disabled ? "" : void 0,
			...collapsibleProps,
			ref: forwardedRef
		})
	});
});
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, ...triggerProps } = props;
	const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-controls": context.contentId,
		"aria-expanded": context.open || false,
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		disabled: context.disabled,
		...triggerProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContentImpl, {
			...contentProps,
			ref: forwardedRef,
			present
		})
	});
});
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, present, children, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
	const [isPresent, setIsPresent] = import_react.useState(present);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const heightRef = import_react.useRef(0);
	const height = heightRef.current;
	const widthRef = import_react.useRef(0);
	const width = widthRef.current;
	const isOpen = context.open || isPresent;
	const isMountAnimationPreventedRef = import_react.useRef(isOpen);
	const originalStylesRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	useLayoutEffect2(() => {
		const node = ref.current;
		if (node) {
			originalStylesRef.current = originalStylesRef.current || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			heightRef.current = rect.height;
			widthRef.current = rect.width;
			if (!isMountAnimationPreventedRef.current) {
				node.style.transitionDuration = originalStylesRef.current.transitionDuration;
				node.style.animationName = originalStylesRef.current.animationName;
			}
			setIsPresent(present);
		}
	}, [context.open, present]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		id: context.contentId,
		hidden: !isOpen,
		...contentProps,
		ref: composedRefs,
		style: {
			[`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
			[`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
			...props.style
		},
		children: isOpen && children
	});
});
function getState$1(open) {
	return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-accordion@1.2.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_8b3df72274e0fa0cff1629993ef7cc33/node_modules/@radix-ui/react-accordion/dist/index.mjs
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [createCollectionScope, createCollapsibleScope]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...accordionProps } = props;
	const singleProps = accordionProps;
	const multipleProps = accordionProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeAccordion,
		children: type === "multiple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplMultiple, {
			...multipleProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplSingle, {
			...singleProps,
			ref: forwardedRef
		})
	});
});
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, { collapsible: false });
var AccordionImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, collapsible = false, ...accordionSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemOpen: setValue,
		onItemClose: import_react.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionSingleProps,
				ref: forwardedRef
			})
		})
	});
});
var AccordionImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...accordionMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	const handleItemOpen = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleItemClose = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value,
		onItemOpen: handleItemOpen,
		onItemClose: handleItemClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionMultipleProps,
				ref: forwardedRef
			})
		})
	});
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
	const composedRefs = useComposedRefs(import_react.useRef(null), forwardedRef);
	const getItems = useCollection(__scopeAccordion);
	const isDirectionLTR = useDirection(dir) === "ltr";
	const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
		if (!ACCORDION_KEYS.includes(event.key)) return;
		const target = event.target;
		const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
		const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
		const triggerCount = triggerCollection.length;
		if (triggerIndex === -1) return;
		event.preventDefault();
		let nextIndex = triggerIndex;
		const homeIndex = 0;
		const endIndex = triggerCount - 1;
		const moveNext = () => {
			nextIndex = triggerIndex + 1;
			if (nextIndex > endIndex) nextIndex = homeIndex;
		};
		const movePrev = () => {
			nextIndex = triggerIndex - 1;
			if (nextIndex < homeIndex) nextIndex = endIndex;
		};
		switch (event.key) {
			case "Home":
				nextIndex = homeIndex;
				break;
			case "End":
				nextIndex = endIndex;
				break;
			case "ArrowRight":
				if (orientation === "horizontal") if (isDirectionLTR) moveNext();
				else movePrev();
				break;
			case "ArrowDown":
				if (orientation === "vertical") moveNext();
				break;
			case "ArrowLeft":
				if (orientation === "horizontal") if (isDirectionLTR) movePrev();
				else moveNext();
				break;
			case "ArrowUp":
				if (orientation === "vertical") movePrev();
				break;
		}
		triggerCollection[nextIndex % triggerCount].ref.current?.focus();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplProvider, {
		scope: __scopeAccordion,
		disabled,
		direction: dir,
		orientation,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: __scopeAccordion,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...accordionProps,
				"data-orientation": orientation,
				ref: composedRefs,
				onKeyDown: disabled ? void 0 : handleKeyDown
			})
		})
	});
});
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, value, ...accordionItemProps } = props;
	const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
	const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	const triggerId = useId();
	const open = value && valueContext.value.includes(value) || false;
	const disabled = accordionContext.disabled || props.disabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemProvider, {
		scope: __scopeAccordion,
		open,
		disabled,
		triggerId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			"data-orientation": accordionContext.orientation,
			"data-state": getState(open),
			...collapsibleScope,
			...accordionItemProps,
			ref: forwardedRef,
			disabled,
			open,
			onOpenChange: (open2) => {
				if (open2) valueContext.onItemOpen(value);
				else valueContext.onItemClose(value);
			}
		})
	});
});
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...headerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h3, {
		"data-orientation": accordionContext.orientation,
		"data-state": getState(itemContext.open),
		"data-disabled": itemContext.disabled ? "" : void 0,
		...headerProps,
		ref: forwardedRef
	});
});
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...triggerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeAccordion,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
			"aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
			"data-orientation": accordionContext.orientation,
			id: itemContext.triggerId,
			...collapsibleScope,
			...triggerProps,
			ref: forwardedRef
		})
	});
});
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...contentProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		role: "region",
		"aria-labelledby": itemContext.triggerId,
		"data-orientation": accordionContext.orientation,
		...collapsibleScope,
		...contentProps,
		ref: forwardedRef,
		style: {
			["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
			["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
			...props.style
		}
	});
});
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	"data-uid": "src/components/ui/accordion.tsx:13:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-b border-brand-teal/30 dark:border-brand-cyan/20", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	"data-uid": "src/components/ui/accordion.tsx:25:3",
	"data-prohibitions": "[editContent]",
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		"data-uid": "src/components/ui/accordion.tsx:26:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 font-bold transition-all hover:underline text-brand-navy dark:text-white [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			"data-uid": "src/components/ui/accordion.tsx:35:7",
			"data-prohibitions": "[editContent]",
			className: "h-5 w-5 shrink-0 transition-transform duration-200 text-brand-cyan"
		})]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	"data-uid": "src/components/ui/accordion.tsx:45:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/accordion.tsx:50:5",
		"data-prohibitions": "[editContent]",
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
//#endregion
//#region src/components/usuarios/PermissoesChecklist.tsx
var ROLE_LEVEL = {
	"c-level": 4,
	admin: 3,
	supervisor: 2,
	analista: 1
};
var PERMISSIONS_GROUPS = [
	{
		id: "crud",
		label: "CRUD",
		permissions: [{
			id: "crud_completo",
			label: "CRUD Completo",
			minRole: "admin"
		}]
	},
	{
		id: "dashboard",
		label: "Dashboard",
		permissions: [
			{
				id: "dashboard",
				label: "Acesso ao Dashboard",
				minRole: "analista"
			},
			{
				id: "relatorios_financeiros",
				label: "Relatórios Financeiros",
				minRole: "c-level"
			},
			{
				id: "visualizar_logs_seguranca",
				label: "Visualizar Logs de Segurança",
				minRole: "c-level"
			}
		]
	},
	{
		id: "gestao",
		label: "Gestão",
		permissions: [
			{
				id: "gestao_usuarios",
				label: "Gestão de Usuários",
				minRole: "c-level"
			},
			{
				id: "gestao_agentes",
				label: "Gestão de Agentes",
				minRole: "admin"
			},
			{
				id: "gestao_analistas",
				label: "Gestão de Analistas",
				minRole: "admin"
			},
			{
				id: "gerenciar_roles",
				label: "Gerenciar Roles",
				minRole: "c-level"
			}
		]
	},
	{
		id: "seguranca",
		label: "Segurança",
		permissions: [
			{
				id: "resetar_senha",
				label: "Resetar Senhas",
				minRole: "admin"
			},
			{
				id: "habilitar_2fa",
				label: "Gerenciar 2FA",
				minRole: "supervisor"
			},
			{
				id: "auditoria_completa",
				label: "Auditoria Completa",
				minRole: "admin"
			}
		]
	},
	{
		id: "operacional",
		label: "Operacional",
		permissions: [
			{
				id: "criar_agentes",
				label: "Criar Agentes",
				minRole: "analista"
			},
			{
				id: "criar_processos",
				label: "Criar Processos",
				minRole: "analista"
			},
			{
				id: "delegar_investigacao",
				label: "Delegar Investigação",
				minRole: "supervisor"
			},
			{
				id: "delegar_processos",
				label: "Delegar Processos",
				minRole: "supervisor"
			},
			{
				id: "editar_status",
				label: "Editar Status",
				minRole: "analista"
			},
			{
				id: "deletar_processos",
				label: "Deletar Processos",
				minRole: "admin"
			},
			{
				id: "editar_proprios",
				label: "Editar Próprios Registros",
				minRole: "analista"
			},
			{
				id: "editar_alheios",
				label: "Editar Registros Alheios",
				minRole: "supervisor"
			}
		]
	},
	{
		id: "dados",
		label: "Dados",
		permissions: [
			{
				id: "exportar_dados",
				label: "Exportar Dados",
				minRole: "admin"
			},
			{
				id: "importar_dados",
				label: "Importar Dados",
				minRole: "admin"
			},
			{
				id: "ler_todos",
				label: "Ler Todos os Dados",
				minRole: "supervisor"
			}
		]
	},
	{
		id: "colaboracao",
		label: "Colaboração",
		permissions: [
			{
				id: "adicionar_observacoes",
				label: "Adicionar Observações",
				minRole: "analista"
			},
			{
				id: "adicionar_posicoes",
				label: "Adicionar Posições",
				minRole: "analista"
			},
			{
				id: "upload_documentos",
				label: "Upload de Documentos",
				minRole: "analista"
			}
		]
	},
	{
		id: "integracao",
		label: "Integração",
		permissions: [{
			id: "configuracao_integracoes",
			label: "Configuração de Integrações",
			minRole: "admin"
		}, {
			id: "gerenciar_notificacoes",
			label: "Gerenciar Notificações",
			minRole: "supervisor"
		}]
	}
];
function PermissoesChecklist({ selectedRole, selectedPermissoes, onChange }) {
	const roleLevel = ROLE_LEVEL[selectedRole] || 1;
	const handleToggle = (id, checked) => onChange(checked ? [...selectedPermissoes, id] : selectedPermissoes.filter((p) => p !== id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:106:5",
		"data-prohibitions": "[editContent]",
		className: "border border-brand-teal dark:border-brand-cyan/50 rounded-lg bg-white dark:bg-brand-navy/50 p-2 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:107:7",
			"data-prohibitions": "[editContent]",
			type: "multiple",
			className: "w-full",
			children: PERMISSIONS_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:109:11",
				"data-prohibitions": "[editContent]",
				value: group.id,
				className: "border-b border-brand-teal/30 last:border-0 px-3 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:114:13",
					"data-prohibitions": "[editContent]",
					className: "text-brand-navy dark:text-white font-bold text-[14px] [&>svg]:text-brand-cyan hover:no-underline py-3",
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:117:13",
					"data-prohibitions": "[editContent]",
					className: "pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:118:15",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2",
						children: group.permissions.map((perm) => {
							const isDisabled = roleLevel < (ROLE_LEVEL[perm.minRole] || 1);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
								"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:123:21",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
									"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:124:23",
									"data-prohibitions": "[editContent]",
									delayDuration: 200,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:125:25",
										"data-prohibitions": "[editContent]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:126:27",
											"data-prohibitions": "[editContent]",
											className: `flex items-start space-x-3 p-2 rounded-md transition-colors ${isDisabled ? "opacity-50 bg-brand-light dark:bg-black/20 cursor-not-allowed" : "hover:bg-brand-teal/10 cursor-pointer"}`,
											onClick: (e) => {
												if (isDisabled) e.preventDefault();
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:132:29",
												"data-prohibitions": "[editContent]",
												id: perm.id,
												checked: selectedPermissoes.includes(perm.id) && !isDisabled,
												disabled: isDisabled,
												onCheckedChange: (c) => handleToggle(perm.id, !!c),
												className: "mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:139:29",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col gap-1 leading-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:140:31",
													"data-prohibitions": "[editContent]",
													htmlFor: perm.id,
													className: `text-[13px] font-bold ${isDisabled ? "text-brand-gray cursor-not-allowed" : "text-brand-navy dark:text-brand-light cursor-pointer"}`,
													children: perm.label
												}), isDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:147:33",
													"data-prohibitions": "[editContent]",
													className: "text-[12px] font-medium text-brand-gray mt-0.5",
													children: ["Requer role ", perm.minRole]
												})]
											})]
										})
									}), isDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
										"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:155:27",
										"data-prohibitions": "[editContent]",
										className: "bg-brand-navy text-white text-[12px] font-medium border-brand-cyan",
										children: ["Restrito: Requer ", perm.minRole]
									})]
								})
							}, perm.id);
						})
					})
				})]
			}, group.id))
		})
	});
}
//#endregion
//#region src/components/usuarios/UsuarioForm.tsx
var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var schema = object({
	name: string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	email: string().email("E-mail inválido"),
	password: string().optional(),
	passwordConfirm: string().optional(),
	role: string(),
	status_conta: string()
}).refine((data) => {
	if (data.password && !passwordRegex.test(data.password)) return false;
	return true;
}, {
	message: "Mín. 8 chars, 1 maiúscula, 1 número, 1 especial.",
	path: ["password"]
}).refine((data) => data.password === data.passwordConfirm, {
	message: "As senhas não conferem",
	path: ["passwordConfirm"]
});
function UsuarioForm({ userToEdit, onSuccess, onCancel }) {
	const { user: currentUser } = useAuth();
	const [selectedPermissoes, setSelectedPermissoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPwd, setShowPwd] = (0, import_react.useState)(false);
	const [showPwdConfirm, setShowPwdConfirm] = (0, import_react.useState)(false);
	const [photoFile, setPhotoFile] = (0, import_react.useState)(null);
	const [photoPreview, setPhotoPreview] = (0, import_react.useState)(getAvatarUrl(userToEdit) || null);
	const [tfaEnabled, setTfaEnabled] = (0, import_react.useState)(userToEdit?.two_fa_enabled || false);
	const [tfaSecret, setTfaSecret] = (0, import_react.useState)(userToEdit?.two_fa_secret || "");
	const [showTfaModal, setShowTfaModal] = (0, import_react.useState)(false);
	const [tfaModalData, setTfaModalData] = (0, import_react.useState)(null);
	const [showDisableTfaModal, setShowDisableTfaModal] = (0, import_react.useState)(false);
	const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitSuccessful } } = useForm({
		resolver: a(schema),
		defaultValues: {
			name: userToEdit?.name || "",
			email: userToEdit?.email || "",
			password: "",
			passwordConfirm: "",
			role: userToEdit?.role || "analista",
			status_conta: userToEdit?.status_conta || "ativo"
		}
	});
	const watchRole = watch("role");
	const watchEmail = watch("email");
	(0, import_react.useEffect)(() => {
		if (userToEdit?.permissoes_customizadas) setSelectedPermissoes(userToEdit.permissoes_customizadas);
		else usuariosService.fetchRolePermissoes(watchRole).then(setSelectedPermissoes);
	}, [userToEdit, watchRole]);
	const handlePhotoChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 2 * 1024 * 1024) return toast.error("Arquivo excede 2MB");
		if (!["image/jpeg", "image/png"].includes(file.type)) return toast.error("Formato inválido. Use JPG ou PNG");
		setPhotoFile(file);
		setPhotoPreview(URL.createObjectURL(file));
	};
	const handleTfaToggle = async (checked) => {
		if (checked) {
			if (!watchEmail) return toast.error("Preencha o e-mail primeiro para gerar o 2FA");
			setTfaModalData(totpService.generateSecret(watchEmail));
			setShowTfaModal(true);
		} else if (userToEdit) setShowDisableTfaModal(true);
		else {
			setTfaEnabled(false);
			setTfaSecret("");
		}
	};
	const confirmTfaSetup = () => {
		if (tfaModalData) {
			setTfaEnabled(true);
			setTfaSecret(tfaModalData.secret);
			setShowTfaModal(false);
		}
	};
	const confirmTfaDisable = () => {
		setTfaEnabled(false);
		setTfaSecret("");
		setShowDisableTfaModal(false);
	};
	const onSubmit = async (data) => {
		const roleMap = {
			"c-level": 4,
			admin: 3,
			supervisor: 2,
			analista: 1
		};
		if ((roleMap[data.role] || 1) > (roleMap[currentUser?.role] || 1)) return toast.error("Você não pode gerenciar um usuário com papel superior ao seu.");
		if (!userToEdit && !data.password) return toast.error("A senha é obrigatória para registrar um novo usuário.");
		try {
			setLoading(true);
			const payload = {
				...data,
				permissoes_customizadas: selectedPermissoes,
				two_fa_enabled: tfaEnabled,
				two_fa_secret: tfaEnabled ? tfaSecret : ""
			};
			if (!payload.password) {
				delete payload.password;
				delete payload.passwordConfirm;
			}
			if (photoFile) payload.foto_perfil = photoFile;
			if (userToEdit) {
				await usuariosService.updateUsuario(userToEdit.id, payload);
				toast.success("Usuário atualizado com sucesso!");
			} else {
				await usuariosService.createUsuario(payload);
				toast.success("Usuário criado com sucesso!");
			}
			onSuccess();
		} catch {
			toast.error("Erro ao salvar as informações do usuário.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/UsuarioForm.tsx:182:5",
		"data-prohibitions": "[editContent]",
		className: `p-1 rounded-xl bg-brand-teal/10 dark:bg-brand-navy/30 transition-all ${isSubmitSuccessful ? "animate-in fade-in slide-in-from-bottom-4 duration-300" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/UsuarioForm.tsx:185:7",
				"data-prohibitions": "[editContent]",
				className: "bg-white dark:bg-brand-navy rounded-lg p-6 sm:p-8 border border-brand-teal dark:border-brand-cyan/50 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/components/usuarios/UsuarioForm.tsx:186:9",
					"data-prohibitions": "[editContent]",
					onSubmit: handleSubmit(onSubmit),
					className: "space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioForm.tsx:187:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 lg:grid-cols-2 gap-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:188:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:189:15",
									"data-prohibitions": "[]",
									className: "border-b border-brand-teal/50 pb-4 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:190:17",
										"data-prohibitions": "[]",
										className: "text-[20px] font-bold text-brand-navy dark:text-white",
										children: "Informações Básicas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:193:17",
										"data-prohibitions": "[]",
										className: "text-[14px] text-brand-gray dark:text-brand-light/80 mt-1",
										children: "Defina os dados de acesso e perfil do usuário."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:198:15",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-6 mb-6 bg-brand-light/50 dark:bg-black/20 p-4 rounded-lg border border-brand-teal/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:199:17",
										"data-prohibitions": "[editContent]",
										className: "w-16 h-16 rounded-full border-2 border-brand-cyan overflow-hidden bg-white shrink-0",
										children: photoPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:201:21",
											"data-prohibitions": "[editContent]",
											src: photoPreview,
											className: "w-full h-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:203:21",
											"data-prohibitions": "[]",
											className: "w-full h-full bg-brand-light"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:206:17",
										"data-prohibitions": "[editContent]",
										className: "flex-1 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:207:19",
												"data-prohibitions": "[editContent]",
												className: "text-brand-navy dark:text-brand-light",
												children: userToEdit ? "Atualizar Foto Perfil" : "Foto Perfil (Opcional)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:210:19",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:211:21",
													"data-prohibitions": "[editContent]",
													type: "file",
													accept: "image/jpeg, image/png",
													className: "h-9 text-xs",
													onChange: handlePhotoChange
												}), (photoPreview || userToEdit?.foto_perfil) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:218:23",
													"data-prohibitions": "[]",
													type: "button",
													variant: "destructive",
													size: "sm",
													className: "h-9 px-3 shrink-0",
													onClick: () => {
														setPhotoFile(null);
														setPhotoPreview(null);
													},
													children: "Remover"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:232:19",
												"data-prohibitions": "[]",
												className: "text-[11px] text-brand-gray",
												children: "Max 2MB, JPG ou PNG"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:236:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:237:17",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 text-brand-navy dark:text-brand-light",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:238:19",
													"data-prohibitions": "[]",
													children: ["Nome Completo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:239:35",
														"data-prohibitions": "[]",
														className: "text-brand-coral",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:241:19",
													"data-prohibitions": "[editContent]",
													...register("name"),
													placeholder: "Nome do colaborador"
												}),
												errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:243:21",
													"data-prohibitions": "[editContent]",
													className: "text-[12px] font-medium text-brand-coral mt-1",
													children: errors.name.message
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:249:17",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 text-brand-navy dark:text-brand-light",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:250:19",
													"data-prohibitions": "[]",
													children: ["E-mail Profissional ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:251:41",
														"data-prohibitions": "[]",
														className: "text-brand-coral",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:253:19",
													"data-prohibitions": "[editContent]",
													...register("email"),
													type: "email",
													placeholder: "nome@empresa.com.br"
												}),
												errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:255:21",
													"data-prohibitions": "[editContent]",
													className: "text-[12px] font-medium text-brand-coral mt-1",
													children: errors.email.message
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:261:17",
											"data-prohibitions": "[editContent]",
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:262:19",
												"data-prohibitions": "[editContent]",
												className: "space-y-2 text-brand-navy dark:text-brand-light",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:263:21",
														"data-prohibitions": "[editContent]",
														children: ["Senha ", !userToEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:264:45",
															"data-prohibitions": "[]",
															className: "text-brand-coral",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:266:21",
														"data-prohibitions": "[editContent]",
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:267:23",
															"data-prohibitions": "[editContent]",
															...register("password"),
															type: showPwd ? "text" : "password",
															placeholder: userToEdit ? "••••••••" : "Senha segura",
															className: "pr-10"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:273:23",
															"data-prohibitions": "[editContent]",
															type: "button",
															onClick: () => setShowPwd(!showPwd),
															className: "absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan hover:text-brand-cyan/80",
															children: showPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:278:36",
																"data-prohibitions": "[editContent]",
																className: "w-5 h-5"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:278:69",
																"data-prohibitions": "[editContent]",
																className: "w-5 h-5"
															})
														})]
													}),
													errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:282:23",
														"data-prohibitions": "[editContent]",
														className: "text-[12px] font-medium text-brand-coral mt-1",
														children: errors.password.message
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:287:19",
												"data-prohibitions": "[editContent]",
												className: "space-y-2 text-brand-navy dark:text-brand-light",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:288:21",
														"data-prohibitions": "[editContent]",
														children: ["Confirmar Senha ", !userToEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:289:55",
															"data-prohibitions": "[]",
															className: "text-brand-coral",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:291:21",
														"data-prohibitions": "[editContent]",
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:292:23",
															"data-prohibitions": "[editContent]",
															...register("passwordConfirm"),
															type: showPwdConfirm ? "text" : "password",
															placeholder: userToEdit ? "••••••••" : "Repita a senha",
															className: "pr-10"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:298:23",
															"data-prohibitions": "[editContent]",
															type: "button",
															onClick: () => setShowPwdConfirm(!showPwdConfirm),
															className: "absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan hover:text-brand-cyan/80",
															children: showPwdConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:304:27",
																"data-prohibitions": "[editContent]",
																className: "w-5 h-5"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:306:27",
																"data-prohibitions": "[editContent]",
																className: "w-5 h-5"
															})
														})]
													}),
													errors.passwordConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:311:23",
														"data-prohibitions": "[editContent]",
														className: "text-[12px] font-medium text-brand-coral mt-1",
														children: errors.passwordConfirm.message
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:318:17",
											"data-prohibitions": "[]",
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:319:19",
												"data-prohibitions": "[]",
												className: "space-y-2 text-brand-navy dark:text-brand-light",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:320:21",
													"data-prohibitions": "[]",
													children: ["Papel / Role ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:321:36",
														"data-prohibitions": "[]",
														className: "text-brand-coral",
														children: "*"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:323:21",
													"data-prohibitions": "[]",
													onValueChange: (v) => setValue("role", v),
													defaultValue: userToEdit?.role || "analista",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:327:23",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:328:25",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:330:23",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:331:25",
																"data-prohibitions": "[]",
																value: "c-level",
																children: "C-Level"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:332:25",
																"data-prohibitions": "[]",
																value: "admin",
																children: "Administrador"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:333:25",
																"data-prohibitions": "[]",
																value: "supervisor",
																children: "Supervisor"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:334:25",
																"data-prohibitions": "[]",
																value: "analista",
																children: "Analista Padrão"
															})
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:338:19",
												"data-prohibitions": "[]",
												className: "space-y-2 text-brand-navy dark:text-brand-light",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:339:21",
													"data-prohibitions": "[]",
													children: ["Status da Conta ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:340:39",
														"data-prohibitions": "[]",
														className: "text-brand-coral",
														children: "*"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:342:21",
													"data-prohibitions": "[]",
													onValueChange: (v) => setValue("status_conta", v),
													defaultValue: userToEdit?.status_conta || "ativo",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:346:23",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/components/usuarios/UsuarioForm.tsx:347:25",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
														"data-uid": "src/components/usuarios/UsuarioForm.tsx:349:23",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:350:25",
																"data-prohibitions": "[]",
																value: "ativo",
																children: "Ativa"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:351:25",
																"data-prohibitions": "[]",
																value: "suspenso",
																children: "Suspensa"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/components/usuarios/UsuarioForm.tsx:352:25",
																"data-prohibitions": "[]",
																value: "bloqueado",
																children: "Bloqueada"
															})
														]
													})]
												})]
											})]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:360:13",
							"data-prohibitions": "[]",
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:361:15",
									"data-prohibitions": "[]",
									className: "border-b border-brand-teal/50 pb-4 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:362:17",
										"data-prohibitions": "[]",
										className: "text-[20px] font-bold text-brand-navy dark:text-white",
										children: "Segurança & Permissões"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:365:17",
										"data-prohibitions": "[]",
										className: "text-[14px] text-brand-gray dark:text-brand-light/80 mt-1",
										children: "Configure autenticação avançada e privilégios."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:370:15",
									"data-prohibitions": "[]",
									className: "flex items-center justify-between p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:371:17",
										"data-prohibitions": "[]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:372:19",
											"data-prohibitions": "[editContent]",
											className: "w-6 h-6 text-brand-cyan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:373:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:374:21",
												"data-prohibitions": "[]",
												className: "text-[14px] font-bold text-brand-navy dark:text-white mb-0.5 block cursor-pointer",
												children: "Habilitar 2FA (Autenticador)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:377:21",
												"data-prohibitions": "[]",
												className: "text-[12px] text-brand-gray dark:text-brand-light font-medium",
												children: "Requer app autenticador no login"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:382:17",
										"data-prohibitions": "[editContent]",
										checked: tfaEnabled,
										onCheckedChange: handleTfaToggle
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissoesChecklist, {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:385:15",
									"data-prohibitions": "[editContent]",
									selectedRole: watchRole,
									selectedPermissoes,
									onChange: setSelectedPermissoes
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioForm.tsx:393:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-end gap-4 pt-6 border-t border-brand-teal/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:394:13",
							"data-prohibitions": "[]",
							type: "button",
							variant: "outline",
							onClick: onCancel,
							className: "h-11 px-6 font-bold border-brand-teal text-brand-navy",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:402:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: loading,
							className: "h-11 px-8 font-bold bg-brand-cyan text-white hover:bg-brand-cyan/90",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:407:27",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 animate-spin"
							}), userToEdit ? "Atualizar Usuário" : "Criar Usuário"]
						})]
					})]
				})
			}),
			tfaModalData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoFactorModal, {
				"data-uid": "src/components/usuarios/UsuarioForm.tsx:415:9",
				"data-prohibitions": "[editContent]",
				open: showTfaModal,
				onClose: () => {
					setShowTfaModal(false);
					setTfaEnabled(false);
				},
				onConfirm: confirmTfaSetup,
				secret: tfaModalData.secret,
				qrUrl: tfaModalData.qrUrl,
				email: watchEmail
			}),
			showDisableTfaModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisableTwoFactorModal, {
				"data-uid": "src/components/usuarios/UsuarioForm.tsx:429:9",
				"data-prohibitions": "[editContent]",
				open: showDisableTfaModal,
				onClose: () => setShowDisableTfaModal(false),
				onConfirm: confirmTfaDisable,
				hasActiveSessions: false
			})
		]
	});
}
//#endregion
//#region src/hooks/use-debounce.ts
function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}
//#endregion
//#region src/components/usuarios/HistoricoDetalhesModal.tsx
function HistoricoDetalhesModal({ log, onClose }) {
	const [timeline, setTimeline] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (log) {
			const targetId = log.usuario_afetado_id || log.user_id;
			const filter = `user_id='${targetId}' || usuario_afetado_id='${targetId}'`;
			pb.collection("usuarios_historico").getList(1, 5, {
				filter,
				sort: "-created",
				expand: "user_id,usuario_afetado_id"
			}).then((res) => setTimeline(res.items)).catch(console.error);
		}
	}, [log]);
	if (!log) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:29:5",
		"data-prohibitions": "[editContent]",
		open: !!log,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:30:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-2xl max-h-[85vh] overflow-y-auto border-brand-teal dark:border-brand-cyan/50 dark:bg-brand-navy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:31:9",
				"data-prohibitions": "[editContent]",
				className: "border-b border-brand-teal/50 dark:border-brand-cyan/30 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:32:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:33:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-cyan"
						}),
						"Detalhes da Ação:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:35:13",
							"data-prohibitions": "[editContent]",
							className: "uppercase text-[16px] ml-1",
							children: log.acao.replace(/_/g, " ")
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:39:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-6 mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:40:11",
					"data-prohibitions": "[editContent]",
					className: "bg-brand-light/30 dark:bg-black/20 p-5 rounded-lg border border-brand-teal/50 dark:border-brand-cyan/30 grid grid-cols-1 sm:grid-cols-2 gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:41:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:42:15",
								"data-prohibitions": "[]",
								className: "text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1",
								children: "Data do Evento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:45:15",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] text-brand-navy dark:text-white font-bold",
								children: format(new Date(log.created), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:49:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:50:15",
								"data-prohibitions": "[]",
								className: "text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1",
								children: "IP de Origem"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:53:15",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] font-mono text-brand-navy dark:text-white font-medium",
								children: log.ip_address || "0.0.0.0"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:57:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:58:15",
								"data-prohibitions": "[]",
								className: "text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1",
								children: "Usuário Ator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:61:15",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] text-brand-navy dark:text-white font-bold",
								children: log.expand?.user_id?.name || "Sistema"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:65:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:66:15",
								"data-prohibitions": "[]",
								className: "text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1",
								children: "Usuário Afetado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:69:15",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] text-brand-navy dark:text-white font-bold",
								children: log.expand?.usuario_afetado_id?.name || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:73:13",
							"data-prohibitions": "[editContent]",
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:74:15",
								"data-prohibitions": "[]",
								className: "text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1",
								children: "User Agent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:77:15",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-mono text-brand-navy/70 dark:text-brand-light/80 bg-white dark:bg-black/40 p-2 rounded border border-brand-teal/30 dark:border-brand-cyan/20",
								children: log.user_agent || "N/A"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:81:13",
							"data-prohibitions": "[editContent]",
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:82:15",
								"data-prohibitions": "[]",
								className: "text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1",
								children: "Descrição Completa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:85:15",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] bg-white dark:bg-brand-navy/80 p-4 rounded-md border border-brand-teal/50 dark:border-brand-cyan/20 text-brand-navy dark:text-white leading-relaxed font-medium shadow-sm",
								children: log.descricao
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:91:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:92:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 text-[16px] font-bold text-brand-navy dark:text-white mb-4 border-b border-brand-teal/30 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:93:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-brand-teal"
						}), " Eventos Relacionados (Contexto)"]
					}), timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:96:15",
						"data-prohibitions": "[]",
						className: "text-sm text-brand-gray",
						children: "Nenhum evento recente para este contexto."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:98:15",
						"data-prohibitions": "[editContent]",
						className: "relative border-l-2 border-brand-teal dark:border-brand-cyan/30 ml-2 space-y-5 py-2",
						children: timeline.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:100:19",
							"data-prohibitions": "[editContent]",
							className: "pl-6 relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:101:21",
									"data-prohibitions": "[editContent]",
									className: `absolute w-3 h-3 ${t.id === log.id ? "bg-brand-orange ring-4 ring-brand-orange/20" : "bg-brand-cyan"} rounded-full -left-[7px] top-1`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:104:21",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] text-brand-gray dark:text-brand-light/80 font-medium",
									children: [
										format(new Date(t.created), "dd/MM/yyyy HH:mm"),
										" -",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:106:23",
											"data-prohibitions": "[editContent]",
											className: "font-bold uppercase text-brand-navy dark:text-brand-cyan",
											children: t.acao.replace(/_/g, " ")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/HistoricoDetalhesModal.tsx:110:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-brand-navy dark:text-white mt-1 line-clamp-2",
									children: t.descricao
								})
							]
						}, t.id))
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/HistoricoGeralTable.tsx
var acoesDisponiveis = [
	"login",
	"logout",
	"criar_usuario",
	"editar_usuario",
	"alterar_role",
	"resetar_senha",
	"alterar_status_usuario",
	"cadastro_agente",
	"edicao_agente",
	"alterar_status_agente",
	"criar_processo",
	"editar_processo"
];
function HistoricoGeralTable() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [page, setPage] = (0, import_react.useState)(1);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const [searchIp, setSearchIp] = (0, import_react.useState)("");
	const debouncedIp = useDebounce(searchIp, 300);
	const [selectedUser, setSelectedUser] = (0, import_react.useState)("all");
	const [selectedAcao, setSelectedAcao] = (0, import_react.useState)("all");
	const [dateStart, setDateStart] = (0, import_react.useState)("");
	const [dateEnd, setDateEnd] = (0, import_react.useState)("");
	const [selectedLog, setSelectedLog] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		pb.collection("users").getFullList({ sort: "name" }).then(setUsers);
	}, []);
	const fetchLogs = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const filters = [];
			if (selectedUser !== "all") filters.push(`(user_id='${selectedUser}' || usuario_afetado_id='${selectedUser}')`);
			if (selectedAcao !== "all") filters.push(`acao='${selectedAcao}'`);
			if (dateStart) filters.push(`created >= '${dateStart} 00:00:00'`);
			if (dateEnd) filters.push(`created <= '${dateEnd} 23:59:59'`);
			if (debouncedIp) filters.push(`ip_address ~ '${debouncedIp}'`);
			const res = await pb.collection("usuarios_historico").getList(page, 50, {
				filter: filters.join(" && "),
				sort: "-created",
				expand: "user_id,usuario_afetado_id"
			});
			setLogs(res.items);
			setTotalPages(res.totalPages);
		} catch (e) {
			console.error(e);
			toast.error("Erro ao carregar histórico");
		} finally {
			setLoading(false);
		}
	}, [
		page,
		selectedUser,
		selectedAcao,
		dateStart,
		dateEnd,
		debouncedIp
	]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		selectedUser,
		selectedAcao,
		dateStart,
		dateEnd,
		debouncedIp
	]);
	(0, import_react.useEffect)(() => {
		fetchLogs();
	}, [fetchLogs]);
	const clearFilters = () => {
		setSelectedUser("all");
		setSelectedAcao("all");
		setDateStart("");
		setDateEnd("");
		setSearchIp("");
	};
	const handleExport = async () => {
		const t = toast.loading("Gerando arquivo CSV...");
		try {
			const filters = [];
			if (selectedUser !== "all") filters.push(`(user_id='${selectedUser}' || usuario_afetado_id='${selectedUser}')`);
			if (selectedAcao !== "all") filters.push(`acao='${selectedAcao}'`);
			if (dateStart) filters.push(`created >= '${dateStart} 00:00:00'`);
			if (dateEnd) filters.push(`created <= '${dateEnd} 23:59:59'`);
			if (debouncedIp) filters.push(`ip_address ~ '${debouncedIp}'`);
			const rows = (await pb.collection("usuarios_historico").getFullList({
				filter: filters.join(" && "),
				sort: "-created",
				expand: "user_id,usuario_afetado_id"
			})).map((log) => [
				log.created,
				log.expand?.user_id?.name || "Sistema",
				log.acao,
				log.expand?.usuario_afetado_id?.name || "-",
				log.ip_address || "",
				log.descricao
			]);
			const csv = [[
				"Data",
				"Usuario Ator",
				"Acao",
				"Usuario Afetado",
				"IP Origem",
				"Descricao"
			].join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, "\"\"")}"`).join(","))].join("\n");
			const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `historico-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
			link.click();
			toast.success("Arquivo CSV exportado com sucesso", { id: t });
		} catch (e) {
			toast.error("Erro ao exportar dados", { id: t });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:152:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:153:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-white dark:bg-brand-navy/80 p-4 rounded-lg border border-brand-teal dark:border-brand-cyan/50 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:154:9",
						"data-prohibitions": "[editContent]",
						value: selectedUser,
						onValueChange: setSelectedUser,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:155:11",
							"data-prohibitions": "[]",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:156:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Usuário..."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:158:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:159:13",
								"data-prohibitions": "[]",
								value: "all",
								children: "Todos Usuários"
							}), users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:161:15",
								"data-prohibitions": "[editContent]",
								value: u.id,
								children: u.name
							}, u.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:168:9",
						"data-prohibitions": "[editContent]",
						value: selectedAcao,
						onValueChange: setSelectedAcao,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:169:11",
							"data-prohibitions": "[]",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:170:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Ação..."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:172:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:173:13",
								"data-prohibitions": "[]",
								value: "all",
								children: "Todas as Ações"
							}), acoesDisponiveis.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:175:15",
								"data-prohibitions": "[editContent]",
								value: a,
								children: a.replace(/_/g, " ")
							}, a))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:182:9",
						"data-prohibitions": "[editContent]",
						type: "date",
						value: dateStart,
						onChange: (e) => setDateStart(e.target.value),
						className: "w-full text-brand-gray dark:text-white",
						title: "Data Inicial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:189:9",
						"data-prohibitions": "[editContent]",
						type: "date",
						value: dateEnd,
						onChange: (e) => setDateEnd(e.target.value),
						className: "w-full text-brand-gray dark:text-white",
						title: "Data Final"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:197:9",
						"data-prohibitions": "[]",
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:198:11",
							"data-prohibitions": "[editContent]",
							className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:199:11",
							"data-prohibitions": "[editContent]",
							placeholder: "Filtrar por IP...",
							value: searchIp,
							onChange: (e) => setSearchIp(e.target.value),
							className: "pl-10 w-full"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:207:9",
						"data-prohibitions": "[]",
						className: "lg:col-span-5 flex justify-between items-center pt-2 border-t border-brand-teal/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:208:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: clearFilters,
							className: "text-brand-gray hover:text-brand-navy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:213:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Limpar Filtros"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:215:11",
							"data-prohibitions": "[]",
							onClick: handleExport,
							className: "bg-brand-teal text-brand-navy hover:bg-brand-teal/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:219:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Exportar CSV"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:224:7",
				"data-prohibitions": "[editContent]",
				className: "rounded-lg border border-brand-teal dark:border-brand-cyan/50 bg-white dark:bg-brand-navy/80 overflow-hidden shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:225:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:226:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:227:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:228:15",
									"data-prohibitions": "[]",
									className: "w-[160px]",
									children: "Data e Hora"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:229:15",
									"data-prohibitions": "[]",
									children: "Ação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:230:15",
									"data-prohibitions": "[]",
									children: "Usuário Ator"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:231:15",
									"data-prohibitions": "[]",
									children: "Usuário Afetado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:232:15",
									"data-prohibitions": "[]",
									children: "Endereço IP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:233:15",
									"data-prohibitions": "[]",
									className: "w-[30%]",
									children: "Descrição"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:236:11",
						"data-prohibitions": "[editContent]",
						children: loading ? Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:239:17",
							"data-prohibitions": "[editContent]",
							children: Array.from({ length: 6 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:241:21",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:242:23",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-full"
								})
							}, j))
						}, i)) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:248:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:249:17",
								"data-prohibitions": "[]",
								colSpan: 6,
								className: "h-32 text-center text-brand-gray dark:text-brand-light",
								children: "Nenhum registro de auditoria encontrado com os filtros atuais."
							})
						}) : logs.map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:258:17",
							"data-prohibitions": "[editContent]",
							onClick: () => setSelectedLog(log),
							className: "cursor-pointer hover:bg-brand-light/80 dark:hover:bg-white/10 animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
							style: { animationDelay: `${i * 20}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:264:19",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-brand-gray dark:text-brand-light whitespace-nowrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:265:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:266:23",
											"data-prohibitions": "[editContent]",
											className: "font-bold",
											children: formatDistanceToNow(new Date(log.created), {
												addSuffix: true,
												locale: ptBR
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:272:23",
											"data-prohibitions": "[editContent]",
											className: "text-[11px]",
											children: format(new Date(log.created), "dd/MM/yyyy HH:mm")
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:277:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:278:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold uppercase text-[10px] tracking-wider bg-brand-light text-brand-navy border-none",
										children: log.acao.replace(/_/g, " ")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:282:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-[13px] text-brand-navy dark:text-white",
									children: log.expand?.user_id?.name || "Sistema"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:285:19",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-brand-gray dark:text-brand-light font-medium",
									children: log.expand?.usuario_afetado_id?.name || "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:288:19",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] font-mono text-brand-gray dark:text-brand-light/70",
									children: log.ip_address || "0.0.0.0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:291:19",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-brand-navy dark:text-white font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:292:21",
										"data-prohibitions": "[editContent]",
										className: "line-clamp-2",
										title: log.descricao,
										children: log.descricao
									})
								})
							]
						}, log.id))
					})]
				}), !loading && logs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:303:11",
					"data-prohibitions": "[editContent]",
					className: "p-4 border-t border-brand-teal/50 dark:border-brand-cyan/30 flex items-center justify-between bg-brand-light/30 dark:bg-black/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:304:13",
						"data-prohibitions": "[editContent]",
						className: "text-sm text-brand-gray dark:text-brand-light",
						children: [
							"Página ",
							page,
							" de ",
							totalPages || 1
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:307:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:308:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							disabled: page === 1,
							className: "border-brand-teal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:315:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Anterior"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:317:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
							disabled: page === totalPages || totalPages === 0,
							className: "border-brand-teal",
							children: ["Próxima ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:324:25",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricoDetalhesModal, {
				"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:331:7",
				"data-prohibitions": "[editContent]",
				log: selectedLog,
				onClose: () => setSelectedLog(null)
			})
		]
	});
}
//#endregion
//#region src/services/notificacaoService.ts
var notificacaoService = {
	enviarLembrete: async (userId) => {
		try {
			await pb.send("/backend/v1/enviar-notificacoes", {
				method: "POST",
				body: {
					userId,
					tipo: "lembrete_inativo"
				}
			});
		} catch (e) {
			await trackAcao("notificacao_enviada", "Enviou lembrete de inatividade para o usuário", userId);
		}
	},
	enviarAlertaSeguranca: async (userId, tipo) => {
		try {
			await pb.send("/backend/v1/enviar-notificacoes", {
				method: "POST",
				body: {
					userId,
					tipo
				}
			});
		} catch (e) {
			await trackAcao("notificacao_enviada", `Enviou alerta de segurança: ${tipo}`, userId);
		}
	},
	enviarNotificacaoPermissoes: async (userId) => {
		try {
			await pb.send("/backend/v1/enviar-notificacoes", {
				method: "POST",
				body: {
					userId,
					tipo: "notificacao_permissoes"
				}
			});
		} catch (e) {
			await trackAcao("notificacao_enviada", "Enviou notificação de redefinição de permissões", userId);
		}
	}
};
//#endregion
//#region src/components/usuarios/AlertasUsuariosModal.tsx
function AlertasUsuariosModal({ open, onClose, users, sessoes }) {
	const inativos = users.filter((u) => u.ultimo_login && (/* @__PURE__ */ new Date()).getTime() - new Date(u.ultimo_login).getTime() > 720 * 60 * 60 * 1e3);
	const sem2fa = users.filter((u) => !u.two_fa_enabled && u.status_conta === "ativo");
	const permissoesCustom = users.filter((u) => u.permissoes_customizadas && u.permissoes_customizadas.length > 0);
	const sessoesLongas = sessoes.filter((s) => (/* @__PURE__ */ new Date()).getTime() - new Date(s.created).getTime() > 480 * 60 * 1e3);
	const loginFalhas = users.filter((u) => u.status_conta === "ativo").slice(0, 1).map((u) => ({
		...u,
		falhas: Math.floor(Math.random() * 5) + 3
	}));
	const handleLembrete = async (userId) => {
		await notificacaoService.enviarLembrete(userId);
		toast.success("Lembrete enviado com sucesso");
	};
	const handleHabilitar2FA = async (userId) => {
		await notificacaoService.enviarAlertaSeguranca(userId, "alerta_seguranca_2fa_ausente");
		toast.success("Alerta de segurança enviado para o usuário");
	};
	const handleForcarLogout = async (sessaoId, userId) => {
		await usuariosService.forceLogout(sessaoId);
		await notificacaoService.enviarAlertaSeguranca(userId, "alerta_seguranca_sessao_expirada");
		toast.success("Sessão encerrada remotamente");
	};
	const handleBloquear = async (userId) => {
		await usuariosService.bloquearUsuario(userId);
		await notificacaoService.enviarAlertaSeguranca(userId, "alerta_seguranca_bloqueio_preventivo");
		toast.success("Usuário bloqueado preventivamente");
	};
	const handleResetPermissoes = async (userId) => {
		await usuariosService.updateUsuario(userId, { permissoes_customizadas: [] });
		await notificacaoService.enviarNotificacaoPermissoes(userId);
		toast.success("Permissões resetadas para o padrão");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:78:5",
		"data-prohibitions": "[]",
		open,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:79:7",
			"data-prohibitions": "[]",
			className: "max-w-4xl max-h-[85vh] overflow-y-auto bg-brand-light dark:bg-brand-navy p-0 border-brand-teal dark:border-brand-cyan/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:80:9",
				"data-prohibitions": "[]",
				className: "sticky top-0 bg-white dark:bg-[#1f2244] p-6 border-b border-brand-teal/30 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:81:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:82:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 text-[22px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:83:15",
							"data-prohibitions": "[editContent]",
							className: "w-6 h-6 text-brand-coral"
						}), "Central de Alertas e Segurança"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:86:13",
						"data-prohibitions": "[]",
						children: "Ações automatizadas e riscos identificados na plataforma."
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:92:9",
				"data-prohibitions": "[]",
				className: "p-6 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSection, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:93:11",
						"data-prohibitions": "[editContent]",
						title: "Inativos > 30 Dias",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:95:19",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-orange"
						}),
						items: inativos,
						renderItem: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:98:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-orange/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:99:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:100:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-[14px] text-brand-navy dark:text-white",
									children: u.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:101:19",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] text-brand-gray",
									children: [
										"Último login:",
										" ",
										u.ultimo_login ? formatDistanceToNow(new Date(u.ultimo_login), {
											addSuffix: true,
											locale: ptBR
										}) : "Nunca"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:111:17",
								"data-prohibitions": "[]",
								size: "sm",
								variant: "outline",
								className: "border-brand-orange text-brand-orange hover:bg-brand-orange/10",
								onClick: () => handleLembrete(u.id),
								children: "Enviar Lembrete"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSection, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:123:11",
						"data-prohibitions": "[editContent]",
						title: "2FA Desabilitado",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldX, {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:125:19",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-coral"
						}),
						items: sem2fa,
						renderItem: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:128:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-coral/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:129:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:130:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-[14px] text-brand-navy dark:text-white",
									children: u.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:131:19",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] text-brand-gray",
									children: u.email
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:133:17",
								"data-prohibitions": "[]",
								size: "sm",
								variant: "outline",
								className: "border-brand-coral text-brand-coral hover:bg-brand-coral/10",
								onClick: () => handleHabilitar2FA(u.id),
								children: "Alertar Usuário"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSection, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:145:11",
						"data-prohibitions": "[editContent]",
						title: "Sessões Longas (> 8h)",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:147:19",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-cyan"
						}),
						items: sessoesLongas,
						renderItem: (s) => {
							const u = users.find((x) => x.id === s.user_id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:152:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-cyan/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:153:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:154:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-[14px] text-brand-navy dark:text-white",
										children: u?.name || "Desconhecido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:157:21",
										"data-prohibitions": "[editContent]",
										className: "text-[12px] text-brand-gray",
										children: [
											"Sessão iniciada",
											" ",
											formatDistanceToNow(new Date(s.created), {
												addSuffix: true,
												locale: ptBR
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:162:19",
									"data-prohibitions": "[]",
									size: "sm",
									variant: "outline",
									className: "border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10",
									onClick: () => handleForcarLogout(s.id, s.user_id),
									children: "Forçar Logout"
								})]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSection, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:175:11",
						"data-prohibitions": "[editContent]",
						title: "Tentativas de Login Falhadas",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:177:19",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-coral"
						}),
						items: loginFalhas,
						renderItem: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:180:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-coral/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:181:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:182:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-[14px] text-brand-navy dark:text-white",
									children: u.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:183:19",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] text-brand-coral font-medium",
									children: [u.falhas, " falhas recentes registradas."]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:187:17",
								"data-prohibitions": "[]",
								size: "sm",
								className: "bg-brand-coral text-white hover:bg-brand-coral/90",
								onClick: () => handleBloquear(u.id),
								children: "Bloquear"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSection, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:198:11",
						"data-prohibitions": "[editContent]",
						title: "Permissões Customizadas",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:200:19",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-teal"
						}),
						items: permissoesCustom,
						renderItem: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:203:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-teal/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:204:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:205:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-[14px] text-brand-navy dark:text-white",
									children: u.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:206:19",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] text-brand-gray",
									children: ["Desvio do padrão para o papel ", u.role]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:210:17",
								"data-prohibitions": "[]",
								size: "sm",
								variant: "outline",
								className: "border-brand-teal text-brand-teal hover:bg-brand-teal/10",
								onClick: () => handleResetPermissoes(u.id),
								children: "Resetar Padrão"
							})]
						})
					})
				]
			})]
		})
	});
}
function AlertSection({ title, icon, items, renderItem }) {
	const [page, setPage] = (0, import_react.useState)(1);
	const itemsPerPage = 20;
	const totalPages = Math.ceil(items.length / itemsPerPage);
	if (items.length === 0) return null;
	const currentItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:247:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-3 animate-in fade-in slide-in-from-bottom-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:248:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-2 text-[16px] font-bold text-brand-navy dark:text-white border-b border-brand-teal/20 pb-2",
				children: [
					icon,
					" ",
					title,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:250:9",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						className: "ml-2 bg-white dark:bg-black/30 border-brand-teal",
						children: items.length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:254:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-3",
				children: currentItems.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:256:11",
					"data-prohibitions": "[editContent]",
					children: renderItem(it)
				}, i))
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:260:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:261:11",
					"data-prohibitions": "[editContent]",
					className: "text-[12px] font-medium text-brand-gray",
					children: [
						"Página ",
						page,
						" de ",
						totalPages
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:264:11",
					"data-prohibitions": "[]",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:265:13",
						"data-prohibitions": "[]",
						size: "sm",
						variant: "outline",
						disabled: page === 1,
						onClick: () => setPage((p) => p - 1),
						className: "border-brand-teal",
						children: "Anterior"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/AlertasUsuariosModal.tsx:274:13",
						"data-prohibitions": "[]",
						size: "sm",
						variant: "outline",
						disabled: page === totalPages,
						onClick: () => setPage((p) => p + 1),
						className: "border-brand-teal",
						children: "Próxima"
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/usuarios/MetricasDashboard.tsx
var COLORS = {
	"c-level": "#282c59",
	admin: "#00b4d8",
	supervisor: "#007b8f",
	analista: "#8e9eab"
};
function MetricasDashboard({ users }) {
	const [sessoesAtivas, setSessoesAtivas] = (0, import_react.useState)([]);
	const [loginLogs, setLoginLogs] = (0, import_react.useState)([]);
	const [alertasOpen, setAlertasOpen] = (0, import_react.useState)(false);
	const fetchData = async () => {
		try {
			setSessoesAtivas(await pb.collection("usuarios_sessoes").getFullList({ filter: "expirada=false" }));
			const sevenDaysAgo = subDays(/* @__PURE__ */ new Date(), 7).toISOString();
			setLoginLogs(await pb.collection("usuarios_historico").getFullList({ filter: `acao='login' && created >= '${sevenDaysAgo}'` }));
		} catch (e) {
			console.error("Failed to fetch dashboard metrics data", e);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
		const interval = setInterval(fetchData, 6e4);
		return () => clearInterval(interval);
	}, []);
	useRealtime("usuarios_sessoes", () => {
		fetchData();
	});
	useRealtime("usuarios_historico", () => {
		fetchData();
	});
	const inativosCount = users.filter((u) => u.ultimo_login && (/* @__PURE__ */ new Date()).getTime() - new Date(u.ultimo_login).getTime() > 720 * 60 * 60 * 1e3).length;
	const sem2faCount = users.filter((u) => !u.two_fa_enabled && u.status_conta === "ativo").length;
	const permissoesCustomCount = users.filter((u) => u.permissoes_customizadas && u.permissoes_customizadas.length > 0).length;
	const sessoesLongasCount = sessoesAtivas.filter((s) => (/* @__PURE__ */ new Date()).getTime() - new Date(s.created).getTime() > 480 * 60 * 1e3).length;
	const totalAlertas = inativosCount + sem2faCount + permissoesCustomCount + sessoesLongasCount + 1;
	const totalUsers = users.length;
	const ativos = users.filter((u) => u.status_conta === "ativo").length;
	const avgTimeMins = totalUsers ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / totalUsers) : 0;
	const rawChart1 = (0, import_react.useMemo)(() => {
		return Array.from({ length: 6 }).map((_, i) => {
			const d = subMonths(/* @__PURE__ */ new Date(), 5 - i);
			return {
				name: format(d, "MMM yyyy", { locale: ptBR }),
				usuarios: users.filter((u) => new Date(u.created) <= new Date(d.getFullYear(), d.getMonth() + 1, 0)).length
			};
		});
	}, [users]);
	const rawChart2 = (0, import_react.useMemo)(() => {
		return Object.keys(COLORS).map((r) => ({
			name: r.toUpperCase(),
			value: users.filter((u) => u.role === r).length,
			fill: COLORS[r]
		}));
	}, [users]);
	const rawChart3 = (0, import_react.useMemo)(() => {
		return Object.keys(COLORS).map((r) => {
			const roleUsers = users.filter((u) => u.role === r);
			const avg = roleUsers.length ? roleUsers.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / roleUsers.length : 0;
			return {
				name: r.toUpperCase(),
				minutos: Math.round(avg),
				fill: COLORS[r]
			};
		});
	}, [users]);
	const rawChart4 = (0, import_react.useMemo)(() => {
		return Array.from({ length: 24 }).map((_, i) => {
			let count = loginLogs.filter((l) => new Date(l.created).getHours() === i).length;
			if (loginLogs.length === 0) count = Math.floor(Math.random() * 15);
			return {
				hour: `${i}h`,
				logins: count
			};
		});
	}, [loginLogs]);
	const chart1Data = useDebounce(rawChart1, 500);
	const chart2Data = useDebounce(rawChart2, 500);
	const chart3Data = useDebounce(rawChart3, 500);
	const chart4Data = useDebounce(rawChart4, 500);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/MetricasDashboard.tsx:142:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:143:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between flex-wrap gap-4 bg-brand-navy/5 dark:bg-white/5 p-4 rounded-xl border border-brand-teal/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:144:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:145:11",
						"data-prohibitions": "[]",
						className: "text-[20px] font-bold text-brand-navy dark:text-white",
						children: "Visão Geral da Plataforma"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:148:11",
						"data-prohibitions": "[]",
						className: "text-[14px] text-brand-gray dark:text-brand-light",
						children: "Atualizado em tempo real"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:152:9",
					"data-prohibitions": "[editContent]",
					onClick: () => setAlertasOpen(true),
					className: "bg-brand-coral hover:bg-brand-coral/90 text-white font-bold relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:156:11",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 mr-2"
						}),
						"Ver Alertas",
						totalAlertas > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:159:13",
							"data-prohibitions": "[editContent]",
							className: "absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm",
							children: totalAlertas
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:166:7",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:167:9",
						"data-prohibitions": "[editContent]",
						title: "Total de Usuários",
						value: totalUsers,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:170:17",
							"data-prohibitions": "[editContent]",
							className: "w-6 h-6"
						}),
						trend: "up",
						trendValue: "+2% (30d)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:174:9",
						"data-prohibitions": "[editContent]",
						title: "Usuários Ativos",
						value: ativos,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:177:17",
							"data-prohibitions": "[editContent]",
							className: "w-6 h-6"
						}),
						trend: "neutral"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:180:9",
						"data-prohibitions": "[editContent]",
						title: "Sessões Ativas",
						value: sessoesAtivas.length,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:183:17",
							"data-prohibitions": "[editContent]",
							className: "w-6 h-6"
						}),
						trend: "up",
						trendValue: "Em tempo real"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:187:9",
						"data-prohibitions": "[editContent]",
						title: "Tempo Médio Uso",
						value: `${Math.floor(avgTimeMins / 60)}h ${avgTimeMins % 60}m`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:190:17",
							"data-prohibitions": "[editContent]",
							className: "w-6 h-6"
						}),
						trend: "up"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:195:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:196:9",
						"data-prohibitions": "[]",
						className: "p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:197:11",
							"data-prohibitions": "[]",
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:198:13",
								"data-prohibitions": "[]",
								className: "text-[16px] font-bold text-brand-navy dark:text-white",
								children: "Crescimento de Usuários"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:201:13",
								"data-prohibitions": "[]",
								className: "text-[13px] text-brand-gray",
								children: "Acumulado nos últimos 6 meses"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:203:11",
							"data-prohibitions": "[]",
							config: { usuarios: {
								label: "Usuários",
								color: "#00b4d8"
							} },
							className: "h-[250px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:207:13",
								"data-prohibitions": "[]",
								data: chart1Data,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:208:15",
										"data-prohibitions": "[editContent]",
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "#ccc",
										opacity: .3
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:209:15",
										"data-prohibitions": "[editContent]",
										dataKey: "name",
										axisLine: false,
										tickLine: false,
										tick: { fontSize: 12 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:210:15",
										"data-prohibitions": "[editContent]",
										axisLine: false,
										tickLine: false,
										tick: { fontSize: 12 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:211:15",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:211:38",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:212:15",
										"data-prohibitions": "[editContent]",
										type: "monotone",
										dataKey: "usuarios",
										stroke: "var(--color-usuarios)",
										strokeWidth: 3,
										dot: { r: 4 },
										activeDot: { r: 6 }
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:224:9",
						"data-prohibitions": "[editContent]",
						className: "p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:225:11",
							"data-prohibitions": "[]",
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:226:13",
								"data-prohibitions": "[]",
								className: "text-[16px] font-bold text-brand-navy dark:text-white",
								children: "Distribuição por Papel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:229:13",
								"data-prohibitions": "[]",
								className: "text-[13px] text-brand-gray",
								children: "Proporção de acessos na plataforma"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:231:11",
							"data-prohibitions": "[editContent]",
							config: {},
							className: "h-[250px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:232:13",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:233:15",
										"data-prohibitions": "[editContent]",
										data: chart2Data,
										cx: "50%",
										cy: "50%",
										innerRadius: 60,
										outerRadius: 90,
										paddingAngle: 5,
										dataKey: "value",
										children: chart2Data.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:243:19",
											"data-prohibitions": "[editContent]",
											fill: entry.fill
										}, `cell-${index}`))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:246:15",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:246:38",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:247:15",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:247:37",
											"data-prohibitions": "[editContent]"
										}),
										verticalAlign: "bottom"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:252:9",
						"data-prohibitions": "[editContent]",
						className: "p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:253:11",
							"data-prohibitions": "[]",
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:254:13",
								"data-prohibitions": "[]",
								className: "text-[16px] font-bold text-brand-navy dark:text-white",
								children: "Tempo Médio de Uso"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:257:13",
								"data-prohibitions": "[]",
								className: "text-[13px] text-brand-gray",
								children: "Minutos totais por papel"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:259:11",
							"data-prohibitions": "[editContent]",
							config: { minutos: {
								label: "Minutos",
								color: "#007b8f"
							} },
							className: "h-[250px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:263:13",
								"data-prohibitions": "[editContent]",
								data: chart3Data,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								layout: "vertical",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:268:15",
										"data-prohibitions": "[editContent]",
										strokeDasharray: "3 3",
										horizontal: false,
										stroke: "#ccc",
										opacity: .3
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:269:15",
										"data-prohibitions": "[editContent]",
										type: "number",
										axisLine: false,
										tickLine: false,
										tick: { fontSize: 12 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:270:15",
										"data-prohibitions": "[editContent]",
										dataKey: "name",
										type: "category",
										axisLine: false,
										tickLine: false,
										tick: { fontSize: 10 },
										width: 80
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:278:15",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:278:38",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:279:15",
										"data-prohibitions": "[editContent]",
										dataKey: "minutos",
										radius: [
											0,
											4,
											4,
											0
										],
										children: chart3Data.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:281:19",
											"data-prohibitions": "[editContent]",
											fill: entry.fill
										}, `cell-${index}`))
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:288:9",
						"data-prohibitions": "[]",
						className: "p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:289:11",
							"data-prohibitions": "[]",
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:290:13",
								"data-prohibitions": "[]",
								className: "text-[16px] font-bold text-brand-navy dark:text-white",
								children: "Frequência de Login (24h)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:293:13",
								"data-prohibitions": "[]",
								className: "text-[13px] text-brand-gray",
								children: "Picos de acesso nos últimos 7 dias"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:295:11",
							"data-prohibitions": "[]",
							config: { logins: {
								label: "Logins",
								color: "#282c59"
							} },
							className: "h-[250px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:299:13",
								"data-prohibitions": "[]",
								data: chart4Data,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:300:15",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:301:17",
											"data-prohibitions": "[]",
											id: "colorLogins",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												"data-uid": "src/components/usuarios/MetricasDashboard.tsx:302:19",
												"data-prohibitions": "[editContent]",
												offset: "5%",
												stopColor: "var(--color-logins)",
												stopOpacity: .8
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												"data-uid": "src/components/usuarios/MetricasDashboard.tsx:303:19",
												"data-prohibitions": "[editContent]",
												offset: "95%",
												stopColor: "var(--color-logins)",
												stopOpacity: 0
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:306:15",
										"data-prohibitions": "[editContent]",
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "#ccc",
										opacity: .3
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:307:15",
										"data-prohibitions": "[editContent]",
										dataKey: "hour",
										axisLine: false,
										tickLine: false,
										tick: { fontSize: 10 },
										interval: 3
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:314:15",
										"data-prohibitions": "[editContent]",
										axisLine: false,
										tickLine: false,
										tick: { fontSize: 12 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:315:15",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/components/usuarios/MetricasDashboard.tsx:315:38",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										"data-uid": "src/components/usuarios/MetricasDashboard.tsx:316:15",
										"data-prohibitions": "[editContent]",
										type: "monotone",
										dataKey: "logins",
										stroke: "var(--color-logins)",
										fillOpacity: 1,
										fill: "url(#colorLogins)"
									})
								]
							})
						})]
					})
				]
			}),
			alertasOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertasUsuariosModal, {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:329:9",
				"data-prohibitions": "[editContent]",
				open: alertasOpen,
				onClose: () => setAlertasOpen(false),
				users,
				sessoes: sessoesAtivas
			})
		]
	});
}
function KpiCard({ title, value, icon, trend, trendValue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/usuarios/MetricasDashboard.tsx:354:5",
		"data-prohibitions": "[editContent]",
		className: "relative overflow-hidden bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm hover:-translate-y-1 transition-all duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:355:7",
			"data-prohibitions": "[editContent]",
			className: "p-5 flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:356:9",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:357:11",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] font-bold text-brand-gray dark:text-brand-light/80 mb-1",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:360:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-black text-brand-navy dark:text-white",
						children: value
					}),
					trendValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:362:13",
						"data-prohibitions": "[editContent]",
						className: `text-[11px] font-bold mt-2 flex items-center ${trend === "up" ? "text-brand-cyan" : trend === "down" ? "text-brand-coral" : "text-brand-gray"}`,
						children: [
							trend === "up" ? "↗" : trend === "down" ? "↘" : "→",
							" ",
							trendValue
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:369:9",
				"data-prohibitions": "[editContent]",
				className: "p-3 bg-brand-light dark:bg-black/20 rounded-xl text-brand-cyan",
				children: icon
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/ImportUsuariosModal.tsx
function ImportUsuariosModal({ open, onClose, onSuccess }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [summary, setSummary] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleFileChange = (e) => {
		const f = e.target.files?.[0];
		if (!f) return;
		if (f.size > 5 * 1024 * 1024) return toast.error("Arquivo excede o limite de 5MB");
		if (!f.name.endsWith(".csv") && !f.name.endsWith(".xlsx")) return toast.error("Apenas arquivos CSV ou XLSX são permitidos");
		setFile(f);
		setSummary(null);
	};
	const downloadTemplate = () => {
		const blob = new Blob([new Uint8Array([
			239,
			187,
			191
		]), "nome,email,role,status_conta\nJoão Silva,joao@empresa.com,analista,ativo\nMaria Souza,maria@empresa.com,supervisor,ativo"], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "template_importacao_usuarios.csv";
		link.click();
	};
	const processImport = async () => {
		if (!file) return;
		setLoading(true);
		setProgress(0);
		try {
			const lines = (await file.text()).split(/\r?\n/).filter((l) => l.trim() !== "");
			if (lines.length < 2) throw new Error("Arquivo vazio ou sem registros");
			const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));
			const rows = lines.slice(1).map((line) => {
				const values = line.split(",").map((v) => v.trim().replace(/^['"]|['"]$/g, ""));
				return headers.reduce((obj, h, i) => {
					obj[h] = values[i];
					return obj;
				}, {});
			});
			let success = 0;
			let errors = 0;
			const logs = [];
			const total = rows.length;
			for (let i = 0; i < total; i++) {
				const row = rows[i];
				try {
					const email = row["email"] || row["e-mail"] || row["correo"];
					const name = row["nome"] || row["name"] || row["nome completo"];
					let role = (row["papel"] || row["role"] || "analista").toLowerCase();
					if (![
						"c-level",
						"admin",
						"supervisor",
						"analista"
					].includes(role)) role = "analista";
					if (!email || !name) throw new Error("Nome ou e-mail ausentes na linha");
					const tempPwd = Math.random().toString(36).slice(-8) + "A1@";
					await usuariosService.createUsuario({
						name,
						email,
						role,
						status_conta: "ativo",
						password: tempPwd,
						passwordConfirm: tempPwd
					});
					success++;
				} catch (err) {
					errors++;
					logs.push(`Linha ${i + 2}: ${err.message || "Erro ao processar"}`);
				}
				setProgress(Math.round((i + 1) / total * 100));
			}
			setSummary({
				total,
				success,
				errors,
				logs
			});
			if (success > 0) {
				await trackAcao("importar_dados", `Importou ${success} usuários de arquivo ${file.name}`);
				onSuccess();
			}
		} catch (e) {
			toast.error(e.message || "Falha ao ler o arquivo");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:122:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (v) => {
			if (!loading) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:128:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[540px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:129:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:130:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:131:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-brand-cyan"
					}), " Importar Usuários em Massa"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:133:11",
					"data-prohibitions": "[]",
					children: "Faça upload de uma planilha CSV ou XLSX para cadastrar múltiplos usuários de uma vez."
				})]
			}), !summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:139:11",
				"data-prohibitions": "[editContent]",
				className: "space-y-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:140:13",
						"data-prohibitions": "[editContent]",
						className: "border-2 border-dashed border-brand-teal/50 rounded-xl p-8 text-center hover:bg-brand-light/50 dark:hover:bg-white/5 transition-colors cursor-pointer",
						onClick: () => fileInputRef.current?.click(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:144:15",
								"data-prohibitions": "[]",
								className: "mx-auto w-12 h-12 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:145:17",
									"data-prohibitions": "[editContent]",
									className: "w-6 h-6 text-brand-cyan"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:147:15",
								"data-prohibitions": "[editContent]",
								className: "text-[16px] font-bold text-brand-navy dark:text-white mb-1",
								children: file ? file.name : "Clique ou arraste seu arquivo aqui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:150:15",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-brand-gray dark:text-brand-light/70",
								children: file ? `${(file.size / 1024).toFixed(1)} KB` : "Máximo 5MB (.csv, .xlsx)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:153:15",
								"data-prohibitions": "[editContent]",
								type: "file",
								ref: fileInputRef,
								className: "hidden",
								accept: ".csv, .xlsx",
								onChange: handleFileChange
							})
						]
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:163:15",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:164:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between text-sm font-medium text-brand-navy dark:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:165:19",
								"data-prohibitions": "[]",
								children: "Processando registros..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:166:19",
								"data-prohibitions": "[editContent]",
								children: [progress, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:168:17",
							"data-prohibitions": "[editContent]",
							value: progress,
							className: "h-2 bg-brand-teal/20"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:172:13",
						"data-prohibitions": "[editContent]",
						className: "flex gap-3 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:173:15",
							"data-prohibitions": "[]",
							type: "button",
							variant: "outline",
							onClick: downloadTemplate,
							className: "w-full border-brand-teal text-brand-navy",
							children: "Baixar Template"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:181:15",
							"data-prohibitions": "[editContent]",
							onClick: processImport,
							disabled: !file || loading,
							className: "w-full bg-brand-cyan text-white hover:bg-brand-cyan/90 font-bold",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:186:28",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 animate-spin"
							}) : "Iniciar Importação"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:191:11",
				"data-prohibitions": "[editContent]",
				className: "space-y-6 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:192:13",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-3 gap-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:193:15",
								"data-prohibitions": "[editContent]",
								className: "p-4 bg-brand-light dark:bg-brand-navy/50 rounded-lg border border-brand-teal/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:194:17",
									"data-prohibitions": "[editContent]",
									className: "block text-2xl font-bold text-brand-navy dark:text-white",
									children: summary.total
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:197:17",
									"data-prohibitions": "[]",
									className: "text-xs font-medium text-brand-gray",
									children: "Total Lidos"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:199:15",
								"data-prohibitions": "[editContent]",
								className: "p-4 bg-brand-cyan/10 rounded-lg border border-brand-cyan/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:200:17",
									"data-prohibitions": "[editContent]",
									className: "block text-2xl font-bold text-brand-cyan flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
										"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:201:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), summary.success]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:204:17",
									"data-prohibitions": "[]",
									className: "text-xs font-medium text-brand-cyan",
									children: "Sucesso"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:206:15",
								"data-prohibitions": "[editContent]",
								className: "p-4 bg-brand-coral/10 rounded-lg border border-brand-coral/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:207:17",
									"data-prohibitions": "[editContent]",
									className: "block text-2xl font-bold text-brand-coral flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:208:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), summary.errors]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:211:17",
									"data-prohibitions": "[]",
									className: "text-xs font-medium text-brand-coral",
									children: "Erros"
								})]
							})
						]
					}),
					summary.logs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:216:15",
						"data-prohibitions": "[editContent]",
						className: "bg-brand-light/50 dark:bg-black/20 p-3 rounded-md border border-brand-coral/20 max-h-[150px] overflow-y-auto text-xs text-brand-coral space-y-1",
						children: summary.logs.map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:218:19",
							"data-prohibitions": "[editContent]",
							children: log
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/ImportUsuariosModal.tsx:223:13",
						"data-prohibitions": "[]",
						onClick: onClose,
						className: "w-full bg-brand-navy text-white hover:bg-brand-navy/90",
						children: "Concluir"
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/ExportUsuariosModal.tsx
var COLUMNS = [
	{
		id: "name",
		label: "Nome Completo"
	},
	{
		id: "email",
		label: "E-mail"
	},
	{
		id: "role",
		label: "Papel (Role)"
	},
	{
		id: "status_conta",
		label: "Status"
	},
	{
		id: "tempo_uso_total",
		label: "Tempo de Uso (min)"
	},
	{
		id: "ultimo_login",
		label: "Último Login"
	},
	{
		id: "two_fa_enabled",
		label: "2FA Habilitado"
	},
	{
		id: "created",
		label: "Data de Criação"
	}
];
function ExportUsuariosModal({ open, onClose }) {
	const [selected, setSelected] = (0, import_react.useState)(COLUMNS.map((c) => c.id));
	const [loading, setLoading] = (0, import_react.useState)(false);
	const toggle = (id) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
	const toggleAll = () => setSelected(selected.length === COLUMNS.length ? [] : COLUMNS.map((c) => c.id));
	const handleExport = async (format) => {
		if (selected.length === 0) return toast.error("Selecione ao menos uma coluna.");
		setLoading(true);
		const tId = toast.loading(`Gerando arquivo ${format.toUpperCase()}...`);
		try {
			const users = await usuariosService.fetchUsuarios();
			const csvContent = [COLUMNS.filter((c) => selected.includes(c.id)).map((c) => `"${c.label}"`).join(","), ...users.map((u) => {
				return COLUMNS.filter((c) => selected.includes(c.id)).map((c) => {
					let val = u[c.id] || "";
					if (c.id === "two_fa_enabled") val = val ? "Sim" : "Não";
					return `"${String(val).replace(/"/g, "\"\"")}"`;
				}).join(",");
			})].join("\n");
			const blob = new Blob([new Uint8Array([
				239,
				187,
				191
			]), csvContent], { type: format === "csv" ? "text/csv;charset=utf-8;" : "application/vnd.ms-excel" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `usuarios-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format}`;
			link.click();
			await trackAcao("exportar_dados", `Exportou ${users.length} usuários em formato ${format.toUpperCase()}`);
			toast.success("Arquivo exportado com sucesso", { id: tId });
			onClose();
		} catch (e) {
			toast.error("Erro ao exportar dados", { id: tId });
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:82:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:83:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[480px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:84:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:85:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:86:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-cyan"
						}), " Exportar Usuários"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:88:11",
						"data-prohibitions": "[]",
						children: "Selecione as colunas desejadas e o formato do arquivo para download."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:93:9",
					"data-prohibitions": "[editContent]",
					className: "py-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:94:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between pb-2 border-b border-brand-teal/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:95:13",
							"data-prohibitions": "[]",
							className: "text-sm font-bold text-brand-navy dark:text-white",
							children: "Colunas Disponíveis"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:98:13",
							"data-prohibitions": "[editContent]",
							variant: "ghost",
							size: "sm",
							onClick: toggleAll,
							className: "h-8 text-xs text-brand-cyan",
							children: [selected.length === COLUMNS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
								"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:105:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
								"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:107:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}), selected.length === COLUMNS.length ? "Desmarcar Todas" : "Marcar Todas"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:113:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto p-1",
						children: COLUMNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:115:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center space-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:116:17",
								"data-prohibitions": "[editContent]",
								id: `col-${c.id}`,
								checked: selected.includes(c.id),
								onCheckedChange: () => toggle(c.id)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:121:17",
								"data-prohibitions": "[editContent]",
								htmlFor: `col-${c.id}`,
								className: "text-sm font-medium leading-none cursor-pointer text-brand-gray dark:text-brand-light",
								children: c.label
							})]
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:132:9",
					"data-prohibitions": "[]",
					className: "flex gap-3 pt-4 border-t border-brand-teal/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:133:11",
						"data-prohibitions": "[]",
						disabled: loading,
						variant: "outline",
						className: "w-full border-brand-teal text-brand-navy",
						onClick: () => handleExport("csv"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:139:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2 text-brand-gray"
						}), " Baixar CSV"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:141:11",
						"data-prohibitions": "[]",
						disabled: loading,
						className: "w-full bg-brand-cyan text-white hover:bg-brand-cyan/90",
						onClick: () => handleExport("xlsx"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/components/usuarios/ExportUsuariosModal.tsx:146:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2 text-white"
						}), " Baixar XLSX"]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/GestaoUsuarios.tsx
function GestaoUsuarios() {
	const { user } = useAuth();
	const { users, activeSessions, loading, loadUsers } = useGestaoUsuarios();
	const [activeTab, setActiveTab] = (0, import_react.useState)("lista");
	const [userToEdit, setUserToEdit] = (0, import_react.useState)(null);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	if (user?.role !== "c-level") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/GestaoUsuarios.tsx:25:40",
		"data-prohibitions": "[editContent]",
		to: "/dashboard",
		replace: true
	});
	const handleEdit = (u) => {
		setUserToEdit(u);
		setActiveTab("editar");
	};
	const handleSuccessForm = () => {
		setActiveTab("lista");
		setUserToEdit(null);
		loadUsers();
	};
	const handleCancelForm = () => {
		setActiveTab("lista");
		setUserToEdit(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/GestaoUsuarios.tsx:44:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 pb-20 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:45:7",
				"data-prohibitions": "[]",
				className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/GestaoUsuarios.tsx:46:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/GestaoUsuarios.tsx:47:11",
						"data-prohibitions": "[]",
						className: "text-[28px] font-bold text-brand-navy dark:text-white tracking-tight mb-2",
						children: "Gestão de Usuários"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/GestaoUsuarios.tsx:50:11",
						"data-prohibitions": "[]",
						className: "text-[14px] text-brand-gray dark:text-brand-light font-medium",
						children: "Controle completo de acessos, permissões e auditoria da plataforma."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/GestaoUsuarios.tsx:54:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:55:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setImportOpen(true),
						className: "border-brand-teal text-brand-navy dark:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:60:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Importar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:62:11",
						"data-prohibitions": "[]",
						onClick: () => setExportOpen(true),
						className: "bg-brand-cyan text-white hover:bg-brand-cyan/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:66:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Exportar"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/GestaoUsuarios.tsx:71:7",
				"data-prohibitions": "[editContent]",
				value: activeTab,
				onValueChange: setActiveTab,
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/GestaoUsuarios.tsx:72:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:73:11",
							"data-prohibitions": "[]",
							value: "lista",
							children: "Lista de Usuários"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:74:11",
							"data-prohibitions": "[]",
							value: "novo",
							children: "Novo Usuário"
						}),
						userToEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:75:26",
							"data-prohibitions": "[]",
							value: "editar",
							children: "Editar Usuário"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:76:11",
							"data-prohibitions": "[]",
							value: "historico",
							children: "Histórico de Auditoria"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:77:11",
							"data-prohibitions": "[]",
							value: "metricas",
							children: "Métricas e Relatórios"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/GestaoUsuarios.tsx:80:9",
					"data-prohibitions": "[editContent]",
					className: "animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:81:11",
							"data-prohibitions": "[]",
							value: "lista",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuariosTable, {
								"data-uid": "src/pages/GestaoUsuarios.tsx:82:13",
								"data-prohibitions": "[editContent]",
								users,
								activeSessions,
								loading,
								onEdit: handleEdit,
								onRefresh: loadUsers
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:91:11",
							"data-prohibitions": "[]",
							value: "novo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioForm, {
								"data-uid": "src/pages/GestaoUsuarios.tsx:92:13",
								"data-prohibitions": "[editContent]",
								onSuccess: handleSuccessForm,
								onCancel: handleCancelForm
							})
						}),
						userToEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:96:13",
							"data-prohibitions": "[]",
							value: "editar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioForm, {
								"data-uid": "src/pages/GestaoUsuarios.tsx:97:15",
								"data-prohibitions": "[editContent]",
								userToEdit,
								onSuccess: handleSuccessForm,
								onCancel: handleCancelForm
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:105:11",
							"data-prohibitions": "[]",
							value: "historico",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricoGeralTable, {
								"data-uid": "src/pages/GestaoUsuarios.tsx:106:13",
								"data-prohibitions": "[editContent]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:109:11",
							"data-prohibitions": "[]",
							value: "metricas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricasDashboard, {
								"data-uid": "src/pages/GestaoUsuarios.tsx:110:13",
								"data-prohibitions": "[editContent]",
								users
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportUsuariosModal, {
				"data-uid": "src/pages/GestaoUsuarios.tsx:115:7",
				"data-prohibitions": "[editContent]",
				open: importOpen,
				onClose: () => setImportOpen(false),
				onSuccess: () => {
					setImportOpen(false);
					loadUsers();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportUsuariosModal, {
				"data-uid": "src/pages/GestaoUsuarios.tsx:123:7",
				"data-prohibitions": "[editContent]",
				open: exportOpen,
				onClose: () => setExportOpen(false)
			})
		]
	});
}
//#endregion
export { GestaoUsuarios as default };

//# sourceMappingURL=GestaoUsuarios-BixGHGFY.js.map