var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { b as buffer, n as nanoid, E as EventEmitter } from "./vendor-pImuYRDH.js";
import { r as reactExports, R as React } from "./react-d2mL4C0e.js";
const VUtils = {
  isEmpty: (v) => v == null || typeof v === "string" && v.length === 0,
  isNotEmpty: (v) => (v ?? "") !== "",
  isBlank: (v) => v == null || typeof v === "string" && v.trim().length === 0,
  isNotBlank: (v) => v != null && `${v}`.trim().length !== 0,
  isPrimitive: (v) => v != null && ["string", "number", "boolean", "symbol", "bigint"].includes(typeof v),
  isNumber: (v) => {
    if (VUtils.isBlank(v)) {
      return { test: false };
    }
    switch (typeof v) {
      case "number":
        return { test: true, value: v };
      case "string": {
        const n = Number(v);
        return Number.isNaN(n) ? { test: false } : { test: true, value: n };
      }
      default:
        return { test: false };
    }
  },
  assertNumber: (v, assert) => {
    const result = VUtils.isNumber(v);
    if (!result.test) {
      return result;
    } else if (assert(result.value)) {
      return result;
    } else {
      return { test: false };
    }
  },
  isInteger: (v) => VUtils.assertNumber(v, Number.isInteger),
  isNotInteger: (v) => VUtils.assertNumber(v, (v2) => !Number.isInteger(v2)),
  isPositive: (v) => VUtils.assertNumber(v, (v2) => v2 > 0),
  isNotPositive: (v) => VUtils.assertNumber(v, (v2) => v2 <= 0),
  isNegative: (v) => VUtils.assertNumber(v, (v2) => v2 < 0),
  isNotNegative: (v) => VUtils.assertNumber(v, (v2) => v2 >= 0),
  isFunction: (v) => v != null && typeof v === "function",
  base64Encode: (str) => Buffer.from(str, "utf-8").toString("base64"),
  base64Decode: (str) => Buffer.from(str, "base64").toString("utf-8"),
  generateUniqueId: () => nanoid(),
  noop: () => void 0
};
class EnhancedLogger {
  constructor(to) {
    __publicField(this, "to");
    __publicField(this, "_logger");
    __publicField(this, "_enabledLevels");
    __publicField(this, "_enablement", {});
    __publicField(this, "_printers", {});
    this.to = to;
    this._logger = to;
    this._enabledLevels = ["warn", "error"];
  }
  get logger() {
    return this._logger;
  }
  enableLevel(level) {
    if (this._enabledLevels.includes(level))
      ;
    else {
      const levels = ["debug", "trace", "log", "info", "warn", "error"];
      const foundIndex = levels.indexOf(level);
      this._enabledLevels = levels.filter((level2, index) => {
        return index >= foundIndex;
      });
    }
  }
  disableLevel(level) {
    if (!this._enabledLevels.includes(level))
      ;
    else {
      const levels = ["debug", "trace", "log", "info", "warn", "error"];
      const foundIndex = levels.indexOf(level);
      this._enabledLevels = levels.filter((level2, index) => {
        return index > foundIndex;
      });
    }
  }
  enable(name) {
    if (["debug", "trace", "log", "info", "warn", "error"].some((level) => name.endsWith(`.${level}`))) {
      this._enablement[name] = true;
    } else {
      ["debug", "trace", "log", "info", "warn", "error"].forEach((level) => {
        this._enablement[`${name}.${level}`] = true;
      });
    }
  }
  disable(name) {
    if (["debug", "trace", "log", "info", "warn", "error"].some((level) => name.endsWith(`.${level}`))) {
      this._enablement[name] = false;
    } else {
      ["debug", "trace", "log", "info", "warn", "error"].forEach((level) => {
        this._enablement[`${name}.${level}`] = false;
      });
    }
  }
  isEnabled(name) {
    if (this._enablement[name] === false) {
      return false;
    } else if (this._enablement[name] === true) {
      return true;
    } else {
      if (this._enabledLevels.some((level) => name.endsWith(`.${level}`))) {
        return true;
      } else {
        return false;
      }
    }
  }
  takeover(to) {
    this._logger = to ?? console;
  }
  restore() {
    this._logger = console;
  }
  createPrinter(level) {
    return (...data) => {
      const date = /* @__PURE__ */ new Date();
      if (data == null || data.length <= 1) {
        this.logger[level](`%c[UNKNOWN LOCATION] %c[${level.toUpperCase()}] %c[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`, "color: #871094", "color: #0033B3", "color: #9E880D", ...data);
      } else {
        const key = data.pop();
        if (this.isEnabled(`${key}.${level}`)) {
          this.logger[level](`%c[${key}] %c[${level.toUpperCase()}] %c[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`, "color: #871094", "color: #0033B3", "color: #9E880D", ...data);
        }
      }
    };
  }
  print(level) {
    if (this._printers[level] == null) {
      this._printers[level] = this.createPrinter(level);
    }
    return this._printers[level];
  }
}
const createLogger = () => {
  return new Proxy(new EnhancedLogger(console), {
    get(target, p) {
      if (p === "takeover") {
        return target.takeover;
      } else if (p === "restore") {
        return target.restore;
      } else if (["debug", "trace", "log", "info", "warn", "error"].includes(p)) {
        return target.print(p);
      } else {
        return target[p] ?? VUtils.noop;
      }
    }
  });
};
const N1Logger = createLogger();
const PROPERTY_PATH_ME = ".";
const PROPERTY_PATH_ROOT = "/";
const PROPERTY_PATH_JOINER = ".";
const PPUtils = {
  legalize: (pp) => (pp || "").trim() || PROPERTY_PATH_ME,
  isLevelStayed: (pp) => PPUtils.legalize(pp) === PROPERTY_PATH_ME,
  segments: (pp) => pp.split(".").map((p) => p.trim()).filter((p) => p.length !== 0),
  concat: (...paths) => {
    if (paths == null || paths.length === 0) {
      return PROPERTY_PATH_ROOT;
    } else {
      const path = paths.map((p) => PPUtils.legalize(p)).filter((p) => p !== PROPERTY_PATH_ME).reduce((path2, segment) => {
        if (path2 === "") {
          return segment;
        } else if (segment.startsWith("[")) {
          return `${path2}${segment}`;
        } else {
          return `${path2}${PROPERTY_PATH_JOINER}${segment}`;
        }
      }, "");
      if (path.length === 0) {
        return PROPERTY_PATH_ROOT;
      } else {
        return path;
      }
    }
  },
  absolute: (relativeToRoot, current) => {
    if (VUtils.isBlank(current)) {
      return relativeToRoot;
    }
    current = PPUtils.legalize(current);
    if (current === PROPERTY_PATH_ME) {
      return relativeToRoot;
    } else if (current.startsWith(PROPERTY_PATH_ROOT)) {
      return current;
    }
    relativeToRoot = PPUtils.legalize(relativeToRoot);
    if (relativeToRoot.startsWith(PROPERTY_PATH_ROOT)) {
      return PPUtils.concat(relativeToRoot, current);
    } else {
      return PROPERTY_PATH_ROOT + PPUtils.concat(relativeToRoot, current);
    }
  },
  relative: (path) => {
    path = PPUtils.legalize(path);
    if (path.startsWith(PROPERTY_PATH_ROOT)) {
      return PPUtils.legalize(path.substring(1));
    } else {
      return path;
    }
  },
  matches: (expected, actual) => {
    if (VUtils.isBlank(actual)) {
      return false;
    }
    if (expected === actual) {
      return true;
    }
    let bracketCount = 0;
    const tidy = actual.split("").reduce((chars, char) => {
      if (char === "[") {
        bracketCount = bracketCount + 1;
      } else if (char === "]") {
        bracketCount = bracketCount - 1;
      } else if (bracketCount === 0) {
        chars.push(char);
      } else
        ;
      return chars;
    }, []).join("");
    expected = expected ?? "";
    if (expected.includes("*")) {
      expected = expected.replace(/\*{2}/g, "[\\w|\\.]{0,}").replace(/\*{1}/g, "[\\w]{0,}").replace(/\./g, "\\.");
      return new RegExp(`^${expected}$`).test(tidy);
    } else {
      return tidy === expected;
    }
  },
  asId: (path, id) => {
    if (VUtils.isNotBlank(id)) {
      return id;
    }
    if (VUtils.isBlank(path)) {
      return void 0;
    }
    if (path.trim() == PROPERTY_PATH_JOINER) {
      return void 0;
    }
    id = path.replace(/\./g, "-").replace(/\[([^\]]+)]/g, "_$1");
    if (id.startsWith(PROPERTY_PATH_ROOT)) {
      id = id.substring(1);
    }
    return id;
  }
};
const MUtils = {
  getValue: (model, path) => {
    if (PPUtils.isLevelStayed(path)) {
      return model;
    }
    if (model == null) {
      return null;
    }
    return PPUtils.segments(PPUtils.relative(path)).reduce((fromModel, segment) => {
      if (fromModel == null) {
        return null;
      }
      if (VUtils.isPrimitive(fromModel)) {
        N1Logger.error("Root is ", model, ", direct parent is ", fromModel, "MUtils");
        N1Logger.error(`Cannot retrieve value from model by path[${path}].`, "MUtils");
        return null;
      }
      if (Array.isArray(fromModel)) {
        return fromModel.map((item) => {
          if (item == null) {
            return null;
          }
          if (VUtils.isPrimitive(item)) {
            N1Logger.error("Root is ", model, ", direct parent is ", item, "MUtils");
            N1Logger.error(`Cannot retrieve value from model by path[${path}].`, "MUtils");
            return null;
          }
          return item[segment];
        });
      } else {
        return fromModel[segment];
      }
    }, model);
  },
  setValue: (model, path, value) => {
    const oldValue = MUtils.getValue(model, path);
    const segments = PPUtils.segments(PPUtils.relative(path));
    const count = segments.length;
    const valueIndex = count - 1;
    segments.reduce((toModel, segment, index) => {
      if (toModel == null || VUtils.isPrimitive(toModel)) {
        if (index === valueIndex) {
          N1Logger.error("Root is ", model, ", direct parent is ", toModel, "MUtils");
          N1Logger.error(`Cannot set value into model by path[${path}].`, "MUtils");
        }
        return toModel;
      }
      if (index === valueIndex) {
        toModel[segment] = value;
        return void 0;
      } else {
        const value2 = toModel[segment];
        if (value2 == null) {
          const newOne = {};
          toModel[segment] = newOne;
          return newOne;
        } else if (VUtils.isPrimitive(toModel)) {
          return toModel;
        } else {
          return value2;
        }
      }
    }, model);
    return oldValue;
  }
};
var Reaction;
(function(Reaction2) {
  Reaction2["REPAINT"] = "repaint";
  Reaction2["CLEAR_VALUE"] = "clear-value";
  Reaction2["VALUE_CHANGED"] = "value-changed";
})(Reaction || (Reaction = {}));
var MonitorNodeAttributes;
(function(MonitorNodeAttributes2) {
  MonitorNodeAttributes2["DISABLED"] = "$disabled";
  MonitorNodeAttributes2["VISIBLE"] = "$visible";
  MonitorNodeAttributes2["VALID"] = "$valid";
  MonitorNodeAttributes2["REACTION"] = "$reaction";
})(MonitorNodeAttributes || (MonitorNodeAttributes = {}));
const NUtils = {
  generateReactKey: () => nanoid(),
  getDefKey: (def) => {
    if (VUtils.isBlank(def.$key)) {
      def.$key = NUtils.generateReactKey();
    }
    return def.$key;
  },
  getChildNodes: (def, from) => {
    if (VUtils.isBlank(from)) {
      return def.$nodes || [];
    } else {
      return def[from] || [];
    }
  },
  inheritValidationScopes: (parentDef, def) => {
    def.$validationScopes = ((parentDef == null ? void 0 : parentDef.$validationScopes) || []).filter((scope) => VUtils.isNotBlank(scope)).map((scope) => scope.trim()).reduce((all, scope) => {
      if (all.map[scope] == null) {
        all.list.push(scope);
      }
      return all;
    }, (() => {
      const list = (def.$validationScopes || []).filter((scope) => VUtils.isNotBlank(scope)).map((scope) => scope.trim());
      const map = list.reduce((map2, scope) => {
        map2[scope] = true;
        return map2;
      }, {});
      return { list, map };
    })()).list;
  },
  reactWithRepaint: () => Reaction.REPAINT,
  reactWithClear: () => Reaction.CLEAR_VALUE,
  asGridPosByDefault: ($pos, defaultCols) => {
    if ($pos == null) {
      return { gridColumn: `span ${defaultCols}` };
    }
    const { $col, $cols, $row, $rows } = $pos;
    const pos = {};
    switch (true) {
      case ($col == null && $cols == null):
        pos.gridColumn = `span ${defaultCols}`;
        break;
      case ($col == null && $cols != null):
        pos.gridColumn = `span ${$cols}`;
        break;
      case ($col != null && $cols == null):
        pos.gridColumn = `${$col}`;
        break;
      case ($col != null && $cols != null):
        pos.gridColumn = `${$col} / span ${$cols}`;
        break;
    }
    switch (true) {
      case ($row == null && $rows == null):
        break;
      case ($row == null && $rows != null):
        pos.gridRow = `span ${$rows}`;
        break;
      case ($row != null && $rows == null):
        pos.gridRow = `${$row}`;
        break;
      case ($row != null && $rows != null):
        pos.gridRow = `${$row} / span ${$rows}`;
        break;
    }
    return pos;
  },
  asGridPosForMobile: (def) => {
    if (def.$mpos != null) {
      return NUtils.asGridPosByDefault(def.$mpos, 12);
    } else if (def.$pos != null) {
      const { $cols } = def.$pos;
      return { gridColumn: `span ${Math.min(12, $cols * 4)}` };
    } else {
      return { gridColumn: "span 12" };
    }
  },
  asGridPosForNonMobile: (def) => {
    return NUtils.asGridPosByDefault(def.$pos, 3);
  },
  asGridPos: (def) => {
    const { "data-mobile": mobile } = def;
    if (mobile) {
      return NUtils.asGridPosForMobile(def);
    } else {
      return NUtils.asGridPosForNonMobile(def);
    }
  },
  beautifyStyle: (style) => {
    if (style == null) {
      return {};
    } else if (typeof style === "string") {
      style = style.trim();
      if (style.startsWith("{")) {
        try {
          return JSON.parse(style);
        } catch {
          return {};
        }
      } else {
        return style.split(";").reduce((style2, pair) => {
          const [key, value] = pair.split(":").map((part) => part.trim());
          if (VUtils.isNotBlank(key) && VUtils.isNotBlank(value)) {
            style2[key.trim()] = value.trim();
          }
          return style2;
        }, {});
      }
    } else {
      return style;
    }
  },
  computeStyle: (def) => {
    const pos = NUtils.asGridPos(def);
    const style = NUtils.beautifyStyle(def.style);
    style.gridRow = style.gridRow || pos.gridRow;
    style.gridColumn = style.gridColumn || pos.gridColumn;
    if (VUtils.isNotBlank(style.gridRow)) {
      style["--grid-row"] = style.gridRow ?? "-";
      delete style.gridRow;
    } else {
      style["--grid-row"] = "-";
    }
    if (VUtils.isNotBlank(style.gridColumn)) {
      style["--grid-column"] = style.gridColumn ?? "-";
      delete style.gridColumn;
    } else {
      style["--grid-row"] = "-";
    }
    return style;
  }
};
const REGISTERED = {
  detective: void 0
};
const DETECTED_DEVICE = {
  touchable: false,
  mobile: false,
  tablet: false,
  desktop: true
};
const MBUtils = {
  registerAccurateDetective: (detective) => REGISTERED.detective = detective,
  detect: () => {
    let touchable = false;
    if ("maxTouchPoints" in navigator) {
      touchable = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      touchable = navigator.msMaxTouchPoints > 0;
    } else {
      const mobile = matchMedia == null ? void 0 : matchMedia("(any-pointer:coarse)").matches;
      if (mobile) {
        touchable = true;
      } else if ("orientation" in window) {
        touchable = true;
      } else {
        const UA = navigator.userAgent;
        touchable = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    DETECTED_DEVICE.touchable = touchable;
    if (touchable) {
      const { innerWidth, innerHeight } = window;
      if (innerWidth <= 499 || innerHeight <= 499) {
        DETECTED_DEVICE.mobile = true;
        DETECTED_DEVICE.tablet = false;
        DETECTED_DEVICE.desktop = false;
      } else {
        DETECTED_DEVICE.mobile = false;
        DETECTED_DEVICE.tablet = true;
        DETECTED_DEVICE.desktop = false;
      }
    } else {
      DETECTED_DEVICE.mobile = false;
      DETECTED_DEVICE.tablet = false;
      DETECTED_DEVICE.desktop = true;
    }
    return REGISTERED.detective == null ? DETECTED_DEVICE : REGISTERED.detective(DETECTED_DEVICE);
  },
  computeDeviceTags: () => {
    return Object.keys(DETECTED_DEVICE).reduce((tags, key) => {
      tags[`data-${key}`] = DETECTED_DEVICE[key];
      return tags;
    }, {});
  },
  createDeviceTagsOnHTMLTag: (tags) => {
    if (tags == null) {
      MBUtils.detect();
      tags = MBUtils.computeDeviceTags();
    }
    Object.keys(tags).forEach((tag) => {
      document.documentElement.setAttribute(tag, tags[tag]);
    });
  },
  isMobile: () => DETECTED_DEVICE.touchable && DETECTED_DEVICE.mobile,
  isTablet: () => DETECTED_DEVICE.touchable && DETECTED_DEVICE.tablet,
  isDesktop: () => DETECTED_DEVICE.desktop,
  isTouchable: () => DETECTED_DEVICE.touchable,
  pickDeviceTags: (props) => {
    return Object.keys(DETECTED_DEVICE).reduce((tags, key) => {
      const dataKey = `data-${key}`;
      tags[dataKey] = props[dataKey];
      return tags;
    }, {});
  }
};
const useCreateEventBus = (name) => {
  const [bus] = reactExports.useState(() => {
    const emitter = new EventEmitter().setMaxListeners(999999);
    return {
      fire: (type, ...data) => {
        N1Logger.debug(`Event[${type}] fired on bus[${name}].`, ...data, "CreateEventBusHook");
        emitter.emit(type, ...data);
      },
      once: (type, listener) => emitter.once(type, listener),
      on: (type, listener) => {
        if (emitter.rawListeners(type).includes(listener)) {
          N1Logger.error(`Listener on [${type}] was added into ${name} bus, check it.`, "CreateEventBusHook");
        }
        emitter.on(type, listener);
      },
      off: (type, listener) => emitter.off(type, listener)
    };
  });
  return bus;
};
var RootEventTypes;
(function(RootEventTypes2) {
  RootEventTypes2["VALUE_CHANGED"] = "value-changed";
  RootEventTypes2["VALIDATE"] = "validate";
  RootEventTypes2["VALIDATED"] = "validated";
  RootEventTypes2["REGISTER_VALIDATABLE"] = "register-validatable";
  RootEventTypes2["UNREGISTER_VALIDATABLE"] = "unregister-validatable";
  RootEventTypes2["DEVICE_CHANGED"] = "device-changed";
})(RootEventTypes || (RootEventTypes = {}));
const Context$4 = reactExports.createContext({});
Context$4.displayName = "EventBus";
const RootEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("d9-root");
  return React.createElement(Context$4.Provider, { value: bus }, children);
};
const useRootEventBus = () => reactExports.useContext(Context$4);
var ContainerEventTypes;
(function(ContainerEventTypes2) {
  ContainerEventTypes2["VALIDATE"] = "validate";
  ContainerEventTypes2["REGISTER_VALIDATABLE"] = "register-validatable";
  ContainerEventTypes2["UNREGISTER_VALIDATABLE"] = "unregister-validatable";
})(ContainerEventTypes || (ContainerEventTypes = {}));
const Context$3 = reactExports.createContext({});
Context$3.displayName = "EventBus";
const ContainerEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("d9-container");
  return React.createElement(Context$3.Provider, { value: bus }, children);
};
const useContainerEventBus = () => reactExports.useContext(Context$3);
var ArrayElementEventTypes;
(function(ArrayElementEventTypes2) {
  ArrayElementEventTypes2["VALIDATE"] = "validate";
  ArrayElementEventTypes2["REGISTER_VALIDATABLE"] = "register-validatable";
  ArrayElementEventTypes2["UNREGISTER_VALIDATABLE"] = "unregister-validatable";
})(ArrayElementEventTypes || (ArrayElementEventTypes = {}));
const Context$2 = reactExports.createContext({});
Context$2.displayName = "ArrayElementEventBus";
const ArrayElementEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("d9-array-element");
  return React.createElement(Context$2.Provider, { value: bus }, children);
};
const useArrayElementEventBus = () => reactExports.useContext(Context$2);
var WrapperEventTypes;
(function(WrapperEventTypes2) {
  WrapperEventTypes2["REPAINT"] = "repaint";
  WrapperEventTypes2["VALIDATE"] = "validate";
  WrapperEventTypes2["UNHANDLED_REACTION_OCCURRED"] = "unhandled-reaction-occurred";
})(WrapperEventTypes || (WrapperEventTypes = {}));
const Context$1 = reactExports.createContext({});
Context$1.displayName = "EventBus";
const WrapperEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("d9-wrapper");
  return React.createElement(Context$1.Provider, { value: bus }, children);
};
const useWrapperEventBus = () => reactExports.useContext(Context$1);
const useForceUpdate = () => {
  const [, forceUpdate] = reactExports.useReducer((x) => !x, true);
  return forceUpdate;
};
var ExecuteTiming;
(function(ExecuteTiming2) {
  ExecuteTiming2["TIMEOUT"] = "timeout";
  ExecuteTiming2["UNMOUNT"] = "unmount";
  ExecuteTiming2["FORCE"] = "force";
})(ExecuteTiming || (ExecuteTiming = {}));
const useThrottler = () => {
  const [queue] = reactExports.useState({});
  const [functions] = reactExports.useState(() => {
    return {
      replace: (execute, timeout) => {
        if (queue.timeoutHandle) {
          window.clearTimeout(queue.timeoutHandle);
        }
        queue.execute = execute;
        queue.timeoutHandle = window.setTimeout(() => {
          delete queue.timeoutHandle;
          delete queue.execute;
          execute(ExecuteTiming.TIMEOUT);
        }, timeout);
      },
      clear: (execute) => {
        if (queue.timeoutHandle) {
          window.clearTimeout(queue.timeoutHandle);
        }
        const clearedExecute = queue.execute;
        delete queue.timeoutHandle;
        delete queue.execute;
        if (execute && clearedExecute) {
          clearedExecute(ExecuteTiming.FORCE);
        }
      }
    };
  });
  reactExports.useEffect(() => {
    return () => {
      if (queue.timeoutHandle) {
        window.clearTimeout(queue.timeoutHandle);
      }
      if (queue.execute) {
        queue.execute(ExecuteTiming.UNMOUNT);
      }
    };
  }, [queue]);
  return functions;
};
const VALUE_CHANGED_OPTIONS = {
  DELAY_MS: 150
};
const askOldValue = (options) => {
  const { stateOldValue, currentOldValue } = options;
  if (stateOldValue == null) {
    return currentOldValue;
  } else if (stateOldValue != currentOldValue) {
    return stateOldValue;
  } else {
    return currentOldValue;
  }
};
const useValueChanged = () => {
  const { fire } = useRootEventBus();
  const { fire: fireWrapper } = useWrapperEventBus();
  const [values] = reactExports.useState({});
  const { replace } = useThrottler();
  return (options) => {
    const { absolutePath, newValue } = options;
    const oldValue = askOldValue({ stateOldValue: values[absolutePath], currentOldValue: options.oldValue });
    values[absolutePath] = oldValue;
    replace(() => {
      new Promise((resolve) => {
        delete values[absolutePath];
        fire && fire(RootEventTypes.VALUE_CHANGED, absolutePath, oldValue, newValue);
        fireWrapper && fireWrapper(WrapperEventTypes.VALIDATE, oldValue, newValue);
        resolve();
      });
    }, VALUE_CHANGED_OPTIONS.DELAY_MS);
  };
};
const useSetValue = (props) => {
  const onValueChanged = useValueChanged();
  const forceUpdate = useForceUpdate();
  return {
    onValueChange: async (newValue, doForceUpdate = true, ...args) => {
      const { $p2r, $model, $pp, valueChanged } = props;
      const oldValue = MUtils.setValue($model, $pp, newValue);
      if (doForceUpdate) {
        forceUpdate();
      }
      const absolutePath = PPUtils.absolute($p2r, $pp);
      if (valueChanged != null) {
        await valueChanged({ absolutePath, oldValue, newValue }, ...args);
      }
      onValueChanged({ absolutePath, oldValue, newValue }, ...args);
      N1Logger.debug(`Value set[old=${oldValue}, new=${newValue}, path=${$pp}, absolutePath=${absolutePath}].`, $model, "SetValueHook");
    },
    onValueChanged
  };
};
const ValidationEventHolder = () => {
  const { on, off, fire } = useRootEventBus();
  const [validationEventState] = reactExports.useState({ byIds: {}, byScopes: {} });
  reactExports.useEffect(() => {
    const onValidate = async (scopes, onValidate2) => {
      if (scopes == null || scopes.length === 0) {
        const validated = await Promise.all(Object.values(validationEventState.byIds).map(({ validate }) => validate()));
        onValidate2({
          failed: validated.filter((validated2) => !validated2.valid),
          passed: validated.filter((validated2) => validated2.valid)
        });
      } else {
        const validated = await Promise.all(scopes.map((scope) => Object.keys(validationEventState.byScopes[scope] ?? [])).flat().reduce((ids, id) => {
          if (ids.map[id] == null) {
            ids.list.push(id);
          }
          return ids;
        }, { map: {}, list: [] }).list.map((id) => {
          var _a;
          return (_a = validationEventState.byIds[id]) == null ? void 0 : _a.validate;
        }).filter((validate) => validate != null).map((validate) => validate()));
        onValidate2({
          failed: validated.filter((validated2) => !validated2.valid),
          passed: validated.filter((validated2) => validated2.valid)
        });
      }
    };
    const onRegisterValidatable = (uniqueId, scopes, validate) => {
      validationEventState.byIds[uniqueId] = { validate, scopes };
      (scopes || []).forEach((scope) => {
        if (validationEventState.byScopes[scope] == null) {
          validationEventState.byScopes[scope] = {};
        }
        validationEventState.byScopes[scope][uniqueId] = true;
      });
    };
    const onUnregisterValidatable = (uniqueId) => {
      const { scopes = [] } = validationEventState.byIds[uniqueId] || {};
      delete validationEventState.byIds[uniqueId];
      (scopes || []).forEach((scope) => {
        if (validationEventState.byScopes[scope] != null) {
          delete validationEventState.byScopes[scope][uniqueId];
        }
      });
    };
    on(RootEventTypes.VALIDATE, onValidate);
    on(RootEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
    on(RootEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
    return () => {
      off(RootEventTypes.VALIDATE, onValidate);
      off(RootEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
      off(RootEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
    };
  }, [on, off, fire, validationEventState]);
  return React.createElement(reactExports.Fragment, null);
};
const useFixedScopeValidationEventHandlers = () => {
  const [state] = reactExports.useState({});
  const [handlers] = reactExports.useState(() => {
    return {
      onValidate: async (onValidate) => {
        const validated = await Promise.all(Object.values(state).map((validate) => validate()));
        onValidate({
          failed: validated.filter((validated2) => !validated2.valid),
          passed: validated.filter((validated2) => validated2.valid)
        });
      },
      onRegisterValidatable: (uniqueId, validate) => {
        N1Logger.debug(`[${uniqueId}] registered.`, "FixedScopeValidationEventHandlersHook");
        state[uniqueId] = validate;
      },
      onUnregisterValidatable: (uniqueId) => {
        N1Logger.debug(`[${uniqueId}] unregistered.`, "FixedScopeValidationEventHandlersHook");
        delete state[uniqueId];
      }
    };
  });
  return { state, ...handlers };
};
const ContainerValidationEventHolder = () => {
  const { on, off } = useContainerEventBus();
  const { state, onValidate, onRegisterValidatable, onUnregisterValidatable } = useFixedScopeValidationEventHandlers();
  reactExports.useEffect(() => {
    on(ContainerEventTypes.VALIDATE, onValidate);
    on(ContainerEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
    on(ContainerEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
    return () => {
      off(ContainerEventTypes.VALIDATE, onValidate);
      off(ContainerEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
      off(ContainerEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
    };
  }, [on, off, state, onValidate, onRegisterValidatable, onUnregisterValidatable]);
  return React.createElement(reactExports.Fragment, null);
};
const ArrayElementValidationEventHolder = () => {
  const { on, off } = useArrayElementEventBus();
  const { state, onValidate, onRegisterValidatable, onUnregisterValidatable } = useFixedScopeValidationEventHandlers();
  reactExports.useEffect(() => {
    on(ArrayElementEventTypes.VALIDATE, onValidate);
    on(ArrayElementEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
    on(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
    return () => {
      off(ArrayElementEventTypes.VALIDATE, onValidate);
      off(ArrayElementEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
      off(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
    };
  }, [on, off, state, onValidate, onRegisterValidatable, onUnregisterValidatable]);
  return React.createElement(reactExports.Fragment, null);
};
var BridgeToRootEventTypes;
(function(BridgeToRootEventTypes2) {
  BridgeToRootEventTypes2["NOTIFY_VALUE_CHANGED"] = "notify-value-changed";
  BridgeToRootEventTypes2["PERFORM_VALIDATE"] = "perform-validate";
  BridgeToRootEventTypes2["LISTEN_VALUE_CHANGED"] = "listen-value-changed";
  BridgeToRootEventTypes2["LISTEN_VALIDATED"] = "listen-validated";
})(BridgeToRootEventTypes || (BridgeToRootEventTypes = {}));
const RootToBridgeUndercover = () => {
  const bridge = useBridgeEventBus();
  const root = useRootEventBus();
  reactExports.useEffect(() => {
    if (bridge.on == null) {
      return;
    }
    const onNotifyValueChanged = (args) => {
      const { absolutePath, from, to } = args;
      root.fire(RootEventTypes.VALUE_CHANGED, absolutePath, from, to);
    };
    const onValidateRequest = (args) => {
      const { scopes, onValidated: onValidated2 } = args;
      root.fire(RootEventTypes.VALIDATE, scopes, onValidated2 ?? VUtils.noop);
    };
    const onValidated = (options) => {
      bridge.fire(BridgeToRootEventTypes.LISTEN_VALIDATED, options);
    };
    const onValueChanged = (absolutePath, from, to) => {
      bridge.fire(BridgeToRootEventTypes.LISTEN_VALUE_CHANGED, { absolutePath, from, to });
    };
    bridge.on(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, onNotifyValueChanged);
    bridge.on(BridgeToRootEventTypes.PERFORM_VALIDATE, onValidateRequest);
    root.on(RootEventTypes.VALIDATED, onValidated);
    root.on(RootEventTypes.VALUE_CHANGED, onValueChanged);
    return () => {
      bridge.off(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, onNotifyValueChanged);
      bridge.off(BridgeToRootEventTypes.PERFORM_VALIDATE, onValidateRequest);
      root.off(RootEventTypes.VALIDATED, onValidated);
      root.off(RootEventTypes.VALUE_CHANGED, onValueChanged);
    };
  }, [bridge, root]);
  return React.createElement(reactExports.Fragment, null);
};
MBUtils.createDeviceTagsOnHTMLTag();
const DeviceDetective = () => {
  const { fire } = useRootEventBus();
  const [tags, setTags] = reactExports.useState(MBUtils.computeDeviceTags());
  reactExports.useEffect(() => {
    const onWindowResize = () => {
      MBUtils.detect();
      const newTags = MBUtils.computeDeviceTags();
      MBUtils.createDeviceTagsOnHTMLTag(newTags);
      setTags(newTags);
      if (fire != null) {
        const changed = Object.keys(newTags).some((key) => newTags[key] !== tags[key]);
        if (changed) {
          fire(RootEventTypes.DEVICE_CHANGED, newTags);
        }
      }
    };
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [fire, tags]);
  return React.createElement(reactExports.Fragment, null);
};
const useDeviceTags = () => {
  const { on, off } = useRootEventBus();
  const [tags, setTags] = reactExports.useState(MBUtils.computeDeviceTags());
  reactExports.useEffect(() => {
    const onDeviceChanged = (tags2) => setTags(tags2);
    on(RootEventTypes.DEVICE_CHANGED, onDeviceChanged);
    return () => {
      off(RootEventTypes.DEVICE_CHANGED, onDeviceChanged);
    };
  }, [on, off]);
  return tags;
};
const Context = reactExports.createContext({});
Context.displayName = "BridgeEventBus";
const BridgeEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("bridge-event-bus");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const useBridgeEventBus = () => reactExports.useContext(Context);
class ExternalDefIndicator {
  constructor(keys) {
    __publicField(this, "_keys");
    this._keys = keys;
  }
  get keys() {
    return this._keys;
  }
}
class ExternalDefCreator {
  constructor(create) {
    __publicField(this, "_create");
    this._create = create;
  }
  get create() {
    return this._create;
  }
}
const handleExternalDefs = (options, reb, externalDefs) => {
  if (options == null || VUtils.isPrimitive(options) || typeof options === "function" || reactExports.isValidElement(options)) {
    return options;
  }
  if (options instanceof ExternalDefIndicator) {
    const key = (options.keys || "").trim();
    let func = externalDefs[key];
    if (func == null) {
      func = MUtils.getValue(externalDefs, key);
    }
    if (func == null) {
      return new ExternalDefMismatchIndicator(key);
    }
    if (func instanceof ExternalDefCreator) {
      return func.create(reb);
    } else {
      return func;
    }
  } else if (typeof options === "object" && VUtils.isNotBlank(options.$keys) && typeof options.$keys === "string") {
    const key = (options.$keys || "").trim();
    let func = externalDefs[key];
    if (func == null) {
      func = MUtils.getValue(externalDefs, key);
    }
    if (func == null) {
      return new ExternalDefMismatchIndicator(key);
    }
    if (func instanceof ExternalDefCreator) {
      return func.create(reb);
    } else {
      return func;
    }
  } else if (Array.isArray(options)) {
    options.forEach((element, index) => {
      const handled = handleExternalDefs(element, reb, externalDefs);
      if (handled !== element) {
        options[index] = handled;
      }
    });
    return options;
  } else {
    Object.keys(options).forEach((key) => {
      const value = options[key];
      const handled = handleExternalDefs(value, reb, externalDefs);
      if (handled !== value) {
        options[key] = handled;
      }
    });
    return options;
  }
};
class ExternalDefMismatchIndicator {
  constructor(keys) {
    __publicField(this, "_keys");
    this._keys = keys;
  }
  get keys() {
    return this._keys;
  }
}
const ExternalDefMismatchIndicators = new Proxy({}, {
  get(target, p) {
    return new ExternalDefMismatchIndicator(p);
  }
});
const ExternalDefsHandler = (props) => {
  const { options, externalDefs } = props;
  const reb = useRootEventBus();
  if (externalDefs == null) {
    handleExternalDefs(options, reb, ExternalDefMismatchIndicators);
  } else {
    handleExternalDefs(options, reb, externalDefs);
    externalDefs.onDetermined && externalDefs.onDetermined(options);
  }
  return React.createElement(reactExports.Fragment, null);
};
const isDeclaredAsPlainValue = (key, def) => {
  return [MonitorNodeAttributes.DISABLED, MonitorNodeAttributes.VISIBLE].includes(key) && typeof def === "boolean";
};
const findWatches = (def) => {
  return Object.values(MonitorNodeAttributes).filter((key) => def[key] != null).map((key) => {
    const declared = def[key];
    if (isDeclaredAsPlainValue(key, declared)) {
      return null;
    }
    const { $watch, $handle, $default } = declared;
    if (key !== MonitorNodeAttributes.VALID && ($watch == null || $watch.length === 0)) {
      N1Logger.error("Watch def: ", declared, "FindWatches");
      N1Logger.error(`At least one path needs to be declared on attribute[${key}] monitor, ignored.`, "FindWatches");
      return null;
    }
    if ($handle == null) {
      N1Logger.error("Watch def: ", declared, "FindWatches");
      N1Logger.error(`Monitor handler is missed on attribute[${key}] monitor, ignored.`, "FindWatches");
      return null;
    }
    return { $watch, $handle, $default, $attributeName: key };
  }).filter((x) => x != null);
};
const buildDefaultAttributeValues = async (def) => {
  const { $root, $model, $pp } = def;
  const values = await findWatches(def).reduce(async (values2, declared) => {
    const attrs = await values2;
    const { $attributeName, $default } = declared;
    if (VUtils.isFunction($default)) {
      const value = MUtils.getValue($model, $pp);
      attrs[$attributeName.trim()] = await $default({ root: $root, model: $model, value });
    } else if ($default == null)
      ;
    else {
      attrs[$attributeName.trim()] = $default;
    }
    return attrs;
  }, Promise.resolve({}));
  return Object.values(MonitorNodeAttributes).filter((key) => def[key] != null).reduce((attrs, key) => {
    const declared = def[key];
    if (isDeclaredAsPlainValue(key, declared)) {
      attrs[key] = declared;
    }
    return attrs;
  }, values);
};
const buildWatches = (def) => {
  return findWatches(def).reduce((watches, watchDef) => {
    const { $watch, $attributeName, $handle } = watchDef;
    ($watch || []).filter((path) => VUtils.isNotBlank(path)).map((path) => path.trim()).forEach((path) => {
      let existing = watches[path];
      if (existing == null) {
        existing = {};
        watches[path] = existing;
      }
      existing[$attributeName.trim()] = $handle;
    });
    return watches;
  }, {});
};
const getArrayElementKey = (keys, getElementKey) => (element) => {
  if (getElementKey != null) {
    return getElementKey(element);
  } else {
    const found = keys.find(([data]) => data === element);
    if (found != null) {
      return found[1];
    } else {
      const key = NUtils.generateReactKey();
      keys.push([element, key]);
      return key;
    }
  }
};
const findContainerChildKey = (keys, find) => {
  const cached = keys.find(([def]) => {
    return def === find;
  });
  if (cached == null) {
    const key = NUtils.generateReactKey();
    keys.push([find, key]);
    return key;
  } else {
    return cached[1];
  }
};
const useValidate = (options) => {
  var _a;
  const { props, attributeValues, setAttributeValues } = options;
  const { fire } = useRootEventBus();
  const { on, off } = useWrapperEventBus();
  reactExports.useEffect(() => {
    const onValidate = async (from, to) => {
      var _a2, _b;
      const $handle = (_a2 = props.$valid) == null ? void 0 : _a2.$handle;
      if ($handle != null && attributeValues[MonitorNodeAttributes.DISABLED] !== true && attributeValues[MonitorNodeAttributes.VISIBLE] !== false) {
        const absolutePath = PPUtils.absolute(props.$p2r, props.$pp);
        const result = await $handle({
          root: props.$root,
          model: props.$model,
          pathToRoot: props.$p2r,
          propertyPath: props.$pp,
          absolutePath,
          value: to,
          changedOn: absolutePath,
          from,
          to
        });
        const current = attributeValues[MonitorNodeAttributes.VALID] ?? { valid: true };
        if (result.valid !== current.valid || result.failReason != current.failReason) {
          setAttributeValues((attributes) => ({ ...attributes, [MonitorNodeAttributes.VALID]: result }));
        }
        fire && fire(RootEventTypes.VALIDATED, {
          root: props.$root,
          model: props.$model,
          pathToRoot: props.$p2r,
          propertyPath: props.$pp,
          absolutePath,
          value: to,
          ...result
        });
      } else if (((_b = attributeValues[MonitorNodeAttributes.VALID]) == null ? void 0 : _b.valid) === false) {
        setAttributeValues((attributes) => {
          const attrs = { ...attributes };
          delete attrs[MonitorNodeAttributes.VALID];
          return attrs;
        });
        fire && fire(RootEventTypes.VALIDATED, {
          root: props.$root,
          model: props.$model,
          pathToRoot: props.$p2r,
          propertyPath: props.$pp,
          absolutePath: PPUtils.absolute(props.$p2r, props.$pp),
          value: to,
          valid: true
        });
      }
    };
    on(WrapperEventTypes.VALIDATE, onValidate);
    return () => {
      off(WrapperEventTypes.VALIDATE, onValidate);
    };
  }, [
    fire,
    on,
    off,
    attributeValues,
    setAttributeValues,
    (_a = props.$valid) == null ? void 0 : _a.$handle,
    props.$root,
    props.$model,
    props.$p2r,
    props.$pp
  ]);
};
const useValidationRegistration = (options) => {
  var _a;
  const { props, attributeValues, setAttributeValues } = options;
  const { fire: fireRoot } = useRootEventBus();
  const { fire: fireContainer } = useContainerEventBus();
  const { fire: fireArrayElement } = useArrayElementEventBus();
  const [uniqueId] = reactExports.useState(NUtils.generateReactKey());
  reactExports.useEffect(() => {
    var _a2;
    if (((_a2 = props.$valid) == null ? void 0 : _a2.$handle) == null) {
      return;
    }
    if (attributeValues[MonitorNodeAttributes.DISABLED] === true || attributeValues[MonitorNodeAttributes.VISIBLE] === false) {
      fireRoot && fireRoot(RootEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
      fireContainer && fireContainer(ContainerEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
      fireArrayElement && fireArrayElement(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
      return;
    }
    const scopes = props.$validationScopes || [];
    const validate = () => {
      return new Promise((resolve) => {
        var _a3;
        const $handle = (_a3 = props.$valid) == null ? void 0 : _a3.$handle;
        const absolutePath = PPUtils.absolute(props.$p2r, props.$pp);
        if ($handle == null) {
          resolve({ path: absolutePath, valid: true });
        } else {
          (async () => {
            const { $root, $model } = props;
            const value = MUtils.getValue($model, props.$pp);
            const result = await $handle({
              root: $root,
              model: $model,
              pathToRoot: props.$p2r,
              propertyPath: props.$pp,
              absolutePath,
              value,
              changedOn: absolutePath,
              to: value
            });
            const current = attributeValues[MonitorNodeAttributes.VALID] ?? { valid: true };
            if (result.valid !== current.valid || result.failReason != current.failReason) {
              setAttributeValues((attributes) => ({ ...attributes, [MonitorNodeAttributes.VALID]: result }));
            }
            resolve({ path: absolutePath, ...result });
          })();
        }
      });
    };
    fireRoot && fireRoot(RootEventTypes.REGISTER_VALIDATABLE, uniqueId, scopes, validate);
    fireContainer && fireContainer(ContainerEventTypes.REGISTER_VALIDATABLE, uniqueId, validate);
    fireArrayElement && fireArrayElement(ArrayElementEventTypes.REGISTER_VALIDATABLE, uniqueId, validate);
    return () => {
      fireRoot && fireRoot(RootEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
      fireContainer && fireContainer(ContainerEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
      fireArrayElement && fireArrayElement(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
    };
  }, [
    fireRoot,
    fireContainer,
    fireArrayElement,
    attributeValues,
    setAttributeValues,
    uniqueId,
    props,
    (_a = props.$valid) == null ? void 0 : _a.$handle,
    props.$root,
    props.$model,
    props.$p2r,
    props.$pp
  ]);
};
const useValidationFunctions = (def) => {
  const { fire: fireRoot } = useRootEventBus();
  const { fire: fireContainer } = useContainerEventBus();
  const { fire: fireArrayElement } = useArrayElementEventBus();
  const validate = (scopes) => {
    return new Promise((resolve) => {
      fireRoot && fireRoot(RootEventTypes.VALIDATE, scopes ?? [], resolve);
    });
  };
  const functions = {
    $given: (scopes) => validate(scopes ?? []),
    $mine: () => {
      const validScopes = (def.$validationScopes || []).filter((scope) => VUtils.isNotBlank(scope));
      if (validScopes.length !== 0) {
        return validate(validScopes);
      } else if (functions.$arrayElement != null) {
        return functions.$arrayElement();
      } else if (functions.$closestContainer != null) {
        return functions.$closestContainer();
      } else {
        return functions.$all();
      }
    },
    $all: () => validate([])
  };
  if (fireArrayElement != null) {
    functions.$arrayElement = () => {
      return new Promise((resolve) => {
        fireArrayElement(ArrayElementEventTypes.VALIDATE, resolve);
      });
    };
  }
  if (fireContainer != null) {
    functions.$closestContainer = () => {
      return new Promise((resolve) => {
        fireContainer(ContainerEventTypes.VALIDATE, resolve);
      });
    };
  }
  return functions;
};
const shouldUpdateAttribute = (values, attributeValues) => {
  switch (true) {
    case (values[MonitorNodeAttributes.DISABLED] != null && values[MonitorNodeAttributes.DISABLED] != (attributeValues[MonitorNodeAttributes.DISABLED] ?? false)):
      return true;
    case (values[MonitorNodeAttributes.VISIBLE] != null && values[MonitorNodeAttributes.VISIBLE] != (attributeValues[MonitorNodeAttributes.VISIBLE] ?? true)):
      return true;
    case (values[MonitorNodeAttributes.VALID] == null && attributeValues[MonitorNodeAttributes.VALID] != null):
      return true;
    case (values[MonitorNodeAttributes.VALID] != null && attributeValues[MonitorNodeAttributes.VALID] == null):
      return true;
    case (values[MonitorNodeAttributes.VALID] != null && attributeValues[MonitorNodeAttributes.VALID] != null): {
      const validInThisRound = values[MonitorNodeAttributes.VALID].valid;
      const validInLastRound = attributeValues[MonitorNodeAttributes.VALID].valid;
      if (validInThisRound != validInLastRound) {
        return true;
      } else if (!validInLastRound && values[MonitorNodeAttributes.VALID].failReason != attributeValues[MonitorNodeAttributes.VALID].failReason) {
        return true;
      }
      return false;
    }
    case VUtils.isNotBlank(values[MonitorNodeAttributes.REACTION]):
      return true;
  }
  return false;
};
const useAttributesWatch = (options) => {
  const { props, attributeValues, setAttributeValues } = options;
  const { on, off, fire } = useRootEventBus();
  const { fire: fireWrapper } = useWrapperEventBus();
  const [watches] = reactExports.useState(buildWatches(props));
  reactExports.useEffect(() => {
    const onValueChanged = async (absolutePath, from, to) => {
      const watch = Object.keys(watches).find((watch2) => {
        const watchPath = PPUtils.absolute(props.$p2r, watch2);
        return PPUtils.matches(watchPath, absolutePath);
      });
      if (watch != null) {
        N1Logger.debug(`Widget[${props.$wt}] catches change[on=${absolutePath}, from=${from}, to=${to}] based on watch[${watch}].`, "AttributeWatchHook");
        const handles = watches[watch];
        const myAbsolutePath = PPUtils.absolute(props.$p2r, props.$pp);
        const handledValuePairs = await Promise.all(Object.keys(handles).filter((name) => name !== MonitorNodeAttributes.VALID).map(async (name) => {
          const value = await handles[name]({
            root: props.$root,
            model: props.$model,
            pathToRoot: props.$p2r,
            propertyPath: props.$pp,
            absolutePath: myAbsolutePath,
            value: MUtils.getValue(props.$model, props.$pp),
            changedOn: absolutePath,
            from,
            to
          });
          if (name !== MonitorNodeAttributes.REACTION) {
            return { name, value };
          } else {
            let reactions = [];
            if (Array.isArray(value)) {
              if (value.includes(Reaction.CLEAR_VALUE)) {
                reactions = value.filter((v) => v != Reaction.REPAINT);
              } else {
                reactions = value;
              }
            } else if (VUtils.isBlank(value))
              ;
            else {
              reactions = [value];
            }
            reactions = reactions.filter((reaction) => VUtils.isNotBlank(reaction));
            reactions = [...new Set(reactions)];
            let ret = null;
            if (reactions.includes(Reaction.CLEAR_VALUE)) {
              const oldValue = MUtils.setValue(props.$model, props.$pp, null);
              fire && fire(RootEventTypes.VALUE_CHANGED, myAbsolutePath, oldValue, null);
              ret = { name, value: VUtils.generateUniqueId() };
            }
            if (reactions.includes(Reaction.REPAINT)) {
              if (ret == null) {
                ret = { name, value: VUtils.generateUniqueId() };
              }
            }
            if (reactions.includes(Reaction.VALUE_CHANGED)) {
              const pos = reactions.findIndex((reaction) => reaction === Reaction.VALUE_CHANGED);
              if (pos !== -1) {
                let changed = [];
                const changedDataIndex = pos + 1;
                let next = reactions[changedDataIndex];
                while (typeof next !== "string") {
                  changed.push(next);
                  reactions.splice(changedDataIndex, 1);
                  if (changedDataIndex >= reactions.length) {
                    break;
                  }
                  next = reactions[changedDataIndex];
                }
                changed = changed.filter((changed2) => changed2 != null);
                if (changed.length !== 0 && fire != null) {
                  changed.forEach(async (changed2) => {
                    fire(RootEventTypes.VALUE_CHANGED, changed2.path, changed2.from, changed2.to);
                  });
                }
              }
            }
            reactions.filter((reaction) => ![
              Reaction.CLEAR_VALUE,
              Reaction.REPAINT,
              Reaction.VALUE_CHANGED
            ].includes(reaction)).forEach((reaction) => {
              fireWrapper && fireWrapper(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, reaction);
            });
            return ret;
          }
        }));
        const values = handledValuePairs.filter((x) => x != null).reduce((values2, { name, value }) => {
          values2[name] = value;
          return values2;
        }, {});
        if (handles[MonitorNodeAttributes.VALID] != null && (values[MonitorNodeAttributes.DISABLED] == null || values[MonitorNodeAttributes.DISABLED] !== true) && (values[MonitorNodeAttributes.VISIBLE] == null || values[MonitorNodeAttributes.VISIBLE] !== false)) {
          values[MonitorNodeAttributes.VALID] = await handles[MonitorNodeAttributes.VALID]({
            root: props.$root,
            model: props.$model,
            pathToRoot: props.$p2r,
            propertyPath: props.$pp,
            absolutePath: myAbsolutePath,
            value: MUtils.getValue(props.$model, props.$pp),
            changedOn: myAbsolutePath,
            from,
            to
          });
        }
        if (shouldUpdateAttribute(values, attributeValues)) {
          setAttributeValues((attributes) => ({ ...attributes, ...values }));
        }
      }
    };
    const shouldWatch = watches != null && Object.keys(watches).length !== 0;
    if (shouldWatch) {
      on(RootEventTypes.VALUE_CHANGED, onValueChanged);
    }
    return () => {
      if (shouldWatch) {
        off(RootEventTypes.VALUE_CHANGED, onValueChanged);
      }
    };
  }, [
    on,
    off,
    fire,
    fireWrapper,
    attributeValues,
    setAttributeValues,
    watches,
    props.$wt,
    props.$root,
    props.$model,
    props.$p2r,
    props.$pp
  ]);
};
const useArrayFunctions = (options) => {
  const { props, onValueChanged } = options;
  const { $root, $p2r, $model, $array: { couldAddElement, createElement, elementAdded, couldRemoveElement, elementRemoved, getElementKey } = {}, ...rest } = props;
  const [keys] = reactExports.useState([]);
  const forceUpdate = useForceUpdate();
  const { $array, absolutePathOfArray } = PPUtils.isLevelStayed(rest.$pp) ? { $array: $model, absolutePathOfArray: $p2r } : { $array: MUtils.getValue($model, rest.$pp), absolutePathOfArray: PPUtils.absolute($p2r, rest.$pp) };
  let elements;
  if ($array != null && !Array.isArray($array)) {
    N1Logger.error("Data model must be an array or null.", "ArrayFunctionsHook");
    elements = [];
  } else {
    elements = $array || [];
  }
  const shouldRemoveElement = async (elementModel, index, ...args) => {
    if (couldRemoveElement == null) {
      return Promise.resolve(true);
    }
    return await couldRemoveElement({
      root: $root,
      model: $array,
      element: elementModel,
      index
    }, ...args);
  };
  const removeElement = async (elementModel, index, ...args) => {
    const shouldRemove = await shouldRemoveElement(elementModel, index, ...args);
    if (!shouldRemove) {
      return;
    }
    const oldElements = $array == null ? null : [...$array];
    elements.splice(index, 1);
    const foundIndex = keys.findIndex(([data]) => data === elementModel);
    if (foundIndex !== -1) {
      keys.splice(foundIndex, 1);
    }
    elementRemoved && await elementRemoved({
      root: $root,
      model: $array,
      element: elementModel,
      index
    }, ...args);
    forceUpdate();
    await onValueChanged({ absolutePath: absolutePathOfArray, oldValue: oldElements, newValue: elements }, ...args);
  };
  const createRemoveElementFunc = (elementModel, index) => {
    return async (...args) => await removeElement(elementModel, index, ...args);
  };
  const clearElement = async (...args) => {
    const oldElements = $array == null ? null : [...$array];
    elements.length = 0;
    keys.length = 0;
    elementRemoved && await Promise.all((oldElements || []).map(async (elementModel) => {
      return await elementRemoved({
        root: $root,
        model: $array,
        element: elementModel,
        index: elements.length
      }, ...args);
    }));
    forceUpdate();
    await onValueChanged({ absolutePath: absolutePathOfArray, oldValue: oldElements, newValue: elements }, ...args);
  };
  const shouldAddElement = async (...args) => {
    if (couldAddElement == null) {
      return Promise.resolve(true);
    }
    return await couldAddElement({ root: $root, model: $array }, ...args);
  };
  const addElement = async (...args) => {
    const shouldRemove = await shouldAddElement(...args);
    if (!shouldRemove) {
      return;
    }
    const oldElements = $array == null ? null : [...$array];
    const newElement = createElement != null ? await createElement({ root: $root, model: $array, index: elements.length }, ...args) : {};
    elements.push(newElement);
    elementAdded && await elementAdded({
      root: $root,
      model: $array,
      element: newElement,
      index: elements.length - 1
    }, ...args);
    if (elements.length === 1) {
      MUtils.setValue($model, rest.$pp, elements);
    }
    forceUpdate();
    await onValueChanged({ absolutePath: absolutePathOfArray, oldValue: oldElements, newValue: elements }, ...args);
  };
  const getRowElementKey = getArrayElementKey(keys, getElementKey);
  return {
    elements,
    $arrayP2r: absolutePathOfArray,
    addElement,
    removeElement,
    createRemoveElementFunc,
    clearElement,
    getElementKey: getRowElementKey
  };
};
const useDefaultAttributeValues = (props) => {
  const [state, setState] = reactExports.useState({ initialized: false });
  reactExports.useEffect(() => {
    if (state.initialized) {
      return;
    }
    (async () => {
      const $defaultAttributes2 = await buildDefaultAttributeValues(props);
      setState({ ...$defaultAttributes2, initialized: true });
    })();
  }, [state.initialized, props]);
  if (!state.initialized) {
    return { initialized: false };
  }
  const { initialized, ...$defaultAttributes } = state;
  const $defaultAttributesSet = (values) => {
    if (typeof values == "function") {
      setState(({ initialized: initialized2, ...attributes }) => {
        return { ...values(attributes) ?? {}, initialized: true };
      });
    } else {
      setState({ ...values ?? {}, initialized: true });
    }
  };
  return { initialized, $defaultAttributes, $defaultAttributesSet };
};
const useContainerChildren = (options) => {
  const { def, nodesFrom } = options;
  const childrenDefs = NUtils.getChildNodes(def, nodesFrom) || [];
  const [keys] = reactExports.useState(() => {
    return childrenDefs.map((child) => [child, NUtils.generateReactKey()]);
  });
  Promise.resolve().then(() => {
    if (childrenDefs.length === 0) {
      keys.length = 0;
    } else {
      for (let index = keys.length - 1; index >= 0; index--) {
        const [def2] = keys[index];
        if (!childrenDefs.includes(def2)) {
          keys.splice(index, 1);
        }
      }
    }
  });
  return { keys, defs: childrenDefs };
};
const WidgetsRegistration = {};
const registerWidget = (options) => {
  const { key, ...widget } = options;
  const existing = WidgetsRegistration[key] ?? null;
  WidgetsRegistration[key] = widget;
  if (existing != null) {
    console.warn(`Widget[key=${key}, def=${JSON.stringify(existing)}] is replaced by [${JSON.stringify(widget)}]`);
  }
  return { key, ...existing };
};
const findWidget = (key) => {
  const widget = WidgetsRegistration[key];
  return widget == null ? null : { key, ...widget };
};
const ArrayElement = (props) => {
  const { elements, elementModel, index, $wrapped, $arrayP2r, $array, createRemoveElementFunc, widget, originalProps, ...rest } = props;
  const { keys, defs: childrenDefs } = useContainerChildren({ def: originalProps });
  const $p2r = PPUtils.concat($arrayP2r, `[${index}]`);
  const enhancedForElement = {
    ...$array,
    elementIndex: index,
    removeElement: createRemoveElementFunc(elementModel, index)
  };
  const ElementContainer = widget.ELEMENT;
  return React.createElement(
    ArrayElementEventBusProvider,
    null,
    React.createElement(ArrayElementValidationEventHolder, null),
    React.createElement(ElementContainer, { "$wrapped": {
      ...$wrapped,
      $arrayHolder: $wrapped.$model,
      $array: elements,
      $p2r,
      $model: elementModel
    }, "$array": enhancedForElement, ...rest }, renderContainerChildren({
      def: originalProps,
      childrenDefs,
      keys,
      $wrapped: {
        ...$wrapped,
        $arrayHolder: $wrapped.$model,
        $array: elements,
        $p2r,
        $model: elementModel
      }
    }))
  );
};
const ArrayWrapper = (props) => {
  var _a;
  const { $root, $p2r, $model, $wt, $avs, $vfs, $array, useComputedStyle, ...rest } = props;
  const { onValueChange: $onValueChange, onValueChanged } = useSetValue(props);
  const $wrapped = { $root, $p2r, $model, $onValueChange, $avs, $vfs };
  const { elements, $arrayP2r, addElement, removeElement, createRemoveElementFunc, clearElement, getElementKey } = useArrayFunctions({ props, onValueChanged });
  const hasElement = elements.length !== 0;
  const widget = findWidget($wt);
  const C = widget.JSX;
  const Top = widget.TOP;
  const Body = widget.BODY;
  const NoData = widget.NO_ELEMENT;
  const Bottom = widget.BOTTOM;
  const enhancedForArray = { ...$array, removeElement, addElement, hasElement, clearElement };
  const body = () => {
    return [
      NoData != null && (elements == null || elements.length === 0) ? React.createElement(NoData, { "$wrapped": $wrapped, "$array": enhancedForArray, ...rest, key: "$$no-data$$" }) : null,
      ...elements.map((elementModel, index) => {
        const key = getElementKey(elementModel);
        N1Logger.debug(`Array element[key=${key}, path=${$p2r}].`, elementModel, "ArrayWrapper");
        return React.createElement(ArrayElement, { elements, elementModel, index, "$wrapped": $wrapped, "$arrayP2r": $arrayP2r, "$array": enhancedForArray, createRemoveElementFunc, widget, originalProps: props, ...rest, key });
      })
    ];
  };
  const style = useComputedStyle ? NUtils.computeStyle(rest) : void 0;
  return React.createElement(
    C,
    { "$wrapped": $wrapped, ...rest, "$wt": $wt, style, "data-valid": ((_a = $avs == null ? void 0 : $avs.$valid) == null ? void 0 : _a.valid) ?? true },
    Top != null ? React.createElement(Top, { "$wrapped": $wrapped, "$array": enhancedForArray, ...rest }) : null,
    Body == null ? body() : React.createElement(Body, { "$wrapped": $wrapped, "$array": enhancedForArray, ...rest }, body()),
    Bottom != null ? React.createElement(Bottom, { "$wrapped": $wrapped, "$array": enhancedForArray, ...rest }) : null
  );
};
const ContainerWrapper = (props) => {
  var _a;
  const { $root, $p2r, $model, $wt, $avs, $vfs, useComputedStyle, ...rest } = props;
  const { keys, defs: childrenDefs } = useContainerChildren({ def: props });
  const { $subModel, $subP2r } = (() => {
    if (PPUtils.isLevelStayed(rest.$pp)) {
      return { $subModel: $model, $subP2r: $p2r };
    } else {
      return { $subModel: MUtils.getValue($model, rest.$pp), $subP2r: PPUtils.absolute($p2r, rest.$pp) };
    }
  })();
  const $onValueChange = useSetValue(props).onValueChange;
  const $wrapped = { $root, $p2r, $model, $onValueChange, $avs, $vfs };
  const widget = findWidget($wt);
  const C = widget.JSX;
  const style = useComputedStyle ? NUtils.computeStyle(rest) : void 0;
  return React.createElement(C, { "$wrapped": $wrapped, ...rest, "$wt": $wt, style, "data-valid": ((_a = $avs == null ? void 0 : $avs.$valid) == null ? void 0 : _a.valid) ?? true }, renderContainerChildren({
    def: props,
    childrenDefs,
    keys,
    $wrapped: { ...$wrapped, $p2r: $subP2r, $model: $subModel }
  }));
};
const LeafWrapper = (props) => {
  var _a;
  const { $root, $p2r, $model, $wt, $avs, $vfs, useComputedStyle, ...rest } = props;
  const $onValueChange = useSetValue(props).onValueChange;
  const $wrapped = { $root, $p2r, $model, $onValueChange, $avs, $vfs };
  const widget = findWidget($wt);
  const C = widget.JSX;
  const style = useComputedStyle ? NUtils.computeStyle(rest) : void 0;
  return React.createElement(C, { "$wrapped": $wrapped, ...rest, "$wt": $wt, style, "data-valid": ((_a = $avs == null ? void 0 : $avs.$valid) == null ? void 0 : _a.valid) ?? true });
};
const WrapperDelegateWorker = (workerProps) => {
  const { $wt, $defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues, ...rest } = workerProps;
  const props = { $wt, ...rest };
  const { on, off } = useWrapperEventBus();
  const validators = useValidationFunctions(props);
  useAttributesWatch({ props, attributeValues, setAttributeValues });
  useValidate({ props, attributeValues, setAttributeValues });
  useValidationRegistration({ props, attributeValues, setAttributeValues });
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    on(WrapperEventTypes.REPAINT, forceUpdate);
    return () => {
      off(WrapperEventTypes.REPAINT, forceUpdate);
    };
  }, [on, off, forceUpdate]);
  if (VUtils.isBlank($wt)) {
    N1Logger.error(`Widget type must be declared, current is [${$wt}].`, "WrapperDelegate");
    return null;
  }
  const widgetTypes = $wt.split(".").map(($wt2) => $wt2.trim());
  if (widgetTypes.some(($wt2) => $wt2.length === 0)) {
    N1Logger.error(`Incorrect widget type[${$wt}].`, "WrapperDelegate");
    return null;
  }
  const [widgetType, ...coverTypes] = widgetTypes;
  const coverWidgets = coverTypes.map((coverType) => {
    const cover = findWidget(coverType);
    if (cover == null) {
      N1Logger.error(`Widget definition of [${widgetType}] in [${$wt}] not found.`, "WrapperDelegate");
      return [coverType, null];
    }
    return [coverType, cover];
  });
  if (coverWidgets.some(([, cover]) => cover == null)) {
    return null;
  }
  const hasCover = coverTypes.length > 0;
  const coverConsumePosition = hasCover && coverWidgets.some(([, cover]) => cover.consumePosition !== false);
  const kernel = (() => {
    const widget = findWidget(widgetType);
    if (widget == null) {
      N1Logger.error(`Widget definition of [${widgetType}] in [${$wt}] not found.`, "WrapperDelegate");
      return null;
    }
    if (widget.container && widget.array) {
      return React.createElement(
        ContainerEventBusProvider,
        null,
        React.createElement(ContainerValidationEventHolder, null),
        React.createElement(ArrayWrapper, { ...props, "$wt": widgetType, "$avs": attributeValues, "$vfs": validators, useComputedStyle: widget.consumePosition !== false })
      );
    } else if (widget.container) {
      return React.createElement(
        ContainerEventBusProvider,
        null,
        React.createElement(ContainerValidationEventHolder, null),
        React.createElement(ContainerWrapper, { ...props, "$wt": widgetType, "$avs": attributeValues, "$vfs": validators, useComputedStyle: widget.consumePosition !== false })
      );
    } else {
      return React.createElement(LeafWrapper, { ...props, "$wt": widgetType, "$avs": attributeValues, "$vfs": validators, useComputedStyle: !coverConsumePosition && widget.consumePosition !== false });
    }
  })();
  return coverWidgets.reduce((child, [$wt2, cover]) => {
    if (child == null) {
      return null;
    }
    return React.createElement(LeafWrapper, { ...props, "$wt": $wt2, "$avs": attributeValues, "$vfs": validators, useComputedStyle: cover.consumePosition !== false }, child);
  }, kernel);
};
const WrapperDelegate = (props) => {
  const { initialized, $defaultAttributes, $defaultAttributesSet } = useDefaultAttributeValues(props);
  if (!initialized) {
    return null;
  }
  return React.createElement(WrapperDelegateWorker, { ...props, "$defaultAttributes": $defaultAttributes, "$defaultAttributesSet": $defaultAttributesSet });
};
const computeRenderOnTags = (renderOn) => {
  if (renderOn == null) {
    return [];
  }
  if (typeof renderOn === "string") {
    if (VUtils.isNotBlank(renderOn)) {
      return renderOn.split(/[,;]/).map((tag) => tag.trim()).filter((tag) => tag.length !== 0);
    }
  } else if (typeof renderOn === "function") {
    return renderOn();
  }
  return [];
};
const Wrapper = (props) => {
  const deviceTags = useDeviceTags();
  const renderOnTags = computeRenderOnTags(props.$renderOn);
  const render = renderOnTags.length === 0 || renderOnTags.some((tag) => deviceTags[`data-${tag}`]);
  if (!render) {
    return null;
  }
  return React.createElement(
    WrapperEventBusProvider,
    null,
    React.createElement(WrapperDelegate, { ...props, ...deviceTags })
  );
};
const renderContainerChildren = (options) => {
  const { def, childrenDefs, keys, $wrapped: { $root, $p2r, $model } } = options;
  return childrenDefs.filter((x) => x != null).map((childProps) => {
    const { $key: keyOfChild, ...restOfChild } = childProps;
    const key = findContainerChildKey(keys, childProps);
    N1Logger.debug(`Container element[key=${key}, path=${PPUtils.concat($p2r, restOfChild.$pp)}].`, childProps, "RenderContainerChildren");
    NUtils.inheritValidationScopes(def, restOfChild);
    return React.createElement(Wrapper, { "$root": $root, "$p2r": $p2r, "$model": $model, "$key": key, ...restOfChild, key });
  });
};
window.Buffer = buffer.Buffer;
const StandaloneRoot = (props) => {
  const { $key, $root, $pp, $validationScopes, externalDefs, leading, children, tailing, ...rest } = props;
  if ($root == null) {
    N1Logger.error("Root data model cannot be null, nothing would be rendering now.", "StandaloneRoot");
    return null;
  }
  const modelPath = PPUtils.legalize($pp);
  const model = MUtils.getValue($root, modelPath);
  const recompute = { $key, $validationScopes };
  NUtils.getDefKey(recompute);
  NUtils.inheritValidationScopes({}, recompute);
  return React.createElement(
    RootEventBusProvider,
    null,
    React.createElement(ExternalDefsHandler, { options: rest, externalDefs }),
    React.createElement(DeviceDetective, null),
    React.createElement(RootToBridgeUndercover, null),
    React.createElement(ValidationEventHolder, null),
    leading,
    children,
    React.createElement(Wrapper, { "$root": $root, "$p2r": modelPath, "$model": model, ...recompute, ...rest }),
    tailing
  );
};
export {
  BridgeEventBusProvider as B,
  DeviceDetective as D,
  ExternalDefIndicator as E,
  MUtils as M,
  NUtils as N,
  PPUtils as P,
  RootEventTypes as R,
  StandaloneRoot as S,
  VUtils as V,
  WrapperEventTypes as W,
  useThrottler as a,
  useWrapperEventBus as b,
  createLogger as c,
  Wrapper as d,
  useForceUpdate as e,
  MBUtils as f,
  useCreateEventBus as g,
  useDefaultAttributeValues as h,
  PROPERTY_PATH_ME as i,
  useAttributesWatch as j,
  MonitorNodeAttributes as k,
  Reaction as l,
  ExternalDefMismatchIndicator as m,
  N1Logger as n,
  useBridgeEventBus as o,
  BridgeToRootEventTypes as p,
  registerWidget as r,
  useRootEventBus as u
};
