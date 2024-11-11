import { a1 as schedulerExports, a2 as __spreadArray, a3 as __assign, a4 as p$4, a5 as PropTypes, a6 as IMask, a7 as _values, a8 as _keys, a9 as _filter, aa as _isEqual, ab as _forEach, ac as _last, ad as Point, ae as _debounce, af as _cloneDeep, ag as _flatMap, ah as _map, ai as Rectangle, aj as RULESET$1, ak as combine$1, al as KEYFRAMES$1, am as serialize$1, an as copy$1, ao as replace$1, ap as DECLARATION$1, aq as compile$1, ar as hash$1, as as charat$1, at as WEBKIT$1, au as MS$1, av as strlen$1, aw as indexof$1, ax as MOZ$1, ay as match$1, az as middleware$1, aA as stringify$1, aB as rulesheet$1, aC as dealloc$1, aD as alloc$1, aE as next$1, aF as token$1, aG as from$1, aH as peek$1, aI as delimit$1, aJ as slice$1, aK as position$1, aL as _mapValues, aM as _intersection, aN as boundingBoxFromPoints, aO as _slice, aP as _some, aQ as index, aR as _isFinite, aS as _size, aT as boundingBoxFromPolygons, aU as BezierCurve, aV as pathfinding, aW as _first, aX as _concat, aY as _get, aZ as _minBy, a_ as _maxBy, a$ as _defer, b0 as _range, b1 as Path, b2 as _reduce } from "./vendor-CMazD7wM.js";
import { g as getDefaultExportFromCjs, _ as _extends, a as _extends$1, b as _extends$2 } from "./babel-CtyNlyuP.js";
function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e2 = m2[i];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$2 = Symbol.for("react.element"), n$2 = Symbol.for("react.portal"), p$3 = Symbol.for("react.fragment"), q$3 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t$1 = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$3 = Symbol.for("react.forward_ref"), w$2 = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$3 = Symbol.iterator;
function A$3(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$3 && a[z$3] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$2 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$1(a, b2, e2) {
  this.props = a;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$2;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b2) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b2, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$1.prototype;
function G$2(a, b2, e2) {
  this.props = a;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$2;
}
var H$2 = G$2.prototype = new F$1();
H$2.constructor = G$2;
C$2(H$2, E$1.prototype);
H$2.isPureReactComponent = true;
var I$2 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$2 = { current: null }, L$2 = { key: true, ref: true, __self: true, __source: true };
function M$2(a, b2, e2) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (null != b2) for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2) J$1.call(b2, d2) && !L$2.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
  var g2 = arguments.length - 2;
  if (1 === g2) c2.children = e2;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a && a.defaultProps) for (d2 in g2 = a.defaultProps, g2) void 0 === c2[d2] && (c2[d2] = g2[d2]);
  return { $$typeof: l$2, type: a, key: k2, ref: h2, props: c2, _owner: K$2.current };
}
function N$1(a, b2) {
  return { $$typeof: l$2, type: a.type, key: b2, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$2(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$2;
}
function escape(a) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b2[a2];
  });
}
var P$1 = /\/+/g;
function Q$2(a, b2) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b2.toString(36);
}
function R$2(a, b2, e2, d2, c2) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h2 = false;
  if (null === a) h2 = true;
  else switch (k2) {
    case "string":
    case "number":
      h2 = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$2:
        case n$2:
          h2 = true;
      }
  }
  if (h2) return h2 = a, c2 = c2(h2), a = "" === d2 ? "." + Q$2(h2, 0) : d2, I$2(c2) ? (e2 = "", null != a && (e2 = a.replace(P$1, "$&/") + "/"), R$2(c2, b2, e2, "", function(a2) {
    return a2;
  })) : null != c2 && (O$2(c2) && (c2 = N$1(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$1, "$&/") + "/") + a)), b2.push(c2)), 1;
  h2 = 0;
  d2 = "" === d2 ? "." : d2 + ":";
  if (I$2(a)) for (var g2 = 0; g2 < a.length; g2++) {
    k2 = a[g2];
    var f2 = d2 + Q$2(k2, g2);
    h2 += R$2(k2, b2, e2, f2, c2);
  }
  else if (f2 = A$3(a), "function" === typeof f2) for (a = f2.call(a), g2 = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d2 + Q$2(k2, g2++), h2 += R$2(k2, b2, e2, f2, c2);
  else if ("object" === k2) throw b2 = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$d(a, b2, e2) {
  if (null == a) return a;
  var d2 = [], c2 = 0;
  R$2(a, d2, "", "", function(a2) {
    return b2.call(e2, a2, c2++);
  });
  return d2;
}
function T$2(a) {
  if (-1 === a._status) {
    var b2 = a._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b3;
    }, function(b3) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b3;
    });
    -1 === a._status && (a._status = 0, a._result = b2);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$2 = { current: null }, V$2 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$2, ReactCurrentOwner: K$2 };
function X$2() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$d, forEach: function(a, b2, e2) {
  S$d(a, function() {
    b2.apply(this, arguments);
  }, e2);
}, count: function(a) {
  var b2 = 0;
  S$d(a, function() {
    b2++;
  });
  return b2;
}, toArray: function(a) {
  return S$d(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$2(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$3;
react_production_min.Profiler = r$1;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$3;
react_production_min.Suspense = w$2;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.act = X$2;
react_production_min.cloneElement = function(a, b2, e2) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d2 = C$2({}, a.props), c2 = a.key, k2 = a.ref, h2 = a._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h2 = K$2.current);
    void 0 !== b2.key && (c2 = "" + b2.key);
    if (a.type && a.type.defaultProps) var g2 = a.type.defaultProps;
    for (f2 in b2) J$1.call(b2, f2) && !L$2.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d2.children = e2;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$2, type: a.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t$1, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a) {
  var b2 = M$2.bind(null, a);
  b2.type = a;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$3, render: a };
};
react_production_min.isValidElement = O$2;
react_production_min.lazy = function(a) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a }, _init: T$2 };
};
react_production_min.memo = function(a, b2) {
  return { $$typeof: x$2, type: a, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a) {
  var b2 = V$2.transition;
  V$2.transition = {};
  try {
    a();
  } finally {
    V$2.transition = b2;
  }
};
react_production_min.unstable_act = X$2;
react_production_min.useCallback = function(a, b2) {
  return U$2.current.useCallback(a, b2);
};
react_production_min.useContext = function(a) {
  return U$2.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$2.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b2) {
  return U$2.current.useEffect(a, b2);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a, b2, e2) {
  return U$2.current.useImperativeHandle(a, b2, e2);
};
react_production_min.useInsertionEffect = function(a, b2) {
  return U$2.current.useInsertionEffect(a, b2);
};
react_production_min.useLayoutEffect = function(a, b2) {
  return U$2.current.useLayoutEffect(a, b2);
};
react_production_min.useMemo = function(a, b2) {
  return U$2.current.useMemo(a, b2);
};
react_production_min.useReducer = function(a, b2, e2) {
  return U$2.current.useReducer(a, b2, e2);
};
react_production_min.useRef = function(a) {
  return U$2.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$2.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b2, e2) {
  return U$2.current.useSyncExternalStore(a, b2, e2);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$2 = reactExports, k$2 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$3 = Object.prototype.hasOwnProperty, n$1 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$2 = { key: true, ref: true, __self: true, __source: true };
function q$2(c2, a, g2) {
  var b2, d2 = {}, e2 = null, h2 = null;
  void 0 !== g2 && (e2 = "" + g2);
  void 0 !== a.key && (e2 = "" + a.key);
  void 0 !== a.ref && (h2 = a.ref);
  for (b2 in a) m$3.call(a, b2) && !p$2.hasOwnProperty(b2) && (d2[b2] = a[b2]);
  if (c2 && c2.defaultProps) for (b2 in a = c2.defaultProps, a) void 0 === d2[b2] && (d2[b2] = a[b2]);
  return { $$typeof: k$2, type: c2, key: e2, ref: h2, props: d2, _owner: n$1.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q$2;
reactJsxRuntime_production_min.jsxs = q$2;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$1(a) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c2 = 1; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b2) {
  ha(a, b2);
  ha(a + "Capture", b2);
}
function ha(a, b2) {
  ea[a] = b2;
  for (a = 0; a < b2.length; a++) da.add(b2[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b2, c2, d2) {
  if (null !== c2 && 0 === c2.type) return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2) return false;
      if (null !== c2) return !c2.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b2, c2, d2) {
  if (null === b2 || "undefined" === typeof b2 || pa(a, b2, c2, d2)) return true;
  if (d2) return false;
  if (null !== c2) switch (c2.type) {
    case 3:
      return !b2;
    case 4:
      return false === b2;
    case 5:
      return isNaN(b2);
    case 6:
      return isNaN(b2) || 1 > b2;
  }
  return false;
}
function v$2(a, b2, c2, d2, e2, f2, g2) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d2;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$2 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z$2[a] = new v$2(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b2 = a[0];
  z$2[b2] = new v$2(b2, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z$2[a] = new v$2(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z$2[a] = new v$2(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z$2[a] = new v$2(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z$2[a] = new v$2(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z$2[a] = new v$2(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z$2[a] = new v$2(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z$2[a] = new v$2(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b2 = a.replace(
    ra,
    sa
  );
  z$2[b2] = new v$2(b2, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b2 = a.replace(ra, sa);
  z$2[b2] = new v$2(b2, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b2 = a.replace(ra, sa);
  z$2[b2] = new v$2(b2, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z$2[a] = new v$2(a, 1, false, a.toLowerCase(), null, false, false);
});
z$2.xlinkHref = new v$2("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z$2[a] = new v$2(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b2, c2, d2) {
  var e2 = z$2.hasOwnProperty(b2) ? z$2[b2] : null;
  if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1]) qa(b2, c2, e2, d2) && (c2 = null), d2 || null === e2 ? oa(b2) && (null === c2 ? a.removeAttribute(b2) : a.setAttribute(b2, "" + c2)) : e2.mustUseProperty ? a[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b2 = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a.removeAttribute(b2) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a.setAttributeNS(d2, b2, c2) : a.setAttribute(b2, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A$2 = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c2) {
    var b2 = c2.stack.trim().match(/\n( *(at )?)/);
    La = b2 && b2[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b2) {
  if (!a || Na) return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2) if (b2 = function() {
      throw Error();
    }, Object.defineProperty(b2.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b2, []);
      } catch (l2) {
        var d2 = l2;
      }
      Reflect.construct(a, [], b2);
    } else {
      try {
        b2.call();
      } catch (l2) {
        d2 = l2;
      }
      a.call(b2.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d2 && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; ) h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--) if (e2[g2] !== f2[h2]) {
        if (1 !== g2 || 1 !== h2) {
          do
            if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
              var k2 = "\n" + e2[g2].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g2 && 0 <= h2);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b2 = a.render;
      a = a.displayName;
      a || (a = b2.displayName || b2.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b2 = a.displayName || null, null !== b2 ? b2 : Qa(a.type) || "Memo";
    case Ha:
      b2 = a._payload;
      a = a._init;
      try {
        return Qa(a(b2));
      } catch (c2) {
      }
  }
  return null;
}
function Ra(a) {
  var b2 = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b2.render, a = a.displayName || a.name || "", b2.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b2);
    case 8:
      return b2 === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2) return b2.displayName || b2.name || null;
      if ("string" === typeof b2) return b2;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b2 = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua(a) {
  var b2 = Ta(a) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a.constructor.prototype, b2), d2 = "" + a[b2];
  if (!a.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a, b2, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a2) {
      d2 = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a2) {
      d2 = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b2];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b2 = a._valueTracker;
  if (!b2) return true;
  var c2 = b2.getValue();
  var d2 = "";
  a && (d2 = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d2;
  return a !== c2 ? (b2.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b2) {
    return a.body;
  }
}
function Ya(a, b2) {
  var c2 = b2.checked;
  return A$2({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a._wrapperState.initialChecked });
}
function Za(a, b2) {
  var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
  c2 = Sa(null != b2.value ? b2.value : c2);
  a._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab(a, b2) {
  b2 = b2.checked;
  null != b2 && ta(a, "checked", b2, false);
}
function bb(a, b2) {
  ab(a, b2);
  var c2 = Sa(b2.value), d2 = b2.type;
  if (null != c2) if ("number" === d2) {
    if (0 === c2 && "" === a.value || a.value != c2) a.value = "" + c2;
  } else a.value !== "" + c2 && (a.value = "" + c2);
  else if ("submit" === d2 || "reset" === d2) {
    a.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb(a, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a, b2.type, Sa(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a.defaultChecked = !!b2.defaultChecked);
}
function db(a, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d2 = b2.type;
    if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value)) return;
    b2 = "" + a._wrapperState.initialValue;
    c2 || b2 === a.value || (a.value = b2);
    a.defaultValue = b2;
  }
  c2 = a.name;
  "" !== c2 && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c2 && (a.name = c2);
}
function cb(a, b2, c2) {
  if ("number" !== b2 || Xa(a.ownerDocument) !== a) null == c2 ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c2 && (a.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a, b2, c2, d2) {
  a = a.options;
  if (b2) {
    b2 = {};
    for (var e2 = 0; e2 < c2.length; e2++) b2["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a.length; c2++) e2 = b2.hasOwnProperty("$" + a[c2].value), a[c2].selected !== e2 && (a[c2].selected = e2), e2 && d2 && (a[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b2 = null;
    for (e2 = 0; e2 < a.length; e2++) {
      if (a[e2].value === c2) {
        a[e2].selected = true;
        d2 && (a[e2].defaultSelected = true);
        return;
      }
      null !== b2 || a[e2].disabled || (b2 = a[e2]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb(a, b2) {
  if (null != b2.dangerouslySetInnerHTML) throw Error(p$1(91));
  return A$2({}, b2, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b2) {
  var c2 = b2.value;
  if (null == c2) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (null != c2) {
      if (null != b2) throw Error(p$1(92));
      if (eb(c2)) {
        if (1 < c2.length) throw Error(p$1(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    null == b2 && (b2 = "");
    c2 = b2;
  }
  a._wrapperState = { initialValue: Sa(c2) };
}
function ib(a, b2) {
  var c2 = Sa(b2.value), d2 = Sa(b2.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a.value && (a.value = c2), null == b2.defaultValue && a.defaultValue !== c2 && (a.defaultValue = c2));
  null != d2 && (a.defaultValue = "" + d2);
}
function jb(a) {
  var b2 = a.textContent;
  b2 === a._wrapperState.initialValue && "" !== b2 && null !== b2 && (a.value = b2);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b2) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b2) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b2, c2, d2, e2);
    });
  } : a;
}(function(a, b2) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b2;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b2.firstChild; ) a.appendChild(b2.firstChild);
  }
});
function ob(a, b2) {
  if (b2) {
    var c2 = a.firstChild;
    if (c2 && c2 === a.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b2;
      return;
    }
  }
  a.textContent = b2;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b2) {
    b2 = b2 + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b2] = pb[a];
  });
});
function rb(a, b2, c2) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a) && pb[a] ? ("" + b2).trim() : b2 + "px";
}
function sb(a, b2) {
  a = a.style;
  for (var c2 in b2) if (b2.hasOwnProperty(c2)) {
    var d2 = 0 === c2.indexOf("--"), e2 = rb(c2, b2[c2], d2);
    "float" === c2 && (c2 = "cssFloat");
    d2 ? a.setProperty(c2, e2) : a[c2] = e2;
  }
}
var tb = A$2({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b2) {
  if (b2) {
    if (tb[a] && (null != b2.children || null != b2.dangerouslySetInnerHTML)) throw Error(p$1(137, a));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children) throw Error(p$1(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML)) throw Error(p$1(61));
    }
    if (null != b2.style && "object" !== typeof b2.style) throw Error(p$1(62));
  }
}
function vb(a, b2) {
  if (-1 === a.indexOf("-")) return "string" === typeof b2.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p$1(280));
    var b2 = a.stateNode;
    b2 && (b2 = Db(b2), yb(a.stateNode, a.type, b2));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b2 = Ab;
    Ab = zb = null;
    Bb(a);
    if (b2) for (a = 0; a < b2.length; a++) Bb(b2[a]);
  }
}
function Gb(a, b2) {
  return a(b2);
}
function Hb() {
}
var Ib = false;
function Jb(a, b2, c2) {
  if (Ib) return a(b2, c2);
  Ib = true;
  try {
    return Gb(a, b2, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b2) {
  var c2 = a.stateNode;
  if (null === c2) return null;
  var d2 = Db(c2);
  if (null === d2) return null;
  c2 = d2[b2];
  a: switch (b2) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d2 = !d2.disabled) || (a = a.type, d2 = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d2;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c2 && "function" !== typeof c2) throw Error(p$1(231, b2, typeof c2));
  return c2;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p$1(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b2 = a, c2 = a;
  if (a.alternate) for (; b2.return; ) b2 = b2.return;
  else {
    a = b2;
    do
      b2 = a, 0 !== (b2.flags & 4098) && (c2 = b2.return), a = b2.return;
    while (a);
  }
  return 3 === b2.tag ? c2 : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b2 = a.memoizedState;
    null === b2 && (a = a.alternate, null !== a && (b2 = a.memoizedState));
    if (null !== b2) return b2.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p$1(188));
}
function Yb(a) {
  var b2 = a.alternate;
  if (!b2) {
    b2 = Vb(a);
    if (null === b2) throw Error(p$1(188));
    return b2 !== a ? null : a;
  }
  for (var c2 = a, d2 = b2; ; ) {
    var e2 = c2.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d2 = e2.return;
      if (null !== d2) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2) return Xb(e2), a;
        if (f2 === d2) return Xb(e2), b2;
        f2 = f2.sibling;
      }
      throw Error(p$1(188));
    }
    if (c2.return !== d2.return) c2 = e2, d2 = f2;
    else {
      for (var g2 = false, h2 = e2.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e2;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e2;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2) throw Error(p$1(189));
      }
    }
    if (c2.alternate !== d2) throw Error(p$1(190));
  }
  if (3 !== c2.tag) throw Error(p$1(188));
  return c2.stateNode.current === c2 ? a : b2;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b2 = $b(a);
    if (null !== b2) return b2;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B$1 = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b2) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b2) {
  var c2 = a.pendingLanes;
  if (0 === c2) return 0;
  var d2 = 0, e2 = a.suspendedLanes, f2 = a.pingedLanes, g2 = c2 & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e2;
    0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
  } else g2 = c2 & ~e2, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
  if (0 === d2) return 0;
  if (0 !== b2 && b2 !== d2 && 0 === (b2 & e2) && (e2 = d2 & -d2, f2 = b2 & -b2, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b2;
  0 !== (d2 & 4) && (d2 |= c2 & 16);
  b2 = a.entangledLanes;
  if (0 !== b2) for (a = a.entanglements, b2 &= d2; 0 < b2; ) c2 = 31 - oc(b2), e2 = 1 << c2, d2 |= a[c2], b2 &= ~e2;
  return d2;
}
function vc(a, b2) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b2) {
  for (var c2 = a.suspendedLanes, d2 = a.pingedLanes, e2 = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e2[g2];
    if (-1 === k2) {
      if (0 === (h2 & c2) || 0 !== (h2 & d2)) e2[g2] = vc(h2, b2);
    } else k2 <= b2 && (a.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++) b2.push(a);
  return b2;
}
function Ac(a, b2, c2) {
  a.pendingLanes |= b2;
  536870912 !== b2 && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b2 = 31 - oc(b2);
  a[b2] = c2;
}
function Bc(a, b2) {
  var c2 = a.pendingLanes & ~b2;
  a.pendingLanes = b2;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b2;
  a.mutableReadLanes &= b2;
  a.entangledLanes &= b2;
  b2 = a.entanglements;
  var d2 = a.eventTimes;
  for (a = a.expirationTimes; 0 < c2; ) {
    var e2 = 31 - oc(c2), f2 = 1 << e2;
    b2[e2] = 0;
    d2[e2] = -1;
    a[e2] = -1;
    c2 &= ~f2;
  }
}
function Cc(a, b2) {
  var c2 = a.entangledLanes |= b2;
  for (a = a.entanglements; c2; ) {
    var d2 = 31 - oc(c2), e2 = 1 << d2;
    e2 & b2 | a[d2] & b2 && (a[d2] |= b2);
    c2 &= ~e2;
  }
}
var C$1 = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b2) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b2.pointerId);
  }
}
function Tc(a, b2, c2, d2, e2, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a;
  a.eventSystemFlags |= d2;
  b2 = a.targetContainers;
  null !== e2 && -1 === b2.indexOf(e2) && b2.push(e2);
  return a;
}
function Uc(a, b2, c2, d2, e2) {
  switch (b2) {
    case "focusin":
      return Lc = Tc(Lc, a, b2, c2, d2, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b2, c2, d2, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b2, c2, d2, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b2, c2, d2, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b2, c2, d2, e2)), true;
  }
  return false;
}
function Vc(a) {
  var b2 = Wc(a.target);
  if (null !== b2) {
    var c2 = Vb(b2);
    if (null !== c2) {
      if (b2 = c2.tag, 13 === b2) {
        if (b2 = Wb(c2), null !== b2) {
          a.blockedOn = b2;
          Ic(a.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b2 = a.targetContainers; 0 < b2.length; ) {
    var c2 = Yc(a.domEventName, a.eventSystemFlags, b2[0], a.nativeEvent);
    if (null === c2) {
      c2 = a.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      wb = d2;
      c2.target.dispatchEvent(d2);
      wb = null;
    } else return b2 = Cb(c2), null !== b2 && Fc(b2), a.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Zc(a, b2, c2) {
  Xc(a) && c2.delete(b2);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b2) {
  a.blockedOn === b2 && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b2(b3) {
    return ad(b3, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d2 = Kc[c2];
      d2.blockedOn === a && (d2.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b2);
  Pc.forEach(b2);
  for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a && (d2.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b2, c2, d2) {
  var e2 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 1, fd(a, b2, c2, d2);
  } finally {
    C$1 = e2, cd.transition = f2;
  }
}
function gd(a, b2, c2, d2) {
  var e2 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 4, fd(a, b2, c2, d2);
  } finally {
    C$1 = e2, cd.transition = f2;
  }
}
function fd(a, b2, c2, d2) {
  if (dd) {
    var e2 = Yc(a, b2, c2, d2);
    if (null === e2) hd(a, b2, d2, id, c2), Sc(a, d2);
    else if (Uc(e2, a, b2, c2, d2)) d2.stopPropagation();
    else if (Sc(a, d2), b2 & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b2, c2, d2);
        null === f2 && hd(a, b2, d2, id, c2);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d2.stopPropagation();
    } else hd(a, b2, d2, null, c2);
  }
}
var id = null;
function Yc(a, b2, c2, d2) {
  id = null;
  a = xb(d2);
  a = Wc(a);
  if (null !== a) if (b2 = Vb(a), null === b2) a = null;
  else if (c2 = b2.tag, 13 === c2) {
    a = Wb(b2);
    if (null !== a) return a;
    a = null;
  } else if (3 === c2) {
    if (b2.stateNode.current.memoizedState.isDehydrated) return 3 === b2.tag ? b2.stateNode.containerInfo : null;
    a = null;
  } else b2 !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b2 = ld, c2 = b2.length, d2, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a = 0; a < c2 && b2[a] === e2[a]; a++) ;
  var g2 = c2 - a;
  for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e2[f2 - d2]; d2++) ;
  return md = e2.slice(a, 1 < d2 ? 1 - d2 : void 0);
}
function od(a) {
  var b2 = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b2 && (a = 13)) : a = b2;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b2(b3, d2, e2, f2, g2) {
    this._reactName = b3;
    this._targetInst = e2;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a) a.hasOwnProperty(c2) && (b3 = a[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$2(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$2({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$2({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A$2({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$2({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$2({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$2({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$2({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a) : (a = Od[a]) ? !!b2[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A$2({}, ud, { key: function(a) {
  if (a.key) {
    var b2 = Md[a.key] || a.key;
    if ("Unidentified" !== b2) return b2;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$2({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$2({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$2({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$2({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae$1 = ia && "CompositionEvent" in window, be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce$1 = ia && "TextEvent" in window && !be$1, de = ia && (!ae$1 || be$1 && 8 < be$1 && 11 >= be$1), ee$1 = String.fromCharCode(32), fe$1 = false;
function ge$1(a, b2) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he$1(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie$1 = false;
function je$1(a, b2) {
  switch (a) {
    case "compositionend":
      return he$1(b2);
    case "keypress":
      if (32 !== b2.which) return null;
      fe$1 = true;
      return ee$1;
    case "textInput":
      return a = b2.data, a === ee$1 && fe$1 ? null : a;
    default:
      return null;
  }
}
function ke$1(a, b2) {
  if (ie$1) return "compositionend" === a || !ae$1 && ge$1(a, b2) ? (a = nd(), md = ld = kd = null, ie$1 = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length) return b2.char;
        if (b2.which) return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b2 = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b2 ? !!le$1[a.type] : "textarea" === b2 ? true : false;
}
function ne$1(a, b2, c2, d2) {
  Eb(d2);
  b2 = oe$1(b2, "onChange");
  0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a.push({ event: c2, listeners: b2 }));
}
var pe = null, qe$1 = null;
function re$1(a) {
  se$1(a, 0);
}
function te$1(a) {
  var b2 = ue$1(a);
  if (Wa(b2)) return a;
}
function ve$1(a, b2) {
  if ("change" === a) return b2;
}
var we$1 = false;
if (ia) {
  var xe$1;
  if (ia) {
    var ye$1 = "oninput" in document;
    if (!ye$1) {
      var ze$1 = document.createElement("div");
      ze$1.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze$1.oninput;
    }
    xe$1 = ye$1;
  } else xe$1 = false;
  we$1 = xe$1 && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe && (pe.detachEvent("onpropertychange", Be), qe$1 = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te$1(qe$1)) {
    var b2 = [];
    ne$1(b2, qe$1, a, xb(a));
    Jb(re$1, b2);
  }
}
function Ce$1(a, b2, c2) {
  "focusin" === a ? (Ae$1(), pe = b2, qe$1 = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae$1();
}
function De$1(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te$1(qe$1);
}
function Ee$1(a, b2) {
  if ("click" === a) return te$1(b2);
}
function Fe$1(a, b2) {
  if ("input" === a || "change" === a) return te$1(b2);
}
function Ge$1(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var He$1 = "function" === typeof Object.is ? Object.is : Ge$1;
function Ie$1(a, b2) {
  if (He$1(a, b2)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b2 || null === b2) return false;
  var c2 = Object.keys(a), d2 = Object.keys(b2);
  if (c2.length !== d2.length) return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    if (!ja.call(b2, e2) || !He$1(a[e2], b2[e2])) return false;
  }
  return true;
}
function Je$1(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke$1(a, b2) {
  var c2 = Je$1(a);
  a = 0;
  for (var d2; c2; ) {
    if (3 === c2.nodeType) {
      d2 = a + c2.textContent.length;
      if (a <= b2 && d2 >= b2) return { node: c2, offset: b2 - a };
      a = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je$1(c2);
  }
}
function Le$1(a, b2) {
  return a && b2 ? a === b2 ? true : a && 3 === a.nodeType ? false : b2 && 3 === b2.nodeType ? Le$1(a, b2.parentNode) : "contains" in a ? a.contains(b2) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b2) & 16) : false : false;
}
function Me$1() {
  for (var a = window, b2 = Xa(); b2 instanceof a.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b2.contentWindow.location.href;
    } catch (d2) {
      c2 = false;
    }
    if (c2) a = b2.contentWindow;
    else break;
    b2 = Xa(a.document);
  }
  return b2;
}
function Ne$1(a) {
  var b2 = a && a.nodeName && a.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b2 || "true" === a.contentEditable);
}
function Oe$1(a) {
  var b2 = Me$1(), c2 = a.focusedElem, d2 = a.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Le$1(c2.ownerDocument.documentElement, c2)) {
    if (null !== d2 && Ne$1(c2)) {
      if (b2 = d2.start, a = d2.end, void 0 === a && (a = b2), "selectionStart" in c2) c2.selectionStart = b2, c2.selectionEnd = Math.min(a, c2.value.length);
      else if (a = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
        d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
        !a.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
        e2 = Ke$1(c2, f2);
        var g2 = Ke$1(
          c2,
          d2
        );
        e2 && g2 && (1 !== a.rangeCount || a.anchorNode !== e2.node || a.anchorOffset !== e2.offset || a.focusNode !== g2.node || a.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e2.node, e2.offset), a.removeAllRanges(), f2 > d2 ? (a.addRange(b2), a.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a.addRange(b2)));
      }
    }
    b2 = [];
    for (a = c2; a = a.parentNode; ) 1 === a.nodeType && b2.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++) a = b2[c2], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe$1 = ia && "documentMode" in document && 11 >= document.documentMode, Qe$1 = null, Re$1 = null, Se$1 = null, Te$1 = false;
function Ue$1(a, b2, c2) {
  var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te$1 || null == Qe$1 || Qe$1 !== Xa(d2) || (d2 = Qe$1, "selectionStart" in d2 && Ne$1(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se$1 && Ie$1(Se$1, d2) || (Se$1 = d2, d2 = oe$1(Re$1, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a.push({ event: b2, listeners: d2 }), b2.target = Qe$1)));
}
function Ve$1(a, b2) {
  var c2 = {};
  c2[a.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a] = "webkit" + b2;
  c2["Moz" + a] = "moz" + b2;
  return c2;
}
var We$1 = { animationend: Ve$1("Animation", "AnimationEnd"), animationiteration: Ve$1("Animation", "AnimationIteration"), animationstart: Ve$1("Animation", "AnimationStart"), transitionend: Ve$1("Transition", "TransitionEnd") }, Xe$1 = {}, Ye$1 = {};
ia && (Ye$1 = document.createElement("div").style, "AnimationEvent" in window || (delete We$1.animationend.animation, delete We$1.animationiteration.animation, delete We$1.animationstart.animation), "TransitionEvent" in window || delete We$1.transitionend.transition);
function Ze$1(a) {
  if (Xe$1[a]) return Xe$1[a];
  if (!We$1[a]) return a;
  var b2 = We$1[a], c2;
  for (c2 in b2) if (b2.hasOwnProperty(c2) && c2 in Ye$1) return Xe$1[a] = b2[c2];
  return a;
}
var $e$1 = Ze$1("animationend"), af = Ze$1("animationiteration"), bf = Ze$1("animationstart"), cf = Ze$1("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b2) {
  df.set(a, b2);
  fa(b2, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e$1, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b2, c2) {
  var d2 = a.type || "unknown-event";
  a.currentTarget = c2;
  Ub(d2, b2, void 0, a);
  a.currentTarget = null;
}
function se$1(a, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c2 = 0; c2 < a.length; c2++) {
    var d2 = a[c2], e2 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b2) for (var g2 = d2.length - 1; 0 <= g2; g2--) {
        var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
      else for (g2 = 0; g2 < d2.length; g2++) {
        h2 = d2[g2];
        k2 = h2.instance;
        l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D$1(a, b2) {
  var c2 = b2[of];
  void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
  var d2 = a + "__bubble";
  c2.has(d2) || (pf(b2, a, 2, false), c2.add(d2));
}
function qf(a, b2, c2) {
  var d2 = 0;
  b2 && (d2 |= 4);
  pf(c2, a, d2, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a), qf(b3, true, a));
    });
    var b2 = 9 === a.nodeType ? a : a.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a, b2, c2, d2) {
  switch (jd(b2)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c2 = e2.bind(null, b2, c2, a);
  e2 = void 0;
  !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e2 = true);
  d2 ? void 0 !== e2 ? a.addEventListener(b2, c2, { capture: true, passive: e2 }) : a.addEventListener(b2, c2, true) : void 0 !== e2 ? a.addEventListener(b2, c2, { passive: e2 }) : a.addEventListener(b2, c2, false);
}
function hd(a, b2, c2, d2, e2) {
  var f2 = d2;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2) a: for (; ; ) {
    if (null === d2) return;
    var g2 = d2.tag;
    if (3 === g2 || 4 === g2) {
      var h2 = d2.stateNode.containerInfo;
      if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2) break;
      if (4 === g2) for (g2 = d2.return; null !== g2; ) {
        var k2 = g2.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g2.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g2 = g2.return;
      }
      for (; null !== h2; ) {
        g2 = Wc(h2);
        if (null === g2) return;
        k2 = g2.tag;
        if (5 === k2 || 6 === k2) {
          d2 = f2 = g2;
          continue a;
        }
        h2 = h2.parentNode;
      }
    }
    d2 = d2.return;
  }
  Jb(function() {
    var d3 = f2, e3 = xb(c2), g3 = [];
    a: {
      var h3 = df.get(a);
      if (void 0 !== h3) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c2)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e$1:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b2 & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d3, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c2, e3), g3.push({ event: h3, listeners: t2 }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h3 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d3;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue$1(k3);
            u2 = null == n2 ? h3 : ue$1(n2);
            h3 = new t2(F2, w2 + "leave", k3, c2, e3);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g3, h3, k3, t2, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d3 ? ue$1(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type) var na = ve$1;
        else if (me(h3)) if (we$1) na = Fe$1;
        else {
          na = De$1;
          var xa = Ce$1;
        }
        else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee$1);
        if (na && (na = na(a, d3))) {
          ne$1(g3, na, c2, e3);
          break a;
        }
        xa && xa(a, h3, d3);
        "focusout" === a && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d3 ? ue$1(d3) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe$1 = xa, Re$1 = d3, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe$1 = null;
          break;
        case "mousedown":
          Te$1 = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = false;
          Ue$1(g3, c2, e3);
          break;
        case "selectionchange":
          if (Pe$1) break;
        case "keydown":
        case "keyup":
          Ue$1(g3, c2, e3);
      }
      var $a;
      if (ae$1) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie$1 ? ge$1(a, c2) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c2.locale && (ie$1 || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie$1 && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie$1 = true)), xa = oe$1(d3, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c2, e3), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he$1(c2), null !== $a && (ba.data = $a))));
      if ($a = ce$1 ? je$1(a, c2) : ke$1(a, c2)) d3 = oe$1(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = $a);
    }
    se$1(g3, b2);
  });
}
function tf(a, b2, c2) {
  return { instance: a, listener: b2, currentTarget: c2 };
}
function oe$1(a, b2) {
  for (var c2 = b2 + "Capture", d2 = []; null !== a; ) {
    var e2 = a, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a, c2), null != f2 && d2.unshift(tf(a, f2, e2)), f2 = Kb(a, b2), null != f2 && d2.push(tf(a, f2, e2)));
    a = a.return;
  }
  return d2;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b2, c2, d2, e2) {
  for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d2) break;
    5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e2 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  0 !== g2.length && a.push({ event: b2, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b2, c2) {
  b2 = zf(b2);
  if (zf(a) !== b2 && c2) throw Error(p$1(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b2) {
  return "textarea" === a || "noscript" === a || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b2) {
  var c2 = b2, d2 = 0;
  do {
    var e2 = c2.nextSibling;
    a.removeChild(c2);
    if (e2 && 8 === e2.nodeType) if (c2 = e2.data, "/$" === c2) {
      if (0 === d2) {
        a.removeChild(e2);
        bd(b2);
        return;
      }
      d2--;
    } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
    c2 = e2;
  } while (c2);
  bd(b2);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b2 = a.nodeType;
    if (1 === b2 || 3 === b2) break;
    if (8 === b2) {
      b2 = a.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2) break;
      if ("/$" === b2) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b2 = 0; a; ) {
    if (8 === a.nodeType) {
      var c2 = a.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b2) return a;
        b2--;
      } else "/$" === c2 && b2++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b2 = a[Of];
  if (b2) return b2;
  for (var c2 = a.parentNode; c2; ) {
    if (b2 = c2[uf] || c2[Of]) {
      c2 = b2.alternate;
      if (null !== b2.child || null !== c2 && null !== c2.child) for (a = Mf(a); null !== a; ) {
        if (c2 = a[Of]) return c2;
        a = Mf(a);
      }
      return b2;
    }
    a = c2;
    c2 = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue$1(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p$1(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a, b2) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b2;
}
var Vf = {}, H$1 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b2) {
  var c2 = a.type.contextTypes;
  if (!c2) return Vf;
  var d2 = a.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2) return d2.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2) e2[f2] = b2[f2];
  d2 && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b2, a.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H$1);
}
function ag(a, b2, c2) {
  if (H$1.current !== Vf) throw Error(p$1(168));
  G$1(H$1, b2);
  G$1(Wf, c2);
}
function bg(a, b2, c2) {
  var d2 = a.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d2.getChildContext) return c2;
  d2 = d2.getChildContext();
  for (var e2 in d2) if (!(e2 in b2)) throw Error(p$1(108, Ra(a) || "Unknown", e2));
  return A$2({}, c2, d2);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$1.current;
  G$1(H$1, a);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a, b2, c2) {
  var d2 = a.stateNode;
  if (!d2) throw Error(p$1(169));
  c2 ? (a = bg(a, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H$1), G$1(H$1, a)) : E(Wf);
  G$1(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b2 = C$1;
    try {
      var c2 = eg;
      for (C$1 = 1; a < c2.length; a++) {
        var d2 = c2[a];
        do
          d2 = d2(true);
        while (null !== d2);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e2;
    } finally {
      C$1 = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b2;
}
function ug(a, b2, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d2 = rg;
  a = sg;
  var e2 = 32 - oc(d2) - 1;
  d2 &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - oc(b2) + e2;
  if (30 < f2) {
    var g2 = e2 - e2 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e2 -= g2;
    rg = 1 << 32 - oc(b2) + e2 | c2 << e2 | d2;
    sg = f2 + a;
  } else rg = 1 << f2 | c2 << e2 | d2, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$1 = false, zg = null;
function Ag(a, b2) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a;
  b2 = a.deletions;
  null === b2 ? (a.deletions = [c2], a.flags |= 16) : b2.push(c2);
}
function Cg(a, b2) {
  switch (a.tag) {
    case 5:
      var c2 = a.type;
      b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a.stateNode = b2, xg = a, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a.stateNode = b2, xg = a, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a, a.child = c2, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I$1) {
    var b2 = yg;
    if (b2) {
      var c2 = b2;
      if (!Cg(a, b2)) {
        if (Dg(a)) throw Error(p$1(418));
        b2 = Lf(c2.nextSibling);
        var d2 = xg;
        b2 && Cg(a, b2) ? Ag(d2, c2) : (a.flags = a.flags & -4097 | 2, I$1 = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p$1(418));
      a.flags = a.flags & -4097 | 2;
      I$1 = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I$1) return Fg(a), I$1 = true, false;
  var b2;
  (b2 = 3 !== a.tag) && !(b2 = 5 !== a.tag) && (b2 = a.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a.type, a.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a)) throw Hg(), Error(p$1(418));
    for (; b2; ) Ag(a, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p$1(317));
    a: {
      a = a.nextSibling;
      for (b2 = 0; a; ) {
        if (8 === a.nodeType) {
          var c2 = a.data;
          if ("/$" === c2) {
            if (0 === b2) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b2--;
          } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$1 = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b2, c2) {
  a = c2.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag) throw Error(p$1(309));
        var d2 = c2.stateNode;
      }
      if (!d2) throw Error(p$1(147, a));
      var e2 = d2, f2 = "" + a;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2) return b2.ref;
      b2 = function(a2) {
        var b3 = e2.refs;
        null === a2 ? delete b3[f2] : b3[f2] = a2;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a) throw Error(p$1(284));
    if (!c2._owner) throw Error(p$1(290, a));
  }
  return a;
}
function Mg(a, b2) {
  a = Object.prototype.toString.call(b2);
  throw Error(p$1(31, "[object Object]" === a ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a));
}
function Ng(a) {
  var b2 = a._init;
  return b2(a._payload);
}
function Og(a) {
  function b2(b3, c3) {
    if (a) {
      var d3 = b3.deletions;
      null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a) return null;
    for (; null !== d3; ) b2(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a2, b3) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b3; ) null !== b3.key ? a2.set(b3.key, b3) : a2.set(b3.index, b3), b3 = b3.sibling;
    return a2;
  }
  function e2(a2, b3) {
    a2 = Pg(a2, b3);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b3, c3, d3) {
    b3.index = d3;
    if (!a) return b3.flags |= 1048576, c3;
    d3 = b3.alternate;
    if (null !== d3) return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
    b3.flags |= 2;
    return c3;
  }
  function g2(b3) {
    a && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h2(a2, b3, c3, d3) {
    if (null === b3 || 6 !== b3.tag) return b3 = Qg(c3, a2.mode, d3), b3.return = a2, b3;
    b3 = e2(b3, c3);
    b3.return = a2;
    return b3;
  }
  function k2(a2, b3, c3, d3) {
    var f3 = c3.type;
    if (f3 === ya) return m2(a2, b3, c3.props.children, d3, c3.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b3.type)) return d3 = e2(b3, c3.props), d3.ref = Lg(a2, b3, c3), d3.return = a2, d3;
    d3 = Rg(c3.type, c3.key, c3.props, null, a2.mode, d3);
    d3.ref = Lg(a2, b3, c3);
    d3.return = a2;
    return d3;
  }
  function l2(a2, b3, c3, d3) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation) return b3 = Sg(c3, a2.mode, d3), b3.return = a2, b3;
    b3 = e2(b3, c3.children || []);
    b3.return = a2;
    return b3;
  }
  function m2(a2, b3, c3, d3, f3) {
    if (null === b3 || 7 !== b3.tag) return b3 = Tg(c3, a2.mode, d3, f3), b3.return = a2, b3;
    b3 = e2(b3, c3);
    b3.return = a2;
    return b3;
  }
  function q2(a2, b3, c3) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3) return b3 = Qg("" + b3, a2.mode, c3), b3.return = a2, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va:
          return c3 = Rg(b3.type, b3.key, b3.props, null, a2.mode, c3), c3.ref = Lg(a2, null, b3), c3.return = a2, c3;
        case wa:
          return b3 = Sg(b3, a2.mode, c3), b3.return = a2, b3;
        case Ha:
          var d3 = b3._init;
          return q2(a2, d3(b3._payload), c3);
      }
      if (eb(b3) || Ka(b3)) return b3 = Tg(b3, a2.mode, c3, null), b3.return = a2, b3;
      Mg(a2, b3);
    }
    return null;
  }
  function r2(a2, b3, c3, d3) {
    var e3 = null !== b3 ? b3.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e3 ? null : h2(a2, b3, "" + c3, d3);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e3 ? k2(a2, b3, c3, d3) : null;
        case wa:
          return c3.key === e3 ? l2(a2, b3, c3, d3) : null;
        case Ha:
          return e3 = c3._init, r2(
            a2,
            b3,
            e3(c3._payload),
            d3
          );
      }
      if (eb(c3) || Ka(c3)) return null !== e3 ? null : m2(a2, b3, c3, d3, null);
      Mg(a2, c3);
    }
    return null;
  }
  function y2(a2, b3, c3, d3, e3) {
    if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a2 = a2.get(c3) || null, h2(b3, a2, "" + d3, e3);
    if ("object" === typeof d3 && null !== d3) {
      switch (d3.$$typeof) {
        case va:
          return a2 = a2.get(null === d3.key ? c3 : d3.key) || null, k2(b3, a2, d3, e3);
        case wa:
          return a2 = a2.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a2, d3, e3);
        case Ha:
          var f3 = d3._init;
          return y2(a2, b3, c3, f3(d3._payload), e3);
      }
      if (eb(d3) || Ka(d3)) return a2 = a2.get(c3) || null, m2(b3, a2, d3, e3, null);
      Mg(b3, d3);
    }
    return null;
  }
  function n2(e3, g3, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b2(e3, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length) return c2(e3, u2), I$1 && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++) u2 = q2(e3, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$1 && tg(e3, w2);
      return l3;
    }
    for (u2 = d2(e3, u2); w2 < h3.length; w2++) x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b2(e3, a2);
    });
    I$1 && tg(e3, w2);
    return l3;
  }
  function t2(e3, g3, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3) throw Error(p$1(150));
    h3 = l3.call(h3);
    if (null == h3) throw Error(p$1(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b2(e3, m3);
      g3 = f2(t3, g3, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c2(
      e3,
      m3
    ), I$1 && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$1 && tg(e3, w2);
      return l3;
    }
    for (m3 = d2(e3, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b2(e3, a2);
    });
    I$1 && tg(e3, w2);
    return l3;
  }
  function J2(a2, d3, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d3; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a2, l3.sibling);
                    d3 = e2(l3, f3.props.children);
                    d3.return = a2;
                    a2 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c2(a2, l3.sibling);
                  d3 = e2(l3, f3.props);
                  d3.ref = Lg(a2, l3, f3);
                  d3.return = a2;
                  a2 = d3;
                  break a;
                }
                c2(a2, l3);
                break;
              } else b2(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d3 = Tg(f3.props.children, a2.mode, h3, f3.key), d3.return = a2, a2 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h3), h3.ref = Lg(a2, d3, f3), h3.return = a2, a2 = h3);
          }
          return g2(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d3; ) {
              if (d3.key === l3) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                c2(a2, d3.sibling);
                d3 = e2(d3, f3.children || []);
                d3.return = a2;
                a2 = d3;
                break a;
              } else {
                c2(a2, d3);
                break;
              }
              else b2(a2, d3);
              d3 = d3.sibling;
            }
            d3 = Sg(f3, a2.mode, h3);
            d3.return = a2;
            a2 = d3;
          }
          return g2(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d3, l3(f3._payload), h3);
      }
      if (eb(f3)) return n2(a2, d3, f3, h3);
      if (Ka(f3)) return t2(a2, d3, f3, h3);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a2, d3.sibling), d3 = e2(d3, f3), d3.return = a2, a2 = d3) : (c2(a2, d3), d3 = Qg(f3, a2.mode, h3), d3.return = a2, a2 = d3), g2(a2)) : c2(a2, d3);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b2 = Wg.current;
  E(Wg);
  a._currentValue = b2;
}
function bh(a, b2, c2) {
  for (; null !== a; ) {
    var d2 = a.alternate;
    (a.childLanes & b2) !== b2 ? (a.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
    if (a === c2) break;
    a = a.return;
  }
}
function ch(a, b2) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b2) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b2 = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b2, next: null }, null === Yg) {
    if (null === Xg) throw Error(p$1(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b2;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b2, c2, d2) {
  var e2 = b2.interleaved;
  null === e2 ? (c2.next = c2, gh(b2)) : (c2.next = e2.next, e2.next = c2);
  b2.interleaved = c2;
  return ih(a, d2);
}
function ih(a, b2) {
  a.lanes |= b2;
  var c2 = a.alternate;
  null !== c2 && (c2.lanes |= b2);
  c2 = a;
  for (a = a.return; null !== a; ) a.childLanes |= b2, c2 = a.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a, a = a.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b2) {
  a = a.updateQueue;
  b2.updateQueue === a && (b2.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b2) {
  return { eventTime: a, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b2, c2) {
  var d2 = a.updateQueue;
  if (null === d2) return null;
  d2 = d2.shared;
  if (0 !== (K$1 & 2)) {
    var e2 = d2.pending;
    null === e2 ? b2.next = b2 : (b2.next = e2.next, e2.next = b2);
    d2.pending = b2;
    return ih(a, c2);
  }
  e2 = d2.interleaved;
  null === e2 ? (b2.next = b2, gh(d2)) : (b2.next = e2.next, e2.next = b2);
  d2.interleaved = b2;
  return ih(a, c2);
}
function oh(a, b2, c2) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
    var d2 = b2.lanes;
    d2 &= a.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a, c2);
  }
}
function ph(a, b2) {
  var c2 = a.updateQueue, d2 = a.alternate;
  if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e2 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e2 = f2 = b2 : f2 = f2.next = b2;
    } else e2 = f2 = b2;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a.updateQueue = c2;
    return;
  }
  a = c2.lastBaseUpdate;
  null === a ? c2.firstBaseUpdate = b2 : a.next = b2;
  c2.lastBaseUpdate = b2;
}
function qh(a, b2, c2, d2) {
  var e2 = a.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (null !== h2) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d2 & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h2;
          r2 = b2;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A$2({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
      } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h2 = h2.next;
      if (null === h2) if (h2 = e2.shared.pending, null === h2) break;
      else r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b2 = e2.shared.interleaved;
    if (null !== b2) {
      e2 = b2;
      do
        g2 |= e2.lane, e2 = e2.next;
      while (e2 !== b2);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g2;
    a.lanes = g2;
    a.memoizedState = q2;
  }
}
function sh(a, b2, c2) {
  a = b2.effects;
  b2.effects = null;
  if (null !== a) for (b2 = 0; b2 < a.length; b2++) {
    var d2 = a[b2], e2 = d2.callback;
    if (null !== e2) {
      d2.callback = null;
      d2 = c2;
      if ("function" !== typeof e2) throw Error(p$1(191, e2));
      e2.call(d2);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p$1(174));
  return a;
}
function yh(a, b2) {
  G$1(wh, b2);
  G$1(vh, a);
  G$1(uh, th);
  a = b2.nodeType;
  switch (a) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b2.parentNode : b2, b2 = a.namespaceURI || null, a = a.tagName, b2 = lb(b2, a);
  }
  E(uh);
  G$1(uh, b2);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b2 = xh(uh.current);
  var c2 = lb(b2, a.type);
  b2 !== c2 && (G$1(vh, a), G$1(uh, c2));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L$1 = Uf(0);
function Ch(a) {
  for (var b2 = a; null !== b2; ) {
    if (13 === b2.tag) {
      var c2 = b2.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128)) return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a) break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a) return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M$1 = null, N = null, O$1 = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p$1(321));
}
function Mh(a, b2) {
  if (null === b2) return false;
  for (var c2 = 0; c2 < b2.length && c2 < a.length; c2++) if (!He$1(a[c2], b2[c2])) return false;
  return true;
}
function Nh(a, b2, c2, d2, e2, f2) {
  Hh = f2;
  M$1 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c2(d2, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p$1(301));
      f2 += 1;
      O$1 = N = null;
      b2.updateQueue = null;
      Fh.current = Qh;
      a = c2(d2, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b2 = null !== N && null !== N.next;
  Hh = 0;
  O$1 = N = M$1 = null;
  Ih = false;
  if (b2) throw Error(p$1(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O$1 ? M$1.memoizedState = O$1 = a : O$1 = O$1.next = a;
  return O$1;
}
function Uh() {
  if (null === N) {
    var a = M$1.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b2 = null === O$1 ? M$1.memoizedState : O$1.next;
  if (null !== b2) O$1 = b2, N = a;
  else {
    if (null === a) throw Error(p$1(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O$1 ? M$1.memoizedState = O$1 = a : O$1 = O$1.next = a;
  }
  return O$1;
}
function Vh(a, b2) {
  return "function" === typeof b2 ? b2(a) : b2;
}
function Wh(a) {
  var b2 = Uh(), c2 = b2.queue;
  if (null === c2) throw Error(p$1(311));
  c2.lastRenderedReducer = a;
  var d2 = N, e2 = d2.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g2 = e2.next;
      e2.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a(d2, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
        M$1.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d2 : k2.next = h2;
    He$1(d2, b2.memoizedState) || (dh = true);
    b2.memoizedState = d2;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a = c2.interleaved;
  if (null !== a) {
    e2 = a;
    do
      f2 = e2.lane, M$1.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a);
  } else null === e2 && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function Xh(a) {
  var b2 = Uh(), c2 = b2.queue;
  if (null === c2) throw Error(p$1(311));
  c2.lastRenderedReducer = a;
  var d2 = c2.dispatch, e2 = c2.pending, f2 = b2.memoizedState;
  if (null !== e2) {
    c2.pending = null;
    var g2 = e2 = e2.next;
    do
      f2 = a(f2, g2.action), g2 = g2.next;
    while (g2 !== e2);
    He$1(f2, b2.memoizedState) || (dh = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function Yh() {
}
function Zh(a, b2) {
  var c2 = M$1, d2 = Uh(), e2 = b2(), f2 = !He$1(d2.memoizedState, e2);
  f2 && (d2.memoizedState = e2, dh = true);
  d2 = d2.queue;
  $h(ai.bind(null, c2, d2, a), [a]);
  if (d2.getSnapshot !== b2 || f2 || null !== O$1 && O$1.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d2, e2, b2), void 0, null);
    if (null === Q$1) throw Error(p$1(349));
    0 !== (Hh & 30) || di(c2, b2, e2);
  }
  return e2;
}
function di(a, b2, c2) {
  a.flags |= 16384;
  a = { getSnapshot: b2, value: c2 };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.stores = [a]) : (c2 = b2.stores, null === c2 ? b2.stores = [a] : c2.push(a));
}
function ci(a, b2, c2, d2) {
  b2.value = c2;
  b2.getSnapshot = d2;
  ei(b2) && fi(a);
}
function ai(a, b2, c2) {
  return c2(function() {
    ei(b2) && fi(a);
  });
}
function ei(a) {
  var b2 = a.getSnapshot;
  a = a.value;
  try {
    var c2 = b2();
    return !He$1(a, c2);
  } catch (d2) {
    return true;
  }
}
function fi(a) {
  var b2 = ih(a, 1);
  null !== b2 && gi(b2, a, 1, -1);
}
function hi(a) {
  var b2 = Th();
  "function" === typeof a && (a = a());
  b2.memoizedState = b2.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b2.queue = a;
  a = a.dispatch = ii.bind(null, M$1, a);
  return [b2.memoizedState, a];
}
function bi(a, b2, c2, d2) {
  a = { tag: a, create: b2, destroy: c2, deps: d2, next: null };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.lastEffect = a.next = a) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a.next = a : (d2 = c2.next, c2.next = a, a.next = d2, b2.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b2, c2, d2) {
  var e2 = Th();
  M$1.flags |= a;
  e2.memoizedState = bi(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
}
function li(a, b2, c2, d2) {
  var e2 = Uh();
  d2 = void 0 === d2 ? null : d2;
  var f2 = void 0;
  if (null !== N) {
    var g2 = N.memoizedState;
    f2 = g2.destroy;
    if (null !== d2 && Mh(d2, g2.deps)) {
      e2.memoizedState = bi(b2, c2, f2, d2);
      return;
    }
  }
  M$1.flags |= a;
  e2.memoizedState = bi(1 | b2, c2, f2, d2);
}
function mi(a, b2) {
  return ki(8390656, 8, a, b2);
}
function $h(a, b2) {
  return li(2048, 8, a, b2);
}
function ni(a, b2) {
  return li(4, 2, a, b2);
}
function oi(a, b2) {
  return li(4, 4, a, b2);
}
function pi(a, b2) {
  if ("function" === typeof b2) return a = a(), b2(a), function() {
    b2(null);
  };
  if (null !== b2 && void 0 !== b2) return a = a(), b2.current = a, function() {
    b2.current = null;
  };
}
function qi(a, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a]) : null;
  return li(4, 4, pi.bind(null, b2, a), c2);
}
function ri() {
}
function si(a, b2) {
  var c2 = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
  c2.memoizedState = [a, b2];
  return a;
}
function ti(a, b2) {
  var c2 = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
  a = a();
  c2.memoizedState = [a, b2];
  return a;
}
function ui(a, b2, c2) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c2;
  He$1(c2, b2) || (c2 = yc(), M$1.lanes |= c2, rh |= c2, a.baseState = true);
  return b2;
}
function vi(a, b2) {
  var c2 = C$1;
  C$1 = 0 !== c2 && 4 > c2 ? c2 : 4;
  a(true);
  var d2 = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b2();
  } finally {
    C$1 = c2, Gh.transition = d2;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b2, c2) {
  var d2 = yi(a);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b2, c2);
  else if (c2 = hh(a, b2, c2, d2), null !== c2) {
    var e2 = R$1();
    gi(c2, a, d2, e2);
    Bi(c2, b2, d2);
  }
}
function ii(a, b2, c2) {
  var d2 = yi(a), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b2, e2);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2)) try {
      var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
      e2.hasEagerState = true;
      e2.eagerState = h2;
      if (He$1(h2, g2)) {
        var k2 = b2.interleaved;
        null === k2 ? (e2.next = e2, gh(b2)) : (e2.next = k2.next, k2.next = e2);
        b2.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c2 = hh(a, b2, e2, d2);
    null !== c2 && (e2 = R$1(), gi(c2, a, d2, e2), Bi(c2, b2, d2));
  }
}
function zi(a) {
  var b2 = a.alternate;
  return a === M$1 || null !== b2 && b2 === M$1;
}
function Ai(a, b2) {
  Jh = Ih = true;
  var c2 = a.pending;
  null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a.pending = b2;
}
function Bi(a, b2, c2) {
  if (0 !== (c2 & 4194240)) {
    var d2 = b2.lanes;
    d2 &= a.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a, c2);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b2) {
  Th().memoizedState = [a, void 0 === b2 ? null : b2];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b2, a),
    c2
  );
}, useLayoutEffect: function(a, b2) {
  return ki(4194308, 4, a, b2);
}, useInsertionEffect: function(a, b2) {
  return ki(4, 2, a, b2);
}, useMemo: function(a, b2) {
  var c2 = Th();
  b2 = void 0 === b2 ? null : b2;
  a = a();
  c2.memoizedState = [a, b2];
  return a;
}, useReducer: function(a, b2, c2) {
  var d2 = Th();
  b2 = void 0 !== c2 ? c2(b2) : b2;
  d2.memoizedState = d2.baseState = b2;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b2 };
  d2.queue = a;
  a = a.dispatch = xi.bind(null, M$1, a);
  return [d2.memoizedState, a];
}, useRef: function(a) {
  var b2 = Th();
  a = { current: a };
  return b2.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b2 = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b2, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b2, c2) {
  var d2 = M$1, e2 = Th();
  if (I$1) {
    if (void 0 === c2) throw Error(p$1(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (null === Q$1) throw Error(p$1(349));
    0 !== (Hh & 30) || di(d2, b2, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d2,
    f2,
    a
  ), [a]);
  d2.flags |= 2048;
  bi(9, ci.bind(null, d2, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a = Th(), b2 = Q$1.identifierPrefix;
  if (I$1) {
    var c2 = sg;
    var d2 = rg;
    c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a.memoizedState = b2;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b2 = Uh();
    return ui(b2, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b2 = Uh().memoizedState;
    return [a, b2];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b2 = Uh();
  return null === N ? b2.memoizedState = a : ui(b2, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b2 = Uh().memoizedState;
  return [a, b2];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b2) {
  if (a && a.defaultProps) {
    b2 = A$2({}, b2);
    a = a.defaultProps;
    for (var c2 in a) void 0 === b2[c2] && (b2[c2] = a[c2]);
    return b2;
  }
  return b2;
}
function Di(a, b2, c2, d2) {
  b2 = a.memoizedState;
  c2 = c2(d2, b2);
  c2 = null === c2 || void 0 === c2 ? b2 : A$2({}, b2, c2);
  a.memoizedState = c2;
  0 === a.lanes && (a.updateQueue.baseState = c2);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b2, c2) {
  a = a._reactInternals;
  var d2 = R$1(), e2 = yi(a), f2 = mh(d2, e2);
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = nh(a, f2, e2);
  null !== b2 && (gi(b2, a, e2, d2), oh(b2, a, e2));
}, enqueueReplaceState: function(a, b2, c2) {
  a = a._reactInternals;
  var d2 = R$1(), e2 = yi(a), f2 = mh(d2, e2);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = nh(a, f2, e2);
  null !== b2 && (gi(b2, a, e2, d2), oh(b2, a, e2));
}, enqueueForceUpdate: function(a, b2) {
  a = a._reactInternals;
  var c2 = R$1(), d2 = yi(a), e2 = mh(c2, d2);
  e2.tag = 2;
  void 0 !== b2 && null !== b2 && (e2.callback = b2);
  b2 = nh(a, e2, d2);
  null !== b2 && (gi(b2, a, d2, c2), oh(b2, a, d2));
} };
function Fi(a, b2, c2, d2, e2, f2, g2) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie$1(c2, d2) || !Ie$1(e2, f2) : true;
}
function Gi(a, b2, c2) {
  var d2 = false, e2 = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b2) ? Xf : H$1.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a, e2) : Vf);
  b2 = new b2(c2, f2);
  a.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = Ei;
  a.stateNode = b2;
  b2._reactInternals = a;
  d2 && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e2, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function Hi(a, b2, c2, d2) {
  a = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
  b2.state !== a && Ei.enqueueReplaceState(b2, b2.state, null);
}
function Ii(a, b2, c2, d2) {
  var e2 = a.stateNode;
  e2.props = c2;
  e2.state = a.memoizedState;
  e2.refs = {};
  kh(a);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b2) ? Xf : H$1.current, e2.context = Yf(a, f2));
  e2.state = a.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b2, f2, c2), e2.state = a.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b2 = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b2 !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a, c2, e2, d2), e2.state = a.memoizedState);
  "function" === typeof e2.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b2) {
  try {
    var c2 = "", d2 = b2;
    do
      c2 += Pa(d2), d2 = d2.return;
    while (d2);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b2, stack: e2, digest: null };
}
function Ki(a, b2, c2) {
  return { value: a, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
}
function Li(a, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b2, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b2.value;
  c2.callback = function() {
    Oi || (Oi = true, Pi = d2);
    Li(a, b2);
  };
  return c2;
}
function Qi(a, b2, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  var d2 = a.type.getDerivedStateFromError;
  if ("function" === typeof d2) {
    var e2 = b2.value;
    c2.payload = function() {
      return d2(e2);
    };
    c2.callback = function() {
      Li(a, b2);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Li(a, b2);
    "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Si(a, b2, c2) {
  var d2 = a.pingCache;
  if (null === d2) {
    d2 = a.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d2.set(b2, e2);
  } else e2 = d2.get(b2), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b2, e2));
  e2.has(c2) || (e2.add(c2), a = Ti.bind(null, a, b2, c2), b2.then(a, a));
}
function Ui(a) {
  do {
    var b2;
    if (b2 = 13 === a.tag) b2 = a.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b2, c2, d2, e2) {
  if (0 === (a.mode & 1)) return a === b2 ? a.flags |= 65536 : (a.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c2, b2, 1))), c2.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e2;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b2, c2, d2) {
  b2.child = null === a ? Vg(b2, null, c2, d2) : Ug(b2, a.child, c2, d2);
}
function Yi(a, b2, c2, d2, e2) {
  c2 = c2.render;
  var f2 = b2.ref;
  ch(b2, e2);
  d2 = Nh(a, b2, c2, d2, f2, e2);
  c2 = Sh();
  if (null !== a && !dh) return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e2, Zi(a, b2, e2);
  I$1 && c2 && vg(b2);
  b2.flags |= 1;
  Xi(a, b2, d2, e2);
  return b2.child;
}
function $i(a, b2, c2, d2, e2) {
  if (null === a) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b2.tag = 15, b2.type = f2, bj(a, b2, f2, d2, e2);
    a = Rg(c2.type, null, d2, b2, b2.mode, e2);
    a.ref = b2.ref;
    a.return = b2;
    return b2.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e2)) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie$1;
    if (c2(g2, d2) && a.ref === b2.ref) return Zi(a, b2, e2);
  }
  b2.flags |= 1;
  a = Pg(f2, d2);
  a.ref = b2.ref;
  a.return = b2;
  return b2.child = a;
}
function bj(a, b2, c2, d2, e2) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie$1(f2, d2) && a.ref === b2.ref) if (dh = false, b2.pendingProps = d2 = f2, 0 !== (a.lanes & e2)) 0 !== (a.flags & 131072) && (dh = true);
    else return b2.lanes = a.lanes, Zi(a, b2, e2);
  }
  return cj(a, b2, c2, d2, e2);
}
function dj(a, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d2.mode) if (0 === (b2.mode & 1)) b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(ej, fj), fj |= c2;
  else {
    if (0 === (c2 & 1073741824)) return a = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b2.updateQueue = null, G$1(ej, fj), fj |= a, null;
    b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d2 = null !== f2 ? f2.baseLanes : c2;
    G$1(ej, fj);
    fj |= d2;
  }
  else null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G$1(ej, fj), fj |= d2;
  Xi(a, b2, e2, c2);
  return b2.child;
}
function gj(a, b2) {
  var c2 = b2.ref;
  if (null === a && null !== c2 || null !== a && a.ref !== c2) b2.flags |= 512, b2.flags |= 2097152;
}
function cj(a, b2, c2, d2, e2) {
  var f2 = Zf(c2) ? Xf : H$1.current;
  f2 = Yf(b2, f2);
  ch(b2, e2);
  c2 = Nh(a, b2, c2, d2, f2, e2);
  d2 = Sh();
  if (null !== a && !dh) return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e2, Zi(a, b2, e2);
  I$1 && d2 && vg(b2);
  b2.flags |= 1;
  Xi(a, b2, c2, e2);
  return b2.child;
}
function hj(a, b2, c2, d2, e2) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b2);
  } else f2 = false;
  ch(b2, e2);
  if (null === b2.stateNode) ij(a, b2), Gi(b2, c2, d2), Ii(b2, c2, d2, e2), d2 = true;
  else if (null === a) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H$1.current, l2 = Yf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && Hi(b2, g2, d2, l2);
    jh = false;
    var r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d2, g2, e2);
    k2 = b2.memoizedState;
    h2 !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = jh || Fi(b2, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
  } else {
    g2 = b2.stateNode;
    lh(a, b2);
    h2 = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h2 : Ci(b2.type, h2);
    g2.props = l2;
    q2 = b2.pendingProps;
    r2 = g2.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H$1.current, k2 = Yf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi(b2, g2, d2, k2);
    jh = false;
    r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d2, g2, e2);
    var n2 = b2.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = jh || Fi(b2, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 1024), d2 = false);
  }
  return jj(a, b2, c2, d2, f2, e2);
}
function jj(a, b2, c2, d2, e2, f2) {
  gj(a, b2);
  var g2 = 0 !== (b2.flags & 128);
  if (!d2 && !g2) return e2 && dg(b2, c2, false), Zi(a, b2, f2);
  d2 = b2.stateNode;
  Wi.current = b2;
  var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
  b2.flags |= 1;
  null !== a && g2 ? (b2.child = Ug(b2, a.child, null, f2), b2.child = Ug(b2, null, h2, f2)) : Xi(a, b2, h2, f2);
  b2.memoizedState = d2.state;
  e2 && dg(b2, c2, true);
  return b2.child;
}
function kj(a) {
  var b2 = a.stateNode;
  b2.pendingContext ? ag(a, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a, b2.context, false);
  yh(a, b2.containerInfo);
}
function lj(a, b2, c2, d2, e2) {
  Ig();
  Jg(e2);
  b2.flags |= 256;
  Xi(a, b2, c2, d2);
  return b2.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b2, c2) {
  var d2 = b2.pendingProps, e2 = L$1.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a && null === a.memoizedState ? false : 0 !== (e2 & 2));
  if (h2) f2 = true, b2.flags &= -129;
  else if (null === a || null !== a.memoizedState) e2 |= 1;
  G$1(L$1, e2 & 1);
  if (null === a) {
    Eg(b2);
    a = b2.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g2 = d2.children;
    a = d2.fallback;
    return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a = Tg(a, d2, c2, null), f2.return = b2, a.return = b2, f2.sibling = a, b2.child = f2, b2.child.memoizedState = nj(c2), b2.memoizedState = mj, a) : qj(b2, g2);
  }
  e2 = a.memoizedState;
  if (null !== e2 && (h2 = e2.dehydrated, null !== h2)) return rj(a, b2, g2, d2, h2, e2, c2);
  if (f2) {
    f2 = d2.fallback;
    g2 = b2.mode;
    e2 = a.child;
    h2 = e2.sibling;
    var k2 = { mode: "hidden", children: d2.children };
    0 === (g2 & 1) && b2.child !== e2 ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k2, b2.deletions = null) : (d2 = Pg(e2, k2), d2.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
    f2.return = b2;
    d2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    d2 = f2;
    f2 = b2.child;
    g2 = a.child.memoizedState;
    g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a.childLanes & ~c2;
    b2.memoizedState = mj;
    return d2;
  }
  f2 = a.child;
  a = f2.sibling;
  d2 = Pg(f2, { mode: "visible", children: d2.children });
  0 === (b2.mode & 1) && (d2.lanes = c2);
  d2.return = b2;
  d2.sibling = null;
  null !== a && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a], b2.flags |= 16) : c2.push(a));
  b2.child = d2;
  b2.memoizedState = null;
  return d2;
}
function qj(a, b2) {
  b2 = pj({ mode: "visible", children: b2 }, a.mode, 0, null);
  b2.return = a;
  return a.child = b2;
}
function sj(a, b2, c2, d2) {
  null !== d2 && Jg(d2);
  Ug(b2, a.child, null, c2);
  a = qj(b2, b2.pendingProps.children);
  a.flags |= 2;
  b2.memoizedState = null;
  return a;
}
function rj(a, b2, c2, d2, e2, f2, g2) {
  if (c2) {
    if (b2.flags & 256) return b2.flags &= -257, d2 = Ki(Error(p$1(422))), sj(a, b2, g2, d2);
    if (null !== b2.memoizedState) return b2.child = a.child, b2.flags |= 128, null;
    f2 = d2.fallback;
    e2 = b2.mode;
    d2 = pj({ mode: "visible", children: d2.children }, e2, 0, null);
    f2 = Tg(f2, e2, g2, null);
    f2.flags |= 2;
    d2.return = b2;
    f2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    0 !== (b2.mode & 1) && Ug(b2, a.child, null, g2);
    b2.child.memoizedState = nj(g2);
    b2.memoizedState = mj;
    return f2;
  }
  if (0 === (b2.mode & 1)) return sj(a, b2, g2, null);
  if ("$!" === e2.data) {
    d2 = e2.nextSibling && e2.nextSibling.dataset;
    if (d2) var h2 = d2.dgst;
    d2 = h2;
    f2 = Error(p$1(419));
    d2 = Ki(f2, d2, void 0);
    return sj(a, b2, g2, d2);
  }
  h2 = 0 !== (g2 & a.childLanes);
  if (dh || h2) {
    d2 = Q$1;
    if (null !== d2) {
      switch (g2 & -g2) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d2.suspendedLanes | g2)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a, e2), gi(d2, a, e2, -1));
    }
    tj();
    d2 = Ki(Error(p$1(421)));
    return sj(a, b2, g2, d2);
  }
  if ("$?" === e2.data) return b2.flags |= 128, b2.child = a.child, b2 = uj.bind(null, a), e2._reactRetry = b2, null;
  a = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b2;
  I$1 = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b2);
  b2 = qj(b2, d2.children);
  b2.flags |= 4096;
  return b2;
}
function vj(a, b2, c2) {
  a.lanes |= b2;
  var d2 = a.alternate;
  null !== d2 && (d2.lanes |= b2);
  bh(a.return, b2, c2);
}
function wj(a, b2, c2, d2, e2) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
}
function xj(a, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
  Xi(a, b2, d2.children, c2);
  d2 = L$1.current;
  if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b2.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c2, b2);
      else if (19 === a.tag) vj(a, c2, b2);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b2) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b2) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d2 &= 1;
  }
  G$1(L$1, d2);
  if (0 === (b2.mode & 1)) b2.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c2 = b2.child;
      for (e2 = null; null !== c2; ) a = c2.alternate, null !== a && null === Ch(a) && (e2 = c2), c2 = c2.sibling;
      c2 = e2;
      null === c2 ? (e2 = b2.child, b2.child = null) : (e2 = c2.sibling, c2.sibling = null);
      wj(b2, false, e2, c2, f2);
      break;
    case "backwards":
      c2 = null;
      e2 = b2.child;
      for (b2.child = null; null !== e2; ) {
        a = e2.alternate;
        if (null !== a && null === Ch(a)) {
          b2.child = e2;
          break;
        }
        a = e2.sibling;
        e2.sibling = c2;
        c2 = e2;
        e2 = a;
      }
      wj(b2, true, c2, null, f2);
      break;
    case "together":
      wj(b2, false, null, null, void 0);
      break;
    default:
      b2.memoizedState = null;
  }
  return b2.child;
}
function ij(a, b2) {
  0 === (b2.mode & 1) && null !== a && (a.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function Zi(a, b2, c2) {
  null !== a && (b2.dependencies = a.dependencies);
  rh |= b2.lanes;
  if (0 === (c2 & b2.childLanes)) return null;
  if (null !== a && b2.child !== a.child) throw Error(p$1(153));
  if (null !== b2.child) {
    a = b2.child;
    c2 = Pg(a, a.pendingProps);
    b2.child = c2;
    for (c2.return = b2; null !== a.sibling; ) a = a.sibling, c2 = c2.sibling = Pg(a, a.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function yj(a, b2, c2) {
  switch (b2.tag) {
    case 3:
      kj(b2);
      Ig();
      break;
    case 5:
      Ah(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      yh(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b2.type._context, e2 = b2.memoizedProps.value;
      G$1(Wg, d2._currentValue);
      d2._currentValue = e2;
      break;
    case 13:
      d2 = b2.memoizedState;
      if (null !== d2) {
        if (null !== d2.dehydrated) return G$1(L$1, L$1.current & 1), b2.flags |= 128, null;
        if (0 !== (c2 & b2.child.childLanes)) return oj(a, b2, c2);
        G$1(L$1, L$1.current & 1);
        a = Zi(a, b2, c2);
        return null !== a ? a.sibling : null;
      }
      G$1(L$1, L$1.current & 1);
      break;
    case 19:
      d2 = 0 !== (c2 & b2.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d2) return xj(a, b2, c2);
        b2.flags |= 128;
      }
      e2 = b2.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G$1(L$1, L$1.current);
      if (d2) break;
      else return null;
    case 22:
    case 23:
      return b2.lanes = 0, dj(a, b2, c2);
  }
  return Zi(a, b2, c2);
}
var zj, Aj, Bj, Cj;
zj = function(a, b2) {
  for (var c2 = b2.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag) a.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2) break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b2) return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b2, c2, d2) {
  var e2 = a.memoizedProps;
  if (e2 !== d2) {
    a = b2.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Ya(a, e2);
        d2 = Ya(a, d2);
        f2 = [];
        break;
      case "select":
        e2 = A$2({}, e2, { value: void 0 });
        d2 = A$2({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a, e2);
        d2 = gb(a, d2);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a.onclick = Bf);
    }
    ub(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e2) if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h2 = e2[l2];
      for (g2 in h2) h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = null != e2 ? e2[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l2) if (h2) {
        for (g2 in h2) !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
        for (g2 in k2) k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
      } else c2 || (f2 || (f2 = []), f2.push(
        l2,
        c2
      )), c2 = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2) b2.flags |= 4;
  }
};
Cj = function(a, b2, c2, d2) {
  c2 !== d2 && (b2.flags |= 4);
};
function Dj(a, b2) {
  if (!I$1) switch (a.tailMode) {
    case "hidden":
      b2 = a.tail;
      for (var c2 = null; null !== b2; ) null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
      null === c2 ? a.tail = null : c2.sibling = null;
      break;
    case "collapsed":
      c2 = a.tail;
      for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
      null === d2 ? b2 || null === a.tail ? a.tail = null : a.tail.sibling = null : d2.sibling = null;
  }
}
function S$c(a) {
  var b2 = null !== a.alternate && a.alternate.child === a.child, c2 = 0, d2 = 0;
  if (b2) for (var e2 = a.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a, e2 = e2.sibling;
  else for (e2 = a.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a, e2 = e2.sibling;
  a.subtreeFlags |= d2;
  a.childLanes = c2;
  return b2;
}
function Ej(a, b2, c2) {
  var d2 = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$c(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S$c(b2), null;
    case 3:
      d2 = b2.stateNode;
      zh();
      E(Wf);
      E(H$1);
      Eh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (null === a || null === a.child) Gg(b2) ? b2.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b2);
      S$c(b2);
      return null;
    case 5:
      Bh(b2);
      var e2 = xh(wh.current);
      c2 = b2.type;
      if (null !== a && null != b2.stateNode) Bj(a, b2, c2, d2, e2), a.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d2) {
          if (null === b2.stateNode) throw Error(p$1(166));
          S$c(b2);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d2[Of] = b2;
          d2[Pf] = f2;
          a = 0 !== (b2.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d2);
              D$1("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d2);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], d2);
              break;
            case "source":
              D$1("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d2
              );
              D$1("load", d2);
              break;
            case "details":
              D$1("toggle", d2);
              break;
            case "input":
              Za(d2, f2);
              D$1("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d2);
              break;
            case "textarea":
              hb(d2, f2), D$1("invalid", d2);
          }
          ub(c2, f2);
          e2 = null;
          for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
            var h2 = f2[g2];
            "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
              d2.textContent,
              h2,
              a
            ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D$1("scroll", d2);
          }
          switch (c2) {
            case "input":
              Va(d2);
              db(d2, f2, true);
              break;
            case "textarea":
              Va(d2);
              jb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d2.onclick = Bf);
          }
          d2 = e2;
          b2.updateQueue = d2;
          null !== d2 && (b2.flags |= 4);
        } else {
          g2 = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c2));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c2 ? (a = g2.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d2.is ? a = g2.createElement(c2, { is: d2.is }) : (a = g2.createElement(c2), "select" === c2 && (g2 = a, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a = g2.createElementNS(a, c2);
          a[Of] = b2;
          a[Pf] = d2;
          zj(a, b2, false, false);
          b2.stateNode = a;
          a: {
            g2 = vb(c2, d2);
            switch (c2) {
              case "dialog":
                D$1("cancel", a);
                D$1("close", a);
                e2 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a);
                e2 = d2;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], a);
                e2 = d2;
                break;
              case "source":
                D$1("error", a);
                e2 = d2;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a
                );
                D$1("load", a);
                e2 = d2;
                break;
              case "details":
                D$1("toggle", a);
                e2 = d2;
                break;
              case "input":
                Za(a, d2);
                e2 = Ya(a, d2);
                D$1("invalid", a);
                break;
              case "option":
                e2 = d2;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d2.multiple };
                e2 = A$2({}, d2, { value: void 0 });
                D$1("invalid", a);
                break;
              case "textarea":
                hb(a, d2);
                e2 = gb(a, d2);
                D$1("invalid", a);
                break;
              default:
                e2 = d2;
            }
            ub(c2, e2);
            h2 = e2;
            for (f2 in h2) if (h2.hasOwnProperty(f2)) {
              var k2 = h2[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a) : null != k2 && ta(a, f2, k2, g2));
            }
            switch (c2) {
              case "input":
                Va(a);
                db(a, d2, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d2.value && a.setAttribute("value", "" + Sa(d2.value));
                break;
              case "select":
                a.multiple = !!d2.multiple;
                f2 = d2.value;
                null != f2 ? fb(a, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                  a,
                  !!d2.multiple,
                  d2.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S$c(b2);
      return null;
    case 6:
      if (a && null != b2.stateNode) Cj(a, b2, a.memoizedProps, d2);
      else {
        if ("string" !== typeof d2 && null === b2.stateNode) throw Error(p$1(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.memoizedProps;
          d2[Of] = b2;
          if (f2 = d2.nodeValue !== c2) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d2.nodeValue, c2, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a.mode & 1));
            }
          }
          f2 && (b2.flags |= 4);
        } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
      }
      S$c(b2);
      return null;
    case 13:
      E(L$1);
      d2 = b2.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I$1 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128)) Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p$1(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p$1(317));
            f2[Of] = b2;
          } else Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S$c(b2);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128)) return b2.lanes = c2, b2;
      d2 = null !== d2;
      d2 !== (null !== a && null !== a.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a || 0 !== (L$1.current & 1) ? 0 === T$1 && (T$1 = 3) : tj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S$c(b2);
      return null;
    case 4:
      return zh(), Aj(a, b2), null === a && sf(b2.stateNode.containerInfo), S$c(b2), null;
    case 10:
      return ah(b2.type._context), S$c(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S$c(b2), null;
    case 19:
      E(L$1);
      f2 = b2.memoizedState;
      if (null === f2) return S$c(b2), null;
      d2 = 0 !== (b2.flags & 128);
      g2 = f2.rendering;
      if (null === g2) if (d2) Dj(f2, false);
      else {
        if (0 !== T$1 || null !== a && 0 !== (a.flags & 128)) for (a = b2.child; null !== a; ) {
          g2 = Ch(a);
          if (null !== g2) {
            b2.flags |= 128;
            Dj(f2, false);
            d2 = g2.updateQueue;
            null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
            b2.subtreeFlags = 0;
            d2 = c2;
            for (c2 = b2.child; null !== c2; ) f2 = c2, a = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a = g2.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c2 = c2.sibling;
            G$1(L$1, L$1.current & 1 | 2);
            return b2.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B$1() > Gj && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
      }
      else {
        if (!d2) if (a = Ch(g2), null !== a) {
          if (b2.flags |= 128, d2 = true, c2 = a.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I$1) return S$c(b2), null;
        } else 2 * B$1() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (null !== f2.tail) return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B$1(), b2.sibling = null, c2 = L$1.current, G$1(L$1, d2 ? c2 & 1 | 2 : c2 & 1), b2;
      S$c(b2);
      return null;
    case 22:
    case 23:
      return Hj(), d2 = null !== b2.memoizedState, null !== a && null !== a.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S$c(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S$c(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$1(156, b2.tag));
}
function Ij(a, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a = b2.flags, a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
    case 3:
      return zh(), E(Wf), E(H$1), Eh(), a = b2.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b2.flags = a & -65537 | 128, b2) : null;
    case 5:
      return Bh(b2), null;
    case 13:
      E(L$1);
      a = b2.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b2.alternate) throw Error(p$1(340));
        Ig();
      }
      a = b2.flags;
      return a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
    case 19:
      return E(L$1), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b2.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U$1 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V$1 = null;
function Lj(a, b2) {
  var c2 = a.ref;
  if (null !== c2) if ("function" === typeof c2) try {
    c2(null);
  } catch (d2) {
    W$1(a, b2, d2);
  }
  else c2.current = null;
}
function Mj(a, b2, c2) {
  try {
    c2();
  } catch (d2) {
    W$1(a, b2, d2);
  }
}
var Nj = false;
function Oj(a, b2) {
  Cf = dd;
  a = Me$1();
  if (Ne$1(a)) {
    if ("selectionStart" in a) var c2 = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c2 = (c2 = a.ownerDocument) && c2.defaultView || window;
      var d2 = c2.getSelection && c2.getSelection();
      if (d2 && 0 !== d2.rangeCount) {
        c2 = d2.anchorNode;
        var e2 = d2.anchorOffset, f2 = d2.focusNode;
        d2 = d2.focusOffset;
        try {
          c2.nodeType, f2.nodeType;
        } catch (F2) {
          c2 = null;
          break a;
        }
        var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h2 = g2 + e2);
            q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
            3 === q2.nodeType && (g2 += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c2 && ++l2 === e2 && (h2 = g2);
            r2 === f2 && ++m2 === d2 && (k2 = g2);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
      } else c2 = null;
    }
    c2 = c2 || { start: 0, end: 0 };
  } else c2 = null;
  Df = { focusedElem: a, selectionRange: c2 };
  dd = false;
  for (V$1 = b2; null !== V$1; ) if (b2 = V$1, a = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a) a.return = b2, V$1 = a;
  else for (; null !== V$1; ) {
    b2 = V$1;
    try {
      var n2 = b2.alternate;
      if (0 !== (b2.flags & 1024)) switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t2 : Ci(b2.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b2.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p$1(163));
      }
    } catch (F2) {
      W$1(b2, b2.return, F2);
    }
    a = b2.sibling;
    if (null !== a) {
      a.return = b2.return;
      V$1 = a;
      break;
    }
    V$1 = b2.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b2, c2) {
  var d2 = b2.updateQueue;
  d2 = null !== d2 ? d2.lastEffect : null;
  if (null !== d2) {
    var e2 = d2 = d2.next;
    do {
      if ((e2.tag & a) === a) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b2, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d2);
  }
}
function Qj(a, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a) === a) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Rj(a) {
  var b2 = a.ref;
  if (null !== b2) {
    var c2 = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c2;
        break;
      default:
        a = c2;
    }
    "function" === typeof b2 ? b2(a) : b2.current = a;
  }
}
function Sj(a) {
  var b2 = a.alternate;
  null !== b2 && (a.alternate = null, Sj(b2));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b2 = a.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b2, c2) {
  var d2 = a.tag;
  if (5 === d2 || 6 === d2) a = a.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a, b2) : c2.insertBefore(a, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a, c2)) : (b2 = c2, b2.appendChild(a)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d2 && (a = a.child, null !== a)) for (Vj(a, b2, c2), a = a.sibling; null !== a; ) Vj(a, b2, c2), a = a.sibling;
}
function Wj(a, b2, c2) {
  var d2 = a.tag;
  if (5 === d2 || 6 === d2) a = a.stateNode, b2 ? c2.insertBefore(a, b2) : c2.appendChild(a);
  else if (4 !== d2 && (a = a.child, null !== a)) for (Wj(a, b2, c2), a = a.sibling; null !== a; ) Wj(a, b2, c2), a = a.sibling;
}
var X$1 = null, Xj = false;
function Yj(a, b2, c2) {
  for (c2 = c2.child; null !== c2; ) Zj(a, b2, c2), c2 = c2.sibling;
}
function Zj(a, b2, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c2);
  } catch (h2) {
  }
  switch (c2.tag) {
    case 5:
      U$1 || Lj(c2, b2);
    case 6:
      var d2 = X$1, e2 = Xj;
      X$1 = null;
      Yj(a, b2, c2);
      X$1 = d2;
      Xj = e2;
      null !== X$1 && (Xj ? (a = X$1, c2 = c2.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c2) : a.removeChild(c2)) : X$1.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X$1 && (Xj ? (a = X$1, c2 = c2.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c2) : 1 === a.nodeType && Kf(a, c2), bd(a)) : Kf(X$1, c2.stateNode));
      break;
    case 4:
      d2 = X$1;
      e2 = Xj;
      X$1 = c2.stateNode.containerInfo;
      Xj = true;
      Yj(a, b2, c2);
      X$1 = d2;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
        e2 = d2 = d2.next;
        do {
          var f2 = e2, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b2, g2) : 0 !== (f2 & 4) && Mj(c2, b2, g2));
          e2 = e2.next;
        } while (e2 !== d2);
      }
      Yj(a, b2, c2);
      break;
    case 1:
      if (!U$1 && (Lj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
        d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
      } catch (h2) {
        W$1(c2, b2, h2);
      }
      Yj(a, b2, c2);
      break;
    case 21:
      Yj(a, b2, c2);
      break;
    case 22:
      c2.mode & 1 ? (U$1 = (d2 = U$1) || null !== c2.memoizedState, Yj(a, b2, c2), U$1 = d2) : Yj(a, b2, c2);
      break;
    default:
      Yj(a, b2, c2);
  }
}
function ak(a) {
  var b2 = a.updateQueue;
  if (null !== b2) {
    a.updateQueue = null;
    var c2 = a.stateNode;
    null === c2 && (c2 = a.stateNode = new Kj());
    b2.forEach(function(b3) {
      var d2 = bk.bind(null, a, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
    });
  }
}
function ck(a, b2) {
  var c2 = b2.deletions;
  if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    try {
      var f2 = a, g2 = b2, h2 = g2;
      a: for (; null !== h2; ) {
        switch (h2.tag) {
          case 5:
            X$1 = h2.stateNode;
            Xj = false;
            break a;
          case 3:
            X$1 = h2.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X$1 = h2.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h2 = h2.return;
      }
      if (null === X$1) throw Error(p$1(160));
      Zj(f2, g2, e2);
      X$1 = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W$1(e2, b2, l2);
    }
  }
  if (b2.subtreeFlags & 12854) for (b2 = b2.child; null !== b2; ) dk(b2, a), b2 = b2.sibling;
}
function dk(a, b2) {
  var c2 = a.alternate, d2 = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b2, a);
      ek(a);
      if (d2 & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b2, a);
      ek(a);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      break;
    case 5:
      ck(b2, a);
      ek(a);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      if (a.flags & 32) {
        var e2 = a.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      if (d2 & 4 && (e2 = a.stateNode, null != e2)) {
        var f2 = a.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
          vb(h2, g2);
          var l2 = vb(h2, f2);
          for (g2 = 0; g2 < k2.length; g2 += 2) {
            var m2 = k2[g2], q2 = k2[g2 + 1];
            "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
          }
          switch (h2) {
            case "input":
              bb(e2, f2);
              break;
            case "textarea":
              ib(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b2, a);
      ek(a);
      if (d2 & 4) {
        if (null === a.stateNode) throw Error(p$1(162));
        e2 = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b2, a);
      ek(a);
      if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
        bd(b2.containerInfo);
      } catch (t2) {
        W$1(a, a.return, t2);
      }
      break;
    case 4:
      ck(b2, a);
      ek(a);
      break;
    case 13:
      ck(b2, a);
      ek(a);
      e2 = a.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B$1()));
      d2 & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a.mode & 1 ? (U$1 = (l2 = U$1) || m2, ck(b2, a), U$1 = l2) : ck(b2, a);
      ek(a);
      if (d2 & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V$1 = a, m2 = a.child; null !== m2; ) {
          for (q2 = V$1 = m2; null !== V$1; ) {
            r2 = V$1;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d2 = r2;
                  c2 = r2.return;
                  try {
                    b2 = d2, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W$1(d2, c2, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V$1 = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
              } catch (t2) {
                W$1(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W$1(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b2, a);
      ek(a);
      d2 & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b2,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b2 = a.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c2 = a.return; null !== c2; ) {
          if (Tj(c2)) {
            var d2 = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$1(160));
      }
      switch (d2.tag) {
        case 5:
          var e2 = d2.stateNode;
          d2.flags & 32 && (ob(e2, ""), d2.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e2);
          break;
        case 3:
        case 4:
          var g2 = d2.stateNode.containerInfo, h2 = Uj(a);
          Vj(a, h2, g2);
          break;
        default:
          throw Error(p$1(161));
      }
    } catch (k2) {
      W$1(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b2 & 4096 && (a.flags &= -4097);
}
function hk(a, b2, c2) {
  V$1 = a;
  ik(a);
}
function ik(a, b2, c2) {
  for (var d2 = 0 !== (a.mode & 1); null !== V$1; ) {
    var e2 = V$1, f2 = e2.child;
    if (22 === e2.tag && d2) {
      var g2 = null !== e2.memoizedState || Jj;
      if (!g2) {
        var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U$1;
        h2 = Jj;
        var l2 = U$1;
        Jj = g2;
        if ((U$1 = k2) && !l2) for (V$1 = e2; null !== V$1; ) g2 = V$1, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g2, V$1 = k2) : jk(e2);
        for (; null !== f2; ) V$1 = f2, ik(f2), f2 = f2.sibling;
        V$1 = e2;
        Jj = h2;
        U$1 = l2;
      }
      kk(a);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V$1 = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V$1; ) {
    var b2 = V$1;
    if (0 !== (b2.flags & 8772)) {
      var c2 = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772)) switch (b2.tag) {
          case 0:
          case 11:
          case 15:
            U$1 || Qj(5, b2);
            break;
          case 1:
            var d2 = b2.stateNode;
            if (b2.flags & 4 && !U$1) if (null === c2) d2.componentDidMount();
            else {
              var e2 = b2.elementType === b2.type ? c2.memoizedProps : Ci(b2.type, c2.memoizedProps);
              d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b2.updateQueue;
            null !== f2 && sh(b2, f2, d2);
            break;
          case 3:
            var g2 = b2.updateQueue;
            if (null !== g2) {
              c2 = null;
              if (null !== b2.child) switch (b2.child.tag) {
                case 5:
                  c2 = b2.child.stateNode;
                  break;
                case 1:
                  c2 = b2.child.stateNode;
              }
              sh(b2, g2, c2);
            }
            break;
          case 5:
            var h2 = b2.stateNode;
            if (null === c2 && b2.flags & 4) {
              c2 = h2;
              var k2 = b2.memoizedProps;
              switch (b2.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c2.focus();
                  break;
                case "img":
                  k2.src && (c2.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b2.memoizedState) {
              var l2 = b2.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p$1(163));
        }
        U$1 || b2.flags & 512 && Rj(b2);
      } catch (r2) {
        W$1(b2, b2.return, r2);
      }
    }
    if (b2 === a) {
      V$1 = null;
      break;
    }
    c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V$1 = c2;
      break;
    }
    V$1 = b2.return;
  }
}
function gk(a) {
  for (; null !== V$1; ) {
    var b2 = V$1;
    if (b2 === a) {
      V$1 = null;
      break;
    }
    var c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V$1 = c2;
      break;
    }
    V$1 = b2.return;
  }
}
function jk(a) {
  for (; null !== V$1; ) {
    var b2 = V$1;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Qj(4, b2);
          } catch (k2) {
            W$1(b2, c2, k2);
          }
          break;
        case 1:
          var d2 = b2.stateNode;
          if ("function" === typeof d2.componentDidMount) {
            var e2 = b2.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              W$1(b2, e2, k2);
            }
          }
          var f2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W$1(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W$1(b2, g2, k2);
          }
      }
    } catch (k2) {
      W$1(b2, b2.return, k2);
    }
    if (b2 === a) {
      V$1 = null;
      break;
    }
    var h2 = b2.sibling;
    if (null !== h2) {
      h2.return = b2.return;
      V$1 = h2;
      break;
    }
    V$1 = b2.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K$1 = 0, Q$1 = null, Y$1 = null, Z$1 = 0, fj = 0, ej = Uf(0), T$1 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R$1() {
  return 0 !== (K$1 & 6) ? B$1() : -1 !== Ak ? Ak : Ak = B$1();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K$1 & 2) && 0 !== Z$1) return Z$1 & -Z$1;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C$1;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b2, c2, d2) {
  if (50 < yk) throw yk = 0, zk = null, Error(p$1(185));
  Ac(a, c2, d2);
  if (0 === (K$1 & 2) || a !== Q$1) a === Q$1 && (0 === (K$1 & 2) && (qk |= c2), 4 === T$1 && Ck(a, Z$1)), Dk(a, d2), 1 === c2 && 0 === K$1 && 0 === (b2.mode & 1) && (Gj = B$1() + 500, fg && jg());
}
function Dk(a, b2) {
  var c2 = a.callbackNode;
  wc(a, b2);
  var d2 = uc(a, a === Q$1 ? Z$1 : 0);
  if (0 === d2) null !== c2 && bc(c2), a.callbackNode = null, a.callbackPriority = 0;
  else if (b2 = d2 & -d2, a.callbackPriority !== b2) {
    null != c2 && bc(c2);
    if (1 === b2) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K$1 & 6) && jg();
    }), c2 = null;
    else {
      switch (Dc(d2)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Fk(c2, Gk.bind(null, a));
    }
    a.callbackPriority = b2;
    a.callbackNode = c2;
  }
}
function Gk(a, b2) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K$1 & 6)) throw Error(p$1(327));
  var c2 = a.callbackNode;
  if (Hk() && a.callbackNode !== c2) return null;
  var d2 = uc(a, a === Q$1 ? Z$1 : 0);
  if (0 === d2) return null;
  if (0 !== (d2 & 30) || 0 !== (d2 & a.expiredLanes) || b2) b2 = Ik(a, d2);
  else {
    b2 = d2;
    var e2 = K$1;
    K$1 |= 2;
    var f2 = Jk();
    if (Q$1 !== a || Z$1 !== b2) uk = null, Gj = B$1() + 500, Kk(a, b2);
    do
      try {
        Lk();
        break;
      } catch (h2) {
        Mk(a, h2);
      }
    while (1);
    $g();
    mk.current = f2;
    K$1 = e2;
    null !== Y$1 ? b2 = 0 : (Q$1 = null, Z$1 = 0, b2 = T$1);
  }
  if (0 !== b2) {
    2 === b2 && (e2 = xc(a), 0 !== e2 && (d2 = e2, b2 = Nk(a, e2)));
    if (1 === b2) throw c2 = pk, Kk(a, 0), Ck(a, d2), Dk(a, B$1()), c2;
    if (6 === b2) Ck(a, d2);
    else {
      e2 = a.current.alternate;
      if (0 === (d2 & 30) && !Ok(e2) && (b2 = Ik(a, d2), 2 === b2 && (f2 = xc(a), 0 !== f2 && (d2 = f2, b2 = Nk(a, f2))), 1 === b2)) throw c2 = pk, Kk(a, 0), Ck(a, d2), Dk(a, B$1()), c2;
      a.finishedWork = e2;
      a.finishedLanes = d2;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$1(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d2);
          if ((d2 & 130023424) === d2 && (b2 = fk + 500 - B$1(), 10 < b2)) {
            if (0 !== uc(a, 0)) break;
            e2 = a.suspendedLanes;
            if ((e2 & d2) !== d2) {
              R$1();
              a.pingedLanes |= a.suspendedLanes & e2;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b2);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d2);
          if ((d2 & 4194240) === d2) break;
          b2 = a.eventTimes;
          for (e2 = -1; 0 < d2; ) {
            var g2 = 31 - oc(d2);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e2 && (e2 = g2);
            d2 &= ~f2;
          }
          d2 = e2;
          d2 = B$1() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
          if (10 < d2) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d2);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p$1(329));
      }
    }
  }
  Dk(a, B$1());
  return a.callbackNode === c2 ? Gk.bind(null, a) : null;
}
function Nk(a, b2) {
  var c2 = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b2).flags |= 256);
  a = Ik(a, b2);
  2 !== a && (b2 = tk, tk = c2, null !== b2 && Fj(b2));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b2 = a; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
        var e2 = c2[d2], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He$1(f2(), e2)) return false;
        } catch (g2) {
          return false;
        }
      }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c2) c2.return = b2, b2 = c2;
    else {
      if (b2 === a) break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a) return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Ck(a, b2) {
  b2 &= ~rk;
  b2 &= ~qk;
  a.suspendedLanes |= b2;
  a.pingedLanes &= ~b2;
  for (a = a.expirationTimes; 0 < b2; ) {
    var c2 = 31 - oc(b2), d2 = 1 << c2;
    a[c2] = -1;
    b2 &= ~d2;
  }
}
function Ek(a) {
  if (0 !== (K$1 & 6)) throw Error(p$1(327));
  Hk();
  var b2 = uc(a, 0);
  if (0 === (b2 & 1)) return Dk(a, B$1()), null;
  var c2 = Ik(a, b2);
  if (0 !== a.tag && 2 === c2) {
    var d2 = xc(a);
    0 !== d2 && (b2 = d2, c2 = Nk(a, d2));
  }
  if (1 === c2) throw c2 = pk, Kk(a, 0), Ck(a, b2), Dk(a, B$1()), c2;
  if (6 === c2) throw Error(p$1(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b2;
  Pk(a, tk, uk);
  Dk(a, B$1());
  return null;
}
function Qk(a, b2) {
  var c2 = K$1;
  K$1 |= 1;
  try {
    return a(b2);
  } finally {
    K$1 = c2, 0 === K$1 && (Gj = B$1() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K$1 & 6) && Hk();
  var b2 = K$1;
  K$1 |= 1;
  var c2 = ok.transition, d2 = C$1;
  try {
    if (ok.transition = null, C$1 = 1, a) return a();
  } finally {
    C$1 = d2, ok.transition = c2, K$1 = b2, 0 === (K$1 & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b2) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c2 = a.timeoutHandle;
  -1 !== c2 && (a.timeoutHandle = -1, Gf(c2));
  if (null !== Y$1) for (c2 = Y$1.return; null !== c2; ) {
    var d2 = c2;
    wg(d2);
    switch (d2.tag) {
      case 1:
        d2 = d2.type.childContextTypes;
        null !== d2 && void 0 !== d2 && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H$1);
        Eh();
        break;
      case 5:
        Bh(d2);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L$1);
        break;
      case 19:
        E(L$1);
        break;
      case 10:
        ah(d2.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c2 = c2.return;
  }
  Q$1 = a;
  Y$1 = a = Pg(a.current, null);
  Z$1 = fj = b2;
  T$1 = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b2 = 0; b2 < fh.length; b2++) if (c2 = fh[b2], d2 = c2.interleaved, null !== d2) {
      c2.interleaved = null;
      var e2 = d2.next, f2 = c2.pending;
      if (null !== f2) {
        var g2 = f2.next;
        f2.next = e2;
        d2.next = g2;
      }
      c2.pending = d2;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b2) {
  do {
    var c2 = Y$1;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d2 = M$1.memoizedState; null !== d2; ) {
          var e2 = d2.queue;
          null !== e2 && (e2.pending = null);
          d2 = d2.next;
        }
        Ih = false;
      }
      Hh = 0;
      O$1 = N = M$1 = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c2 || null === c2.return) {
        T$1 = 1;
        pk = b2;
        Y$1 = null;
        break;
      }
      a: {
        var f2 = a, g2 = c2.return, h2 = c2, k2 = b2;
        b2 = Z$1;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g2, h2, f2, b2);
            y2.mode & 1 && Si(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b2.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Si(f2, l2, b2);
              tj();
              break a;
            }
            k2 = Error(p$1(426));
          }
        } else if (I$1 && h2.mode & 1) {
          var J2 = Ui(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g2, h2, f2, b2);
            Jg(Ji(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h2);
        4 !== T$1 && (T$1 = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Ni(f2, k2, b2);
              ph(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Qi(f2, h2, b2);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c2);
    } catch (na) {
      b2 = na;
      Y$1 === c2 && null !== c2 && (Y$1 = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T$1 || 3 === T$1 || 2 === T$1) T$1 = 4;
  null === Q$1 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q$1, Z$1);
}
function Ik(a, b2) {
  var c2 = K$1;
  K$1 |= 2;
  var d2 = Jk();
  if (Q$1 !== a || Z$1 !== b2) uk = null, Kk(a, b2);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a, e2);
    }
  while (1);
  $g();
  K$1 = c2;
  mk.current = d2;
  if (null !== Y$1) throw Error(p$1(261));
  Q$1 = null;
  Z$1 = 0;
  return T$1;
}
function Tk() {
  for (; null !== Y$1; ) Uk(Y$1);
}
function Lk() {
  for (; null !== Y$1 && !cc(); ) Uk(Y$1);
}
function Uk(a) {
  var b2 = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b2 ? Sk(a) : Y$1 = b2;
  nk.current = null;
}
function Sk(a) {
  var b2 = a;
  do {
    var c2 = b2.alternate;
    a = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c2 = Ej(c2, b2, fj), null !== c2) {
        Y$1 = c2;
        return;
      }
    } else {
      c2 = Ij(c2, b2);
      if (null !== c2) {
        c2.flags &= 32767;
        Y$1 = c2;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T$1 = 6;
        Y$1 = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y$1 = b2;
      return;
    }
    Y$1 = b2 = a;
  } while (null !== b2);
  0 === T$1 && (T$1 = 5);
}
function Pk(a, b2, c2) {
  var d2 = C$1, e2 = ok.transition;
  try {
    ok.transition = null, C$1 = 1, Wk(a, b2, c2, d2);
  } finally {
    ok.transition = e2, C$1 = d2;
  }
  return null;
}
function Wk(a, b2, c2, d2) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K$1 & 6)) throw Error(p$1(327));
  c2 = a.finishedWork;
  var e2 = a.finishedLanes;
  if (null === c2) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c2 === a.current) throw Error(p$1(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a, f2);
  a === Q$1 && (Y$1 = Q$1 = null, Z$1 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g2 = C$1;
    C$1 = 1;
    var h2 = K$1;
    K$1 |= 4;
    nk.current = null;
    Oj(a, c2);
    dk(c2, a);
    Oe$1(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c2;
    hk(c2);
    dc();
    K$1 = h2;
    C$1 = g2;
    ok.transition = f2;
  } else a.current = c2;
  vk && (vk = false, wk = a, xk = e2);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c2.stateNode);
  Dk(a, B$1());
  if (null !== b2) for (d2 = a.onRecoverableError, c2 = 0; c2 < b2.length; c2++) e2 = b2[c2], d2(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b2 = ok.transition, c2 = C$1;
    try {
      ok.transition = null;
      C$1 = 16 > a ? 16 : a;
      if (null === wk) var d2 = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K$1 & 6)) throw Error(p$1(331));
        var e2 = K$1;
        K$1 |= 4;
        for (V$1 = a.current; null !== V$1; ) {
          var f2 = V$1, g2 = f2.child;
          if (0 !== (V$1.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V$1 = l2; null !== V$1; ) {
                  var m2 = V$1;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V$1 = q2;
                  else for (; null !== V$1; ) {
                    m2 = V$1;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V$1 = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V$1 = r2;
                      break;
                    }
                    V$1 = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V$1 = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V$1 = g2;
          else b: for (; null !== V$1; ) {
            f2 = V$1;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V$1 = x2;
              break b;
            }
            V$1 = f2.return;
          }
        }
        var w2 = a.current;
        for (V$1 = w2; null !== V$1; ) {
          g2 = V$1;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V$1 = u2;
          else b: for (g2 = w2; null !== V$1; ) {
            h2 = V$1;
            if (0 !== (h2.flags & 2048)) try {
              switch (h2.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h2);
              }
            } catch (na) {
              W$1(h2, h2.return, na);
            }
            if (h2 === g2) {
              V$1 = null;
              break b;
            }
            var F2 = h2.sibling;
            if (null !== F2) {
              F2.return = h2.return;
              V$1 = F2;
              break b;
            }
            V$1 = h2.return;
          }
        }
        K$1 = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d2 = true;
      }
      return d2;
    } finally {
      C$1 = c2, ok.transition = b2;
    }
  }
  return false;
}
function Xk(a, b2, c2) {
  b2 = Ji(c2, b2);
  b2 = Ni(a, b2, 1);
  a = nh(a, b2, 1);
  b2 = R$1();
  null !== a && (Ac(a, 1, b2), Dk(a, b2));
}
function W$1(a, b2, c2) {
  if (3 === a.tag) Xk(a, a, c2);
  else for (; null !== b2; ) {
    if (3 === b2.tag) {
      Xk(b2, a, c2);
      break;
    } else if (1 === b2.tag) {
      var d2 = b2.stateNode;
      if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
        a = Ji(c2, a);
        a = Qi(b2, a, 1);
        b2 = nh(b2, a, 1);
        a = R$1();
        null !== b2 && (Ac(b2, 1, a), Dk(b2, a));
        break;
      }
    }
    b2 = b2.return;
  }
}
function Ti(a, b2, c2) {
  var d2 = a.pingCache;
  null !== d2 && d2.delete(b2);
  b2 = R$1();
  a.pingedLanes |= a.suspendedLanes & c2;
  Q$1 === a && (Z$1 & c2) === c2 && (4 === T$1 || 3 === T$1 && (Z$1 & 130023424) === Z$1 && 500 > B$1() - fk ? Kk(a, 0) : rk |= c2);
  Dk(a, b2);
}
function Yk(a, b2) {
  0 === b2 && (0 === (a.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = R$1();
  a = ih(a, b2);
  null !== a && (Ac(a, b2, c2), Dk(a, c2));
}
function uj(a) {
  var b2 = a.memoizedState, c2 = 0;
  null !== b2 && (c2 = b2.retryLane);
  Yk(a, c2);
}
function bk(a, b2) {
  var c2 = 0;
  switch (a.tag) {
    case 13:
      var d2 = a.stateNode;
      var e2 = a.memoizedState;
      null !== e2 && (c2 = e2.retryLane);
      break;
    case 19:
      d2 = a.stateNode;
      break;
    default:
      throw Error(p$1(314));
  }
  null !== d2 && d2.delete(b2);
  Yk(a, c2);
}
var Vk;
Vk = function(a, b2, c2) {
  if (null !== a) if (a.memoizedProps !== b2.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c2) && 0 === (b2.flags & 128)) return dh = false, yj(a, b2, c2);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I$1 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d2 = b2.type;
      ij(a, b2);
      a = b2.pendingProps;
      var e2 = Yf(b2, H$1.current);
      ch(b2, c2);
      e2 = Nh(null, b2, d2, a, e2, c2);
      var f2 = Sh();
      b2.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b2), e2.updater = Ei, b2.stateNode = e2, e2._reactInternals = b2, Ii(b2, d2, a, c2), b2 = jj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I$1 && f2 && vg(b2), Xi(null, b2, e2, c2), b2 = b2.child);
      return b2;
    case 16:
      d2 = b2.elementType;
      a: {
        ij(a, b2);
        a = b2.pendingProps;
        e2 = d2._init;
        d2 = e2(d2._payload);
        b2.type = d2;
        e2 = b2.tag = Zk(d2);
        a = Ci(d2, a);
        switch (e2) {
          case 0:
            b2 = cj(null, b2, d2, a, c2);
            break a;
          case 1:
            b2 = hj(null, b2, d2, a, c2);
            break a;
          case 11:
            b2 = Yi(null, b2, d2, a, c2);
            break a;
          case 14:
            b2 = $i(null, b2, d2, Ci(d2.type, a), c2);
            break a;
        }
        throw Error(p$1(
          306,
          d2,
          ""
        ));
      }
      return b2;
    case 0:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), cj(a, b2, d2, e2, c2);
    case 1:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), hj(a, b2, d2, e2, c2);
    case 3:
      a: {
        kj(b2);
        if (null === a) throw Error(p$1(387));
        d2 = b2.pendingProps;
        f2 = b2.memoizedState;
        e2 = f2.element;
        lh(a, b2);
        qh(b2, d2, null, c2);
        var g2 = b2.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
          e2 = Ji(Error(p$1(423)), b2);
          b2 = lj(a, b2, d2, c2, e2);
          break a;
        } else if (d2 !== e2) {
          e2 = Ji(Error(p$1(424)), b2);
          b2 = lj(a, b2, d2, c2, e2);
          break a;
        } else for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I$1 = true, zg = null, c2 = Vg(b2, null, d2, c2), b2.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d2 === e2) {
            b2 = Zi(a, b2, c2);
            break a;
          }
          Xi(a, b2, d2, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Ah(b2), null === a && Eg(b2), d2 = b2.type, e2 = b2.pendingProps, f2 = null !== a ? a.memoizedProps : null, g2 = e2.children, Ef(d2, e2) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), gj(a, b2), Xi(a, b2, g2, c2), b2.child;
    case 6:
      return null === a && Eg(b2), null;
    case 13:
      return oj(a, b2, c2);
    case 4:
      return yh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a ? b2.child = Ug(b2, null, d2, c2) : Xi(a, b2, d2, c2), b2.child;
    case 11:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), Yi(a, b2, d2, e2, c2);
    case 7:
      return Xi(a, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Xi(a, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Xi(a, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d2 = b2.type._context;
        e2 = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e2.value;
        G$1(Wg, d2._currentValue);
        d2._currentValue = g2;
        if (null !== f2) if (He$1(f2.value, g2)) {
          if (f2.children === e2.children && !Wf.current) {
            b2 = Zi(a, b2, c2);
            break a;
          }
        } else for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
          var h2 = f2.dependencies;
          if (null !== h2) {
            g2 = f2.child;
            for (var k2 = h2.firstContext; null !== k2; ) {
              if (k2.context === d2) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c2 & -c2);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c2;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c2);
                bh(
                  f2.return,
                  c2,
                  b2
                );
                h2.lanes |= c2;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g2 = f2.type === b2.type ? null : f2.child;
          else if (18 === f2.tag) {
            g2 = f2.return;
            if (null === g2) throw Error(p$1(341));
            g2.lanes |= c2;
            h2 = g2.alternate;
            null !== h2 && (h2.lanes |= c2);
            bh(g2, c2, b2);
            g2 = f2.sibling;
          } else g2 = f2.child;
          if (null !== g2) g2.return = f2;
          else for (g2 = f2; null !== g2; ) {
            if (g2 === b2) {
              g2 = null;
              break;
            }
            f2 = g2.sibling;
            if (null !== f2) {
              f2.return = g2.return;
              g2 = f2;
              break;
            }
            g2 = g2.return;
          }
          f2 = g2;
        }
        Xi(a, b2, e2.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e2 = b2.type, d2 = b2.pendingProps.children, ch(b2, c2), e2 = eh(e2), d2 = d2(e2), b2.flags |= 1, Xi(a, b2, d2, c2), b2.child;
    case 14:
      return d2 = b2.type, e2 = Ci(d2, b2.pendingProps), e2 = Ci(d2.type, e2), $i(a, b2, d2, e2, c2);
    case 15:
      return bj(a, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), ij(a, b2), b2.tag = 1, Zf(d2) ? (a = true, cg(b2)) : a = false, ch(b2, c2), Gi(b2, d2, e2), Ii(b2, d2, e2, c2), jj(null, b2, d2, true, a, c2);
    case 19:
      return xj(a, b2, c2);
    case 22:
      return dj(a, b2, c2);
  }
  throw Error(p$1(156, b2.tag));
};
function Fk(a, b2) {
  return ac(a, b2);
}
function $k(a, b2, c2, d2) {
  this.tag = a;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b2, c2, d2) {
  return new $k(a, b2, c2, d2);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b2) {
  var c2 = a.alternate;
  null === c2 ? (c2 = Bg(a.tag, b2, a.key, a.mode), c2.elementType = a.elementType, c2.type = a.type, c2.stateNode = a.stateNode, c2.alternate = a, a.alternate = c2) : (c2.pendingProps = b2, c2.type = a.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a.flags & 14680064;
  c2.childLanes = a.childLanes;
  c2.lanes = a.lanes;
  c2.child = a.child;
  c2.memoizedProps = a.memoizedProps;
  c2.memoizedState = a.memoizedState;
  c2.updateQueue = a.updateQueue;
  b2 = a.dependencies;
  c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a.sibling;
  c2.index = a.index;
  c2.ref = a.ref;
  return c2;
}
function Rg(a, b2, c2, d2, e2, f2) {
  var g2 = 2;
  d2 = a;
  if ("function" === typeof a) aj(a) && (g2 = 1);
  else if ("string" === typeof a) g2 = 5;
  else a: switch (a) {
    case ya:
      return Tg(c2.children, e2, f2, b2);
    case za:
      g2 = 8;
      e2 |= 8;
      break;
    case Aa:
      return a = Bg(12, c2, b2, e2 | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c2, b2, e2), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c2, b2, e2), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c2, e2, f2, b2);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g2 = 10;
          break a;
        case Ca:
          g2 = 9;
          break a;
        case Da:
          g2 = 11;
          break a;
        case Ga:
          g2 = 14;
          break a;
        case Ha:
          g2 = 16;
          d2 = null;
          break a;
      }
      throw Error(p$1(130, null == a ? a : typeof a, ""));
  }
  b2 = Bg(g2, c2, b2, e2);
  b2.elementType = a;
  b2.type = d2;
  b2.lanes = f2;
  return b2;
}
function Tg(a, b2, c2, d2) {
  a = Bg(7, a, d2, b2);
  a.lanes = c2;
  return a;
}
function pj(a, b2, c2, d2) {
  a = Bg(22, a, d2, b2);
  a.elementType = Ia;
  a.lanes = c2;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b2, c2) {
  a = Bg(6, a, null, b2);
  a.lanes = c2;
  return a;
}
function Sg(a, b2, c2) {
  b2 = Bg(4, null !== a.children ? a.children : [], a.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b2;
}
function al(a, b2, c2, d2, e2) {
  this.tag = b2;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  a = new al(a, b2, c2, h2, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg(3, null, null, b2);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b2, c2) {
  var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a, containerInfo: b2, implementation: c2 };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p$1(170));
    var b2 = a;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p$1(171));
  }
  if (1 === a.tag) {
    var c2 = a.type;
    if (Zf(c2)) return bg(a, c2, b2);
  }
  return b2;
}
function el(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  a = bl(c2, d2, true, a, e2, f2, g2, h2, k2);
  a.context = dl(null);
  c2 = a.current;
  d2 = R$1();
  e2 = yi(c2);
  f2 = mh(d2, e2);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  nh(c2, f2, e2);
  a.current.lanes = e2;
  Ac(a, e2, d2);
  Dk(a, d2);
  return a;
}
function fl(a, b2, c2, d2) {
  var e2 = b2.current, f2 = R$1(), g2 = yi(e2);
  c2 = dl(c2);
  null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
  b2 = mh(f2, g2);
  b2.payload = { element: a };
  d2 = void 0 === d2 ? null : d2;
  null !== d2 && (b2.callback = d2);
  a = nh(e2, b2, g2);
  null !== a && (gi(a, e2, g2, f2), oh(a, e2, g2));
  return g2;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b2) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c2 = a.retryLane;
    a.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
  }
}
function il(a, b2) {
  hl(a, b2);
  (a = a.alternate) && hl(a, b2);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b2 = this._internalRoot;
  if (null === b2) throw Error(p$1(409));
  fl(a, b2, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b2 = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b2[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b2 = Hc();
    a = { blockedOn: null, target: a, priority: b2 };
    for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++) ;
    Qc.splice(c2, 0, a);
    0 === c2 && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b2, c2, d2, e2) {
  if (e2) {
    if ("function" === typeof d2) {
      var f2 = d2;
      d2 = function() {
        var a2 = gl(g2);
        f2.call(a2);
      };
    }
    var g2 = el(b2, d2, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g2;
    a[uf] = g2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g2;
  }
  for (; e2 = a.lastChild; ) a.removeChild(e2);
  if ("function" === typeof d2) {
    var h2 = d2;
    d2 = function() {
      var a2 = gl(k2);
      h2.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b2, k2, c2, d2);
  });
  return k2;
}
function rl(a, b2, c2, d2, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e2) {
      var h2 = e2;
      e2 = function() {
        var a2 = gl(g2);
        h2.call(a2);
      };
    }
    fl(b2, g2, a, e2);
  } else g2 = ql(c2, b2, a, e2, d2);
  return gl(g2);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b2 = a.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = tc(b2.pendingLanes);
        0 !== c2 && (Cc(b2, c2 | 1), Dk(b2, B$1()), 0 === (K$1 & 6) && (Gj = B$1() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b3 = ih(a, 1);
        if (null !== b3) {
          var c3 = R$1();
          gi(b3, a, 1, c3);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b2 = ih(a, 134217728);
    if (null !== b2) {
      var c2 = R$1();
      gi(b2, a, 134217728, c2);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b2 = yi(a), c2 = ih(a, b2);
    if (null !== c2) {
      var d2 = R$1();
      gi(c2, a, b2, d2);
    }
    il(a, b2);
  }
};
Hc = function() {
  return C$1;
};
Ic = function(a, b2) {
  var c2 = C$1;
  try {
    return C$1 = a, b2();
  } finally {
    C$1 = c2;
  }
};
yb = function(a, b2, c2) {
  switch (b2) {
    case "input":
      bb(a, c2);
      b2 = c2.name;
      if ("radio" === c2.type && null != b2) {
        for (c2 = a; c2.parentNode; ) c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d2 = c2[b2];
          if (d2 !== a && d2.form === a.form) {
            var e2 = Db(d2);
            if (!e2) throw Error(p$1(90));
            Wa(d2);
            bb(d2, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c2);
      break;
    case "select":
      b2 = c2.value, null != b2 && fb(a, !!c2.multiple, b2, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue$1, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b2) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b2)) throw Error(p$1(200));
  return cl(a, b2, null, c2);
};
reactDom_production_min.createRoot = function(a, b2) {
  if (!nl(a)) throw Error(p$1(299));
  var c2 = false, d2 = "", e2 = kl;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e2 = b2.onRecoverableError));
  b2 = bl(a, 1, false, null, null, c2, false, d2, e2);
  a[uf] = b2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b2);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b2 = a._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a.render) throw Error(p$1(188));
    a = Object.keys(a).join(",");
    throw Error(p$1(268, a));
  }
  a = Zb(b2);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b2, c2) {
  if (!ol(b2)) throw Error(p$1(200));
  return rl(null, a, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a, b2, c2) {
  if (!nl(a)) throw Error(p$1(405));
  var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g2 = kl;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
  b2 = el(b2, null, a, 1, null != c2 ? c2 : null, e2, false, f2, g2);
  a[uf] = b2.current;
  sf(a);
  if (d2) for (a = 0; a < d2.length; a++) c2 = d2[a], e2 = c2._getVersion, e2 = e2(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e2] : b2.mutableSourceEagerHydrationData.push(
    c2,
    e2
  );
  return new ml(b2);
};
reactDom_production_min.render = function(a, b2, c2) {
  if (!ol(b2)) throw Error(p$1(200));
  return rl(null, a, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p$1(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b2, c2, d2) {
  if (!ol(c2)) throw Error(p$1(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p$1(38));
  return rl(a, b2, c2, false, d2);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m$2 = reactDomExports;
{
  client.createRoot = m$2.createRoot;
  client.hydrateRoot = m$2.hydrateRoot;
}
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index2) {
  return value.charCodeAt(index2) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
function filter(array, pattern) {
  return array.filter(function(value) {
    return !match(value, pattern);
  });
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function lift(root) {
  while (root.root)
    root = copy(root.root, { children: [root] });
  append(root, root.siblings);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index2, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index2, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index2) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index2, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index2) {
  while (!token(peek()))
    next();
  return slice(index2, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index2 = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index2 ? points[index2 - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index2++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index2, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index2 = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index2++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index2, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j2 = 0, k2 = 0; i < index2; ++i)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function prefix$1(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4200:
      if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    case 4384:
    case 3616:
      if (children && children.some(function(element, index2) {
        return length2 = index2, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch", 0) ? prefix$1(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_2, a, b2, c2, d2, e2, f2) {
        return MS + a + ":" + b2 + f2 + (c2 ? MS + a + "-span:" + (d2 ? e2 : +e2 - +b2) + f2 : "") + value;
      });
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index2, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index2, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index2, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer$1(element, index2, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix$1(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(children = element.props, function(value) {
              switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
                case "::placeholder":
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
              }
              return "";
            });
      }
  }
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var define_process_env_default = { GITHUB_STATE: "/home/runner/work/_temp/_runner_file_commands/save_state_f44125d4-edb9-4d84-a78d-4e66badd812a", npm_package_scripts_build_n5_ci: "cd ./d9-n5 && yarn build-ci", npm_package_scripts_build_sample_cra: "cd ./d9-sample-cra && yarn build", STATS_TRP: "true", DEPLOYMENT_BASEPATH: "/opt/runner", DOTNET_NOLOGO: "1", npm_package_scripts_build_n6_ci: "cd ./d9-n6 && yarn build-ci", npm_package_dependencies__vitejs_plugin_react: "^4.3.1", USER: "runner", npm_config_version_commit_hooks: "true", npm_config_user_agent: "yarn/1.22.21 npm/? node/v18.20.4 linux x64", npm_package_dependencies__types_jest: "^29.5.4", CI: "true", npm_config_bin_links: "true", npm_package_bugs_url: "https://github.com/InsureMO/rainbow-d9/issues", npm_config_wrap_output: "", RUNNER_ENVIRONMENT: "github-hosted", GITHUB_ENV: "/home/runner/work/_temp/_runner_file_commands/set_env_f44125d4-edb9-4d84-a78d-4e66badd812a", PIPX_HOME: "/opt/pipx", npm_node_execpath: "/opt/hostedtoolcache/node/18.20.4/x64/bin/node", npm_package_scripts_build_thai_all_ci: "yarn build-thai-plan-selection-ci", npm_package_scripts_build_ts_vfs: "cd ./d9-ts-vfs && yarn build", npm_config_init_version: "1.0.0", npm_package_devDependencies_gh_pages: "^6.1.1", npm_package_dependencies__babel_plugin_proposal_private_property_in_object: "^7.21.11", JAVA_HOME_8_X64: "/usr/lib/jvm/temurin-8-jdk-amd64", SHLVL: "1", HOME: "/home/runner", OLDPWD: "/home/runner/work/rainbow-d9/rainbow-d9", npm_package_browserslist_production_0: ">0.2%", RUNNER_TEMP: "/home/runner/work/_temp", GITHUB_EVENT_PATH: "/home/runner/work/_temp/_github_workflow/event.json", npm_package_scripts_build_all: "yarn build-ts-vfs && yarn build-n123 && yarn build-n5 && yarn build-n6 && yarn build-code-editor && yarn build-echarts && yarn build-thai-all && yarn build-npx", npm_package_browserslist_production_1: "not dead", npm_package_dependencies_react_syntax_highlighter: "^15.5.0", JAVA_HOME_11_X64: "/usr/lib/jvm/temurin-11-jdk-amd64", PIPX_BIN_DIR: "/opt/pipx_bin", GITHUB_REPOSITORY_OWNER: "InsureMO", npm_package_volta_node: "22.11.0", npm_config_init_license: "MIT", npm_package_browserslist_production_2: "not op_mini all", GRADLE_HOME: "/usr/share/gradle-8.10.2", ANDROID_NDK_LATEST_HOME: "/usr/local/lib/android/sdk/ndk/27.2.12479018", JAVA_HOME_21_X64: "/usr/lib/jvm/temurin-21-jdk-amd64", STATS_RDCL: "true", GITHUB_RETENTION_DAYS: "90", YARN_WRAP_OUTPUT: "false", npm_package_scripts_build_thai_plan_selection_ci: "cd ./d9-thai-plan-selection && yarn build-ci", npm_package_scripts_build_n1: "cd ./d9-n1 && yarn build", npm_config_version_tag_prefix: "v", npm_package_dependencies__rainbow_d9_n2: "1.2.20", GITHUB_REPOSITORY_OWNER_ID: "38915232", POWERSHELL_DISTRIBUTION_CHANNEL: "GitHub-Actions-ubuntu22", AZURE_EXTENSION_DIR: "/opt/az/azcliextensions", GITHUB_HEAD_REF: "", npm_package_scripts_build_n2: "cd ./d9-n2 && yarn build", npm_package_dependencies__rainbow_d9_n3: "1.2.20", npm_package_dependencies__rainbow_d9_echarts: "1.2.20", SYSTEMD_EXEC_PID: "600", npm_package_scripts_build_echarts: "cd ./d9-echarts && yarn build", npm_package_scripts_build_n3: "cd ./d9-n3 && yarn build", GITHUB_GRAPHQL_URL: "https://api.github.com/graphql", npm_package_description: "Assume the following envs are ready, otherwise contact the tech guy.", npm_package_scripts_predeploy: "npm run build", npm_package_dependencies__rainbow_d9_n5: "1.2.20", NVM_DIR: "/home/runner/.nvm", npm_package_readmeFilename: "README.md", npm_package_scripts_build_n5: "cd ./d9-n5 && yarn build", npm_package_dependencies__types_react: "^18.3.3", npm_package_dependencies__testing_library_react: "^13.4.0", npm_package_dependencies__rainbow_d9_n6: "1.2.20", DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1", GOROOT_1_21_X64: "/opt/hostedtoolcache/go/1.21.13/x64", JAVA_HOME_17_X64: "/usr/lib/jvm/temurin-17-jdk-amd64", ImageVersion: "20241103.1.0", npm_package_scripts_build_n6: "cd ./d9-n6 && yarn build", RUNNER_OS: "Linux", GITHUB_API_URL: "https://api.github.com", GOROOT_1_22_X64: "/opt/hostedtoolcache/go/1.22.8/x64", SWIFT_PATH: "/usr/share/swift/usr/bin", npm_package_scripts_build_code_editor_ci: "cd ./d9-code-editor && yarn build-ci", npm_package_type: "module", RUNNER_USER: "runner", STATS_V3PS: "true", CHROMEWEBDRIVER: "/usr/local/share/chromedriver-linux64", GOROOT_1_23_X64: "/opt/hostedtoolcache/go/1.23.2/x64", JOURNAL_STREAM: "8:16179", GITHUB_WORKFLOW: "Publish to NPM", _: "/opt/hostedtoolcache/node/18.20.4/x64/bin/yarn", npm_package_private: "true", npm_package_dependencies_remark_gfm: "4.0.0", npm_package_scripts_build_thai_all: "yarn build-thai-plan-selection", npm_config_registry: "https://registry.yarnpkg.com", ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE: "/opt/actionarchivecache", STATS_D: "true", GITHUB_RUN_ID: "11781170096", STATS_VMFE: "true", npm_package_workspaces_0: "d9-ts-vfs", GITHUB_REF_TYPE: "tag", BOOTSTRAP_HASKELL_NONINTERACTIVE: "1", GITHUB_WORKFLOW_SHA: "a1f44700eb2cb0306e9171342b4c7754dd5fa2e0", GITHUB_BASE_REF: "", ImageOS: "ubuntu22", npm_package_scripts_build_n123_ci: "yarn build-n1-ci && yarn build-n2-ci && yarn build-n3-ci", npm_package_workspaces_1: "d9-n1", npm_config_ignore_scripts: "", npm_package_scripts_start: "vite", npm_package_dependencies_github_markdown_css: "^5.5.0", GITHUB_WORKFLOW_REF: "InsureMO/rainbow-d9/.github/workflows/release.yml@refs/tags/r-1.2.21", PERFLOG_LOCATION_SETTING: "RUNNER_PERFLOG", GITHUB_ACTION_REPOSITORY: "", npm_package_workspaces_2: "d9-n2", npm_package_browserslist_development_0: "last 1 chrome version", PATH: "/tmp/yarn--1731338424936-0.21760843517694473:/home/runner/work/rainbow-d9/rainbow-d9/d9-sample-cra/node_modules/.bin:/home/runner/.config/yarn/link/node_modules/.bin:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/opt/hostedtoolcache/node/18.20.4/x64/libexec/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.4/x64/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.4/x64/bin/node_modules/npm/bin/node-gyp-bin:/tmp/yarn--1731338424727-0.4714706928346666:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/home/runner/.config/yarn/link/node_modules/.bin:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/opt/hostedtoolcache/node/18.20.4/x64/libexec/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.4/x64/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.4/x64/bin/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.4/x64/bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin", NODE: "/opt/hostedtoolcache/node/18.20.4/x64/bin/node", ANT_HOME: "/usr/share/ant", DOTNET_MULTILEVEL_LOOKUP: "0", RUNNER_TRACKING_ID: "github_7e2b5c56-3ecc-445f-87e4-79d240c3d81d", INVOCATION_ID: "3f0558bc576344a6ab2f586775b568fa", RUNNER_TOOL_CACHE: "/opt/hostedtoolcache", npm_package_name: "@rainbow-d9/sample-cra", npm_package_workspaces_3: "d9-n3", npm_package_browserslist_development_1: "last 1 firefox version", npm_package_repository_type: "git", npm_package_dependencies__types_react_syntax_highlighter: "^15.5.11", npm_package_dependencies__rainbow_d9_thai_plan_selection: "1.2.20", GITHUB_ACTION: "__run_5", GITHUB_RUN_NUMBER: "179", GITHUB_TRIGGERING_ACTOR: "bradwoo8621", RUNNER_ARCH: "X64", XDG_RUNTIME_DIR: "/run/user/1001", AGENT_TOOLSDIRECTORY: "/opt/hostedtoolcache", npm_package_scripts_build_n99_ci: "cd ./d9-n99 && yarn build", npm_package_scripts_build_thai_plan_selection: "cd ./d9-thai-plan-selection && yarn build", npm_package_workspaces_4: "d9-n5", npm_package_browserslist_development_2: "last 1 safari version", npm_package_scripts_build_npx_ci: "cd ./create-rainbow-d9-app && yarn build-ci", npm_package_workspaces_5: "d9-n6", LANG: "C.UTF-8", VCPKG_INSTALLATION_ROOT: "/usr/local/share/vcpkg", npm_package_workspaces_6: "d9-n99", npm_package_dependencies_react_dom: "^18.3.1", CONDA: "/usr/share/miniconda", RUNNER_NAME: "GitHub Actions 16", XDG_CONFIG_HOME: "/home/runner/.config", STATS_VMD: "true", GITHUB_REF_NAME: "r-1.2.21", GITHUB_REPOSITORY: "InsureMO/rainbow-d9", STATS_D_D: "true", npm_lifecycle_script: "vite build", npm_package_workspaces_7: "d9-code-editor", npm_package_eslintConfig_extends_0: "react-app", npm_package_dependencies_react_markdown: "9.0.1", npm_package_dependencies__types_node: "^20.5.3", STATS_UE: "true", ANDROID_NDK_ROOT: "/usr/local/lib/android/sdk/ndk/27.2.12479018", GITHUB_ACTION_REF: "", DEBIAN_FRONTEND: "noninteractive", npm_package_scripts_build_sample_cra_ci: "cd ./d9-sample-cra && yarn build", npm_package_workspaces_8: "d9-echarts", npm_config_version_git_message: "v%s", npm_package_eslintConfig_extends_1: "react-app/jest", GITHUB_REPOSITORY_ID: "704514093", GITHUB_ACTIONS: "true", npm_lifecycle_event: "build", npm_package_version: "1.2.20", npm_package_workspaces_9: "d9-thai-plan-selection", npm_package_repository_url: "git+https://github.com/InsureMO/rainbow-d9.git", npm_package_dependencies__testing_library_jest_dom: "^5.17.0", npm_package_dependencies__rollup_pluginutils: "^5.1.0", npm_package_dependencies__rainbow_d9_code_editor: "1.2.20", GITHUB_REF_PROTECTED: "false", npm_config_argv: '{"remain":[],"cooked":["run","build-sample-cra"],"original":["build-sample-cra"]}', npm_package_volta_yarn: "1.22.21", npm_package_scripts_build_code_editor: "cd ./d9-code-editor && yarn build", npm_package_workspaces_10: "d9-sample-cra", npm_package_scripts_build: "vite build", npm_package_dependencies__uiw_codemirror_theme_vscode: "^4.23.0", npm_package_dependencies__testing_library_user_event: "^13.5.0", GITHUB_WORKSPACE: "/home/runner/work/rainbow-d9/rainbow-d9", ACCEPT_EULA: "Y", GITHUB_JOB: "create-sample-pages", RUNNER_PERFLOG: "/home/runner/perflog", npm_package_workspaces_11: "create-rainbow-d9-app", npm_package_dependencies_vite: "^5.4.9", GITHUB_SHA: "a1f44700eb2cb0306e9171342b4c7754dd5fa2e0", GITHUB_RUN_ATTEMPT: "1", npm_package_scripts_build_ts_vfs_ci: "cd ./d9-ts-vfs && yarn build-ci", npm_config_version_git_tag: "true", npm_config_version_git_sign: "", GITHUB_REF: "refs/tags/r-1.2.21", GITHUB_ACTOR: "bradwoo8621", ANDROID_SDK_ROOT: "/usr/local/lib/android/sdk", npm_package_license: "MIT", npm_config_strict_ssl: "true", LEIN_HOME: "/usr/local/lib/lein", npm_package_scripts_build_n123: "yarn build-n1 && yarn build-n2 && yarn build-n3", GITHUB_PATH: "/home/runner/work/_temp/_runner_file_commands/add_path_f44125d4-edb9-4d84-a78d-4e66badd812a", JAVA_HOME: "/usr/lib/jvm/temurin-11-jdk-amd64", PWD: "/home/runner/work/rainbow-d9/rainbow-d9/d9-sample-cra", GITHUB_ACTOR_ID: "2330098", RUNNER_WORKSPACE: "/home/runner/work/rainbow-d9", npm_execpath: "/opt/hostedtoolcache/node/18.20.4/x64/lib/node_modules/yarn/bin/yarn.js", npm_package_scripts_build_all_ci: "yarn build-ts-vfs-ci && yarn build-n123-ci && yarn build-n5-ci && yarn build-n6-ci && yarn build-code-editor-ci && yarn build-echarts-ci && yarn build-thai-all-ci && yarn build-npx-ci", HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS: "3650", GITHUB_EVENT_NAME: "push", HOMEBREW_NO_AUTO_UPDATE: "1", ANDROID_HOME: "/usr/local/lib/android/sdk", GITHUB_SERVER_URL: "https://github.com", GECKOWEBDRIVER: "/usr/local/share/gecko_driver", LEIN_JAR: "/usr/local/lib/lein/self-installs/leiningen-2.11.2-standalone.jar", GHCUP_INSTALL_BASE_PREFIX: "/usr/local", GITHUB_OUTPUT: "/home/runner/work/_temp/_runner_file_commands/set_output_f44125d4-edb9-4d84-a78d-4e66badd812a", npm_package_author_name: "Rainbow Team", EDGEWEBDRIVER: "/usr/local/share/edge_driver", STATS_EXT: "true", npm_package_scripts_build_n1_ci: "cd ./d9-n1 && yarn build-ci", npm_package_scripts_build_n99: "cd ./d9-n99 && yarn build", npm_config_save_prefix: "^", npm_config_ignore_optional: "", ANDROID_NDK: "/usr/local/lib/android/sdk/ndk/27.2.12479018", SGX_AESM_ADDR: "1", CHROME_BIN: "/usr/bin/google-chrome", npm_package_scripts_build_n2_ci: "cd ./d9-n2 && yarn build-ci", npm_package_scripts_build_npx: "cd ./create-rainbow-d9-app && yarn build", npm_package_scripts_deploy: "gh-pages -d build", npm_package_scripts_preview: "vite preview", SELENIUM_JAR_PATH: "/usr/share/java/selenium-server.jar", STATS_EXTP: "https://provjobdprod.z13.web.core.windows.net/settings/provjobdsettings-latest/provjobd.data", npm_package_scripts_build_echarts_ci: "cd ./d9-echarts && yarn build-ci", npm_package_scripts_build_n3_ci: "cd ./d9-n3 && yarn build-ci", npm_package_dependencies_web_vitals: "^2.1.4", npm_package_dependencies_typescript: "5.6.3", INIT_CWD: "/home/runner/work/rainbow-d9/rainbow-d9", ANDROID_NDK_HOME: "/usr/local/lib/android/sdk/ndk/27.2.12479018", GITHUB_STEP_SUMMARY: "/home/runner/work/_temp/_runner_file_commands/step_summary_f44125d4-edb9-4d84-a78d-4e66badd812a", npm_package_dependencies_react: "^18.3.1", npm_package_dependencies__types_react_dom: "^18.3.0", NODE_ENV: "production" };
var f$1 = "undefined" != typeof process && void 0 !== define_process_env_default && (define_process_env_default.REACT_APP_SC_ATTR || define_process_env_default.SC_ATTR) || "data-styled", m$1 = "active", y$1 = "data-styled-version", v$1 = "6.1.13", g$1 = "/*!sc*/\n", S$b = "undefined" != typeof window && "HTMLElement" in window, w$1 = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && "" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.SC_DISABLE_SPEEDY && "" !== define_process_env_default.SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.SC_DISABLE_SPEEDY && define_process_env_default.SC_DISABLE_SPEEDY : false), b$1 = {}, _ = Object.freeze([]), C = Object.freeze({});
function I(e2, t2, n2) {
  return void 0 === n2 && (n2 = C), e2.theme !== n2.theme && e2.theme || t2 || n2.theme;
}
var A$1 = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), O = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, D = /(^-|-$)/g;
function R(e2) {
  return e2.replace(O, "-").replace(D, "");
}
var T = /(a)(d)/gi, k$1 = 52, j = function(e2) {
  return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
};
function x$1(e2) {
  var t2, n2 = "";
  for (t2 = Math.abs(e2); t2 > k$1; t2 = t2 / k$1 | 0) n2 = j(t2 % k$1) + n2;
  return (j(t2 % k$1) + n2).replace(T, "$1-$2");
}
var V, F = 5381, M = function(e2, t2) {
  for (var n2 = t2.length; n2; ) e2 = 33 * e2 ^ t2.charCodeAt(--n2);
  return e2;
}, z$1 = function(e2) {
  return M(F, e2);
};
function $(e2) {
  return x$1(z$1(e2) >>> 0);
}
function B(e2) {
  return e2.displayName || e2.name || "Component";
}
function L(e2) {
  return "string" == typeof e2 && true;
}
var G = "function" == typeof Symbol && Symbol.for, Y = G ? Symbol.for("react.memo") : 60115, W = G ? Symbol.for("react.forward_ref") : 60112, q$1 = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true }, H = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true }, U = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, J = ((V = {})[W] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, V[Y] = U, V);
function X(e2) {
  return ("type" in (t2 = e2) && t2.type.$$typeof) === Y ? U : "$$typeof" in e2 ? J[e2.$$typeof] : q$1;
  var t2;
}
var Z = Object.defineProperty, K = Object.getOwnPropertyNames, Q = Object.getOwnPropertySymbols, ee = Object.getOwnPropertyDescriptor, te = Object.getPrototypeOf, ne = Object.prototype;
function oe(e2, t2, n2) {
  if ("string" != typeof t2) {
    if (ne) {
      var o2 = te(t2);
      o2 && o2 !== ne && oe(e2, o2, n2);
    }
    var r2 = K(t2);
    Q && (r2 = r2.concat(Q(t2)));
    for (var s2 = X(e2), i2 = X(t2), a2 = 0; a2 < r2.length; ++a2) {
      var c2 = r2[a2];
      if (!(c2 in H || n2 && n2[c2] || i2 && c2 in i2 || s2 && c2 in s2)) {
        var l2 = ee(t2, c2);
        try {
          Z(e2, c2, l2);
        } catch (e3) {
        }
      }
    }
  }
  return e2;
}
function re(e2) {
  return "function" == typeof e2;
}
function se(e2) {
  return "object" == typeof e2 && "styledComponentId" in e2;
}
function ie(e2, t2) {
  return e2 && t2 ? "".concat(e2, " ").concat(t2) : e2 || t2 || "";
}
function ae(e2, t2) {
  if (0 === e2.length) return "";
  for (var n2 = e2[0], o2 = 1; o2 < e2.length; o2++) n2 += e2[o2];
  return n2;
}
function ce(e2) {
  return null !== e2 && "object" == typeof e2 && e2.constructor.name === Object.name && !("props" in e2 && e2.$$typeof);
}
function le(e2, t2, n2) {
  if (void 0 === n2 && (n2 = false), !n2 && !ce(e2) && !Array.isArray(e2)) return t2;
  if (Array.isArray(t2)) for (var o2 = 0; o2 < t2.length; o2++) e2[o2] = le(e2[o2], t2[o2]);
  else if (ce(t2)) for (var o2 in t2) e2[o2] = le(e2[o2], t2[o2]);
  return e2;
}
function ue(e2, t2) {
  Object.defineProperty(e2, "toString", { value: t2 });
}
function he(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t2, " for more information.").concat(n2.length > 0 ? " Args: ".concat(n2.join(", ")) : ""));
}
var fe = function() {
  function e2(e3) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e3;
  }
  return e2.prototype.indexOfGroup = function(e3) {
    for (var t2 = 0, n2 = 0; n2 < e3; n2++) t2 += this.groupSizes[n2];
    return t2;
  }, e2.prototype.insertRules = function(e3, t2) {
    if (e3 >= this.groupSizes.length) {
      for (var n2 = this.groupSizes, o2 = n2.length, r2 = o2; e3 >= r2; ) if ((r2 <<= 1) < 0) throw he(16, "".concat(e3));
      this.groupSizes = new Uint32Array(r2), this.groupSizes.set(n2), this.length = r2;
      for (var s2 = o2; s2 < r2; s2++) this.groupSizes[s2] = 0;
    }
    for (var i2 = this.indexOfGroup(e3 + 1), a2 = (s2 = 0, t2.length); s2 < a2; s2++) this.tag.insertRule(i2, t2[s2]) && (this.groupSizes[e3]++, i2++);
  }, e2.prototype.clearGroup = function(e3) {
    if (e3 < this.length) {
      var t2 = this.groupSizes[e3], n2 = this.indexOfGroup(e3), o2 = n2 + t2;
      this.groupSizes[e3] = 0;
      for (var r2 = n2; r2 < o2; r2++) this.tag.deleteRule(n2);
    }
  }, e2.prototype.getGroup = function(e3) {
    var t2 = "";
    if (e3 >= this.length || 0 === this.groupSizes[e3]) return t2;
    for (var n2 = this.groupSizes[e3], o2 = this.indexOfGroup(e3), r2 = o2 + n2, s2 = o2; s2 < r2; s2++) t2 += "".concat(this.tag.getRule(s2)).concat(g$1);
    return t2;
  }, e2;
}(), ye = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Map(), ge = 1, Se = function(e2) {
  if (ye.has(e2)) return ye.get(e2);
  for (; ve.has(ge); ) ge++;
  var t2 = ge++;
  return ye.set(e2, t2), ve.set(t2, e2), t2;
}, we = function(e2, t2) {
  ge = t2 + 1, ye.set(e2, t2), ve.set(t2, e2);
}, be = "style[".concat(f$1, "][").concat(y$1, '="').concat(v$1, '"]'), Ee = new RegExp("^".concat(f$1, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Ne = function(e2, t2, n2) {
  for (var o2, r2 = n2.split(","), s2 = 0, i2 = r2.length; s2 < i2; s2++) (o2 = r2[s2]) && e2.registerName(t2, o2);
}, Pe = function(e2, t2) {
  for (var n2, o2 = (null !== (n2 = t2.textContent) && void 0 !== n2 ? n2 : "").split(g$1), r2 = [], s2 = 0, i2 = o2.length; s2 < i2; s2++) {
    var a2 = o2[s2].trim();
    if (a2) {
      var c2 = a2.match(Ee);
      if (c2) {
        var l2 = 0 | parseInt(c2[1], 10), u2 = c2[2];
        0 !== l2 && (we(u2, l2), Ne(e2, u2, c2[3]), e2.getTag().insertRules(l2, r2)), r2.length = 0;
      } else r2.push(a2);
    }
  }
}, _e = function(e2) {
  for (var t2 = document.querySelectorAll(be), n2 = 0, o2 = t2.length; n2 < o2; n2++) {
    var r2 = t2[n2];
    r2 && r2.getAttribute(f$1) !== m$1 && (Pe(e2, r2), r2.parentNode && r2.parentNode.removeChild(r2));
  }
};
function Ce() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
}
var Ie = function(e2) {
  var t2 = document.head, n2 = e2 || t2, o2 = document.createElement("style"), r2 = function(e3) {
    var t3 = Array.from(e3.querySelectorAll("style[".concat(f$1, "]")));
    return t3[t3.length - 1];
  }(n2), s2 = void 0 !== r2 ? r2.nextSibling : null;
  o2.setAttribute(f$1, m$1), o2.setAttribute(y$1, v$1);
  var i2 = Ce();
  return i2 && o2.setAttribute("nonce", i2), n2.insertBefore(o2, s2), o2;
}, Ae = function() {
  function e2(e3) {
    this.element = Ie(e3), this.element.appendChild(document.createTextNode("")), this.sheet = function(e4) {
      if (e4.sheet) return e4.sheet;
      for (var t2 = document.styleSheets, n2 = 0, o2 = t2.length; n2 < o2; n2++) {
        var r2 = t2[n2];
        if (r2.ownerNode === e4) return r2;
      }
      throw he(17);
    }(this.element), this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    try {
      return this.sheet.insertRule(t2, e3), this.length++, true;
    } catch (e4) {
      return false;
    }
  }, e2.prototype.deleteRule = function(e3) {
    this.sheet.deleteRule(e3), this.length--;
  }, e2.prototype.getRule = function(e3) {
    var t2 = this.sheet.cssRules[e3];
    return t2 && t2.cssText ? t2.cssText : "";
  }, e2;
}(), Oe = function() {
  function e2(e3) {
    this.element = Ie(e3), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    if (e3 <= this.length && e3 >= 0) {
      var n2 = document.createTextNode(t2);
      return this.element.insertBefore(n2, this.nodes[e3] || null), this.length++, true;
    }
    return false;
  }, e2.prototype.deleteRule = function(e3) {
    this.element.removeChild(this.nodes[e3]), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.nodes[e3].textContent : "";
  }, e2;
}(), De = function() {
  function e2(e3) {
    this.rules = [], this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    return e3 <= this.length && (this.rules.splice(e3, 0, t2), this.length++, true);
  }, e2.prototype.deleteRule = function(e3) {
    this.rules.splice(e3, 1), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.rules[e3] : "";
  }, e2;
}(), Re = S$b, Te = { isServer: !S$b, useCSSOMInjection: !w$1 }, ke = function() {
  function e2(e3, n2, o2) {
    void 0 === e3 && (e3 = C), void 0 === n2 && (n2 = {});
    var r2 = this;
    this.options = __assign(__assign({}, Te), e3), this.gs = n2, this.names = new Map(o2), this.server = !!e3.isServer, !this.server && S$b && Re && (Re = false, _e(this)), ue(this, function() {
      return function(e4) {
        for (var t2 = e4.getTag(), n3 = t2.length, o3 = "", r3 = function(n4) {
          var r4 = function(e5) {
            return ve.get(e5);
          }(n4);
          if (void 0 === r4) return "continue";
          var s3 = e4.names.get(r4), i2 = t2.getGroup(n4);
          if (void 0 === s3 || !s3.size || 0 === i2.length) return "continue";
          var a2 = "".concat(f$1, ".g").concat(n4, '[id="').concat(r4, '"]'), c2 = "";
          void 0 !== s3 && s3.forEach(function(e5) {
            e5.length > 0 && (c2 += "".concat(e5, ","));
          }), o3 += "".concat(i2).concat(a2, '{content:"').concat(c2, '"}').concat(g$1);
        }, s2 = 0; s2 < n3; s2++) r3(s2);
        return o3;
      }(r2);
    });
  }
  return e2.registerId = function(e3) {
    return Se(e3);
  }, e2.prototype.rehydrate = function() {
    !this.server && S$b && _e(this);
  }, e2.prototype.reconstructWithOptions = function(n2, o2) {
    return void 0 === o2 && (o2 = true), new e2(__assign(__assign({}, this.options), n2), this.gs, o2 && this.names || void 0);
  }, e2.prototype.allocateGSInstance = function(e3) {
    return this.gs[e3] = (this.gs[e3] || 0) + 1;
  }, e2.prototype.getTag = function() {
    return this.tag || (this.tag = (e3 = function(e4) {
      var t2 = e4.useCSSOMInjection, n2 = e4.target;
      return e4.isServer ? new De(n2) : t2 ? new Ae(n2) : new Oe(n2);
    }(this.options), new fe(e3)));
    var e3;
  }, e2.prototype.hasNameForId = function(e3, t2) {
    return this.names.has(e3) && this.names.get(e3).has(t2);
  }, e2.prototype.registerName = function(e3, t2) {
    if (Se(e3), this.names.has(e3)) this.names.get(e3).add(t2);
    else {
      var n2 = /* @__PURE__ */ new Set();
      n2.add(t2), this.names.set(e3, n2);
    }
  }, e2.prototype.insertRules = function(e3, t2, n2) {
    this.registerName(e3, t2), this.getTag().insertRules(Se(e3), n2);
  }, e2.prototype.clearNames = function(e3) {
    this.names.has(e3) && this.names.get(e3).clear();
  }, e2.prototype.clearRules = function(e3) {
    this.getTag().clearGroup(Se(e3)), this.clearNames(e3);
  }, e2.prototype.clearTag = function() {
    this.tag = void 0;
  }, e2;
}(), je = /&/g, xe = /^\s*\/\/.*$/gm;
function Ve(e2, t2) {
  return e2.map(function(e3) {
    return "rule" === e3.type && (e3.value = "".concat(t2, " ").concat(e3.value), e3.value = e3.value.replaceAll(",", ",".concat(t2, " ")), e3.props = e3.props.map(function(e4) {
      return "".concat(t2, " ").concat(e4);
    })), Array.isArray(e3.children) && "@keyframes" !== e3.type && (e3.children = Ve(e3.children, t2)), e3;
  });
}
function Fe(e2) {
  var t2, n2, o2, r2 = void 0 === e2 ? C : e2, s2 = r2.options, i2 = void 0 === s2 ? C : s2, a2 = r2.plugins, c2 = void 0 === a2 ? _ : a2, l2 = function(e3, o3, r3) {
    return r3.startsWith(n2) && r3.endsWith(n2) && r3.replaceAll(n2, "").length > 0 ? ".".concat(t2) : e3;
  }, u2 = c2.slice();
  u2.push(function(e3) {
    e3.type === RULESET && e3.value.includes("&") && (e3.props[0] = e3.props[0].replace(je, n2).replace(o2, l2));
  }), i2.prefix && u2.push(prefixer$1), u2.push(stringify);
  var p2 = function(e3, r3, s3, a3) {
    void 0 === r3 && (r3 = ""), void 0 === s3 && (s3 = ""), void 0 === a3 && (a3 = "&"), t2 = a3, n2 = r3, o2 = new RegExp("\\".concat(n2, "\\b"), "g");
    var c3 = e3.replace(xe, ""), l3 = compile(s3 || r3 ? "".concat(s3, " ").concat(r3, " { ").concat(c3, " }") : c3);
    i2.namespace && (l3 = Ve(l3, i2.namespace));
    var p3 = [];
    return serialize(l3, middleware(u2.concat(rulesheet(function(e4) {
      return p3.push(e4);
    })))), p3;
  };
  return p2.hash = c2.length ? c2.reduce(function(e3, t3) {
    return t3.name || he(15), M(e3, t3.name);
  }, F).toString() : "", p2;
}
var Me = new ke(), ze = Fe(), $e = React.createContext({ shouldForwardProp: void 0, styleSheet: Me, stylis: ze });
$e.Consumer;
var Le = React.createContext(void 0);
function Ge() {
  return reactExports.useContext($e);
}
function Ye(e2) {
  var t2 = reactExports.useState(e2.stylisPlugins), n2 = t2[0], r2 = t2[1], c2 = Ge().styleSheet, l2 = reactExports.useMemo(function() {
    var t3 = c2;
    return e2.sheet ? t3 = e2.sheet : e2.target && (t3 = t3.reconstructWithOptions({ target: e2.target }, false)), e2.disableCSSOMInjection && (t3 = t3.reconstructWithOptions({ useCSSOMInjection: false })), t3;
  }, [e2.disableCSSOMInjection, e2.sheet, e2.target, c2]), u2 = reactExports.useMemo(function() {
    return Fe({ options: { namespace: e2.namespace, prefix: e2.enableVendorPrefixes }, plugins: n2 });
  }, [e2.enableVendorPrefixes, e2.namespace, n2]);
  reactExports.useEffect(function() {
    p$4(n2, e2.stylisPlugins) || r2(e2.stylisPlugins);
  }, [e2.stylisPlugins]);
  var d2 = reactExports.useMemo(function() {
    return { shouldForwardProp: e2.shouldForwardProp, styleSheet: l2, stylis: u2 };
  }, [e2.shouldForwardProp, l2, u2]);
  return React.createElement($e.Provider, { value: d2 }, React.createElement(Le.Provider, { value: u2 }, e2.children));
}
var We = function() {
  function e2(e3, t2) {
    var n2 = this;
    this.inject = function(e4, t3) {
      void 0 === t3 && (t3 = ze);
      var o2 = n2.name + t3.hash;
      e4.hasNameForId(n2.id, o2) || e4.insertRules(n2.id, o2, t3(n2.rules, o2, "@keyframes"));
    }, this.name = e3, this.id = "sc-keyframes-".concat(e3), this.rules = t2, ue(this, function() {
      throw he(12, String(n2.name));
    });
  }
  return e2.prototype.getName = function(e3) {
    return void 0 === e3 && (e3 = ze), this.name + e3.hash;
  }, e2;
}(), qe = function(e2) {
  return e2 >= "A" && e2 <= "Z";
};
function He(e2) {
  for (var t2 = "", n2 = 0; n2 < e2.length; n2++) {
    var o2 = e2[n2];
    if (1 === n2 && "-" === o2 && "-" === e2[0]) return e2;
    qe(o2) ? t2 += "-" + o2.toLowerCase() : t2 += o2;
  }
  return t2.startsWith("ms-") ? "-" + t2 : t2;
}
var Ue = function(e2) {
  return null == e2 || false === e2 || "" === e2;
}, Je = function(t2) {
  var n2, o2, r2 = [];
  for (var s2 in t2) {
    var i2 = t2[s2];
    t2.hasOwnProperty(s2) && !Ue(i2) && (Array.isArray(i2) && i2.isCss || re(i2) ? r2.push("".concat(He(s2), ":"), i2, ";") : ce(i2) ? r2.push.apply(r2, __spreadArray(__spreadArray(["".concat(s2, " {")], Je(i2), false), ["}"], false)) : r2.push("".concat(He(s2), ": ").concat((n2 = s2, null == (o2 = i2) || "boolean" == typeof o2 || "" === o2 ? "" : "number" != typeof o2 || 0 === o2 || n2 in unitlessKeys || n2.startsWith("--") ? String(o2).trim() : "".concat(o2, "px")), ";")));
  }
  return r2;
};
function Xe(e2, t2, n2, o2) {
  if (Ue(e2)) return [];
  if (se(e2)) return [".".concat(e2.styledComponentId)];
  if (re(e2)) {
    if (!re(s2 = e2) || s2.prototype && s2.prototype.isReactComponent || !t2) return [e2];
    var r2 = e2(t2);
    return Xe(r2, t2, n2, o2);
  }
  var s2;
  return e2 instanceof We ? n2 ? (e2.inject(n2, o2), [e2.getName(o2)]) : [e2] : ce(e2) ? Je(e2) : Array.isArray(e2) ? Array.prototype.concat.apply(_, e2.map(function(e3) {
    return Xe(e3, t2, n2, o2);
  })) : [e2.toString()];
}
function Ze(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (re(n2) && !se(n2)) return false;
  }
  return true;
}
var Ke = z$1(v$1), Qe = function() {
  function e2(e3, t2, n2) {
    this.rules = e3, this.staticRulesId = "", this.isStatic = (void 0 === n2 || n2.isStatic) && Ze(e3), this.componentId = t2, this.baseHash = M(Ke, t2), this.baseStyle = n2, ke.registerId(t2);
  }
  return e2.prototype.generateAndInjectStyles = function(e3, t2, n2) {
    var o2 = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e3, t2, n2) : "";
    if (this.isStatic && !n2.hash) if (this.staticRulesId && t2.hasNameForId(this.componentId, this.staticRulesId)) o2 = ie(o2, this.staticRulesId);
    else {
      var r2 = ae(Xe(this.rules, e3, t2, n2)), s2 = x$1(M(this.baseHash, r2) >>> 0);
      if (!t2.hasNameForId(this.componentId, s2)) {
        var i2 = n2(r2, ".".concat(s2), void 0, this.componentId);
        t2.insertRules(this.componentId, s2, i2);
      }
      o2 = ie(o2, s2), this.staticRulesId = s2;
    }
    else {
      for (var a2 = M(this.baseHash, n2.hash), c2 = "", l2 = 0; l2 < this.rules.length; l2++) {
        var u2 = this.rules[l2];
        if ("string" == typeof u2) c2 += u2;
        else if (u2) {
          var p2 = ae(Xe(u2, e3, t2, n2));
          a2 = M(a2, p2 + l2), c2 += p2;
        }
      }
      if (c2) {
        var d2 = x$1(a2 >>> 0);
        t2.hasNameForId(this.componentId, d2) || t2.insertRules(this.componentId, d2, n2(c2, ".".concat(d2), void 0, this.componentId)), o2 = ie(o2, d2);
      }
    }
    return o2;
  }, e2;
}(), et = React.createContext(void 0);
et.Consumer;
var rt = {};
function it(e2, r2, s2) {
  var i2 = se(e2), a2 = e2, c2 = !L(e2), p2 = r2.attrs, d2 = void 0 === p2 ? _ : p2, h2 = r2.componentId, f2 = void 0 === h2 ? function(e3, t2) {
    var n2 = "string" != typeof e3 ? "sc" : R(e3);
    rt[n2] = (rt[n2] || 0) + 1;
    var o2 = "".concat(n2, "-").concat($(v$1 + n2 + rt[n2]));
    return t2 ? "".concat(t2, "-").concat(o2) : o2;
  }(r2.displayName, r2.parentComponentId) : h2, m2 = r2.displayName, y2 = void 0 === m2 ? function(e3) {
    return L(e3) ? "styled.".concat(e3) : "Styled(".concat(B(e3), ")");
  }(e2) : m2, g2 = r2.displayName && r2.componentId ? "".concat(R(r2.displayName), "-").concat(r2.componentId) : r2.componentId || f2, S2 = i2 && a2.attrs ? a2.attrs.concat(d2).filter(Boolean) : d2, w2 = r2.shouldForwardProp;
  if (i2 && a2.shouldForwardProp) {
    var b2 = a2.shouldForwardProp;
    if (r2.shouldForwardProp) {
      var E2 = r2.shouldForwardProp;
      w2 = function(e3, t2) {
        return b2(e3, t2) && E2(e3, t2);
      };
    } else w2 = b2;
  }
  var N2 = new Qe(s2, g2, i2 ? a2.componentStyle : void 0);
  function O2(e3, r3) {
    return function(e4, r4, s3) {
      var i3 = e4.attrs, a3 = e4.componentStyle, c3 = e4.defaultProps, p3 = e4.foldedComponentIds, d3 = e4.styledComponentId, h3 = e4.target, f3 = React.useContext(et), m3 = Ge(), y3 = e4.shouldForwardProp || m3.shouldForwardProp;
      var v2 = I(r4, f3, c3) || C, g3 = function(e5, n2, o2) {
        for (var r5, s4 = __assign(__assign({}, n2), { className: void 0, theme: o2 }), i4 = 0; i4 < e5.length; i4 += 1) {
          var a4 = re(r5 = e5[i4]) ? r5(s4) : r5;
          for (var c4 in a4) s4[c4] = "className" === c4 ? ie(s4[c4], a4[c4]) : "style" === c4 ? __assign(__assign({}, s4[c4]), a4[c4]) : a4[c4];
        }
        return n2.className && (s4.className = ie(s4.className, n2.className)), s4;
      }(i3, r4, v2), S3 = g3.as || h3, w3 = {};
      for (var b3 in g3) void 0 === g3[b3] || "$" === b3[0] || "as" === b3 || "theme" === b3 && g3.theme === v2 || ("forwardedAs" === b3 ? w3.as = g3.forwardedAs : y3 && !y3(b3, S3) || (w3[b3] = g3[b3], y3 || true));
      var E3 = function(e5, t2) {
        var n2 = Ge(), o2 = e5.generateAndInjectStyles(t2, n2.styleSheet, n2.stylis);
        return o2;
      }(a3, g3);
      var N3 = ie(p3, d3);
      return E3 && (N3 += " " + E3), g3.className && (N3 += " " + g3.className), w3[L(S3) && !A$1.has(S3) ? "class" : "className"] = N3, w3.ref = s3, reactExports.createElement(S3, w3);
    }(D2, e3, r3);
  }
  O2.displayName = y2;
  var D2 = React.forwardRef(O2);
  return D2.attrs = S2, D2.componentStyle = N2, D2.displayName = y2, D2.shouldForwardProp = w2, D2.foldedComponentIds = i2 ? ie(a2.foldedComponentIds, a2.styledComponentId) : "", D2.styledComponentId = g2, D2.target = i2 ? a2.target : e2, Object.defineProperty(D2, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(e3) {
    this._foldedDefaultProps = i2 ? function(e4) {
      for (var t2 = [], n2 = 1; n2 < arguments.length; n2++) t2[n2 - 1] = arguments[n2];
      for (var o2 = 0, r3 = t2; o2 < r3.length; o2++) le(e4, r3[o2], true);
      return e4;
    }({}, a2.defaultProps, e3) : e3;
  } }), ue(D2, function() {
    return ".".concat(D2.styledComponentId);
  }), c2 && oe(D2, e2, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), D2;
}
function at(e2, t2) {
  for (var n2 = [e2[0]], o2 = 0, r2 = t2.length; o2 < r2; o2 += 1) n2.push(t2[o2], e2[o2 + 1]);
  return n2;
}
var ct = function(e2) {
  return Object.assign(e2, { isCss: true });
};
function lt(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  if (re(t2) || ce(t2)) return ct(Xe(at(_, __spreadArray([t2], n2, true))));
  var r2 = t2;
  return 0 === n2.length && 1 === r2.length && "string" == typeof r2[0] ? Xe(r2) : ct(Xe(at(r2, n2)));
}
function ut(n2, o2, r2) {
  if (void 0 === r2 && (r2 = C), !o2) throw he(1, o2);
  var s2 = function(t2) {
    for (var s3 = [], i2 = 1; i2 < arguments.length; i2++) s3[i2 - 1] = arguments[i2];
    return n2(o2, r2, lt.apply(void 0, __spreadArray([t2], s3, false)));
  };
  return s2.attrs = function(e2) {
    return ut(n2, o2, __assign(__assign({}, r2), { attrs: Array.prototype.concat(r2.attrs, e2).filter(Boolean) }));
  }, s2.withConfig = function(e2) {
    return ut(n2, o2, __assign(__assign({}, r2), e2));
  }, s2;
}
var pt = function(e2) {
  return ut(it, e2);
}, dt = pt;
A$1.forEach(function(e2) {
  dt[e2] = pt(e2);
});
var ht = function() {
  function e2(e3, t2) {
    this.rules = e3, this.componentId = t2, this.isStatic = Ze(e3), ke.registerId(this.componentId + 1);
  }
  return e2.prototype.createStyles = function(e3, t2, n2, o2) {
    var r2 = o2(ae(Xe(this.rules, t2, n2, o2)), ""), s2 = this.componentId + e3;
    n2.insertRules(s2, s2, r2);
  }, e2.prototype.removeStyles = function(e3, t2) {
    t2.clearRules(this.componentId + e3);
  }, e2.prototype.renderStyles = function(e3, t2, n2, o2) {
    e3 > 2 && ke.registerId(this.componentId + e3), this.removeStyles(e3, n2), this.createStyles(e3, t2, n2, o2);
  }, e2;
}();
function ft(n2) {
  for (var r2 = [], s2 = 1; s2 < arguments.length; s2++) r2[s2 - 1] = arguments[s2];
  var i2 = lt.apply(void 0, __spreadArray([n2], r2, false)), a2 = "sc-global-".concat($(JSON.stringify(i2))), c2 = new ht(i2, a2);
  var l2 = function(e2) {
    var t2 = Ge(), n3 = React.useContext(et), r3 = React.useRef(t2.styleSheet.allocateGSInstance(a2)).current;
    return t2.styleSheet.server && u2(r3, e2, t2.styleSheet, n3, t2.stylis), React.useLayoutEffect(function() {
      if (!t2.styleSheet.server) return u2(r3, e2, t2.styleSheet, n3, t2.stylis), function() {
        return c2.removeStyles(r3, t2.styleSheet);
      };
    }, [r3, e2, t2.styleSheet, n3, t2.stylis]), null;
  };
  function u2(e2, n3, o2, r3, s3) {
    if (c2.isStatic) c2.renderStyles(e2, b$1, o2, s3);
    else {
      var i3 = __assign(__assign({}, n3), { theme: I(n3, r3, l2.defaultProps) });
      c2.renderStyles(e2, i3, o2, s3);
    }
  }
  return React.memo(l2);
}
function mt(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  var r2 = ae(lt.apply(void 0, __spreadArray([t2], n2, false))), s2 = $(r2);
  return new We(s2, r2);
}
const MASK_PROPS = {
  // common
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.string, PropTypes.instanceOf(RegExp), PropTypes.oneOf([Date, Number, IMask.Masked]), PropTypes.instanceOf(IMask.Masked)]),
  value: PropTypes.any,
  unmask: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["typed"])]),
  prepare: PropTypes.func,
  prepareChar: PropTypes.func,
  validate: PropTypes.func,
  commit: PropTypes.func,
  overwrite: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["shift"])]),
  eager: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["append", "remove"])]),
  skipInvalid: PropTypes.bool,
  // events
  onAccept: PropTypes.func,
  onComplete: PropTypes.func,
  // pattern
  placeholderChar: PropTypes.string,
  displayChar: PropTypes.string,
  lazy: PropTypes.bool,
  definitions: PropTypes.object,
  blocks: PropTypes.object,
  // enum
  enum: PropTypes.arrayOf(PropTypes.string),
  // range
  maxLength: PropTypes.number,
  from: PropTypes.number,
  to: PropTypes.number,
  // date
  pattern: PropTypes.string,
  format: PropTypes.func,
  parse: PropTypes.func,
  autofix: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["pad"])]),
  // number
  radix: PropTypes.string,
  thousandsSeparator: PropTypes.string,
  mapToRadix: PropTypes.arrayOf(PropTypes.string),
  scale: PropTypes.number,
  normalizeZeros: PropTypes.bool,
  padFractionalZeros: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
  // dynamic
  dispatch: PropTypes.func,
  // ref
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.object
  })])
};
const MASK_PROPS_NAMES = Object.keys(MASK_PROPS).filter((p2) => p2 !== "value");
const NON_MASK_OPTIONS_NAMES = ["value", "unmask", "onAccept", "onComplete", "inputRef"];
const MASK_OPTIONS_NAMES = MASK_PROPS_NAMES.filter((pName) => NON_MASK_OPTIONS_NAMES.indexOf(pName) < 0);
function IMaskMixin(ComposedComponent) {
  var _Class;
  const MaskedComponent = (_Class = class MaskedComponent extends React.Component {
    constructor(props) {
      super(props);
      this._inputRef = this._inputRef.bind(this);
    }
    componentDidMount() {
      if (!this.props.mask) return;
      this.initMask();
    }
    componentDidUpdate() {
      const props = this.props;
      const maskOptions = this._extractMaskOptionsFromProps(props);
      if (maskOptions.mask) {
        if (this.maskRef) {
          this.maskRef.updateOptions(maskOptions);
          if ("value" in props && props.value !== void 0) this.maskValue = props.value;
        } else {
          this.initMask(maskOptions);
        }
      } else {
        this.destroyMask();
        if ("value" in props && props.value !== void 0) {
          var _this$element;
          if ((_this$element = this.element) != null && _this$element.isContentEditable && this.element.tagName !== "INPUT" && this.element.tagName !== "TEXTAREA") this.element.textContent = props.value;
          else this.element.value = props.value;
        }
      }
    }
    componentWillUnmount() {
      this.destroyMask();
    }
    _inputRef(el2) {
      this.element = el2;
      if (this.props.inputRef) {
        if (Object.prototype.hasOwnProperty.call(this.props.inputRef, "current")) this.props.inputRef.current = el2;
        else this.props.inputRef(el2);
      }
    }
    initMask(maskOptions) {
      if (maskOptions === void 0) {
        maskOptions = this._extractMaskOptionsFromProps(this.props);
      }
      this.maskRef = IMask(this.element, maskOptions).on("accept", this._onAccept.bind(this)).on("complete", this._onComplete.bind(this));
      if ("value" in this.props && this.props.value !== void 0) this.maskValue = this.props.value;
    }
    destroyMask() {
      if (this.maskRef) {
        this.maskRef.destroy();
        delete this.maskRef;
      }
    }
    _extractMaskOptionsFromProps(props) {
      const {
        ...cloneProps
      } = props;
      Object.keys(cloneProps).filter((prop) => MASK_OPTIONS_NAMES.indexOf(prop) < 0).forEach((nonMaskProp) => {
        delete cloneProps[nonMaskProp];
      });
      return cloneProps;
    }
    _extractNonMaskProps(props) {
      const {
        ...cloneProps
      } = props;
      MASK_PROPS_NAMES.forEach((maskProp) => {
        if (maskProp !== "maxLength") delete cloneProps[maskProp];
      });
      if (!("defaultValue" in cloneProps)) cloneProps.defaultValue = props.mask ? "" : cloneProps.value;
      delete cloneProps.value;
      return cloneProps;
    }
    get maskValue() {
      if (!this.maskRef) return "";
      if (this.props.unmask === "typed") return this.maskRef.typedValue;
      if (this.props.unmask) return this.maskRef.unmaskedValue;
      return this.maskRef.value;
    }
    set maskValue(value) {
      if (!this.maskRef) return;
      value = value == null && this.props.unmask !== "typed" ? "" : value;
      if (this.props.unmask === "typed") this.maskRef.typedValue = value;
      else if (this.props.unmask) this.maskRef.unmaskedValue = value;
      else this.maskRef.value = value;
    }
    _onAccept(e2) {
      if (this.props.onAccept && this.maskRef) this.props.onAccept(this.maskValue, this.maskRef, e2);
    }
    _onComplete(e2) {
      if (this.props.onComplete && this.maskRef) this.props.onComplete(this.maskValue, this.maskRef, e2);
    }
    render() {
      return React.createElement(ComposedComponent, {
        ...this._extractNonMaskProps(this.props),
        inputRef: this._inputRef
      });
    }
  }, _Class.displayName = void 0, _Class.propTypes = void 0, _Class);
  const nestedComponentName = ComposedComponent.displayName || ComposedComponent.name || "Component";
  MaskedComponent.displayName = "IMask(" + nestedComponentName + ")";
  MaskedComponent.propTypes = MASK_PROPS;
  return React.forwardRef((props, ref) => React.createElement(MaskedComponent, {
    ...props,
    ref
  }));
}
const IMaskInputClass = IMaskMixin((_ref) => {
  let {
    inputRef,
    ...props
  } = _ref;
  return React.createElement("input", {
    ...props,
    ref: inputRef
  });
});
const IMaskInputFn = (props, ref) => React.createElement(IMaskInputClass, {
  ...props,
  ref
});
React.forwardRef(IMaskInputFn);
function useIMask(opts, _temp) {
  let {
    onAccept,
    onComplete
  } = _temp === void 0 ? {} : _temp;
  const ref = reactExports.useRef(null);
  const maskRef = reactExports.useRef(null);
  const [initialized, setInitialized] = reactExports.useState(false);
  const [lastAcceptState, setLastAcceptState] = reactExports.useState({});
  const [value, setValue] = reactExports.useState("");
  const [unmaskedValue, setUnmaskedValue] = reactExports.useState("");
  const [typedValue, setTypedValue] = reactExports.useState();
  const _destroyMask = reactExports.useCallback(() => {
    var _maskRef$current;
    if (!initialized) return;
    (_maskRef$current = maskRef.current) == null || _maskRef$current.destroy();
    maskRef.current = null;
  }, []);
  const _onAccept = reactExports.useCallback((event2) => {
    const m2 = maskRef.current;
    if (!m2) return;
    setLastAcceptState({
      value: m2.value,
      unmaskedValue: m2.unmaskedValue,
      typedValue: m2.typedValue
    });
    setTypedValue(m2.typedValue);
    setUnmaskedValue(m2.unmaskedValue);
    setValue(m2.value);
    onAccept == null || onAccept(m2.value, m2, event2);
  }, [onAccept]);
  const _onComplete = reactExports.useCallback((event2) => maskRef.current && (onComplete == null ? void 0 : onComplete(maskRef.current.value, maskRef.current, event2)), [onComplete]);
  reactExports.useEffect(() => {
    const el2 = ref.current;
    if (!el2 || !(opts != null && opts.mask)) return _destroyMask();
    const mask = maskRef.current;
    if (!mask) {
      if (el2 && opts != null && opts.mask) {
        maskRef.current = IMask(el2, opts);
        _onAccept();
      }
    } else {
      mask == null || mask.updateOptions(opts);
    }
    setInitialized(Boolean(maskRef.current));
  }, [opts, _destroyMask, _onAccept]);
  reactExports.useEffect(() => {
    if (!maskRef.current) return;
    const mask = maskRef.current;
    mask.on("accept", _onAccept);
    mask.on("complete", _onComplete);
    return () => {
      mask.off("accept", _onAccept);
      mask.off("complete", _onComplete);
    };
  }, [_onAccept, _onComplete]);
  reactExports.useEffect(() => {
    const {
      value: lastAcceptValue,
      ...state
    } = lastAcceptState;
    const mask = maskRef.current;
    if (mask && initialized) {
      if (lastAcceptValue !== value) mask.value = value;
      setLastAcceptState(state);
    }
  }, [value]);
  reactExports.useEffect(() => {
    const {
      unmaskedValue: lastAcceptUnmaskedValue,
      ...state
    } = lastAcceptState;
    const mask = maskRef.current;
    if (mask && initialized) {
      if (lastAcceptUnmaskedValue !== unmaskedValue) mask.unmaskedValue = unmaskedValue;
      setLastAcceptState(state);
    }
  }, [unmaskedValue]);
  reactExports.useEffect(() => {
    const {
      typedValue: lastAcceptTypedValue,
      ...state
    } = lastAcceptState;
    const mask = maskRef.current;
    if (mask && initialized) {
      if (lastAcceptTypedValue !== typedValue) mask.typedValue = typedValue;
      setLastAcceptState(state);
    }
  }, [typedValue]);
  reactExports.useEffect(() => _destroyMask, [_destroyMask]);
  return {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue
  };
}
const hastToReact = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
};
class Toolkit {
  /**
   * Generats a unique ID (thanks Stack overflow :3)
   * @returns {String}
   */
  static UID() {
    if (Toolkit.TESTING) {
      Toolkit.TESTING_UID++;
      return `${Toolkit.TESTING_UID}`;
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c2) => {
      const r2 = Math.random() * 16 | 0;
      const v2 = c2 === "x" ? r2 : r2 & 3 | 8;
      return v2.toString(16);
    });
  }
  static closest(element, selector) {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function(s) {
        var el2 = this;
        do {
          if (Element.prototype.matches.call(el2, s))
            return el2;
          el2 = el2.parentElement || el2.parentNode;
        } while (el2 !== null && el2.nodeType === 1);
        return null;
      };
    }
    return element.closest(selector);
  }
}
Toolkit.TESTING = false;
Toolkit.TESTING_UID = 0;
class BaseObserver {
  constructor() {
    this.listeners = {};
  }
  fireEventInternal(fire, k2, event2) {
    this.iterateListeners((listener) => {
      if (!fire && !event2.firing) {
        return false;
      }
      if (listener[k2]) {
        listener[k2](event2);
      }
    });
  }
  fireEvent(event2, k2) {
    event2 = Object.assign({ firing: true, stopPropagation: () => {
      event2.firing = false;
    } }, event2);
    this.fireEventInternal(true, "eventWillFire", Object.assign(Object.assign({}, event2), { function: k2 }));
    this.fireEventInternal(false, k2, event2);
    this.fireEventInternal(true, "eventDidFire", Object.assign(Object.assign({}, event2), { function: k2 }));
  }
  iterateListeners(cb2) {
    for (let id2 in this.listeners) {
      const res = cb2(this.listeners[id2]);
      if (res === false) {
        return;
      }
    }
  }
  getListenerHandle(listener) {
    for (let id2 in this.listeners) {
      if (this.listeners[id2] === listener) {
        return {
          id: id2,
          listener,
          deregister: () => {
            delete this.listeners[id2];
          }
        };
      }
    }
  }
  registerListener(listener) {
    const id2 = Toolkit.UID();
    this.listeners[id2] = listener;
    return {
      id: id2,
      listener,
      deregister: () => {
        delete this.listeners[id2];
      }
    };
  }
  deregisterListener(listener) {
    if (typeof listener === "object") {
      listener.deregister();
      return true;
    }
    const handle = this.getListenerHandle(listener);
    if (handle) {
      handle.deregister();
      return true;
    }
    return false;
  }
}
class FactoryBank extends BaseObserver {
  constructor() {
    super();
    this.factories = {};
  }
  getFactories() {
    return _values(this.factories);
  }
  clearFactories() {
    for (let factory in this.factories) {
      this.deregisterFactory(factory);
    }
  }
  getFactory(type) {
    if (!this.factories[type]) {
      throw new Error(`Cannot find factory with type [${type}]`);
    }
    return this.factories[type];
  }
  registerFactory(factory) {
    factory.setFactoryBank(this);
    this.factories[factory.getType()] = factory;
    this.fireEvent({ factory }, "factoryAdded");
  }
  deregisterFactory(type) {
    const factory = this.factories[type];
    factory.setFactoryBank(null);
    delete this.factories[type];
    this.fireEvent({ factory }, "factoryRemoved");
  }
}
var InputType;
(function(InputType2) {
  InputType2["MOUSE_DOWN"] = "mouse-down";
  InputType2["MOUSE_UP"] = "mouse-up";
  InputType2["MOUSE_MOVE"] = "mouse-move";
  InputType2["MOUSE_WHEEL"] = "mouse-wheel";
  InputType2["KEY_DOWN"] = "key-down";
  InputType2["KEY_UP"] = "key-up";
  InputType2["TOUCH_START"] = "touch-start";
  InputType2["TOUCH_END"] = "touch-end";
  InputType2["TOUCH_MOVE"] = "touch-move";
})(InputType || (InputType = {}));
class Action {
  constructor(options) {
    this.options = options;
    this.id = Toolkit.UID();
  }
  setEngine(engine) {
    this.engine = engine;
  }
}
class ActionEventBus {
  constructor(engine) {
    this.actions = {};
    this.engine = engine;
    this.keys = {};
  }
  getKeys() {
    return _keys(this.keys);
  }
  registerAction(action) {
    action.setEngine(this.engine);
    this.actions[action.id] = action;
    return () => {
      this.deregisterAction(action);
    };
  }
  deregisterAction(action) {
    action.setEngine(null);
    delete this.actions[action.id];
  }
  getActionsForType(type) {
    return _filter(this.actions, (action) => {
      return action.options.type === type;
    });
  }
  getModelForEvent(actionEvent) {
    if (actionEvent.model) {
      return actionEvent.model;
    }
    return this.engine.getMouseElement(actionEvent.event);
  }
  getActionsForEvent(actionEvent) {
    const { event: event2 } = actionEvent;
    if (event2.type === "mousedown") {
      return this.getActionsForType(InputType.MOUSE_DOWN);
    } else if (event2.type === "mouseup") {
      return this.getActionsForType(InputType.MOUSE_UP);
    } else if (event2.type === "keydown") {
      this.keys[event2.key.toLowerCase()] = true;
      return this.getActionsForType(InputType.KEY_DOWN);
    } else if (event2.type === "keyup") {
      delete this.keys[event2.key.toLowerCase()];
      return this.getActionsForType(InputType.KEY_UP);
    } else if (event2.type === "mousemove") {
      return this.getActionsForType(InputType.MOUSE_MOVE);
    } else if (event2.type === "wheel") {
      return this.getActionsForType(InputType.MOUSE_WHEEL);
    } else if (event2.type === "touchstart") {
      return this.getActionsForType(InputType.TOUCH_START);
    } else if (event2.type === "touchend") {
      return this.getActionsForType(InputType.TOUCH_END);
    } else if (event2.type === "touchmove") {
      return this.getActionsForType(InputType.TOUCH_MOVE);
    }
    return [];
  }
  fireAction(actionEvent) {
    const actions = this.getActionsForEvent(actionEvent);
    for (let action of actions) {
      action.options.fire(actionEvent);
    }
  }
}
class PanAndZoomCanvasAction extends Action {
  constructor(options = {}) {
    super({
      type: InputType.MOUSE_WHEEL,
      fire: (actionEvent) => {
        const { event: event2 } = actionEvent;
        for (let layer of this.engine.getModel().getLayers()) {
          layer.allowRepaint(false);
        }
        const model = this.engine.getModel();
        event2.stopPropagation();
        if (event2.ctrlKey) {
          const oldZoomFactor = this.engine.getModel().getZoomLevel() / 100;
          let scrollDelta = options.inverseZoom ? event2.deltaY : -event2.deltaY;
          scrollDelta /= 3;
          if (model.getZoomLevel() + scrollDelta > 10) {
            model.setZoomLevel(model.getZoomLevel() + scrollDelta);
          }
          const zoomFactor = model.getZoomLevel() / 100;
          const boundingRect = event2.currentTarget.getBoundingClientRect();
          const clientWidth = boundingRect.width;
          const clientHeight = boundingRect.height;
          const widthDiff = clientWidth * zoomFactor - clientWidth * oldZoomFactor;
          const heightDiff = clientHeight * zoomFactor - clientHeight * oldZoomFactor;
          const clientX = event2.clientX - boundingRect.left;
          const clientY = event2.clientY - boundingRect.top;
          const xFactor = (clientX - model.getOffsetX()) / oldZoomFactor / clientWidth;
          const yFactor = (clientY - model.getOffsetY()) / oldZoomFactor / clientHeight;
          model.setOffset(model.getOffsetX() - widthDiff * xFactor, model.getOffsetY() - heightDiff * yFactor);
        } else {
          let yDelta = options.inverseZoom ? -event2.deltaY : event2.deltaY;
          let xDelta = options.inverseZoom ? -event2.deltaX : event2.deltaX;
          model.setOffset(model.getOffsetX() - xDelta, model.getOffsetY() - yDelta);
        }
        this.engine.repaintCanvas();
        for (let layer of this.engine.getModel().getLayers()) {
          layer.allowRepaint(true);
        }
      }
    });
  }
}
class ZoomCanvasAction extends Action {
  constructor(options = {}) {
    super({
      type: InputType.MOUSE_WHEEL,
      fire: (actionEvent) => {
        const { event: event2 } = actionEvent;
        for (let layer of this.engine.getModel().getLayers()) {
          layer.allowRepaint(false);
        }
        const model = this.engine.getModel();
        event2.stopPropagation();
        const oldZoomFactor = this.engine.getModel().getZoomLevel() / 100;
        let scrollDelta = options.inverseZoom ? -event2.deltaY : event2.deltaY;
        if (event2.ctrlKey && scrollDelta % 1 !== 0) {
          scrollDelta /= 3;
        } else {
          scrollDelta /= 60;
        }
        if (model.getZoomLevel() + scrollDelta > 10) {
          model.setZoomLevel(model.getZoomLevel() + scrollDelta);
        }
        const zoomFactor = model.getZoomLevel() / 100;
        const boundingRect = event2.currentTarget.getBoundingClientRect();
        const clientWidth = boundingRect.width;
        const clientHeight = boundingRect.height;
        const widthDiff = clientWidth * zoomFactor - clientWidth * oldZoomFactor;
        const heightDiff = clientHeight * zoomFactor - clientHeight * oldZoomFactor;
        const clientX = event2.clientX - boundingRect.left;
        const clientY = event2.clientY - boundingRect.top;
        const xFactor = (clientX - model.getOffsetX()) / oldZoomFactor / clientWidth;
        const yFactor = (clientY - model.getOffsetY()) / oldZoomFactor / clientHeight;
        model.setOffset(model.getOffsetX() - widthDiff * xFactor, model.getOffsetY() - heightDiff * yFactor);
        this.engine.repaintCanvas();
        for (let layer of this.engine.getModel().getLayers()) {
          layer.allowRepaint(true);
        }
      }
    });
  }
}
class DeleteItemsAction extends Action {
  constructor(options = {}) {
    const keyCodes = options.keyCodes || [46, 8];
    const modifiers = Object.assign({ ctrlKey: false, shiftKey: false, altKey: false, metaKey: false }, options.modifiers);
    super({
      type: InputType.KEY_DOWN,
      fire: (event2) => {
        const { keyCode, ctrlKey, shiftKey, altKey, metaKey } = event2.event;
        if (keyCodes.indexOf(keyCode) !== -1 && _isEqual({ ctrlKey, shiftKey, altKey, metaKey }, modifiers)) {
          _forEach(this.engine.getModel().getSelectedEntities(), (model) => {
            if (!model.isLocked()) {
              model.remove();
            }
          });
          this.engine.repaintCanvas();
        }
      }
    });
  }
}
class StateMachine extends BaseObserver {
  constructor(engine) {
    super();
    this.engine = engine;
    this.stateStack = [];
  }
  getCurrentState() {
    return this.currentState;
  }
  pushState(state) {
    this.stateStack.push(state);
    this.setState(state);
  }
  popState() {
    this.stateStack.pop();
    this.setState(_last(this.stateStack));
  }
  setState(state) {
    state.setEngine(this.engine);
    if (this.currentState) {
      this.currentState.deactivated(state);
    }
    const old = this.currentState;
    this.currentState = state;
    if (this.currentState) {
      this.currentState.activated(old);
      this.fireEvent({
        newState: state
      }, "stateChanged");
    }
  }
}
class CanvasEngine extends BaseObserver {
  constructor(options = {}) {
    super();
    this.model = null;
    this.eventBus = new ActionEventBus(this);
    this.stateMachine = new StateMachine(this);
    this.layerFactories = new FactoryBank();
    this.registerFactoryBank(this.layerFactories);
    this.options = Object.assign({ registerDefaultDeleteItemsAction: true, registerDefaultZoomCanvasAction: true, repaintDebounceMs: 0 }, options);
    if (this.options.registerDefaultZoomCanvasAction === true) {
      this.eventBus.registerAction(new ZoomCanvasAction());
    } else if (this.options.registerDefaultPanAndZoomCanvasAction === true) {
      this.eventBus.registerAction(new PanAndZoomCanvasAction());
    }
    if (this.options.registerDefaultDeleteItemsAction === true) {
      this.eventBus.registerAction(new DeleteItemsAction());
    }
  }
  getStateMachine() {
    return this.stateMachine;
  }
  getRelativeMousePoint(event2) {
    const point = this.getRelativePoint(event2.clientX, event2.clientY);
    return new Point((point.x - this.model.getOffsetX()) / (this.model.getZoomLevel() / 100), (point.y - this.model.getOffsetY()) / (this.model.getZoomLevel() / 100));
  }
  getRelativePoint(x2, y2) {
    const canvasRect = this.canvas.getBoundingClientRect();
    return new Point(x2 - canvasRect.left, y2 - canvasRect.top);
  }
  registerFactoryBank(factory) {
    factory.registerListener({
      factoryAdded: (event2) => {
        event2.factory.setDiagramEngine(this);
      },
      factoryRemoved: (event2) => {
        event2.factory.setDiagramEngine(null);
      }
    });
  }
  getActionEventBus() {
    return this.eventBus;
  }
  getLayerFactories() {
    return this.layerFactories;
  }
  getFactoryForLayer(layer) {
    if (typeof layer === "string") {
      return this.layerFactories.getFactory(layer);
    }
    return this.layerFactories.getFactory(layer.getType());
  }
  setModel(model) {
    this.model = model;
    if (this.canvas) {
      requestAnimationFrame(() => {
        this.repaintCanvas();
      });
    }
  }
  getModel() {
    return this.model;
  }
  repaintCanvas(promise) {
    const { repaintDebounceMs } = this.options;
    const repaint = () => {
      this.iterateListeners((listener) => {
        if (listener.repaintCanvas) {
          listener.repaintCanvas();
        }
      });
    };
    let repaintFn = repaint;
    if (repaintDebounceMs > 0) {
      repaintFn = _debounce(repaint, repaintDebounceMs);
    }
    if (promise) {
      return new Promise((resolve) => {
        const l2 = this.registerListener({
          rendered: () => {
            resolve();
            l2.deregister();
          }
        });
        repaintFn();
      });
    }
    repaintFn();
  }
  setCanvas(canvas) {
    if (this.canvas !== canvas) {
      this.canvas = canvas;
      if (canvas) {
        this.fireEvent({}, "canvasReady");
      }
    }
  }
  getCanvas() {
    return this.canvas;
  }
  getMouseElement(event2) {
    return null;
  }
  zoomToFit() {
    const xFactor = this.canvas.clientWidth / this.canvas.scrollWidth;
    const yFactor = this.canvas.clientHeight / this.canvas.scrollHeight;
    const zoomFactor = xFactor < yFactor ? xFactor : yFactor;
    this.model.setZoomLevel(this.model.getZoomLevel() * zoomFactor);
    this.model.setOffset(0, 0);
    this.repaintCanvas();
  }
}
class BaseEntity extends BaseObserver {
  constructor(options = {}) {
    super();
    this.options = Object.assign({ id: Toolkit.UID() }, options);
  }
  getOptions() {
    return this.options;
  }
  getID() {
    return this.options.id;
  }
  doClone(lookupTable = {}, clone) {
  }
  clone(lookupTable = {}) {
    if (lookupTable[this.options.id]) {
      return lookupTable[this.options.id];
    }
    let clone = _cloneDeep(this);
    clone.options = Object.assign(Object.assign({}, this.options), { id: Toolkit.UID() });
    clone.clearListeners();
    lookupTable[this.options.id] = clone;
    this.doClone(lookupTable, clone);
    return clone;
  }
  clearListeners() {
    this.listeners = {};
  }
  deserialize(event2) {
    this.options.id = event2.data.id;
    this.options.locked = event2.data.locked;
  }
  serialize() {
    return {
      id: this.options.id,
      locked: this.options.locked
    };
  }
  fireEvent(event2, k2) {
    super.fireEvent(Object.assign({ entity: this }, event2), k2);
  }
  isLocked() {
    return this.options.locked;
  }
  setLocked(locked = true) {
    this.options.locked = locked;
    this.fireEvent({
      locked
    }, "lockChanged");
  }
}
class CanvasModel extends BaseEntity {
  constructor(options = {}) {
    super(Object.assign({ zoom: 100, gridSize: 0, offsetX: 0, offsetY: 0 }, options));
    this.layers = [];
  }
  getSelectionEntities() {
    return _flatMap(this.layers, (layer) => {
      return layer.getSelectionEntities();
    });
  }
  getSelectedEntities() {
    return _filter(this.getSelectionEntities(), (ob2) => {
      return ob2.isSelected();
    });
  }
  clearSelection() {
    _forEach(this.getSelectedEntities(), (element) => {
      element.setSelected(false);
    });
  }
  getModels() {
    return _flatMap(this.layers, (layer) => {
      return _values(layer.getModels());
    });
  }
  addLayer(layer) {
    layer.setParent(this);
    layer.registerListener({
      entityRemoved: (event2) => {
      }
    });
    this.layers.push(layer);
  }
  removeLayer(layer) {
    const index2 = this.layers.indexOf(layer);
    if (index2 !== -1) {
      this.layers.splice(index2, 1);
      return true;
    }
    return false;
  }
  getLayers() {
    return this.layers;
  }
  setGridSize(size = 0) {
    this.options.gridSize = size;
    this.fireEvent({ size }, "gridUpdated");
  }
  getGridPosition(pos) {
    if (this.options.gridSize === 0) {
      return pos;
    }
    return this.options.gridSize * Math.floor((pos + this.options.gridSize / 2) / this.options.gridSize);
  }
  deserializeModel(data, engine) {
    const models = {};
    const promises = {};
    const resolvers = {};
    const event2 = {
      data,
      engine,
      registerModel: (model) => {
        models[model.getID()] = model;
        if (resolvers[model.getID()]) {
          resolvers[model.getID()](model);
        }
      },
      getModel(id2) {
        if (models[id2]) {
          return Promise.resolve(models[id2]);
        }
        if (!promises[id2]) {
          promises[id2] = new Promise((resolve) => {
            resolvers[id2] = resolve;
          });
        }
        return promises[id2];
      }
    };
    this.deserialize(event2);
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.offsetX = event2.data.offsetX;
    this.options.offsetY = event2.data.offsetY;
    this.options.zoom = event2.data.zoom;
    this.options.gridSize = event2.data.gridSize;
    _forEach(event2.data.layers, (layer) => {
      const layerOb = event2.engine.getFactoryForLayer(layer.type).generateModel({
        initialConfig: layer
      });
      layerOb.deserialize(Object.assign(Object.assign({}, event2), { data: layer }));
      this.addLayer(layerOb);
    });
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { offsetX: this.options.offsetX, offsetY: this.options.offsetY, zoom: this.options.zoom, gridSize: this.options.gridSize, layers: _map(this.layers, (layer) => {
      return layer.serialize();
    }) });
  }
  setZoomLevel(zoom) {
    this.options.zoom = zoom;
    this.fireEvent({ zoom }, "zoomUpdated");
  }
  setOffset(offsetX, offsetY) {
    this.options.offsetX = offsetX;
    this.options.offsetY = offsetY;
    this.fireEvent({ offsetX, offsetY }, "offsetUpdated");
  }
  setOffsetX(offsetX) {
    this.setOffset(offsetX, this.options.offsetY);
  }
  setOffsetY(offsetY) {
    this.setOffset(this.options.offsetX, offsetY);
  }
  getOffsetY() {
    return this.options.offsetY;
  }
  getOffsetX() {
    return this.options.offsetX;
  }
  getZoomLevel() {
    return this.options.zoom;
  }
}
class AbstractFactory {
  constructor(type) {
    this.type = type;
  }
  setDiagramEngine(engine) {
    this.engine = engine;
  }
  setFactoryBank(bank) {
    this.bank = bank;
  }
  getType() {
    return this.type;
  }
}
class AbstractModelFactory extends AbstractFactory {
}
class AbstractReactFactory extends AbstractModelFactory {
}
class BaseModel extends BaseEntity {
  constructor(options) {
    super(options);
  }
  performanceTune() {
    return true;
  }
  getParentCanvasModel() {
    if (!this.parent) {
      return null;
    }
    if (this.parent instanceof CanvasModel) {
      return this.parent;
    } else if (this.parent instanceof BaseModel) {
      return this.parent.getParentCanvasModel();
    }
    return null;
  }
  getParent() {
    return this.parent;
  }
  setParent(parent) {
    this.parent = parent;
  }
  getSelectionEntities() {
    return [this];
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { type: this.options.type, selected: this.options.selected, extras: this.options.extras });
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.extras = event2.data.extras;
    this.options.selected = event2.data.selected;
  }
  getType() {
    return this.options.type;
  }
  isSelected() {
    return this.options.selected;
  }
  isLocked() {
    const locked = super.isLocked();
    if (locked) {
      return true;
    }
    if (this.parent) {
      return this.parent.isLocked();
    }
    return false;
  }
  setSelected(selected = true) {
    if (this.options.selected !== selected) {
      this.options.selected = selected;
      this.fireEvent({
        isSelected: selected
      }, "selectionChanged");
    }
  }
  remove() {
    this.fireEvent({}, "entityRemoved");
  }
}
class BasePositionModel extends BaseModel {
  constructor(options) {
    super(options);
    this.position = options.position || new Point(0, 0);
  }
  setPosition(x2, y2) {
    if (x2 instanceof Point) {
      this.position = x2;
    } else {
      this.position = new Point(x2, y2);
    }
    this.fireEvent({}, "positionChanged");
  }
  getBoundingBox() {
    return Rectangle.fromPointAndSize(this.position, 0, 0);
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.position = new Point(event2.data.x, event2.data.y);
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { x: this.position.x, y: this.position.y });
  }
  getPosition() {
    return this.position;
  }
  getX() {
    return this.position.x;
  }
  getY() {
    return this.position.y;
  }
}
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e2) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index2) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek$1();
    if (previous === 38 && character2 === 12) {
      points[index2] = 1;
    }
    if (token$1(character2)) {
      break;
    }
    next$1();
  }
  return slice$1(begin, position$1);
};
var toRules = function toRules2(parsed, points) {
  var index2 = -1;
  var character2 = 44;
  do {
    switch (token$1(character2)) {
      case 0:
        if (character2 === 38 && peek$1() === 12) {
          points[index2] = 1;
        }
        parsed[index2] += identifierWithPointTracking(position$1 - 1, points, index2);
        break;
      case 2:
        parsed[index2] += delimit$1(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index2] = peek$1() === 58 ? "&\f" : "";
          points[index2] = parsed[index2].length;
          break;
        }
      default:
        parsed[index2] += from$1(character2);
    }
  } while (character2 = next$1());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc$1(toRules(alloc$1(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent) return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k2 = 0; i < rules.length; i++) {
    for (var j2 = 0; j2 < parentRules.length; j2++, k2++) {
      element.props[k2] = points[i] ? rules[i].replace(/&\f/g, parentRules[j2]) : parentRules[j2] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash$1(value, length2)) {
    case 5103:
      return WEBKIT$1 + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT$1 + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT$1 + value + MOZ$1 + value + MS$1 + value + value;
    case 6828:
    case 4268:
      return WEBKIT$1 + value + MS$1 + value + value;
    case 6165:
      return WEBKIT$1 + value + MS$1 + "flex-" + value + value;
    case 5187:
      return WEBKIT$1 + value + replace$1(value, /(\w+).+(:[^]+)/, WEBKIT$1 + "box-$1$2" + MS$1 + "flex-$1$2") + value;
    case 5443:
      return WEBKIT$1 + value + MS$1 + "flex-item-" + replace$1(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT$1 + value + MS$1 + "flex-line-pack" + replace$1(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT$1 + value + MS$1 + replace$1(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT$1 + value + MS$1 + replace$1(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT$1 + "box-" + replace$1(value, "-grow", "") + WEBKIT$1 + value + MS$1 + replace$1(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT$1 + replace$1(value, /([^-])(transform)/g, "$1" + WEBKIT$1 + "$2") + value;
    case 6187:
      return replace$1(replace$1(replace$1(value, /(zoom-|grab)/, WEBKIT$1 + "$1"), /(image-set)/, WEBKIT$1 + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace$1(value, /(image-set\([^]*)/, WEBKIT$1 + "$1$`$1");
    case 4968:
      return replace$1(replace$1(value, /(.+:)(flex-)?(.*)/, WEBKIT$1 + "box-pack:$3" + MS$1 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT$1 + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace$1(value, /(.+)-inline(.+)/, WEBKIT$1 + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen$1(value) - 1 - length2 > 6) switch (charat$1(value, length2 + 1)) {
        case 109:
          if (charat$1(value, length2 + 4) !== 45) break;
        case 102:
          return replace$1(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT$1 + "$2-$3$1" + MOZ$1 + (charat$1(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        case 115:
          return ~indexof$1(value, "stretch") ? prefix(replace$1(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    case 4949:
      if (charat$1(value, length2 + 1) !== 115) break;
    case 6444:
      switch (charat$1(value, strlen$1(value) - 3 - (~indexof$1(value, "!important") && 10))) {
        case 107:
          return replace$1(value, ":", ":" + WEBKIT$1) + value;
        case 101:
          return replace$1(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT$1 + (charat$1(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT$1 + "$2$3$1" + MS$1 + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat$1(value, length2 + 11)) {
        case 114:
          return WEBKIT$1 + value + MS$1 + replace$1(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT$1 + value + MS$1 + replace$1(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT$1 + value + MS$1 + replace$1(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT$1 + value + MS$1 + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index2, children, callback) {
  if (element.length > -1) {
    if (!element["return"]) switch (element.type) {
      case DECLARATION$1:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES$1:
        return serialize$1([copy$1(element, {
          value: replace$1(element.value, "@", "@" + WEBKIT$1)
        })], callback);
      case RULESET$1:
        if (element.length) return combine$1(element.props, function(value) {
          switch (match$1(value, /(::plac\w+|:read-\w+)/)) {
            case ":read-only":
            case ":read-write":
              return serialize$1([copy$1(element, {
                props: [replace$1(value, /:(read-\w+)/, ":" + MOZ$1 + "$1")]
              })], callback);
            case "::placeholder":
              return serialize$1([copy$1(element, {
                props: [replace$1(value, /:(plac\w+)/, ":" + WEBKIT$1 + "input-$1")]
              }), copy$1(element, {
                props: [replace$1(value, /:(plac\w+)/, ":" + MOZ$1 + "$1")]
              }), copy$1(element, {
                props: [replace$1(value, /:(plac\w+)/, MS$1 + "input-$1")]
              })], callback);
          }
          return "";
        });
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify$1, rulesheet$1(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware$1(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize$1(compile$1(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
var reactIs$1 = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u2 = a.$$typeof;
    switch (u2) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u2;
            }
        }
      case d:
        return u2;
    }
  }
}
function A(a) {
  return z(a) === m;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;
{
  reactIs$1.exports = reactIs_production_min;
}
var reactIsExports = reactIs$1.exports;
var reactIs = reactIsExports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser === false) && cache.registered[className] === void 0
  ) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function murmur2(str) {
  var h2 = 0;
  var k2, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k2 = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k2 = /* Math.imul(k, m): */
    (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= /* k >>> r: */
    k2 >>> 24;
    h2 = /* Math.imul(k, m): */
    (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i) & 255;
      h2 = /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = /* Math.imul(h, m): */
  (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && false) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    styles += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      styles += strings[i];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + // $FlowFixMe we know it's not null
    match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
};
var syncFallback$2 = function syncFallback(create) {
  return create();
};
var useInsertionEffect$2 = React$1["useInsertionEffect"] ? React$1["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback$2 = useInsertionEffect$2 || syncFallback$2;
var EmotionCacheContext$2 = /* @__PURE__ */ reactExports.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
EmotionCacheContext$2.Provider;
var withEmotionCache$2 = function withEmotionCache2(func) {
  return /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
    var cache = reactExports.useContext(EmotionCacheContext$2);
    return func(props, cache, ref);
  });
};
var ThemeContext$2 = /* @__PURE__ */ reactExports.createContext({});
function css$1() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var testOmitPropsOnStringTag$2 = isPropValid;
var testOmitPropsOnComponent$2 = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp$2 = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag$2 : testOmitPropsOnComponent$2;
};
var composeShouldForwardProps$2 = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var Insertion$2 = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback$2(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled$2 = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps$2(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp$2(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache$2(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = reactExports.useContext(ThemeContext$2);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp$2(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as") continue;
        if (
          // $FlowFixMe
          finalShouldForwardProp(_key)
        ) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Insertion$2, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ reactExports.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps$2(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var tags$2 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled$2 = createStyled$2.bind();
tags$2.forEach(function(tagName) {
  newStyled$2[tagName] = newStyled$2(tagName);
});
var S$a;
(function(S2) {
  const shared = css$1`
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		pointer-events: none;
		transform-origin: 0 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	`;
  S2.DivLayer = newStyled$2.div`
		${shared}
	`;
  S2.SvgLayer = newStyled$2.svg`
		${shared}
	`;
})(S$a || (S$a = {}));
class TransformLayerWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getTransform() {
    const model = this.props.layer.getParent();
    return `
			translate(
				${model.getOffsetX()}px,
				${model.getOffsetY()}px)
			scale(
				${model.getZoomLevel() / 100}
			)
  	`;
  }
  getTransformStyle() {
    if (this.props.layer.getOptions().transformed) {
      return {
        transform: this.getTransform()
      };
    }
    return {};
  }
  render() {
    if (this.props.layer.getOptions().isSvg) {
      return reactExports.createElement(S$a.SvgLayer, { style: this.getTransformStyle() }, this.props.children);
    }
    return reactExports.createElement(S$a.DivLayer, { style: this.getTransformStyle() }, this.props.children);
  }
}
class SmartLayerWidget extends reactExports.Component {
  shouldComponentUpdate() {
    return this.props.layer.isRepaintEnabled();
  }
  render() {
    return this.props.engine.getFactoryForLayer(this.props.layer).generateReactWidget({ model: this.props.layer });
  }
}
var S$9;
(function(S2) {
  S2.Canvas = newStyled$2.div`
		position: relative;
		cursor: move;
		overflow: hidden;
	`;
})(S$9 || (S$9 = {}));
class CanvasWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.ref = reactExports.createRef();
    this.state = {
      action: null,
      diagramEngineListener: null
    };
  }
  componentWillUnmount() {
    this.props.engine.deregisterListener(this.canvasListener);
    this.props.engine.setCanvas(null);
    document.removeEventListener("keyup", this.keyUp);
    document.removeEventListener("keydown", this.keyDown);
  }
  registerCanvas() {
    this.props.engine.setCanvas(this.ref.current);
    this.props.engine.iterateListeners((list) => {
      list.rendered && list.rendered();
    });
  }
  componentDidUpdate() {
    this.registerCanvas();
  }
  componentDidMount() {
    this.canvasListener = this.props.engine.registerListener({
      repaintCanvas: () => {
        this.forceUpdate();
      }
    });
    this.keyDown = (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    };
    this.keyUp = (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    };
    document.addEventListener("keyup", this.keyUp);
    document.addEventListener("keydown", this.keyDown);
    this.registerCanvas();
  }
  render() {
    const engine = this.props.engine;
    const model = engine.getModel();
    return reactExports.createElement(S$9.Canvas, { className: this.props.className, ref: this.ref, onWheel: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    }, onMouseDown: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    }, onMouseUp: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    }, onMouseMove: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    }, onTouchStart: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    }, onTouchEnd: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    }, onTouchMove: (event2) => {
      this.props.engine.getActionEventBus().fireAction({ event: event2 });
    } }, model.getLayers().map((layer) => {
      return reactExports.createElement(
        TransformLayerWidget,
        { layer, key: layer.getID() },
        reactExports.createElement(SmartLayerWidget, { layer, engine: this.props.engine, key: layer.getID() })
      );
    }));
  }
}
class LayerModel extends BaseModel {
  constructor(options = {}) {
    super(options);
    this.models = {};
    this.repaintEnabled = true;
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.isSvg = !!event2.data.isSvg;
    this.options.transformed = !!event2.data.transformed;
    _forEach(event2.data.models, (model) => {
      const modelOb = this.getChildModelFactoryBank(event2.engine).getFactory(model.type).generateModel({
        initialConfig: model
      });
      modelOb.deserialize(Object.assign(Object.assign({}, event2), { data: model }));
      this.addModel(modelOb);
    });
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { isSvg: this.options.isSvg, transformed: this.options.transformed, models: _mapValues(this.models, (model) => {
      return model.serialize();
    }) });
  }
  isRepaintEnabled() {
    return this.repaintEnabled;
  }
  allowRepaint(allow = true) {
    this.repaintEnabled = allow;
  }
  remove() {
    if (this.parent) {
      this.parent.removeLayer(this);
    }
    super.remove();
  }
  addModel(model) {
    model.setParent(this);
    this.models[model.getID()] = model;
  }
  getSelectionEntities() {
    return _flatMap(this.models, (model) => {
      return model.getSelectionEntities();
    });
  }
  getModels() {
    return this.models;
  }
  getModel(id2) {
    return this.models[id2];
  }
  removeModel(id2) {
    const _id = typeof id2 === "string" ? id2 : id2.getID();
    if (this.models[_id]) {
      delete this.models[_id];
      return true;
    }
    return false;
  }
}
class SelectionLayerModel extends LayerModel {
  constructor() {
    super({
      transformed: false,
      isSvg: false,
      type: "selection"
    });
  }
  setBox(rect) {
    this.box = rect;
  }
  getChildModelFactoryBank() {
    return null;
  }
}
var S$8;
(function(S2) {
  S2.Container = newStyled$2.div`
		position: absolute;
		background-color: rgba(0, 192, 255, 0.2);
		border: solid 2px rgb(0, 192, 255);
	`;
})(S$8 || (S$8 = {}));
class SelectionBoxWidget extends reactExports.Component {
  render() {
    const { rect } = this.props;
    if (!rect)
      return null;
    return reactExports.createElement(S$8.Container, { style: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    } });
  }
}
class SelectionBoxLayerFactory extends AbstractReactFactory {
  constructor() {
    super("selection");
  }
  generateModel(event2) {
    return new SelectionLayerModel();
  }
  generateReactWidget(event2) {
    return reactExports.createElement(SelectionBoxWidget, { rect: event2.model.box });
  }
}
class PeformanceWidget extends reactExports.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!this.props.model.performanceTune()) {
      return true;
    }
    if (this.props.model !== nextProps.model) {
      return true;
    }
    return !_isEqual(this.props.serialized, nextProps.serialized);
  }
  render() {
    return this.props.children();
  }
}
class State {
  constructor(options) {
    this.actions = [];
    this.keys = [];
    this.childStates = [];
    this.options = options;
  }
  setEngine(engine) {
    this.engine = engine;
  }
  getOptions() {
    return this.options;
  }
  eject() {
    this.engine.getStateMachine().popState();
  }
  transitionWithEvent(state, event2) {
    this.engine.getStateMachine().pushState(state);
    this.engine.getActionEventBus().fireAction(event2);
  }
  registerAction(action) {
    this.actions.push(action);
  }
  tryActivateParentState(keys) {
    if (this.keys.length > 0 && !this.isKeysFullfilled(keys)) {
      this.eject();
      return true;
    }
    return false;
  }
  tryActivateChildState(keys) {
    const state = this.findStateToActivate(keys);
    if (state) {
      this.engine.getStateMachine().pushState(state);
      return true;
    }
    return false;
  }
  findStateToActivate(keys) {
    for (let child of this.childStates) {
      if (child.isKeysFullfilled(keys)) {
        return child;
      }
    }
    return null;
  }
  isKeysFullfilled(keys) {
    return _intersection(this.keys, keys).length === this.keys.length;
  }
  activated(previous) {
    const keys = this.engine.getActionEventBus().getKeys();
    if (this.tryActivateParentState(keys) || this.tryActivateChildState(keys)) {
      return;
    }
    this.handler1 = this.engine.getActionEventBus().registerAction(new Action({
      type: InputType.KEY_DOWN,
      fire: () => {
        this.tryActivateChildState(this.engine.getActionEventBus().getKeys());
      }
    }));
    this.handler2 = this.engine.getActionEventBus().registerAction(new Action({
      type: InputType.KEY_UP,
      fire: () => {
        this.tryActivateParentState(this.engine.getActionEventBus().getKeys());
      }
    }));
    for (let action of this.actions) {
      this.engine.getActionEventBus().registerAction(action);
    }
  }
  deactivated(next2) {
    if (this.handler1) {
      this.handler1();
    }
    if (this.handler2) {
      this.handler2();
    }
    for (let action of this.actions) {
      this.engine.getActionEventBus().deregisterAction(action);
    }
  }
}
class AbstractDisplacementState extends State {
  constructor(options) {
    super(options);
    this.registerAction(new Action({
      type: InputType.MOUSE_DOWN,
      fire: (actionEvent) => {
        const { clientX, clientY } = actionEvent.event;
        this.handleMoveStart(clientX, clientY);
      }
    }));
    this.registerAction(new Action({
      type: InputType.MOUSE_MOVE,
      fire: (actionEvent) => {
        const { event: event2 } = actionEvent;
        if (event2.buttons === 0) {
          this.eject();
          return;
        }
        const { clientX, clientY } = event2;
        this.handleMove(clientX, clientY, event2);
      }
    }));
    this.registerAction(new Action({
      type: InputType.MOUSE_UP,
      fire: () => this.handleMoveEnd()
    }));
    this.registerAction(new Action({
      type: InputType.TOUCH_START,
      fire: (actionEvent) => {
        const { clientX, clientY } = actionEvent.event.touches[0];
        this.handleMoveStart(clientX, clientY);
      }
    }));
    this.registerAction(new Action({
      type: InputType.TOUCH_MOVE,
      fire: (actionEvent) => {
        const { event: event2 } = actionEvent;
        const { clientX, clientY } = event2.touches[0];
        this.handleMove(clientX, clientY, event2);
      }
    }));
    this.registerAction(new Action({
      type: InputType.TOUCH_END,
      fire: () => this.handleMoveEnd()
    }));
  }
  handleMoveStart(x2, y2) {
    this.initialX = x2;
    this.initialY = y2;
    const rel = this.engine.getRelativePoint(x2, y2);
    this.initialXRelative = rel.x;
    this.initialYRelative = rel.y;
  }
  handleMove(x2, y2, event2) {
    this.fireMouseMoved({
      displacementX: x2 - this.initialX,
      displacementY: y2 - this.initialY,
      virtualDisplacementX: (x2 - this.initialX) / (this.engine.getModel().getZoomLevel() / 100),
      virtualDisplacementY: (y2 - this.initialY) / (this.engine.getModel().getZoomLevel() / 100),
      event: event2
    });
  }
  handleMoveEnd() {
    this.eject();
  }
}
(function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
});
class SelectionBoxState extends AbstractDisplacementState {
  constructor() {
    super({
      name: "selection-box"
    });
  }
  activated(previous) {
    super.activated(previous);
    this.layer = new SelectionLayerModel();
    this.engine.getModel().addLayer(this.layer);
  }
  deactivated(next2) {
    super.deactivated(next2);
    this.layer.remove();
    this.engine.repaintCanvas();
  }
  getBoxDimensions(event2) {
    let rel;
    if ("touches" in event2.event) {
      const touch = event2.event.touches[0];
      rel = this.engine.getRelativePoint(touch.clientX, touch.clientY);
    } else {
      rel = this.engine.getRelativePoint(event2.event.clientX, event2.event.clientY);
    }
    return {
      left: rel.x > this.initialXRelative ? this.initialXRelative : rel.x,
      top: rel.y > this.initialYRelative ? this.initialYRelative : rel.y,
      width: Math.abs(rel.x - this.initialXRelative),
      height: Math.abs(rel.y - this.initialYRelative),
      right: rel.x < this.initialXRelative ? this.initialXRelative : rel.x,
      bottom: rel.y < this.initialYRelative ? this.initialYRelative : rel.y
    };
  }
  fireMouseMoved(event2) {
    this.layer.setBox(this.getBoxDimensions(event2));
    const relative = this.engine.getRelativeMousePoint({
      clientX: this.initialX,
      clientY: this.initialY
    });
    if (event2.virtualDisplacementX < 0) {
      relative.x -= Math.abs(event2.virtualDisplacementX);
    }
    if (event2.virtualDisplacementY < 0) {
      relative.y -= Math.abs(event2.virtualDisplacementY);
    }
    const rect = Rectangle.fromPointAndSize(relative, Math.abs(event2.virtualDisplacementX), Math.abs(event2.virtualDisplacementY));
    for (let model of this.engine.getModel().getSelectionEntities()) {
      if (model.getBoundingBox) {
        const bounds = model.getBoundingBox();
        if (rect.containsPoint(bounds.getTopLeft()) && rect.containsPoint(bounds.getBottomRight())) {
          model.setSelected(true);
        } else {
          model.setSelected(false);
        }
      }
    }
    this.engine.repaintCanvas();
  }
}
class SelectingState extends State {
  constructor() {
    super({
      name: "selecting"
    });
    this.keys = ["shift"];
    this.registerAction(new Action({
      type: InputType.MOUSE_DOWN,
      fire: (event2) => {
        const element = this.engine.getActionEventBus().getModelForEvent(event2);
        if (!element) {
          this.transitionWithEvent(new SelectionBoxState(), event2);
        } else {
          element.setSelected(true);
          this.engine.repaintCanvas();
        }
      }
    }));
  }
}
class PointModel extends BasePositionModel {
  constructor(options) {
    super(Object.assign(Object.assign({}, options), { type: "point" }));
    this.parent = options.link;
  }
  isConnectedToPort() {
    return this.parent.getPortForPoint(this) !== null;
  }
  getLink() {
    return this.getParent();
  }
  remove() {
    if (this.parent) {
      this.parent.removePoint(this);
    }
    super.remove();
  }
  isLocked() {
    return super.isLocked() || this.getParent().isLocked();
  }
}
class LinkModel extends BaseModel {
  constructor(options) {
    super(options);
    this.points = [
      new PointModel({
        link: this
      }),
      new PointModel({
        link: this
      })
    ];
    this.sourcePort = null;
    this.targetPort = null;
    this.renderedPaths = [];
    this.labels = [];
  }
  getBoundingBox() {
    return new Rectangle(boundingBoxFromPoints(_map(this.points, (point) => {
      return point.getPosition();
    })));
  }
  getSelectionEntities() {
    if (this.getTargetPort() && this.getSourcePort()) {
      return super.getSelectionEntities().concat(_slice(this.points, 1, this.points.length - 1));
    }
    if (!this.getSourcePort()) {
      return super.getSelectionEntities().concat(_slice(this.points, 0, this.points.length - 1));
    }
    if (!this.getTargetPort()) {
      return super.getSelectionEntities().concat(_slice(this.points, 1, this.points.length));
    }
    return super.getSelectionEntities().concat(this.points);
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.points = _map(event2.data.points || [], (point) => {
      var p2 = new PointModel({
        link: this,
        position: new Point(point.x, point.y)
      });
      p2.deserialize(Object.assign(Object.assign({}, event2), { data: point }));
      return p2;
    });
    _forEach(event2.data.labels || [], (label) => {
      let labelOb = event2.engine.getFactoryForLabel(label.type).generateModel({});
      labelOb.deserialize(Object.assign(Object.assign({}, event2), { data: label }));
      this.addLabel(labelOb);
    });
    if (event2.data.target) {
      event2.getModel(event2.data.targetPort).then((model) => {
        this.setTargetPort(model);
      });
    }
    if (event2.data.source) {
      event2.getModel(event2.data.sourcePort).then((model) => {
        this.setSourcePort(model);
      });
    }
  }
  getRenderedPath() {
    return this.renderedPaths;
  }
  setRenderedPaths(paths) {
    this.renderedPaths = paths;
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { source: this.sourcePort ? this.sourcePort.getParent().getID() : null, sourcePort: this.sourcePort ? this.sourcePort.getID() : null, target: this.targetPort ? this.targetPort.getParent().getID() : null, targetPort: this.targetPort ? this.targetPort.getID() : null, points: _map(this.points, (point) => {
      return point.serialize();
    }), labels: _map(this.labels, (label) => {
      return label.serialize();
    }) });
  }
  doClone(lookupTable = {}, clone) {
    clone.setPoints(_map(this.getPoints(), (point) => {
      return point.clone(lookupTable);
    }));
    if (this.sourcePort) {
      clone.setSourcePort(this.sourcePort.clone(lookupTable));
    }
    if (this.targetPort) {
      clone.setTargetPort(this.targetPort.clone(lookupTable));
    }
  }
  clearPort(port) {
    if (this.sourcePort === port) {
      this.setSourcePort(null);
    } else if (this.targetPort === port) {
      this.setTargetPort(null);
    }
  }
  remove() {
    if (this.sourcePort) {
      this.sourcePort.removeLink(this);
      delete this.sourcePort;
    }
    if (this.targetPort) {
      this.targetPort.removeLink(this);
      delete this.targetPort;
    }
    super.remove();
  }
  isLastPoint(point) {
    var index2 = this.getPointIndex(point);
    return index2 === this.points.length - 1;
  }
  getPointIndex(point) {
    return this.points.indexOf(point);
  }
  getPointModel(id2) {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].getID() === id2) {
        return this.points[i];
      }
    }
    return null;
  }
  getPortForPoint(point) {
    if (this.sourcePort !== null && this.getFirstPoint().getID() === point.getID()) {
      return this.sourcePort;
    }
    if (this.targetPort !== null && this.getLastPoint().getID() === point.getID()) {
      return this.targetPort;
    }
    return null;
  }
  getPointForPort(port) {
    if (this.sourcePort !== null && this.sourcePort.getID() === port.getID()) {
      return this.getFirstPoint();
    }
    if (this.targetPort !== null && this.targetPort.getID() === port.getID()) {
      return this.getLastPoint();
    }
    return null;
  }
  getFirstPoint() {
    return this.points[0];
  }
  getLastPoint() {
    return this.points[this.points.length - 1];
  }
  setSourcePort(port) {
    if (port !== null) {
      port.addLink(this);
    }
    if (this.sourcePort !== null) {
      this.sourcePort.removeLink(this);
    }
    this.sourcePort = port;
    this.fireEvent({ port }, "sourcePortChanged");
    if (port === null || port === void 0 ? void 0 : port.reportedPosition) {
      this.getPointForPort(port).setPosition(port.getCenter());
    }
  }
  getSourcePort() {
    return this.sourcePort;
  }
  getTargetPort() {
    return this.targetPort;
  }
  setTargetPort(port) {
    if (port !== null) {
      port.addLink(this);
    }
    if (this.targetPort !== null) {
      this.targetPort.removeLink(this);
    }
    this.targetPort = port;
    this.fireEvent({ port }, "targetPortChanged");
    if (port === null || port === void 0 ? void 0 : port.reportedPosition) {
      this.getPointForPort(port).setPosition(port.getCenter());
    }
  }
  point(x2, y2, index2 = 1) {
    return this.addPoint(this.generatePoint(x2, y2), index2);
  }
  addLabel(label) {
    label.setParent(this);
    this.labels.push(label);
  }
  getPoints() {
    return this.points;
  }
  getLabels() {
    return this.labels;
  }
  setPoints(points) {
    _forEach(points, (point) => {
      point.setParent(this);
    });
    this.points = points;
  }
  removePoint(pointModel) {
    if (this.isLastPoint(pointModel))
      this.remove();
    this.points.splice(this.getPointIndex(pointModel), 1);
  }
  removePointsBefore(pointModel) {
    this.points.splice(0, this.getPointIndex(pointModel));
  }
  removePointsAfter(pointModel) {
    this.points.splice(this.getPointIndex(pointModel) + 1);
  }
  removeMiddlePoints() {
    if (this.points.length > 2) {
      this.points.splice(1, this.points.length - 2);
    }
  }
  addPoint(pointModel, index2 = 1) {
    pointModel.setParent(this);
    this.points.splice(index2, 0, pointModel);
    return pointModel;
  }
  generatePoint(x2 = 0, y2 = 0) {
    return new PointModel({
      link: this,
      position: new Point(x2, y2)
    });
  }
}
class NodeModel extends BasePositionModel {
  constructor(options) {
    super(options);
    this.ports = {};
    this.width = 0;
    this.height = 0;
  }
  getBoundingBox() {
    return Rectangle.fromPointAndSize(this.getPosition(), this.width, this.height);
  }
  setPosition(x2, y2) {
    const old = this.position;
    if (x2 instanceof Point) {
      super.setPosition(x2);
    } else {
      super.setPosition(x2, y2);
    }
    _forEach(this.ports, (port) => {
      port.setPosition(port.getX() + this.position.x - old.x, port.getY() + this.position.y - old.y);
    });
  }
  deserialize(event2) {
    super.deserialize(event2);
    _forEach(event2.data.ports, (port) => {
      let portOb = event2.engine.getFactoryForPort(port.type).generateModel({});
      portOb.deserialize(Object.assign(Object.assign({}, event2), { data: port }));
      event2.registerModel(portOb);
      this.addPort(portOb);
    });
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { ports: _map(this.ports, (port) => {
      return port.serialize();
    }) });
  }
  doClone(lookupTable = {}, clone) {
    clone.ports = {};
    _forEach(this.ports, (port) => {
      clone.addPort(port.clone(lookupTable));
    });
  }
  remove() {
    super.remove();
    _forEach(this.ports, (port) => {
      _forEach(port.getLinks(), (link) => {
        link.remove();
      });
    });
  }
  getPortFromID(id2) {
    for (var i in this.ports) {
      if (this.ports[i].getID() === id2) {
        return this.ports[i];
      }
    }
    return null;
  }
  getLink(id2) {
    for (let portID in this.ports) {
      const links = this.ports[portID].getLinks();
      if (links[id2]) {
        return links[id2];
      }
    }
  }
  getPort(name) {
    return this.ports[name];
  }
  getPorts() {
    return this.ports;
  }
  removePort(port) {
    for (let link of _values(port.getLinks())) {
      link.clearPort(port);
    }
    if (this.ports[port.getName()]) {
      this.ports[port.getName()].setParent(null);
      delete this.ports[port.getName()];
    }
  }
  addPort(port) {
    port.setParent(this);
    this.ports[port.getName()] = port;
    return port;
  }
  updateDimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }
}
class NodeLayerModel extends LayerModel {
  constructor() {
    super({
      type: "diagram-nodes",
      isSvg: false,
      transformed: true
    });
  }
  addModel(model) {
    if (!(model instanceof NodeModel)) {
      throw new Error("Can only add nodes to this layer");
    }
    model.registerListener({
      entityRemoved: () => {
        this.getParent().removeNode(model);
      }
    });
    super.addModel(model);
  }
  getChildModelFactoryBank(engine) {
    return engine.getNodeFactories();
  }
  getNodes() {
    return this.getModels();
  }
}
class LinkLayerModel extends LayerModel {
  constructor() {
    super({
      type: "diagram-links",
      isSvg: true,
      transformed: true
    });
  }
  addModel(model) {
    if (!(model instanceof LinkModel)) {
      throw new Error("Can only add links to this layer");
    }
    model.registerListener({
      entityRemoved: () => {
        this.getParent().removeLink(model);
      }
    });
    super.addModel(model);
  }
  getLinks() {
    return this.getModels();
  }
  getChildModelFactoryBank(engine) {
    return engine.getLinkFactories();
  }
}
class DiagramModel extends CanvasModel {
  constructor(options = {}) {
    super(options);
    this.addLayer(new LinkLayerModel());
    this.addLayer(new NodeLayerModel());
  }
  deserialize(event2) {
    this.layers = [];
    super.deserialize(event2);
  }
  addLayer(layer) {
    super.addLayer(layer);
    if (layer instanceof NodeLayerModel) {
      this.activeNodeLayer = layer;
    }
    if (layer instanceof LinkLayerModel) {
      this.activeLinkLayer = layer;
    }
  }
  getLinkLayers() {
    return _filter(this.layers, (layer) => {
      return layer instanceof LinkLayerModel;
    });
  }
  getNodeLayers() {
    return _filter(this.layers, (layer) => {
      return layer instanceof NodeLayerModel;
    });
  }
  getActiveNodeLayer() {
    if (!this.activeNodeLayer) {
      const layers = this.getNodeLayers();
      if (layers.length === 0) {
        this.addLayer(new NodeLayerModel());
      } else {
        this.activeNodeLayer = layers[0];
      }
    }
    return this.activeNodeLayer;
  }
  getActiveLinkLayer() {
    if (!this.activeLinkLayer) {
      const layers = this.getLinkLayers();
      if (layers.length === 0) {
        this.addLayer(new LinkLayerModel());
      } else {
        this.activeLinkLayer = layers[0];
      }
    }
    return this.activeLinkLayer;
  }
  getNode(node2) {
    for (const layer of this.getNodeLayers()) {
      const model = layer.getModel(node2);
      if (model) {
        return model;
      }
    }
  }
  getLink(link) {
    for (const layer of this.getLinkLayers()) {
      const model = layer.getModel(link);
      if (model) {
        return model;
      }
    }
  }
  addAll(...models) {
    _forEach(models, (model) => {
      if (model instanceof LinkModel) {
        this.addLink(model);
      } else if (model instanceof NodeModel) {
        this.addNode(model);
      }
    });
    return models;
  }
  addLink(link) {
    this.getActiveLinkLayer().addModel(link);
    this.fireEvent({
      link,
      isCreated: true
    }, "linksUpdated");
    return link;
  }
  addNode(node2) {
    this.getActiveNodeLayer().addModel(node2);
    this.fireEvent({ node: node2, isCreated: true }, "nodesUpdated");
    return node2;
  }
  removeLink(link) {
    const removed = _some(this.getLinkLayers(), (layer) => {
      return layer.removeModel(link);
    });
    if (removed) {
      this.fireEvent({ link, isCreated: false }, "linksUpdated");
    }
  }
  removeNode(node2) {
    const removed = _some(this.getNodeLayers(), (layer) => {
      return layer.removeModel(node2);
    });
    if (removed) {
      this.fireEvent({ node: node2, isCreated: false }, "nodesUpdated");
    }
  }
  getLinks() {
    return _flatMap(this.getLinkLayers(), (layer) => {
      return _values(layer.getModels());
    });
  }
  getNodes() {
    return _flatMap(this.getNodeLayers(), (layer) => {
      return _values(layer.getModels());
    });
  }
}
class LabelModel extends BaseModel {
  constructor(options) {
    super(Object.assign(Object.assign({}, options), { offsetX: options.offsetX || 0, offsetY: options.offsetY || 0 }));
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.offsetX = event2.data.offsetX;
    this.options.offsetY = event2.data.offsetY;
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { offsetX: this.options.offsetX, offsetY: this.options.offsetY });
  }
}
var syncFallback$1 = function syncFallback2(create) {
  return create();
};
var useInsertionEffect$1 = React$1["useInsertionEffect"] ? React$1["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback$1 = useInsertionEffect$1 || syncFallback$1;
var EmotionCacheContext$1 = /* @__PURE__ */ reactExports.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
EmotionCacheContext$1.Provider;
var withEmotionCache$1 = function withEmotionCache22(func) {
  return /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
    var cache = reactExports.useContext(EmotionCacheContext$1);
    return func(props, cache, ref);
  });
};
var ThemeContext$1 = /* @__PURE__ */ reactExports.createContext({});
var testOmitPropsOnStringTag$1 = isPropValid;
var testOmitPropsOnComponent$1 = function testOmitPropsOnComponent22(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp$1 = function getDefaultShouldForwardProp22(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag$1 : testOmitPropsOnComponent$1;
};
var composeShouldForwardProps$1 = function composeShouldForwardProps22(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var Insertion$1 = function Insertion22(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback$1(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled$1 = function createStyled22(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps$1(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp$1(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache$1(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = reactExports.useContext(ThemeContext$1);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp$1(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as") continue;
        if (
          // $FlowFixMe
          finalShouldForwardProp(_key)
        ) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Insertion$1, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ reactExports.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled22(nextTag, _extends$1({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps$1(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var tags$1 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled$1 = createStyled$1.bind();
tags$1.forEach(function(tagName) {
  newStyled$1[tagName] = newStyled$1(tagName);
});
var S$7;
(function(S2) {
  S2.Label = newStyled$1.div`
		display: inline-block;
		position: absolute;
	`;
  S2.Foreign = newStyled$1.foreignObject`
		pointer-events: none;
		overflow: visible;
	`;
})(S$7 || (S$7 = {}));
class LabelWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.findPathAndRelativePositionToRenderLabel = (index2) => {
      const link = this.props.label.getParent();
      const lengths = link.getRenderedPath().map((path) => path.getTotalLength());
      let labelPosition = lengths.reduce((previousValue, currentValue) => previousValue + currentValue, 0) * (index2 / (link.getLabels().length + 1));
      let pathIndex = 0;
      while (pathIndex < link.getRenderedPath().length) {
        if (labelPosition - lengths[pathIndex] < 0) {
          return {
            path: link.getRenderedPath()[pathIndex],
            position: labelPosition
          };
        }
        labelPosition -= lengths[pathIndex];
        pathIndex++;
      }
    };
    this.calculateLabelPosition = () => {
      const found = this.findPathAndRelativePositionToRenderLabel(this.props.index + 1);
      if (!found) {
        return;
      }
      const { path, position: position2 } = found;
      const labelDimensions = {
        width: this.ref.current.offsetWidth,
        height: this.ref.current.offsetHeight
      };
      const pathCentre = path.getPointAtLength(position2);
      const labelCoordinates = {
        x: pathCentre.x - labelDimensions.width / 2 + this.props.label.getOptions().offsetX,
        y: pathCentre.y - labelDimensions.height / 2 + this.props.label.getOptions().offsetY
      };
      this.ref.current.style.transform = `translate(${labelCoordinates.x}px, ${labelCoordinates.y}px)`;
    };
    this.ref = reactExports.createRef();
  }
  componentDidUpdate() {
    window.requestAnimationFrame(this.calculateLabelPosition);
  }
  componentDidMount() {
    window.requestAnimationFrame(this.calculateLabelPosition);
  }
  render() {
    const canvas = this.props.engine.getCanvas();
    return reactExports.createElement(
      S$7.Foreign,
      { key: this.props.label.getID(), width: canvas === null || canvas === void 0 ? void 0 : canvas.offsetWidth, height: canvas === null || canvas === void 0 ? void 0 : canvas.offsetHeight },
      reactExports.createElement(S$7.Label, { ref: this.ref }, this.props.engine.getFactoryForLabel(this.props.label).generateReactWidget({ model: this.props.label }))
    );
  }
}
class LinkWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourcePort: null,
      targetPort: null
    };
  }
  componentWillUnmount() {
    if (this.sourceListener) {
      this.sourceListener.deregister();
    }
    if (this.targetListener) {
      this.targetListener.deregister();
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      sourcePort: nextProps.link.getSourcePort(),
      targetPort: nextProps.link.getTargetPort()
    };
  }
  installTarget() {
    this.targetListener && this.targetListener.deregister();
    if (!this.props.link.getTargetPort())
      return;
    this.targetListener = this.props.link.getTargetPort().registerListener({
      reportInitialPosition: (event2) => {
        this.forceUpdate();
      }
    });
  }
  installSource() {
    this.sourceListener && this.sourceListener.deregister();
    if (!this.props.link.getSourcePort())
      return;
    this.sourceListener = this.props.link.getSourcePort().registerListener({
      reportInitialPosition: (event2) => {
        this.forceUpdate();
      }
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.sourcePort !== this.state.sourcePort) {
      this.installSource();
    }
    if (prevState.targetPort !== this.state.targetPort) {
      this.installTarget();
    }
  }
  static generateLinePath(firstPoint, lastPoint) {
    return `M${firstPoint.getX()},${firstPoint.getY()} L ${lastPoint.getX()},${lastPoint.getY()}`;
  }
  componentDidMount() {
    if (this.props.link.getSourcePort()) {
      this.installSource();
    }
    if (this.props.link.getTargetPort()) {
      this.installTarget();
    }
  }
  render() {
    const { link } = this.props;
    if (link.getSourcePort() && !link.getSourcePort().reportedPosition) {
      return null;
    }
    if (link.getTargetPort() && !link.getTargetPort().reportedPosition) {
      return null;
    }
    return reactExports.createElement(PeformanceWidget, { model: this.props.link, serialized: this.props.link.serialize() }, () => {
      return reactExports.createElement(
        "g",
        { "data-linkid": this.props.link.getID() },
        this.props.diagramEngine.generateWidgetForLink(link),
        _map(this.props.link.getLabels(), (labelModel, index2) => {
          return reactExports.createElement(LabelWidget, { key: labelModel.getID(), engine: this.props.diagramEngine, label: labelModel, index: index2 });
        })
      );
    });
  }
}
var S$6;
(function(S2) {
  S2.Container = newStyled$1.div``;
})(S$6 || (S$6 = {}));
class LinkLayerWidget extends reactExports.Component {
  render() {
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      //only perform these actions when we have a diagram
      _map(this.props.layer.getLinks(), (link) => {
        return reactExports.createElement(LinkWidget, { key: link.getID(), link, diagramEngine: this.props.engine });
      })
    );
  }
}
class LinkLayerFactory extends AbstractReactFactory {
  constructor() {
    super("diagram-links");
  }
  generateModel(event2) {
    return new LinkLayerModel();
  }
  generateReactWidget(event2) {
    return reactExports.createElement(LinkLayerWidget, { layer: event2.model, engine: this.engine });
  }
}
var S$5;
(function(S2) {
  S2.Node = newStyled$1.div`
		position: absolute;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		user-select: none;
		cursor: move;
		pointer-events: all;
	`;
})(S$5 || (S$5 = {}));
class NodeWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.ref = reactExports.createRef();
  }
  componentWillUnmount() {
    var _a;
    this.ob.disconnect();
    this.ob = null;
    (_a = this.listener) === null || _a === void 0 ? void 0 : _a.deregister();
    this.listener = null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.listener && this.props.node !== prevProps.node) {
      this.listener.deregister();
      this.installSelectionListener();
    }
  }
  installSelectionListener() {
    this.listener = this.props.node.registerListener({
      selectionChanged: (event2) => {
        this.forceUpdate();
      }
    });
  }
  updateSize(width, height) {
    this.props.node.updateDimensions({ width, height });
    try {
      _forEach(this.props.node.getPorts(), (port) => {
        port.updateCoords(this.props.diagramEngine.getPortCoords(port));
      });
    } catch (ex) {
    }
  }
  componentDidMount() {
    this.ob = new index((entities) => {
      const bounds = entities[0].contentRect;
      this.updateSize(bounds.width, bounds.height);
    });
    const b2 = this.ref.current.getBoundingClientRect();
    this.updateSize(b2.width, b2.height);
    this.ob.observe(this.ref.current);
    this.installSelectionListener();
  }
  render() {
    return reactExports.createElement(PeformanceWidget, { model: this.props.node, serialized: this.props.node.serialize() }, () => {
      return reactExports.createElement(S$5.Node, { className: "node", ref: this.ref, "data-nodeid": this.props.node.getID(), style: {
        top: this.props.node.getY(),
        left: this.props.node.getX()
      } }, this.props.diagramEngine.generateWidgetForNode(this.props.node));
    });
  }
}
class NodeLayerWidget extends reactExports.Component {
  render() {
    return reactExports.createElement(reactExports.Fragment, null, _map(this.props.layer.getNodes(), (node2) => {
      return reactExports.createElement(NodeWidget, { key: node2.getID(), diagramEngine: this.props.engine, node: node2 });
    }));
  }
}
class NodeLayerFactory extends AbstractReactFactory {
  constructor() {
    super("diagram-nodes");
  }
  generateModel(event2) {
    return new NodeLayerModel();
  }
  generateReactWidget(event2) {
    return reactExports.createElement(NodeLayerWidget, { layer: event2.model, engine: this.engine });
  }
}
var PortModelAlignment;
(function(PortModelAlignment2) {
  PortModelAlignment2["TOP"] = "top";
  PortModelAlignment2["LEFT"] = "left";
  PortModelAlignment2["BOTTOM"] = "bottom";
  PortModelAlignment2["RIGHT"] = "right";
})(PortModelAlignment || (PortModelAlignment = {}));
class PortModel extends BasePositionModel {
  constructor(options) {
    super(options);
    this.links = {};
    this.reportedPosition = false;
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.reportedPosition = false;
    this.options.name = event2.data.name;
    this.options.alignment = event2.data.alignment;
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { name: this.options.name, alignment: this.options.alignment, parentNode: this.parent.getID(), links: _map(this.links, (link) => {
      return link.getID();
    }) });
  }
  setPosition(x2, y2) {
    let old = this.position;
    super.setPosition(x2, y2);
    _forEach(this.getLinks(), (link) => {
      let point = link.getPointForPort(this);
      point.setPosition(point.getX() + x2 - old.x, point.getY() + y2 - old.y);
    });
  }
  doClone(lookupTable = {}, clone) {
    clone.links = {};
    clone.parent = this.getParent().clone(lookupTable);
  }
  getNode() {
    return this.getParent();
  }
  getName() {
    return this.options.name;
  }
  getMaximumLinks() {
    return this.options.maximumLinks;
  }
  setMaximumLinks(maximumLinks) {
    this.options.maximumLinks = maximumLinks;
  }
  removeLink(link) {
    delete this.links[link.getID()];
  }
  addLink(link) {
    this.links[link.getID()] = link;
  }
  getLinks() {
    return this.links;
  }
  createLinkModel() {
    if (_isFinite(this.options.maximumLinks)) {
      var numberOfLinks = _size(this.links);
      if (this.options.maximumLinks === 1 && numberOfLinks >= 1) {
        return _values(this.links)[0];
      } else if (numberOfLinks >= this.options.maximumLinks) {
        return null;
      }
    }
    return null;
  }
  reportPosition() {
    _forEach(this.getLinks(), (link) => {
      link.getPointForPort(this).setPosition(this.getCenter());
    });
    this.fireEvent({
      entity: this
    }, "reportInitialPosition");
  }
  getCenter() {
    return new Point(this.getX() + this.width / 2, this.getY() + this.height / 2);
  }
  getBoundingBox() {
    return Rectangle.fromPointAndSize(this.position, this.width, this.height);
  }
  updateCoords(coords) {
    this.width = coords.getWidth();
    this.height = coords.getHeight();
    this.setPosition(coords.getTopLeft());
    this.reportedPosition = true;
    this.reportPosition();
  }
  canLinkToPort(port) {
    return true;
  }
  isLocked() {
    return super.isLocked() || this.getParent().isLocked();
  }
}
class PortWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.ref = reactExports.createRef();
  }
  report() {
    this.props.port.updateCoords(this.props.engine.getPortCoords(this.props.port, this.ref.current));
  }
  componentWillUnmount() {
    this.engineListenerHandle && this.engineListenerHandle.deregister();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.port.reportedPosition) {
      this.report();
    }
  }
  componentDidMount() {
    this.engineListenerHandle = this.props.engine.registerListener({
      canvasReady: () => {
        this.report();
      }
    });
    if (this.props.engine.getCanvas()) {
      this.report();
    }
  }
  getExtraProps() {
    if (Toolkit.TESTING) {
      const links = _keys(this.props.port.getNode().getPort(this.props.port.getName()).links).join(",");
      return {
        "data-links": links
      };
    }
    return {};
  }
  render() {
    return reactExports.createElement("div", Object.assign({ style: this.props.style, ref: this.ref, className: `port ${this.props.className || ""}`, "data-name": this.props.port.getName(), "data-nodeid": this.props.port.getNode().getID() }, this.getExtraProps()), this.props.children);
  }
}
class DiagramEngine extends CanvasEngine {
  constructor(options = {}) {
    super(options);
    this.maxNumberPointsPerLink = 1e3;
    this.nodeFactories = new FactoryBank();
    this.linkFactories = new FactoryBank();
    this.portFactories = new FactoryBank();
    this.labelFactories = new FactoryBank();
    const setup = (factory) => {
      factory.registerListener({
        factoryAdded: (event2) => {
          event2.factory.setDiagramEngine(this);
        },
        factoryRemoved: (event2) => {
          event2.factory.setDiagramEngine(null);
        }
      });
    };
    setup(this.nodeFactories);
    setup(this.linkFactories);
    setup(this.portFactories);
    setup(this.labelFactories);
  }
  /**
   * Gets a model and element under the mouse cursor
   */
  getMouseElement(event2) {
    var target = event2.target;
    var diagramModel = this.model;
    var element = Toolkit.closest(target, ".port[data-name]");
    if (element) {
      var nodeElement = Toolkit.closest(target, ".node[data-nodeid]");
      return diagramModel.getNode(nodeElement.getAttribute("data-nodeid")).getPort(element.getAttribute("data-name"));
    }
    element = Toolkit.closest(target, ".point[data-id]");
    if (element) {
      return diagramModel.getLink(element.getAttribute("data-linkid")).getPointModel(element.getAttribute("data-id"));
    }
    element = Toolkit.closest(target, "[data-linkid]");
    if (element) {
      return diagramModel.getLink(element.getAttribute("data-linkid"));
    }
    element = Toolkit.closest(target, ".node[data-nodeid]");
    if (element) {
      return diagramModel.getNode(element.getAttribute("data-nodeid"));
    }
    return null;
  }
  //!-------------- FACTORIES ------------
  getNodeFactories() {
    return this.nodeFactories;
  }
  getLinkFactories() {
    return this.linkFactories;
  }
  getLabelFactories() {
    return this.labelFactories;
  }
  getPortFactories() {
    return this.portFactories;
  }
  getFactoryForNode(node2) {
    if (typeof node2 === "string") {
      return this.nodeFactories.getFactory(node2);
    }
    return this.nodeFactories.getFactory(node2.getType());
  }
  getFactoryForLink(link) {
    if (typeof link === "string") {
      return this.linkFactories.getFactory(link);
    }
    return this.linkFactories.getFactory(link.getType());
  }
  getFactoryForLabel(label) {
    if (typeof label === "string") {
      return this.labelFactories.getFactory(label);
    }
    return this.labelFactories.getFactory(label.getType());
  }
  getFactoryForPort(port) {
    if (typeof port === "string") {
      return this.portFactories.getFactory(port);
    }
    return this.portFactories.getFactory(port.getType());
  }
  generateWidgetForLink(link) {
    return this.getFactoryForLink(link).generateReactWidget({ model: link });
  }
  generateWidgetForNode(node2) {
    return this.getFactoryForNode(node2).generateReactWidget({ model: node2 });
  }
  getNodeElement(node2) {
    const selector = this.canvas.querySelector(`.node[data-nodeid="${node2.getID()}"]`);
    if (selector === null) {
      throw new Error("Cannot find Node element with nodeID: [" + node2.getID() + "]");
    }
    return selector;
  }
  getNodePortElement(port) {
    var selector = this.canvas.querySelector(`.port[data-name="${port.getName()}"][data-nodeid="${port.getParent().getID()}"]`);
    if (selector === null) {
      throw new Error("Cannot find Node Port element with nodeID: [" + port.getParent().getID() + "] and name: [" + port.getName() + "]");
    }
    return selector;
  }
  getPortCenter(port) {
    return this.getPortCoords(port).getOrigin();
  }
  /**
   * Calculate rectangular coordinates of the port passed in.
   */
  getPortCoords(port, element) {
    if (!this.canvas) {
      throw new Error("Canvas needs to be set first");
    }
    if (!element) {
      element = this.getNodePortElement(port);
    }
    const sourceRect = element.getBoundingClientRect();
    const point = this.getRelativeMousePoint({
      clientX: sourceRect.left,
      clientY: sourceRect.top
    });
    const zoom = this.model.getZoomLevel() / 100;
    return Rectangle.fromPointAndSize(point, sourceRect.width / zoom, sourceRect.height / zoom);
  }
  /**
   * Determine the width and height of the node passed in.
   * It currently assumes nodes have a rectangular shape, can be overriden for customised shapes.
   */
  getNodeDimensions(node2) {
    if (!this.canvas) {
      return {
        width: 0,
        height: 0
      };
    }
    const nodeElement = this.getNodeElement(node2);
    const nodeRect = nodeElement.getBoundingClientRect();
    return {
      width: nodeRect.width,
      height: nodeRect.height
    };
  }
  getBoundingNodesRect(nodes) {
    if (nodes) {
      if (nodes.length === 0) {
        return new Rectangle();
      }
      return new Rectangle(boundingBoxFromPolygons(nodes.map((node2) => node2.getBoundingBox())));
    }
  }
  zoomToFitSelectedNodes(options) {
    const nodes = this.model.getSelectedEntities().filter((entity) => entity instanceof NodeModel);
    this.zoomToFitNodes({
      margin: options.margin,
      maxZoom: options.maxZoom,
      nodes: nodes.length > 0 ? nodes : null
    });
  }
  zoomToFitNodes(options) {
    let margin = options || 0;
    let nodes = [];
    let maxZoom = null;
    if (!!options && typeof options == "object") {
      margin = options.margin || 0;
      nodes = options.nodes || [];
      maxZoom = options.maxZoom || null;
    }
    if (nodes.length === 0) {
      nodes = this.model.getNodes();
    }
    const nodesRect = this.getBoundingNodesRect(nodes);
    if (nodesRect) {
      let canvasRect = this.canvas.getBoundingClientRect();
      const calculate = (margin2 = 0) => {
        const xFactor = this.canvas.clientWidth / (nodesRect.getWidth() + margin2 * 2);
        const yFactor = this.canvas.clientHeight / (nodesRect.getHeight() + margin2 * 2);
        let zoomFactor = xFactor < yFactor ? xFactor : yFactor;
        if (maxZoom && zoomFactor > maxZoom) {
          zoomFactor = maxZoom;
        }
        return {
          zoom: zoomFactor,
          x: canvasRect.width / 2 - ((nodesRect.getWidth() + margin2 * 2) / 2 + nodesRect.getTopLeft().x) * zoomFactor + margin2,
          y: canvasRect.height / 2 - ((nodesRect.getHeight() + margin2 * 2) / 2 + nodesRect.getTopLeft().y) * zoomFactor + margin2
        };
      };
      let params = calculate(0);
      if (margin) {
        if (params.x < margin || params.y < margin) {
          params = calculate(margin);
        }
      }
      this.model.setZoomLevel(params.zoom * 100);
      this.model.setOffset(params.x, params.y);
      this.repaintCanvas();
    }
  }
  getMaxNumberPointsPerLink() {
    return this.maxNumberPointsPerLink;
  }
  setMaxNumberPointsPerLink(max) {
    this.maxNumberPointsPerLink = max;
  }
}
class DefaultLabelModel extends LabelModel {
  constructor(options = {}) {
    super(Object.assign({ offsetY: options.offsetY == null ? -23 : options.offsetY, type: "default" }, options));
  }
  setLabel(label) {
    this.options.label = label;
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.label = event2.data.label;
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { label: this.options.label });
  }
}
var syncFallback3 = function syncFallback4(create) {
  return create();
};
var useInsertionEffect = React$1["useInsertionEffect"] ? React$1["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback3;
var EmotionCacheContext = /* @__PURE__ */ reactExports.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache23(func) {
  return /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
    var cache = reactExports.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* @__PURE__ */ reactExports.createContext({});
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes = function keyframes2() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent23(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp23(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps23(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var Insertion = function Insertion23(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled = function createStyled23(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = reactExports.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as") continue;
        if (
          // $FlowFixMe
          finalShouldForwardProp(_key)
        ) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Insertion, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ reactExports.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled23(nextTag, _extends$2({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
var S$4;
(function(S2) {
  S2.Label = newStyled.div`
		background: rgba(0, 0, 0, 0.8);
		border-radius: 5px;
		color: white;
		font-size: 12px;
		padding: 4px 8px;
		font-family: sans-serif;
		user-select: none;
	`;
})(S$4 || (S$4 = {}));
class DefaultLabelWidget extends reactExports.Component {
  render() {
    return reactExports.createElement(S$4.Label, null, this.props.model.getOptions().label);
  }
}
class DefaultLabelFactory extends AbstractReactFactory {
  constructor() {
    super("default");
  }
  generateReactWidget(event2) {
    return reactExports.createElement(DefaultLabelWidget, { model: event2.model });
  }
  generateModel(event2) {
    return new DefaultLabelModel();
  }
}
class DefaultLinkModel extends LinkModel {
  constructor(options = {}) {
    super(Object.assign({ type: "default", width: options.width || 3, color: options.color || "gray", selectedColor: options.selectedColor || "rgb(0,192,255)", curvyness: 50 }, options));
  }
  calculateControlOffset(port) {
    if (port.getOptions().alignment === PortModelAlignment.RIGHT) {
      return [this.options.curvyness, 0];
    } else if (port.getOptions().alignment === PortModelAlignment.LEFT) {
      return [-this.options.curvyness, 0];
    } else if (port.getOptions().alignment === PortModelAlignment.TOP) {
      return [0, -this.options.curvyness];
    }
    return [0, this.options.curvyness];
  }
  getSVGPath() {
    if (this.points.length == 2) {
      const curve = new BezierCurve();
      curve.setSource(this.getFirstPoint().getPosition());
      curve.setTarget(this.getLastPoint().getPosition());
      curve.setSourceControl(this.getFirstPoint().getPosition().clone());
      curve.setTargetControl(this.getLastPoint().getPosition().clone());
      if (this.sourcePort) {
        curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
      }
      if (this.targetPort) {
        curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
      }
      return curve.getSVGCurve();
    }
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { width: this.options.width, color: this.options.color, curvyness: this.options.curvyness, selectedColor: this.options.selectedColor });
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.color = event2.data.color;
    this.options.width = event2.data.width;
    this.options.curvyness = event2.data.curvyness;
    this.options.selectedColor = event2.data.selectedColor;
  }
  addLabel(label) {
    if (label instanceof LabelModel) {
      return super.addLabel(label);
    }
    let labelOb = new DefaultLabelModel();
    labelOb.setLabel(label);
    return super.addLabel(labelOb);
  }
  setWidth(width) {
    this.options.width = width;
    this.fireEvent({ width }, "widthChanged");
  }
  setColor(color) {
    this.options.color = color;
    this.fireEvent({ color }, "colorChanged");
  }
}
var S$3;
(function(S2) {
  S2.PointTop = newStyled.circle`
		pointer-events: all;
	`;
})(S$3 || (S$3 = {}));
class DefaultLinkPointWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  render() {
    const { point } = this.props;
    return reactExports.createElement(
      "g",
      null,
      reactExports.createElement("circle", { cx: point.getPosition().x, cy: point.getPosition().y, r: 5, fill: this.state.selected || this.props.point.isSelected() ? this.props.colorSelected : this.props.color }),
      reactExports.createElement(S$3.PointTop, { className: "point", onMouseLeave: () => {
        this.setState({ selected: false });
      }, onMouseEnter: () => {
        this.setState({ selected: true });
      }, "data-id": point.getID(), "data-linkid": point.getLink().getID(), cx: point.getPosition().x, cy: point.getPosition().y, r: 15, opacity: 0 })
    );
  }
}
class DefaultLinkSegmentWidget extends reactExports.Component {
  render() {
    const Bottom = reactExports.cloneElement(this.props.factory.generateLinkSegment(this.props.link, this.props.selected || this.props.link.isSelected(), this.props.path), {
      ref: this.props.forwardRef
    });
    const Top = reactExports.cloneElement(Bottom, Object.assign(Object.assign({ strokeLinecap: "round", onMouseLeave: () => {
      this.props.onSelection(false);
    }, onMouseEnter: () => {
      this.props.onSelection(true);
    } }, this.props.extras), { ref: null, "data-linkid": this.props.link.getID(), strokeOpacity: this.props.selected ? 0.1 : 0, strokeWidth: 20, fill: "none", onContextMenu: () => {
      if (!this.props.link.isLocked()) {
        event.preventDefault();
        this.props.link.remove();
      }
    } }));
    return reactExports.createElement(
      "g",
      null,
      Bottom,
      Top
    );
  }
}
const DefaultLinkWidget = (props) => {
  const [selected, setSelected] = reactExports.useState(false);
  const refPaths = reactExports.useRef([]);
  const renderPoints = () => {
    var _a;
    return (_a = props.renderPoints) !== null && _a !== void 0 ? _a : true;
  };
  reactExports.useEffect(() => {
    props.link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean));
    return () => {
      props.link.setRenderedPaths([]);
    };
  }, [props.link]);
  const generateRef = () => {
    const ref = reactExports.createRef();
    refPaths.current.push(ref);
    return ref;
  };
  const addPointToLink = (event2, index2) => {
    if (!event2.shiftKey && !props.link.isLocked() && props.link.getPoints().length - 1 <= props.diagramEngine.getMaxNumberPointsPerLink()) {
      const position2 = props.diagramEngine.getRelativeMousePoint(event2);
      const point = props.link.point(position2.x, position2.y, index2);
      event2.persist();
      event2.stopPropagation();
      props.diagramEngine.getActionEventBus().fireAction({
        event: event2,
        model: point
      });
    }
  };
  const generatePoint = (point) => {
    var _a;
    return reactExports.createElement(DefaultLinkPointWidget, { key: point.getID(), point, colorSelected: (_a = props.link.getOptions().selectedColor) !== null && _a !== void 0 ? _a : "", color: props.link.getOptions().color });
  };
  const generateLink = (path, extraProps, id2) => {
    return reactExports.createElement(DefaultLinkSegmentWidget, { key: `link-${id2}`, path, selected, diagramEngine: props.diagramEngine, factory: props.diagramEngine.getFactoryForLink(props.link), link: props.link, forwardRef: generateRef(), onSelection: setSelected, extras: extraProps });
  };
  const points = props.link.getPoints();
  const paths = [];
  refPaths.current = [];
  if (points.length === 2) {
    paths.push(generateLink(props.link.getSVGPath(), {
      onMouseDown: (event2) => {
        var _a;
        (_a = props.selected) === null || _a === void 0 ? void 0 : _a.call(props, event2);
        addPointToLink(event2, 1);
      }
    }, "0"));
    if (props.link.getTargetPort() == null) {
      paths.push(generatePoint(points[1]));
    }
  } else {
    for (let j2 = 0; j2 < points.length - 1; j2++) {
      paths.push(generateLink(LinkWidget.generateLinePath(points[j2], points[j2 + 1]), {
        "data-linkid": props.link.getID(),
        "data-point": j2,
        onMouseDown: (event2) => {
          var _a;
          (_a = props.selected) === null || _a === void 0 ? void 0 : _a.call(props, event2);
          addPointToLink(event2, j2 + 1);
        }
      }, j2));
    }
    if (renderPoints()) {
      for (let i = 1; i < points.length - 1; i++) {
        paths.push(generatePoint(points[i]));
      }
      if (props.link.getTargetPort() == null) {
        paths.push(generatePoint(points[points.length - 1]));
      }
    }
  }
  return reactExports.createElement("g", { "data-default-link-test": props.link.getOptions().testName }, paths);
};
var S$2;
(function(S2) {
  S2.Keyframes = keyframes`
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;
  const selected = css`
		stroke-dasharray: 10, 2;
		animation: ${S2.Keyframes} 1s linear infinite;
	`;
  S2.Path = newStyled.path`
		${(p2) => p2.selected && selected};
		fill: none;
		pointer-events: auto;
	`;
})(S$2 || (S$2 = {}));
class DefaultLinkFactory extends AbstractReactFactory {
  constructor(type = "default") {
    super(type);
  }
  generateReactWidget(event2) {
    return reactExports.createElement(DefaultLinkWidget, { link: event2.model, diagramEngine: this.engine });
  }
  generateModel(event2) {
    return new DefaultLinkModel();
  }
  generateLinkSegment(model, selected, path) {
    return reactExports.createElement(S$2.Path, { selected, stroke: selected ? model.getOptions().selectedColor : model.getOptions().color, strokeWidth: model.getOptions().width, d: path });
  }
}
class DefaultPortModel extends PortModel {
  constructor(options, name, label) {
    if (!!name) {
      options = {
        in: !!options,
        name,
        label
      };
    }
    options = options;
    super(Object.assign({ label: options.label || options.name, alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT, type: "default" }, options));
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.in = event2.data.in;
    this.options.label = event2.data.label;
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { in: this.options.in, label: this.options.label });
  }
  link(port, factory) {
    let link = this.createLinkModel(factory);
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }
  canLinkToPort(port) {
    if (port instanceof DefaultPortModel) {
      return this.options.in !== port.getOptions().in;
    }
    return true;
  }
  createLinkModel(factory) {
    let link = super.createLinkModel();
    if (!link && factory) {
      return factory.generateModel({});
    }
    return link || new DefaultLinkModel();
  }
}
class DefaultNodeModel extends NodeModel {
  constructor(options = {}, color) {
    if (typeof options === "string") {
      options = {
        name: options,
        color
      };
    }
    super(Object.assign({ type: "default", name: "Untitled", color: "rgb(0,192,255)" }, options));
    this.portsOut = [];
    this.portsIn = [];
  }
  doClone(lookupTable, clone) {
    clone.portsIn = [];
    clone.portsOut = [];
    super.doClone(lookupTable, clone);
  }
  removePort(port) {
    super.removePort(port);
    if (port.getOptions().in) {
      this.portsIn.splice(this.portsIn.indexOf(port), 1);
    } else {
      this.portsOut.splice(this.portsOut.indexOf(port), 1);
    }
  }
  addPort(port) {
    super.addPort(port);
    if (port.getOptions().in) {
      if (this.portsIn.indexOf(port) === -1) {
        this.portsIn.push(port);
      }
    } else {
      if (this.portsOut.indexOf(port) === -1) {
        this.portsOut.push(port);
      }
    }
    return port;
  }
  addInPort(label, after = true) {
    const p2 = new DefaultPortModel({
      in: true,
      name: label,
      label,
      alignment: PortModelAlignment.LEFT
    });
    if (!after) {
      this.portsIn.splice(0, 0, p2);
    }
    return this.addPort(p2);
  }
  addOutPort(label, after = true) {
    const p2 = new DefaultPortModel({
      in: false,
      name: label,
      label,
      alignment: PortModelAlignment.RIGHT
    });
    if (!after) {
      this.portsOut.splice(0, 0, p2);
    }
    return this.addPort(p2);
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.options.name = event2.data.name;
    this.options.color = event2.data.color;
    this.portsIn = _map(event2.data.portsInOrder, (id2) => {
      return this.getPortFromID(id2);
    });
    this.portsOut = _map(event2.data.portsOutOrder, (id2) => {
      return this.getPortFromID(id2);
    });
  }
  serialize() {
    return Object.assign(Object.assign({}, super.serialize()), { name: this.options.name, color: this.options.color, portsInOrder: _map(this.portsIn, (port) => {
      return port.getID();
    }), portsOutOrder: _map(this.portsOut, (port) => {
      return port.getID();
    }) });
  }
  getInPorts() {
    return this.portsIn;
  }
  getOutPorts() {
    return this.portsOut;
  }
}
var S$1;
(function(S2) {
  S2.PortLabel = newStyled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;
  S2.Label = newStyled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;
  S2.Port = newStyled.div`
		width: 15px;
		height: 15px;
		background: rgba(255, 255, 255, 0.1);

		&:hover {
			background: rgb(192, 255, 0);
		}
	`;
})(S$1 || (S$1 = {}));
class DefaultPortLabel extends reactExports.Component {
  render() {
    const port = reactExports.createElement(
      PortWidget,
      { engine: this.props.engine, port: this.props.port },
      reactExports.createElement(S$1.Port, null)
    );
    const label = reactExports.createElement(S$1.Label, null, this.props.port.getOptions().label);
    return reactExports.createElement(
      S$1.PortLabel,
      null,
      this.props.port.getOptions().in ? port : label,
      this.props.port.getOptions().in ? label : port
    );
  }
}
var S;
(function(S2) {
  S2.Node = newStyled.div`
		background-color: ${(p2) => p2.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${(p2) => p2.selected ? "rgb(0,192,255)" : "black"};
	`;
  S2.Title = newStyled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;
  S2.TitleName = newStyled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;
  S2.Ports = newStyled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;
  S2.PortsContainer = newStyled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
})(S || (S = {}));
class DefaultNodeWidget extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.generatePort = (port) => {
      return reactExports.createElement(DefaultPortLabel, { engine: this.props.engine, port, key: port.getID() });
    };
  }
  render() {
    return reactExports.createElement(
      S.Node,
      { "data-default-node-name": this.props.node.getOptions().name, selected: this.props.node.isSelected(), background: this.props.node.getOptions().color },
      reactExports.createElement(
        S.Title,
        null,
        reactExports.createElement(S.TitleName, null, this.props.node.getOptions().name)
      ),
      reactExports.createElement(
        S.Ports,
        null,
        reactExports.createElement(S.PortsContainer, null, _map(this.props.node.getInPorts(), this.generatePort)),
        reactExports.createElement(S.PortsContainer, null, _map(this.props.node.getOutPorts(), this.generatePort))
      )
    );
  }
}
class DefaultNodeFactory extends AbstractReactFactory {
  constructor() {
    super("default");
  }
  generateReactWidget(event2) {
    return reactExports.createElement(DefaultNodeWidget, { engine: this.engine, node: event2.model });
  }
  generateModel(event2) {
    return new DefaultNodeModel();
  }
}
class DefaultPortFactory extends AbstractModelFactory {
  constructor() {
    super("default");
  }
  generateModel() {
    return new DefaultPortModel({
      name: "unknown"
    });
  }
}
class PathFindingLinkModel extends DefaultLinkModel {
  constructor(options = {}) {
    super(Object.assign({ type: PathFindingLinkFactory.NAME }, options));
  }
  performanceTune() {
    return false;
  }
}
const pathFinderInstance = new pathfinding.JumpPointFinder({
  heuristic: pathfinding.Heuristic.manhattan,
  diagonalMovement: pathfinding.DiagonalMovement.Never
});
class PathFinding {
  constructor(factory) {
    this.instance = pathFinderInstance;
    this.factory = factory;
  }
  /**
   * Taking as argument a fully unblocked walking matrix, this method
   * finds a direct path from point A to B.
   */
  calculateDirectPath(from2, to) {
    const matrix = this.factory.getCanvasMatrix();
    const grid = new pathfinding.Grid(matrix);
    return pathFinderInstance.findPath(this.factory.translateRoutingX(Math.floor(from2.getX() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingY(Math.floor(from2.getY() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingX(Math.floor(to.getX() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingY(Math.floor(to.getY() / this.factory.ROUTING_SCALING_FACTOR)), grid);
  }
  /**
   * Using @link{#calculateDirectPath}'s result as input, we here
   * determine the first walkable point found in the matrix that includes
   * blocked paths.
   */
  calculateLinkStartEndCoords(matrix, path) {
    const startIndex = path.findIndex((point) => {
      if (matrix[point[1]])
        return matrix[point[1]][point[0]] === 0;
      else
        return false;
    });
    const endIndex = path.length - 1 - path.slice().reverse().findIndex((point) => {
      if (matrix[point[1]])
        return matrix[point[1]][point[0]] === 0;
      else
        return false;
    });
    if (startIndex === -1 || endIndex === -1) {
      return void 0;
    }
    const pathToStart = path.slice(0, startIndex);
    const pathToEnd = path.slice(endIndex);
    return {
      start: {
        x: path[startIndex][0],
        y: path[startIndex][1]
      },
      end: {
        x: path[endIndex][0],
        y: path[endIndex][1]
      },
      pathToStart,
      pathToEnd
    };
  }
  /**
   * Puts everything together: merges the paths from/to the centre of the ports,
   * with the path calculated around other elements.
   */
  calculateDynamicPath(routingMatrix, start, end, pathToStart, pathToEnd) {
    const grid = new pathfinding.Grid(routingMatrix);
    const dynamicPath = pathFinderInstance.findPath(start.x, start.y, end.x, end.y, grid);
    const pathCoords = pathToStart.concat(dynamicPath, pathToEnd).map((coords) => [
      this.factory.translateRoutingX(coords[0], true),
      this.factory.translateRoutingY(coords[1], true)
    ]);
    return pathfinding.Util.compressPath(pathCoords);
  }
}
class PathFindingLinkWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.refPaths = [];
    this.state = {
      selected: false
    };
    this.pathFinding = new PathFinding(this.props.factory);
  }
  componentDidUpdate() {
    this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
      return ref.current;
    }));
  }
  componentDidMount() {
    this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
      return ref.current;
    }));
  }
  componentWillUnmount() {
    this.props.link.setRenderedPaths([]);
  }
  generateLink(path, id2) {
    const ref = reactExports.createRef();
    this.refPaths.push(ref);
    return reactExports.createElement(DefaultLinkSegmentWidget, { key: `link-${id2}`, path, selected: this.state.selected, diagramEngine: this.props.diagramEngine, factory: this.props.diagramEngine.getFactoryForLink(this.props.link), link: this.props.link, forwardRef: ref, onSelection: (selected) => {
      this.setState({ selected });
    }, extras: {} });
  }
  render() {
    this.refPaths = [];
    var points = this.props.link.getPoints();
    var paths = [];
    const directPathCoords = this.pathFinding.calculateDirectPath(_first(points), _last(points));
    const routingMatrix = this.props.factory.getRoutingMatrix();
    const smartLink = this.pathFinding.calculateLinkStartEndCoords(routingMatrix, directPathCoords);
    if (smartLink) {
      const { start, end, pathToStart, pathToEnd } = smartLink;
      const simplifiedPath = this.pathFinding.calculateDynamicPath(routingMatrix, start, end, pathToStart, pathToEnd);
      paths.push(
        //smooth: boolean, extraProps: any, id: string | number, firstPoint: PointModel, lastPoint: PointModel
        this.generateLink(this.props.factory.generateDynamicPath(simplifiedPath), "0")
      );
    }
    return reactExports.createElement(reactExports.Fragment, null, paths);
  }
}
class PathFindingLinkFactory extends DefaultLinkFactory {
  constructor() {
    super(PathFindingLinkFactory.NAME);
    this.ROUTING_SCALING_FACTOR = 5;
    this.canvasMatrix = [];
    this.routingMatrix = [];
    this.hAdjustmentFactor = 0;
    this.vAdjustmentFactor = 0;
    this.calculateMatrixDimensions = () => {
      const allNodesCoords = _values(this.engine.getModel().getNodes()).map((item) => ({
        x: item.getX(),
        width: item.width,
        y: item.getY(),
        height: item.height
      }));
      const allLinks = _values(this.engine.getModel().getLinks());
      const allPortsCoords = _flatMap(allLinks.map((link) => [link.getSourcePort(), link.getTargetPort()])).filter((port) => port !== null).map((item) => ({
        x: item.getX(),
        width: item.width,
        y: item.getY(),
        height: item.height
      }));
      const allPointsCoords = _flatMap(allLinks.map((link) => link.getPoints())).map((item) => ({
        // points don't have width/height, so let's just use 0
        x: item.getX(),
        width: 0,
        y: item.getY(),
        height: 0
      }));
      const sumProps = (object, props) => _reduce(props, (acc, prop) => acc + _get(object, prop, 0), 0);
      const canvas = this.engine.getCanvas();
      const concatedCoords = _concat(allNodesCoords, allPortsCoords, allPointsCoords);
      const minX = Math.floor(Math.min(_get(_minBy(concatedCoords, "x"), "x", 0), 0) / this.ROUTING_SCALING_FACTOR) * this.ROUTING_SCALING_FACTOR;
      const maxXElement = _maxBy(concatedCoords, (item) => sumProps(item, ["x", "width"]));
      const maxX = Math.max(sumProps(maxXElement, ["x", "width"]), canvas.offsetWidth);
      const minYCoords = _minBy(concatedCoords, "y");
      const minY = Math.floor(Math.min(_get(minYCoords, "y", 0), 0) / this.ROUTING_SCALING_FACTOR) * this.ROUTING_SCALING_FACTOR;
      const maxYElement = _maxBy(concatedCoords, (item) => sumProps(item, ["y", "height"]));
      const maxY = Math.max(sumProps(maxYElement, ["y", "height"]), canvas.offsetHeight);
      return {
        width: Math.ceil(Math.abs(minX) + maxX),
        hAdjustmentFactor: Math.abs(minX) / this.ROUTING_SCALING_FACTOR + 1,
        height: Math.ceil(Math.abs(minY) + maxY),
        vAdjustmentFactor: Math.abs(minY) / this.ROUTING_SCALING_FACTOR + 1
      };
    };
    this.markNodes = (matrix) => {
      _values(this.engine.getModel().getNodes()).forEach((node2) => {
        const startX = Math.floor(node2.getX() / this.ROUTING_SCALING_FACTOR);
        const endX = Math.ceil((node2.getX() + node2.width) / this.ROUTING_SCALING_FACTOR);
        const startY = Math.floor(node2.getY() / this.ROUTING_SCALING_FACTOR);
        const endY = Math.ceil((node2.getY() + node2.height) / this.ROUTING_SCALING_FACTOR);
        for (let x2 = startX - 1; x2 <= endX + 1; x2++) {
          for (let y2 = startY - 1; y2 < endY + 1; y2++) {
            this.markMatrixPoint(matrix, this.translateRoutingX(x2), this.translateRoutingY(y2));
          }
        }
      });
    };
    this.markPorts = (matrix) => {
      const allElements = _flatMap(_values(this.engine.getModel().getLinks()).map((link) => [].concat(link.getSourcePort(), link.getTargetPort())));
      allElements.filter((port) => port !== null).forEach((port) => {
        const startX = Math.floor(port.x / this.ROUTING_SCALING_FACTOR);
        const endX = Math.ceil((port.x + port.width) / this.ROUTING_SCALING_FACTOR);
        const startY = Math.floor(port.y / this.ROUTING_SCALING_FACTOR);
        const endY = Math.ceil((port.y + port.height) / this.ROUTING_SCALING_FACTOR);
        for (let x2 = startX - 1; x2 <= endX + 1; x2++) {
          for (let y2 = startY - 1; y2 < endY + 1; y2++) {
            this.markMatrixPoint(matrix, this.translateRoutingX(x2), this.translateRoutingY(y2));
          }
        }
      });
    };
    this.markMatrixPoint = (matrix, x2, y2) => {
      if (matrix[y2] !== void 0 && matrix[y2][x2] !== void 0) {
        matrix[y2][x2] = 1;
      }
    };
  }
  setDiagramEngine(engine) {
    super.setDiagramEngine(engine);
    engine.getStateMachine().registerListener({
      stateChanged: (event2) => {
        if (event2.newState instanceof AbstractDisplacementState) {
          const deRegister = engine.getActionEventBus().registerAction(new Action({
            type: InputType.MOUSE_UP,
            fire: () => {
              this.calculateRoutingMatrix();
              engine.repaintCanvas();
              deRegister();
            }
          }));
        }
      }
    });
    this.listener = engine.registerListener({
      canvasReady: () => {
        _defer(() => {
          this.calculateRoutingMatrix();
          engine.repaintCanvas();
        });
      }
    });
  }
  setFactoryBank(bank) {
    super.setFactoryBank(bank);
    if (!bank && this.listener) {
      this.listener.deregister();
    }
  }
  generateReactWidget(event2) {
    return reactExports.createElement(PathFindingLinkWidget, { diagramEngine: this.engine, link: event2.model, factory: this });
  }
  generateModel(event2) {
    return new PathFindingLinkModel();
  }
  /**
   * A representation of the canvas in the following format:
   *
   * +-----------------+
   * | 0 0 0 0 0 0 0 0 |
   * | 0 0 0 0 0 0 0 0 |
   * | 0 0 0 0 0 0 0 0 |
   * | 0 0 0 0 0 0 0 0 |
   * | 0 0 0 0 0 0 0 0 |
   * +-----------------+
   *
   * In which all walkable points are marked by zeros.
   * It uses @link{#ROUTING_SCALING_FACTOR} to reduce the matrix dimensions and improve performance.
   */
  getCanvasMatrix() {
    if (this.canvasMatrix.length === 0) {
      this.calculateCanvasMatrix();
    }
    return this.canvasMatrix;
  }
  calculateCanvasMatrix() {
    const { width: canvasWidth, hAdjustmentFactor, height: canvasHeight, vAdjustmentFactor } = this.calculateMatrixDimensions();
    this.hAdjustmentFactor = hAdjustmentFactor;
    this.vAdjustmentFactor = vAdjustmentFactor;
    const matrixWidth = Math.ceil(canvasWidth / this.ROUTING_SCALING_FACTOR);
    const matrixHeight = Math.ceil(canvasHeight / this.ROUTING_SCALING_FACTOR);
    this.canvasMatrix = _range(0, matrixHeight).map(() => {
      return new Array(matrixWidth).fill(0);
    });
  }
  /**
   * A representation of the canvas in the following format:
   *
   * +-----------------+
   * | 0 0 1 1 0 0 0 0 |
   * | 0 0 1 1 0 0 1 1 |
   * | 0 0 0 0 0 0 1 1 |
   * | 1 1 0 0 0 0 0 0 |
   * | 1 1 0 0 0 0 0 0 |
   * +-----------------+
   *
   * In which all points blocked by a node (and its ports) are
   * marked as 1; points were there is nothing (ie, free) receive 0.
   */
  getRoutingMatrix() {
    if (this.routingMatrix.length === 0) {
      this.calculateRoutingMatrix();
    }
    return this.routingMatrix;
  }
  calculateRoutingMatrix() {
    const matrix = _cloneDeep(this.getCanvasMatrix());
    this.markNodes(matrix);
    this.markPorts(matrix);
    this.routingMatrix = matrix;
  }
  /**
   * The routing matrix does not have negative indexes, but elements could be negatively positioned.
   * We use the functions below to translate back and forth between these coordinates, relying on the
   * calculated values of hAdjustmentFactor and vAdjustmentFactor.
   */
  translateRoutingX(x2, reverse = false) {
    return x2 + this.hAdjustmentFactor * (reverse ? -1 : 1);
  }
  translateRoutingY(y2, reverse = false) {
    return y2 + this.vAdjustmentFactor * (reverse ? -1 : 1);
  }
  generateDynamicPath(pathCoords) {
    let path = Path();
    path = path.moveto(pathCoords[0][0] * this.ROUTING_SCALING_FACTOR, pathCoords[0][1] * this.ROUTING_SCALING_FACTOR);
    pathCoords.slice(1).forEach((coords) => {
      path = path.lineto(coords[0] * this.ROUTING_SCALING_FACTOR, coords[1] * this.ROUTING_SCALING_FACTOR);
    });
    return path.print();
  }
}
PathFindingLinkFactory.NAME = "pathfinding";
class RightAngleLinkWidget extends reactExports.Component {
  constructor(props) {
    super(props);
    this.handleMove = (function(event2) {
      this.draggingEvent(event2, this.dragging_index);
    }).bind(this);
    this.handleUp = (function(event2) {
      this.setState({ canDrag: false, selected: false });
      window.removeEventListener("mousemove", this.handleMove);
      window.removeEventListener("mouseup", this.handleUp);
    }).bind(this);
    this.refPaths = [];
    this.state = {
      selected: false,
      canDrag: false
    };
    this.dragging_index = 0;
  }
  componentDidUpdate() {
    this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
      return ref.current;
    }));
  }
  componentDidMount() {
    this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
      return ref.current;
    }));
  }
  componentWillUnmount() {
    this.props.link.setRenderedPaths([]);
  }
  generateLink(path, extraProps, id2) {
    const ref = reactExports.createRef();
    this.refPaths.push(ref);
    return reactExports.createElement(DefaultLinkSegmentWidget, { key: `link-${id2}`, path, selected: this.state.selected, diagramEngine: this.props.diagramEngine, factory: this.props.diagramEngine.getFactoryForLink(this.props.link), link: this.props.link, forwardRef: ref, onSelection: (selected) => {
      this.setState({ selected });
    }, extras: extraProps });
  }
  calculatePositions(points, event2, index2, coordinate) {
    if (index2 === 0) {
      let point = new PointModel({
        link: this.props.link,
        position: new Point(points[index2].getX(), points[index2].getY())
      });
      this.props.link.addPoint(point, index2);
      this.dragging_index++;
      return;
    } else if (index2 === points.length - 2) {
      let point = new PointModel({
        link: this.props.link,
        position: new Point(points[index2 + 1].getX(), points[index2 + 1].getY())
      });
      this.props.link.addPoint(point, index2 + 1);
      return;
    }
    if (index2 - 2 > 0) {
      let _points2 = {
        [index2 - 2]: points[index2 - 2].getPosition(),
        [index2 + 1]: points[index2 + 1].getPosition(),
        [index2 - 1]: points[index2 - 1].getPosition()
      };
      if (Math.abs(_points2[index2 - 1][coordinate] - _points2[index2 + 1][coordinate]) < 5) {
        _points2[index2 - 2][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event2)[coordinate];
        _points2[index2 + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event2)[coordinate];
        points[index2 - 2].setPosition(_points2[index2 - 2]);
        points[index2 + 1].setPosition(_points2[index2 + 1]);
        points[index2 - 1].remove();
        points[index2 - 1].remove();
        this.dragging_index--;
        this.dragging_index--;
        return;
      }
    }
    if (index2 + 2 < points.length - 2) {
      let _points2 = {
        [index2 + 3]: points[index2 + 3].getPosition(),
        [index2 + 2]: points[index2 + 2].getPosition(),
        [index2 + 1]: points[index2 + 1].getPosition(),
        [index2]: points[index2].getPosition()
      };
      if (Math.abs(_points2[index2 + 1][coordinate] - _points2[index2 + 2][coordinate]) < 5) {
        _points2[index2][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event2)[coordinate];
        _points2[index2 + 3][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event2)[coordinate];
        points[index2].setPosition(_points2[index2]);
        points[index2 + 3].setPosition(_points2[index2 + 3]);
        points[index2 + 1].remove();
        points[index2 + 1].remove();
        return;
      }
    }
    let _points = {
      [index2]: points[index2].getPosition(),
      [index2 + 1]: points[index2 + 1].getPosition()
    };
    _points[index2][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event2)[coordinate];
    _points[index2 + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event2)[coordinate];
    points[index2].setPosition(_points[index2]);
    points[index2 + 1].setPosition(_points[index2 + 1]);
  }
  draggingEvent(event2, index2) {
    let points = this.props.link.getPoints();
    let dx = Math.abs(points[index2].getX() - points[index2 + 1].getX());
    let dy = Math.abs(points[index2].getY() - points[index2 + 1].getY());
    if (dx === 0) {
      this.calculatePositions(points, event2, index2, "x");
    } else if (dy === 0) {
      this.calculatePositions(points, event2, index2, "y");
    }
    this.props.link.setFirstAndLastPathsDirection();
  }
  render() {
    let points = this.props.link.getPoints();
    let paths = [];
    let pointLeft = points[0];
    let pointRight = points[points.length - 1];
    let hadToSwitch = false;
    if (pointLeft.getX() > pointRight.getX()) {
      pointLeft = points[points.length - 1];
      pointRight = points[0];
      hadToSwitch = true;
    }
    let dy = Math.abs(points[0].getY() - points[points.length - 1].getY());
    if (this.props.link.getTargetPort() === null && points.length === 2) {
      [...Array(2)].forEach((item) => {
        this.props.link.addPoint(new PointModel({
          link: this.props.link,
          position: new Point(pointLeft.getX(), pointRight.getY())
        }), 1);
      });
      this.props.link.setManuallyFirstAndLastPathsDirection(true, true);
    } else if (this.props.link.getTargetPort() === null && this.props.link.getSourcePort() !== null) {
      points[1].setPosition(pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2, !hadToSwitch ? pointLeft.getY() : pointRight.getY());
      points[2].setPosition(pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2, !hadToSwitch ? pointRight.getY() : pointLeft.getY());
    } else if (!this.state.canDrag && points.length > 2) {
      for (let i = 1; i < points.length; i += points.length - 2) {
        if (i - 1 === 0) {
          if (this.props.link.getFirstPathXdirection()) {
            points[i].setPosition(points[i].getX(), points[i - 1].getY());
          } else {
            points[i].setPosition(points[i - 1].getX(), points[i].getY());
          }
        } else {
          if (this.props.link.getLastPathXdirection()) {
            points[i - 1].setPosition(points[i - 1].getX(), points[i].getY());
          } else {
            points[i - 1].setPosition(points[i].getX(), points[i - 1].getY());
          }
        }
      }
    }
    if (points.length === 2 && dy !== 0 && !this.state.canDrag) {
      this.props.link.addPoint(new PointModel({
        link: this.props.link,
        position: new Point(pointLeft.getX(), pointRight.getY())
      }));
    }
    for (let j2 = 0; j2 < points.length - 1; j2++) {
      paths.push(this.generateLink(LinkWidget.generateLinePath(points[j2], points[j2 + 1]), {
        "data-linkid": this.props.link.getID(),
        "data-point": j2,
        onMouseDown: (event2) => {
          if (event2.button === 0) {
            this.setState({ canDrag: true });
            this.dragging_index = j2;
            window.addEventListener("mousemove", this.handleMove);
            window.addEventListener("mouseup", this.handleUp);
          }
        },
        onMouseEnter: (event2) => {
          this.setState({ selected: true });
          this.props.link.lastHoverIndexOfPath = j2;
        }
      }, j2));
    }
    this.refPaths = [];
    return reactExports.createElement("g", { "data-default-link-test": this.props.link.getOptions().testName }, paths);
  }
}
RightAngleLinkWidget.defaultProps = {
  color: "red",
  width: 3,
  link: null,
  smooth: false,
  diagramEngine: null,
  factory: null
};
class RightAngleLinkModel extends DefaultLinkModel {
  constructor(options = {}) {
    super(Object.assign({ type: RightAngleLinkFactory.NAME }, options));
    this.lastHoverIndexOfPath = 0;
    this._lastPathXdirection = false;
    this._firstPathXdirection = false;
  }
  setFirstAndLastPathsDirection() {
    let points = this.getPoints();
    for (let i = 1; i < points.length; i += points.length - 2) {
      let dx = Math.abs(points[i].getX() - points[i - 1].getX());
      let dy = Math.abs(points[i].getY() - points[i - 1].getY());
      if (i - 1 === 0) {
        this._firstPathXdirection = dx > dy;
      } else {
        this._lastPathXdirection = dx > dy;
      }
    }
  }
  // @ts-ignore
  addPoint(pointModel, index2 = 1) {
    super.addPoint(pointModel, index2);
    this.setFirstAndLastPathsDirection();
    return pointModel;
  }
  deserialize(event2) {
    super.deserialize(event2);
    this.setFirstAndLastPathsDirection();
  }
  setManuallyFirstAndLastPathsDirection(first, last) {
    this._firstPathXdirection = first;
    this._lastPathXdirection = last;
  }
  getLastPathXdirection() {
    return this._lastPathXdirection;
  }
  getFirstPathXdirection() {
    return this._firstPathXdirection;
  }
  setWidth(width) {
    this.options.width = width;
    this.fireEvent({ width }, "widthChanged");
  }
  setColor(color) {
    this.options.color = color;
    this.fireEvent({ color }, "colorChanged");
  }
}
class RightAngleLinkFactory extends DefaultLinkFactory {
  constructor() {
    super(RightAngleLinkFactory.NAME);
  }
  generateModel(event2) {
    return new RightAngleLinkModel();
  }
  generateReactWidget(event2) {
    return reactExports.createElement(RightAngleLinkWidget, { diagramEngine: this.engine, link: event2.model, factory: this });
  }
}
RightAngleLinkFactory.NAME = "rightAngle";
export {
  AbstractModelFactory as A,
  CanvasWidget as C,
  DefaultLinkModel as D,
  LinkLayerFactory as L,
  NodeModel as N,
  PortWidget as P,
  React as R,
  SelectionBoxLayerFactory as S,
  Ye as Y,
  reactDomExports as a,
  PortModelAlignment as b,
  PortModel as c,
  dt as d,
  DiagramEngine as e,
  NodeLayerFactory as f,
  DefaultLabelFactory as g,
  DefaultNodeFactory as h,
  DefaultLinkFactory as i,
  PathFindingLinkFactory as j,
  DefaultPortFactory as k,
  DiagramModel as l,
  mt as m,
  State as n,
  SelectingState as o,
  AbstractReactFactory as p,
  LinkWidget as q,
  reactExports as r,
  DefaultLinkPointWidget as s,
  DefaultLinkSegmentWidget as t,
  useIMask as u,
  jsxRuntimeExports as v,
  hastToReact as w,
  ft as x,
  isPropValid as y,
  client as z
};
