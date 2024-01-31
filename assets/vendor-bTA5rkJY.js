import { g as getDefaultExportFromCjs } from "./babel-AnpZxJH-.js";
import { s as stringifyPosition } from "./unist-5yxlKLF4.js";
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b2) {
    var c2 = a2.length;
    a2.push(b2);
    a:
      for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e2 = a2[d2];
        if (0 < g2(e2, b2))
          a2[d2] = b2, a2[c2] = e2, c2 = d2;
        else
          break a;
      }
  }
  function h2(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k(a2) {
    if (0 === a2.length)
      return null;
    var b2 = a2[0], c2 = a2.pop();
    if (c2 !== b2) {
      a2[0] = c2;
      a:
        for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C = a2[m2], n2 = m2 + 1, x = a2[n2];
          if (0 > g2(C, c2))
            n2 < e2 && 0 > g2(x, C) ? (a2[d2] = x, a2[n2] = c2, d2 = n2) : (a2[d2] = C, a2[m2] = c2, d2 = m2);
          else if (n2 < e2 && 0 > g2(x, c2))
            a2[d2] = x, a2[n2] = c2, d2 = n2;
          else
            break a;
        }
    }
    return b2;
  }
  function g2(a2, b2) {
    var c2 = a2.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z = false, A = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G(a2) {
    for (var b2 = h2(t2); null !== b2; ) {
      if (null === b2.callback)
        k(t2);
      else if (b2.startTime <= a2)
        k(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else
        break;
      b2 = h2(t2);
    }
  }
  function H(a2) {
    B = false;
    G(a2);
    if (!A)
      if (null !== h2(r2))
        A = true, I(J);
      else {
        var b2 = h2(t2);
        null !== b2 && K(H, b2.startTime - a2);
      }
  }
  function J(a2, b2) {
    A = false;
    B && (B = false, E2(L2), L2 = -1);
    z = true;
    var c2 = y2;
    try {
      G(b2);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k(r2);
          G(b2);
        } else
          k(r2);
        v2 = h2(r2);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h2(t2);
        null !== m2 && K(H, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z = false;
    }
  }
  var N = false, O = null, L2 = -1, P2 = 5, Q = -1;
  function M() {
    return exports.unstable_now() - Q < P2 ? false : true;
  }
  function R2() {
    if (null !== O) {
      var a2 = exports.unstable_now();
      Q = a2;
      var b2 = true;
      try {
        b2 = O(true, a2);
      } finally {
        b2 ? S2() : (N = false, O = null);
      }
    } else
      N = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U.postMessage(null);
    };
  } else
    S2 = function() {
      D(R2, 0);
    };
  function I(a2) {
    O = a2;
    N || (N = true, S2());
  }
  function K(a2, b2) {
    L2 = D(function() {
      a2(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A || z || (A = true, I(J));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b2) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b2, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a2) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h2(r2) && a2 === h2(t2) && (B ? (E2(L2), L2 = -1) : B = true, K(H, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A || z || (A = true, I(J)));
    return a2;
  };
  exports.unstable_shouldYield = M;
  exports.unstable_wrapCallback = function(a2) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
var buffer$1 = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i$1 = 0, len = code.length; i$1 < len; ++i$1) {
  lookup[i$1] = code[i$1];
  revLookup[code.charCodeAt(i$1)] = i$1;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i2;
  for (i2 = 0; i2 < len; i2 += 4) {
    tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i2 = start; i2 < end; i2 += 3) {
    tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i2 = 0, len2 = len - extraBytes; i2 < len2; i2 += maxChunkLength) {
    parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len2 ? len2 : i2 + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
  var e2, m2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i2 = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s2 = buffer2[offset + i2];
  i2 += d2;
  e2 = s2 & (1 << -nBits) - 1;
  s2 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e2 = e2 * 256 + buffer2[offset + i2], i2 += d2, nBits -= 8) {
  }
  m2 = e2 & (1 << -nBits) - 1;
  e2 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m2 = m2 * 256 + buffer2[offset + i2], i2 += d2, nBits -= 8) {
  }
  if (e2 === 0) {
    e2 = 1 - eBias;
  } else if (e2 === eMax) {
    return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
  } else {
    m2 = m2 + Math.pow(2, mLen);
    e2 = e2 - eBias;
  }
  return (s2 ? -1 : 1) * m2 * Math.pow(2, e2 - mLen);
};
ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
  var e2, m2, c2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i2 = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m2 = isNaN(value) ? 1 : 0;
    e2 = eMax;
  } else {
    e2 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c2 = Math.pow(2, -e2)) < 1) {
      e2--;
      c2 *= 2;
    }
    if (e2 + eBias >= 1) {
      value += rt / c2;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c2 >= 2) {
      e2++;
      c2 /= 2;
    }
    if (e2 + eBias >= eMax) {
      m2 = 0;
      e2 = eMax;
    } else if (e2 + eBias >= 1) {
      m2 = (value * c2 - 1) * Math.pow(2, mLen);
      e2 = e2 + eBias;
    } else {
      m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e2 = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset + i2] = m2 & 255, i2 += d2, m2 /= 256, mLen -= 8) {
  }
  e2 = e2 << mLen | m2;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset + i2] = e2 & 255, i2 += d2, e2 /= 256, eLen -= 8) {
  }
  buffer2[offset + i2 - d2] |= s2 * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(exports) {
  const base64 = base64Js;
  const ieee754$1 = ieee754;
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports.Buffer = Buffer;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
  }
  function typedArraySupport() {
    try {
      const arr = new Uint8Array(1);
      const proto = { foo: function() {
        return 42;
      } };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e2) {
      return false;
    }
  }
  Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
  }
  function Buffer(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer.from(valueOf, encodingOrOffset, length);
    }
    const b2 = fromObject(value);
    if (b2)
      return b2;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
    );
  }
  Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength2(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i2 = 0; i2 < length; i2 += 1) {
      buf[i2] = array[i2] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy2 = new Uint8Array(arrayView);
      return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer.alloc(+length);
  }
  Buffer.isBuffer = function isBuffer3(b2) {
    return b2 != null && b2._isBuffer === true && b2 !== Buffer.prototype;
  };
  Buffer.compare = function compare(a2, b2) {
    if (isInstance(a2, Uint8Array))
      a2 = Buffer.from(a2, a2.offset, a2.byteLength);
    if (isInstance(b2, Uint8Array))
      b2 = Buffer.from(b2, b2.offset, b2.byteLength);
    if (!Buffer.isBuffer(a2) || !Buffer.isBuffer(b2)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    }
    if (a2 === b2)
      return 0;
    let x = a2.length;
    let y2 = b2.length;
    for (let i2 = 0, len = Math.min(x, y2); i2 < len; ++i2) {
      if (a2[i2] !== b2[i2]) {
        x = a2[i2];
        y2 = b2[i2];
        break;
      }
    }
    if (x < y2)
      return -1;
    if (y2 < x)
      return 1;
    return 0;
  };
  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer.concat = function concat2(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer.alloc(0);
    }
    let i2;
    if (length === void 0) {
      length = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        length += list[i2].length;
      }
    }
    const buffer2 = Buffer.allocUnsafe(length);
    let pos = 0;
    for (i2 = 0; i2 < list.length; ++i2) {
      let buf = list[i2];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer2.length) {
          if (!Buffer.isBuffer(buf))
            buf = Buffer.from(buf);
          buf.copy(buffer2, pos);
        } else {
          Uint8Array.prototype.set.call(
            buffer2,
            buf,
            pos
          );
        }
      } else if (!Buffer.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer2, pos);
      }
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
      );
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.prototype._isBuffer = true;
  function swap(b2, n2, m2) {
    const i2 = b2[n2];
    b2[n2] = b2[m2];
    b2[m2] = i2;
  }
  Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i2 = 0; i2 < len; i2 += 2) {
      swap(this, i2, i2 + 1);
    }
    return this;
  };
  Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i2 = 0; i2 < len; i2 += 4) {
      swap(this, i2, i2 + 3);
      swap(this, i2 + 1, i2 + 2);
    }
    return this;
  };
  Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i2 = 0; i2 < len; i2 += 8) {
      swap(this, i2, i2 + 7);
      swap(this, i2 + 1, i2 + 6);
      swap(this, i2 + 2, i2 + 5);
      swap(this, i2 + 3, i2 + 4);
    }
    return this;
  };
  Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer.prototype.toLocaleString = Buffer.prototype.toString;
  Buffer.prototype.equals = function equals(b2) {
    if (!Buffer.isBuffer(b2))
      throw new TypeError("Argument must be a Buffer");
    if (this === b2)
      return true;
    return Buffer.compare(this, b2) === 0;
  };
  Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
  }
  Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    let x = thisEnd - thisStart;
    let y2 = end - start;
    const len = Math.min(x, y2);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i2 = 0; i2 < len; ++i2) {
      if (thisCopy[i2] !== targetCopy[i2]) {
        x = thisCopy[i2];
        y2 = targetCopy[i2];
        break;
      }
    }
    if (x < y2)
      return -1;
    if (y2 < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
    if (buffer2.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer.from(val, encoding);
    }
    if (Buffer.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i3) {
      if (indexSize === 1) {
        return buf[i3];
      } else {
        return buf.readUInt16BE(i3 * indexSize);
      }
    }
    let i2;
    if (dir) {
      let foundIndex = -1;
      for (i2 = byteOffset; i2 < arrLength; i2++) {
        if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i2;
          if (i2 - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i2 -= i2 - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i2 = byteOffset; i2 >= 0; i2--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i2 + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i2;
      }
    }
    return -1;
  }
  Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i2;
    for (i2 = 0; i2 < length; ++i2) {
      const parsed = parseInt(string.substr(i2 * 2, 2), 16);
      if (numberIsNaN(parsed))
        return i2;
      buf[offset + i2] = parsed;
    }
    return i2;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i2 = start;
    while (i2 < end) {
      const firstByte = buf[i2];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i2 + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i2 + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i2 + 1];
            thirdByte = buf[i2 + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i2 + 1];
            thirdByte = buf[i2 + 2];
            fourthByte = buf[i2 + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i2 += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i2 = 0;
    while (i2 < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i2 = start; i2 < end; ++i2) {
      ret += String.fromCharCode(buf[i2] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i2 = start; i2 < end; ++i2) {
      ret += String.fromCharCode(buf[i2]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    let out = "";
    for (let i2 = start; i2 < end; ++i2) {
      out += hexSliceLookupTable[buf[i2]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
      res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
    }
    return res;
  }
  Buffer.prototype.slice = function slice2(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    let val = this[offset];
    let mul = 1;
    let i2 = 0;
    while (++i2 < byteLength3 && (mul *= 256)) {
      val += this[offset + i2] * mul;
    }
    return val;
  };
  Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength3, this.length);
    }
    let val = this[offset + --byteLength3];
    let mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength3] * mul;
    }
    return val;
  };
  Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    let val = this[offset];
    let mul = 1;
    let i2 = 0;
    while (++i2 < byteLength3 && (mul *= 256)) {
      val += this[offset + i2] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    let i2 = byteLength3;
    let mul = 1;
    let val = this[offset + --i2];
    while (i2 > 0 && (mul *= 256)) {
      val += this[offset + --i2] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, true, 23, 4);
  };
  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, false, 23, 4);
  };
  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, true, 52, 8);
  };
  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    let mul = 1;
    let i2 = 0;
    this[offset] = value & 255;
    while (++i2 < byteLength3 && (mul *= 256)) {
      this[offset + i2] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    let i2 = byteLength3 - 1;
    let mul = 1;
    this[offset + i2] = value & 255;
    while (--i2 >= 0 && (mul *= 256)) {
      this[offset + i2] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    let i2 = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i2 < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
        sub = 1;
      }
      this[offset + i2] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    let i2 = byteLength3 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i2] = value & 255;
    while (--i2 >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
        sub = 1;
      }
      this[offset + i2] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer.prototype.copy = function copy2(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }
    return len;
  };
  Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code2 = val.charCodeAt(0);
        if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
          val = code2;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    let i2;
    if (typeof val === "number") {
      for (i2 = start; i2 < end; ++i2) {
        this[i2] = val;
      }
    } else {
      const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i2 = 0; i2 < end - start; ++i2) {
        this[i2 + start] = bytes[i2 % len];
      }
    }
    return this;
  };
  const errors = {};
  function E2(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E2(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(name2) {
      if (name2) {
        return `${name2} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    },
    RangeError
  );
  E2(
    "ERR_INVALID_ARG_TYPE",
    function(name2, actual) {
      return `The "${name2}" argument must be of type number. Received type ${typeof actual}`;
    },
    TypeError
  );
  E2(
    "ERR_OUT_OF_RANGE",
    function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    },
    RangeError
  );
  function addNumericalSeparator(val) {
    let res = "";
    let i2 = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i2 >= start + 4; i2 -= 3) {
      res = `_${val.slice(i2 - 3, i2)}${res}`;
    }
    return `${val.slice(0, i2)}${res}`;
  }
  function checkBounds(buf, offset, byteLength3) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
      boundsError(offset, buf.length - (byteLength3 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength3) {
    if (value > max || value < min) {
      const n2 = typeof min === "bigint" ? "n" : "";
      let range;
      if (byteLength3 > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n2} and < 2${n2} ** ${(byteLength3 + 1) * 8}${n2}`;
        } else {
          range = `>= -(2${n2} ** ${(byteLength3 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n2}`;
        }
      } else {
        range = `>= ${min}${n2} and <= ${max}${n2}`;
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength3);
  }
  function validateNumber(value, name2) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name2, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(
      type || "offset",
      `>= ${type ? 1 : 0} and <= ${length}`,
      value
    );
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i2 = 0; i2 < length; ++i2) {
      codePoint = string.charCodeAt(i2);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i2 + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i2 = 0; i2 < str.length; ++i2) {
      byteArray.push(str.charCodeAt(i2) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c2, hi, lo;
    const byteArray = [];
    for (let i2 = 0; i2 < str.length; ++i2) {
      if ((units -= 2) < 0)
        break;
      c2 = str.charCodeAt(i2);
      hi = c2 >> 8;
      lo = c2 % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i2;
    for (i2 = 0; i2 < length; ++i2) {
      if (i2 + offset >= dst.length || i2 >= src.length)
        break;
      dst[i2 + offset] = src[i2];
    }
    return i2;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i2 = 0; i2 < 16; ++i2) {
      const i16 = i2 * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i2] + alphabet[j];
      }
    }
    return table;
  }();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
})(buffer$1);
var events = { exports: {} };
var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn)
    console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once2;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function() {
  if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || void 0;
};
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n2) {
  if (typeof n2 !== "number" || n2 < 0 || NumberIsNaN(n2)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n2 + ".");
  }
  this._maxListeners = n2;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i2 = 1; i2 < arguments.length; i2++)
    args.push(arguments[i2]);
  var doError = type === "error";
  var events2 = this._events;
  if (events2 !== void 0)
    doError = doError && events2.error === void 0;
  else if (!doError)
    return false;
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      throw er;
    }
    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
    err.context = er;
    throw err;
  }
  var handler = events2[type];
  if (handler === void 0)
    return false;
  if (typeof handler === "function") {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i2 = 0; i2 < len; ++i2)
      ReflectApply(listeners2[i2], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m2;
  var events2;
  var existing;
  checkListener(listener);
  events2 = target._events;
  if (events2 === void 0) {
    events2 = target._events = /* @__PURE__ */ Object.create(null);
    target._eventsCount = 0;
  } else {
    if (events2.newListener !== void 0) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );
      events2 = target._events;
    }
    existing = events2[type];
  }
  if (existing === void 0) {
    existing = events2[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
    m2 = _getMaxListeners(target);
    if (m2 > 0 && existing.length > m2 && !existing.warned) {
      existing.warned = true;
      var w2 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      w2.name = "MaxListenersExceededWarning";
      w2.emitter = target;
      w2.type = type;
      w2.count = existing.length;
      ProcessEmitWarning(w2);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: void 0, target, type, listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events2, position, i2, originalListener;
  checkListener(listener);
  events2 = this._events;
  if (events2 === void 0)
    return this;
  list = events2[type];
  if (list === void 0)
    return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0)
      this._events = /* @__PURE__ */ Object.create(null);
    else {
      delete events2[type];
      if (events2.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;
    for (i2 = list.length - 1; i2 >= 0; i2--) {
      if (list[i2] === listener || list[i2].listener === listener) {
        originalListener = list[i2].listener;
        position = i2;
        break;
      }
    }
    if (position < 0)
      return this;
    if (position === 0)
      list.shift();
    else {
      spliceOne(list, position);
    }
    if (list.length === 1)
      events2[type] = list[0];
    if (events2.removeListener !== void 0)
      this.emit("removeListener", type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners2, events2, i2;
  events2 = this._events;
  if (events2 === void 0)
    return this;
  if (events2.removeListener === void 0) {
    if (arguments.length === 0) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    } else if (events2[type] !== void 0) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else
        delete events2[type];
    }
    return this;
  }
  if (arguments.length === 0) {
    var keys2 = Object.keys(events2);
    var key;
    for (i2 = 0; i2 < keys2.length; ++i2) {
      key = keys2[i2];
      if (key === "removeListener")
        continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners2 = events2[type];
  if (typeof listeners2 === "function") {
    this.removeListener(type, listeners2);
  } else if (listeners2 !== void 0) {
    for (i2 = listeners2.length - 1; i2 >= 0; i2--) {
      this.removeListener(type, listeners2[i2]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events2 = target._events;
  if (events2 === void 0)
    return [];
  var evlistener = events2[type];
  if (evlistener === void 0)
    return [];
  if (typeof evlistener === "function")
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events2 = this._events;
  if (events2 !== void 0) {
    var evlistener = events2[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== void 0) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n2) {
  var copy2 = new Array(n2);
  for (var i2 = 0; i2 < n2; ++i2)
    copy2[i2] = arr[i2];
  return copy2;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i2 = 0; i2 < ret.length; ++i2) {
    ret[i2] = arr[i2].listener || arr[i2];
  }
  return ret;
}
function once2(emitter, name2) {
  return new Promise(function(resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name2, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
    if (name2 !== "error") {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name2, listener);
    } else {
      emitter.on(name2, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name2, function wrapListener(arg) {
      if (flags.once) {
        emitter.removeEventListener(name2, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}
var eventsExports = events.exports;
const EventEmitter$1 = /* @__PURE__ */ getDefaultExportFromCjs(eventsExports);
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
var colorString$1 = { exports: {} };
var colorName = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};
var simpleSwizzle = { exports: {} };
var isArrayish$1 = function isArrayish(obj) {
  if (!obj || typeof obj === "string") {
    return false;
  }
  return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
};
var isArrayish2 = isArrayish$1;
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;
var swizzle$1 = simpleSwizzle.exports = function swizzle(args) {
  var results = [];
  for (var i2 = 0, len = args.length; i2 < len; i2++) {
    var arg = args[i2];
    if (isArrayish2(arg)) {
      results = concat.call(results, slice.call(arg));
    } else {
      results.push(arg);
    }
  }
  return results;
};
swizzle$1.wrap = function(fn) {
  return function() {
    return fn(swizzle$1(arguments));
  };
};
var simpleSwizzleExports = simpleSwizzle.exports;
var colorNames = colorName;
var swizzle2 = simpleSwizzleExports;
var hasOwnProperty$1 = Object.hasOwnProperty;
var reverseNames = /* @__PURE__ */ Object.create(null);
for (var name$1 in colorNames) {
  if (hasOwnProperty$1.call(colorNames, name$1)) {
    reverseNames[colorNames[name$1]] = name$1;
  }
}
var cs = colorString$1.exports = {
  to: {},
  get: {}
};
cs.get = function(string) {
  var prefix = string.substring(0, 3).toLowerCase();
  var val;
  var model;
  switch (prefix) {
    case "hsl":
      val = cs.get.hsl(string);
      model = "hsl";
      break;
    case "hwb":
      val = cs.get.hwb(string);
      model = "hwb";
      break;
    default:
      val = cs.get.rgb(string);
      model = "rgb";
      break;
  }
  if (!val) {
    return null;
  }
  return { model, value: val };
};
cs.get.rgb = function(string) {
  if (!string) {
    return null;
  }
  var abbr = /^#([a-f0-9]{3,4})$/i;
  var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
  var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
  var keyword = /^(\w+)$/;
  var rgb = [0, 0, 0, 1];
  var match;
  var i2;
  var hexAlpha;
  if (match = string.match(hex)) {
    hexAlpha = match[2];
    match = match[1];
    for (i2 = 0; i2 < 3; i2++) {
      var i22 = i2 * 2;
      rgb[i2] = parseInt(match.slice(i22, i22 + 2), 16);
    }
    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha, 16) / 255;
    }
  } else if (match = string.match(abbr)) {
    match = match[1];
    hexAlpha = match[3];
    for (i2 = 0; i2 < 3; i2++) {
      rgb[i2] = parseInt(match[i2] + match[i2], 16);
    }
    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
    }
  } else if (match = string.match(rgba)) {
    for (i2 = 0; i2 < 3; i2++) {
      rgb[i2] = parseInt(match[i2 + 1], 0);
    }
    if (match[4]) {
      if (match[5]) {
        rgb[3] = parseFloat(match[4]) * 0.01;
      } else {
        rgb[3] = parseFloat(match[4]);
      }
    }
  } else if (match = string.match(per)) {
    for (i2 = 0; i2 < 3; i2++) {
      rgb[i2] = Math.round(parseFloat(match[i2 + 1]) * 2.55);
    }
    if (match[4]) {
      if (match[5]) {
        rgb[3] = parseFloat(match[4]) * 0.01;
      } else {
        rgb[3] = parseFloat(match[4]);
      }
    }
  } else if (match = string.match(keyword)) {
    if (match[1] === "transparent") {
      return [0, 0, 0, 0];
    }
    if (!hasOwnProperty$1.call(colorNames, match[1])) {
      return null;
    }
    rgb = colorNames[match[1]];
    rgb[3] = 1;
    return rgb;
  } else {
    return null;
  }
  for (i2 = 0; i2 < 3; i2++) {
    rgb[i2] = clamp(rgb[i2], 0, 255);
  }
  rgb[3] = clamp(rgb[3], 0, 1);
  return rgb;
};
cs.get.hsl = function(string) {
  if (!string) {
    return null;
  }
  var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
  var match = string.match(hsl);
  if (match) {
    var alpha = parseFloat(match[4]);
    var h2 = (parseFloat(match[1]) % 360 + 360) % 360;
    var s2 = clamp(parseFloat(match[2]), 0, 100);
    var l2 = clamp(parseFloat(match[3]), 0, 100);
    var a2 = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h2, s2, l2, a2];
  }
  return null;
};
cs.get.hwb = function(string) {
  if (!string) {
    return null;
  }
  var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
  var match = string.match(hwb);
  if (match) {
    var alpha = parseFloat(match[4]);
    var h2 = (parseFloat(match[1]) % 360 + 360) % 360;
    var w2 = clamp(parseFloat(match[2]), 0, 100);
    var b2 = clamp(parseFloat(match[3]), 0, 100);
    var a2 = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h2, w2, b2, a2];
  }
  return null;
};
cs.to.hex = function() {
  var rgba = swizzle2(arguments);
  return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
};
cs.to.rgb = function() {
  var rgba = swizzle2(arguments);
  return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
};
cs.to.rgb.percent = function() {
  var rgba = swizzle2(arguments);
  var r2 = Math.round(rgba[0] / 255 * 100);
  var g2 = Math.round(rgba[1] / 255 * 100);
  var b2 = Math.round(rgba[2] / 255 * 100);
  return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r2 + "%, " + g2 + "%, " + b2 + "%)" : "rgba(" + r2 + "%, " + g2 + "%, " + b2 + "%, " + rgba[3] + ")";
};
cs.to.hsl = function() {
  var hsla = swizzle2(arguments);
  return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
};
cs.to.hwb = function() {
  var hwba = swizzle2(arguments);
  var a2 = "";
  if (hwba.length >= 4 && hwba[3] !== 1) {
    a2 = ", " + hwba[3];
  }
  return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a2 + ")";
};
cs.to.keyword = function(rgb) {
  return reverseNames[rgb.slice(0, 3)];
};
function clamp(num, min, max) {
  return Math.min(Math.max(min, num), max);
}
function hexDouble(num) {
  var str = Math.round(num).toString(16).toUpperCase();
  return str.length < 2 ? "0" + str : str;
}
var colorStringExports = colorString$1.exports;
const cssKeywords = colorName;
const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
  reverseKeywords[cssKeywords[key]] = key;
}
const convert$2 = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
var conversions$2 = convert$2;
for (const model of Object.keys(convert$2)) {
  if (!("channels" in convert$2[model])) {
    throw new Error("missing channels property: " + model);
  }
  if (!("labels" in convert$2[model])) {
    throw new Error("missing channel labels property: " + model);
  }
  if (convert$2[model].labels.length !== convert$2[model].channels) {
    throw new Error("channel and label counts mismatch: " + model);
  }
  const { channels, labels } = convert$2[model];
  delete convert$2[model].channels;
  delete convert$2[model].labels;
  Object.defineProperty(convert$2[model], "channels", { value: channels });
  Object.defineProperty(convert$2[model], "labels", { value: labels });
}
convert$2.rgb.hsl = function(rgb) {
  const r2 = rgb[0] / 255;
  const g2 = rgb[1] / 255;
  const b2 = rgb[2] / 255;
  const min = Math.min(r2, g2, b2);
  const max = Math.max(r2, g2, b2);
  const delta = max - min;
  let h2;
  let s2;
  if (max === min) {
    h2 = 0;
  } else if (r2 === max) {
    h2 = (g2 - b2) / delta;
  } else if (g2 === max) {
    h2 = 2 + (b2 - r2) / delta;
  } else if (b2 === max) {
    h2 = 4 + (r2 - g2) / delta;
  }
  h2 = Math.min(h2 * 60, 360);
  if (h2 < 0) {
    h2 += 360;
  }
  const l2 = (min + max) / 2;
  if (max === min) {
    s2 = 0;
  } else if (l2 <= 0.5) {
    s2 = delta / (max + min);
  } else {
    s2 = delta / (2 - max - min);
  }
  return [h2, s2 * 100, l2 * 100];
};
convert$2.rgb.hsv = function(rgb) {
  let rdif;
  let gdif;
  let bdif;
  let h2;
  let s2;
  const r2 = rgb[0] / 255;
  const g2 = rgb[1] / 255;
  const b2 = rgb[2] / 255;
  const v2 = Math.max(r2, g2, b2);
  const diff = v2 - Math.min(r2, g2, b2);
  const diffc = function(c2) {
    return (v2 - c2) / 6 / diff + 1 / 2;
  };
  if (diff === 0) {
    h2 = 0;
    s2 = 0;
  } else {
    s2 = diff / v2;
    rdif = diffc(r2);
    gdif = diffc(g2);
    bdif = diffc(b2);
    if (r2 === v2) {
      h2 = bdif - gdif;
    } else if (g2 === v2) {
      h2 = 1 / 3 + rdif - bdif;
    } else if (b2 === v2) {
      h2 = 2 / 3 + gdif - rdif;
    }
    if (h2 < 0) {
      h2 += 1;
    } else if (h2 > 1) {
      h2 -= 1;
    }
  }
  return [
    h2 * 360,
    s2 * 100,
    v2 * 100
  ];
};
convert$2.rgb.hwb = function(rgb) {
  const r2 = rgb[0];
  const g2 = rgb[1];
  let b2 = rgb[2];
  const h2 = convert$2.rgb.hsl(rgb)[0];
  const w2 = 1 / 255 * Math.min(r2, Math.min(g2, b2));
  b2 = 1 - 1 / 255 * Math.max(r2, Math.max(g2, b2));
  return [h2, w2 * 100, b2 * 100];
};
convert$2.rgb.cmyk = function(rgb) {
  const r2 = rgb[0] / 255;
  const g2 = rgb[1] / 255;
  const b2 = rgb[2] / 255;
  const k = Math.min(1 - r2, 1 - g2, 1 - b2);
  const c2 = (1 - r2 - k) / (1 - k) || 0;
  const m2 = (1 - g2 - k) / (1 - k) || 0;
  const y2 = (1 - b2 - k) / (1 - k) || 0;
  return [c2 * 100, m2 * 100, y2 * 100, k * 100];
};
function comparativeDistance(x, y2) {
  return (x[0] - y2[0]) ** 2 + (x[1] - y2[1]) ** 2 + (x[2] - y2[2]) ** 2;
}
convert$2.rgb.keyword = function(rgb) {
  const reversed = reverseKeywords[rgb];
  if (reversed) {
    return reversed;
  }
  let currentClosestDistance = Infinity;
  let currentClosestKeyword;
  for (const keyword of Object.keys(cssKeywords)) {
    const value = cssKeywords[keyword];
    const distance = comparativeDistance(rgb, value);
    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }
  return currentClosestKeyword;
};
convert$2.keyword.rgb = function(keyword) {
  return cssKeywords[keyword];
};
convert$2.rgb.xyz = function(rgb) {
  let r2 = rgb[0] / 255;
  let g2 = rgb[1] / 255;
  let b2 = rgb[2] / 255;
  r2 = r2 > 0.04045 ? ((r2 + 0.055) / 1.055) ** 2.4 : r2 / 12.92;
  g2 = g2 > 0.04045 ? ((g2 + 0.055) / 1.055) ** 2.4 : g2 / 12.92;
  b2 = b2 > 0.04045 ? ((b2 + 0.055) / 1.055) ** 2.4 : b2 / 12.92;
  const x = r2 * 0.4124 + g2 * 0.3576 + b2 * 0.1805;
  const y2 = r2 * 0.2126 + g2 * 0.7152 + b2 * 0.0722;
  const z = r2 * 0.0193 + g2 * 0.1192 + b2 * 0.9505;
  return [x * 100, y2 * 100, z * 100];
};
convert$2.rgb.lab = function(rgb) {
  const xyz = convert$2.rgb.xyz(rgb);
  let x = xyz[0];
  let y2 = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y2 /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y2 = y2 > 8856e-6 ? y2 ** (1 / 3) : 7.787 * y2 + 16 / 116;
  z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l2 = 116 * y2 - 16;
  const a2 = 500 * (x - y2);
  const b2 = 200 * (y2 - z);
  return [l2, a2, b2];
};
convert$2.hsl.rgb = function(hsl) {
  const h2 = hsl[0] / 360;
  const s2 = hsl[1] / 100;
  const l2 = hsl[2] / 100;
  let t2;
  let t3;
  let val;
  if (s2 === 0) {
    val = l2 * 255;
    return [val, val, val];
  }
  if (l2 < 0.5) {
    t2 = l2 * (1 + s2);
  } else {
    t2 = l2 + s2 - l2 * s2;
  }
  const t1 = 2 * l2 - t2;
  const rgb = [0, 0, 0];
  for (let i2 = 0; i2 < 3; i2++) {
    t3 = h2 + 1 / 3 * -(i2 - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }
    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }
    rgb[i2] = val * 255;
  }
  return rgb;
};
convert$2.hsl.hsv = function(hsl) {
  const h2 = hsl[0];
  let s2 = hsl[1] / 100;
  let l2 = hsl[2] / 100;
  let smin = s2;
  const lmin = Math.max(l2, 0.01);
  l2 *= 2;
  s2 *= l2 <= 1 ? l2 : 2 - l2;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v2 = (l2 + s2) / 2;
  const sv = l2 === 0 ? 2 * smin / (lmin + smin) : 2 * s2 / (l2 + s2);
  return [h2, sv * 100, v2 * 100];
};
convert$2.hsv.rgb = function(hsv) {
  const h2 = hsv[0] / 60;
  const s2 = hsv[1] / 100;
  let v2 = hsv[2] / 100;
  const hi = Math.floor(h2) % 6;
  const f2 = h2 - Math.floor(h2);
  const p2 = 255 * v2 * (1 - s2);
  const q = 255 * v2 * (1 - s2 * f2);
  const t2 = 255 * v2 * (1 - s2 * (1 - f2));
  v2 *= 255;
  switch (hi) {
    case 0:
      return [v2, t2, p2];
    case 1:
      return [q, v2, p2];
    case 2:
      return [p2, v2, t2];
    case 3:
      return [p2, q, v2];
    case 4:
      return [t2, p2, v2];
    case 5:
      return [v2, p2, q];
  }
};
convert$2.hsv.hsl = function(hsv) {
  const h2 = hsv[0];
  const s2 = hsv[1] / 100;
  const v2 = hsv[2] / 100;
  const vmin = Math.max(v2, 0.01);
  let sl;
  let l2;
  l2 = (2 - s2) * v2;
  const lmin = (2 - s2) * vmin;
  sl = s2 * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l2 /= 2;
  return [h2, sl * 100, l2 * 100];
};
convert$2.hwb.rgb = function(hwb) {
  const h2 = hwb[0] / 360;
  let wh = hwb[1] / 100;
  let bl = hwb[2] / 100;
  const ratio = wh + bl;
  let f2;
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }
  const i2 = Math.floor(6 * h2);
  const v2 = 1 - bl;
  f2 = 6 * h2 - i2;
  if ((i2 & 1) !== 0) {
    f2 = 1 - f2;
  }
  const n2 = wh + f2 * (v2 - wh);
  let r2;
  let g2;
  let b2;
  switch (i2) {
    default:
    case 6:
    case 0:
      r2 = v2;
      g2 = n2;
      b2 = wh;
      break;
    case 1:
      r2 = n2;
      g2 = v2;
      b2 = wh;
      break;
    case 2:
      r2 = wh;
      g2 = v2;
      b2 = n2;
      break;
    case 3:
      r2 = wh;
      g2 = n2;
      b2 = v2;
      break;
    case 4:
      r2 = n2;
      g2 = wh;
      b2 = v2;
      break;
    case 5:
      r2 = v2;
      g2 = wh;
      b2 = n2;
      break;
  }
  return [r2 * 255, g2 * 255, b2 * 255];
};
convert$2.cmyk.rgb = function(cmyk) {
  const c2 = cmyk[0] / 100;
  const m2 = cmyk[1] / 100;
  const y2 = cmyk[2] / 100;
  const k = cmyk[3] / 100;
  const r2 = 1 - Math.min(1, c2 * (1 - k) + k);
  const g2 = 1 - Math.min(1, m2 * (1 - k) + k);
  const b2 = 1 - Math.min(1, y2 * (1 - k) + k);
  return [r2 * 255, g2 * 255, b2 * 255];
};
convert$2.xyz.rgb = function(xyz) {
  const x = xyz[0] / 100;
  const y2 = xyz[1] / 100;
  const z = xyz[2] / 100;
  let r2;
  let g2;
  let b2;
  r2 = x * 3.2406 + y2 * -1.5372 + z * -0.4986;
  g2 = x * -0.9689 + y2 * 1.8758 + z * 0.0415;
  b2 = x * 0.0557 + y2 * -0.204 + z * 1.057;
  r2 = r2 > 31308e-7 ? 1.055 * r2 ** (1 / 2.4) - 0.055 : r2 * 12.92;
  g2 = g2 > 31308e-7 ? 1.055 * g2 ** (1 / 2.4) - 0.055 : g2 * 12.92;
  b2 = b2 > 31308e-7 ? 1.055 * b2 ** (1 / 2.4) - 0.055 : b2 * 12.92;
  r2 = Math.min(Math.max(0, r2), 1);
  g2 = Math.min(Math.max(0, g2), 1);
  b2 = Math.min(Math.max(0, b2), 1);
  return [r2 * 255, g2 * 255, b2 * 255];
};
convert$2.xyz.lab = function(xyz) {
  let x = xyz[0];
  let y2 = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y2 /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y2 = y2 > 8856e-6 ? y2 ** (1 / 3) : 7.787 * y2 + 16 / 116;
  z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l2 = 116 * y2 - 16;
  const a2 = 500 * (x - y2);
  const b2 = 200 * (y2 - z);
  return [l2, a2, b2];
};
convert$2.lab.xyz = function(lab) {
  const l2 = lab[0];
  const a2 = lab[1];
  const b2 = lab[2];
  let x;
  let y2;
  let z;
  y2 = (l2 + 16) / 116;
  x = a2 / 500 + y2;
  z = y2 - b2 / 200;
  const y22 = y2 ** 3;
  const x2 = x ** 3;
  const z2 = z ** 3;
  y2 = y22 > 8856e-6 ? y22 : (y2 - 16 / 116) / 7.787;
  x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y2 *= 100;
  z *= 108.883;
  return [x, y2, z];
};
convert$2.lab.lch = function(lab) {
  const l2 = lab[0];
  const a2 = lab[1];
  const b2 = lab[2];
  let h2;
  const hr = Math.atan2(b2, a2);
  h2 = hr * 360 / 2 / Math.PI;
  if (h2 < 0) {
    h2 += 360;
  }
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  return [l2, c2, h2];
};
convert$2.lch.lab = function(lch) {
  const l2 = lch[0];
  const c2 = lch[1];
  const h2 = lch[2];
  const hr = h2 / 360 * 2 * Math.PI;
  const a2 = c2 * Math.cos(hr);
  const b2 = c2 * Math.sin(hr);
  return [l2, a2, b2];
};
convert$2.rgb.ansi16 = function(args, saturation = null) {
  const [r2, g2, b2] = args;
  let value = saturation === null ? convert$2.rgb.hsv(args)[2] : saturation;
  value = Math.round(value / 50);
  if (value === 0) {
    return 30;
  }
  let ansi = 30 + (Math.round(b2 / 255) << 2 | Math.round(g2 / 255) << 1 | Math.round(r2 / 255));
  if (value === 2) {
    ansi += 60;
  }
  return ansi;
};
convert$2.hsv.ansi16 = function(args) {
  return convert$2.rgb.ansi16(convert$2.hsv.rgb(args), args[2]);
};
convert$2.rgb.ansi256 = function(args) {
  const r2 = args[0];
  const g2 = args[1];
  const b2 = args[2];
  if (r2 === g2 && g2 === b2) {
    if (r2 < 8) {
      return 16;
    }
    if (r2 > 248) {
      return 231;
    }
    return Math.round((r2 - 8) / 247 * 24) + 232;
  }
  const ansi = 16 + 36 * Math.round(r2 / 255 * 5) + 6 * Math.round(g2 / 255 * 5) + Math.round(b2 / 255 * 5);
  return ansi;
};
convert$2.ansi16.rgb = function(args) {
  let color2 = args % 10;
  if (color2 === 0 || color2 === 7) {
    if (args > 50) {
      color2 += 3.5;
    }
    color2 = color2 / 10.5 * 255;
    return [color2, color2, color2];
  }
  const mult = (~~(args > 50) + 1) * 0.5;
  const r2 = (color2 & 1) * mult * 255;
  const g2 = (color2 >> 1 & 1) * mult * 255;
  const b2 = (color2 >> 2 & 1) * mult * 255;
  return [r2, g2, b2];
};
convert$2.ansi256.rgb = function(args) {
  if (args >= 232) {
    const c2 = (args - 232) * 10 + 8;
    return [c2, c2, c2];
  }
  args -= 16;
  let rem;
  const r2 = Math.floor(args / 36) / 5 * 255;
  const g2 = Math.floor((rem = args % 36) / 6) / 5 * 255;
  const b2 = rem % 6 / 5 * 255;
  return [r2, g2, b2];
};
convert$2.rgb.hex = function(args) {
  const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert$2.hex.rgb = function(args) {
  const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }
  let colorString2 = match[0];
  if (match[0].length === 3) {
    colorString2 = colorString2.split("").map((char) => {
      return char + char;
    }).join("");
  }
  const integer = parseInt(colorString2, 16);
  const r2 = integer >> 16 & 255;
  const g2 = integer >> 8 & 255;
  const b2 = integer & 255;
  return [r2, g2, b2];
};
convert$2.rgb.hcg = function(rgb) {
  const r2 = rgb[0] / 255;
  const g2 = rgb[1] / 255;
  const b2 = rgb[2] / 255;
  const max = Math.max(Math.max(r2, g2), b2);
  const min = Math.min(Math.min(r2, g2), b2);
  const chroma = max - min;
  let grayscale;
  let hue;
  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }
  if (chroma <= 0) {
    hue = 0;
  } else if (max === r2) {
    hue = (g2 - b2) / chroma % 6;
  } else if (max === g2) {
    hue = 2 + (b2 - r2) / chroma;
  } else {
    hue = 4 + (r2 - g2) / chroma;
  }
  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};
convert$2.hsl.hcg = function(hsl) {
  const s2 = hsl[1] / 100;
  const l2 = hsl[2] / 100;
  const c2 = l2 < 0.5 ? 2 * s2 * l2 : 2 * s2 * (1 - l2);
  let f2 = 0;
  if (c2 < 1) {
    f2 = (l2 - 0.5 * c2) / (1 - c2);
  }
  return [hsl[0], c2 * 100, f2 * 100];
};
convert$2.hsv.hcg = function(hsv) {
  const s2 = hsv[1] / 100;
  const v2 = hsv[2] / 100;
  const c2 = s2 * v2;
  let f2 = 0;
  if (c2 < 1) {
    f2 = (v2 - c2) / (1 - c2);
  }
  return [hsv[0], c2 * 100, f2 * 100];
};
convert$2.hcg.rgb = function(hcg) {
  const h2 = hcg[0] / 360;
  const c2 = hcg[1] / 100;
  const g2 = hcg[2] / 100;
  if (c2 === 0) {
    return [g2 * 255, g2 * 255, g2 * 255];
  }
  const pure = [0, 0, 0];
  const hi = h2 % 1 * 6;
  const v2 = hi % 1;
  const w2 = 1 - v2;
  let mg = 0;
  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v2;
      pure[2] = 0;
      break;
    case 1:
      pure[0] = w2;
      pure[1] = 1;
      pure[2] = 0;
      break;
    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v2;
      break;
    case 3:
      pure[0] = 0;
      pure[1] = w2;
      pure[2] = 1;
      break;
    case 4:
      pure[0] = v2;
      pure[1] = 0;
      pure[2] = 1;
      break;
    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w2;
  }
  mg = (1 - c2) * g2;
  return [
    (c2 * pure[0] + mg) * 255,
    (c2 * pure[1] + mg) * 255,
    (c2 * pure[2] + mg) * 255
  ];
};
convert$2.hcg.hsv = function(hcg) {
  const c2 = hcg[1] / 100;
  const g2 = hcg[2] / 100;
  const v2 = c2 + g2 * (1 - c2);
  let f2 = 0;
  if (v2 > 0) {
    f2 = c2 / v2;
  }
  return [hcg[0], f2 * 100, v2 * 100];
};
convert$2.hcg.hsl = function(hcg) {
  const c2 = hcg[1] / 100;
  const g2 = hcg[2] / 100;
  const l2 = g2 * (1 - c2) + 0.5 * c2;
  let s2 = 0;
  if (l2 > 0 && l2 < 0.5) {
    s2 = c2 / (2 * l2);
  } else if (l2 >= 0.5 && l2 < 1) {
    s2 = c2 / (2 * (1 - l2));
  }
  return [hcg[0], s2 * 100, l2 * 100];
};
convert$2.hcg.hwb = function(hcg) {
  const c2 = hcg[1] / 100;
  const g2 = hcg[2] / 100;
  const v2 = c2 + g2 * (1 - c2);
  return [hcg[0], (v2 - c2) * 100, (1 - v2) * 100];
};
convert$2.hwb.hcg = function(hwb) {
  const w2 = hwb[1] / 100;
  const b2 = hwb[2] / 100;
  const v2 = 1 - b2;
  const c2 = v2 - w2;
  let g2 = 0;
  if (c2 < 1) {
    g2 = (v2 - c2) / (1 - c2);
  }
  return [hwb[0], c2 * 100, g2 * 100];
};
convert$2.apple.rgb = function(apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};
convert$2.rgb.apple = function(rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};
convert$2.gray.rgb = function(args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};
convert$2.gray.hsl = function(args) {
  return [0, 0, args[0]];
};
convert$2.gray.hsv = convert$2.gray.hsl;
convert$2.gray.hwb = function(gray) {
  return [0, 100, gray[0]];
};
convert$2.gray.cmyk = function(gray) {
  return [0, 0, 0, gray[0]];
};
convert$2.gray.lab = function(gray) {
  return [gray[0], 0, 0];
};
convert$2.gray.hex = function(gray) {
  const val = Math.round(gray[0] / 100 * 255) & 255;
  const integer = (val << 16) + (val << 8) + val;
  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert$2.rgb.gray = function(rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};
const conversions$1 = conversions$2;
function buildGraph() {
  const graph = {};
  const models2 = Object.keys(conversions$1);
  for (let len = models2.length, i2 = 0; i2 < len; i2++) {
    graph[models2[i2]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }
  return graph;
}
function deriveBFS(fromModel) {
  const graph = buildGraph();
  const queue = [fromModel];
  graph[fromModel].distance = 0;
  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions$1[current]);
    for (let len = adjacents.length, i2 = 0; i2 < len; i2++) {
      const adjacent = adjacents[i2];
      const node = graph[adjacent];
      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }
  return graph;
}
function link(from, to) {
  return function(args) {
    return to(from(args));
  };
}
function wrapConversion(toModel, graph) {
  const path2 = [graph[toModel].parent, toModel];
  let fn = conversions$1[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path2.unshift(graph[cur].parent);
    fn = link(conversions$1[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }
  fn.conversion = path2;
  return fn;
}
var route$1 = function(fromModel) {
  const graph = deriveBFS(fromModel);
  const conversion = {};
  const models2 = Object.keys(graph);
  for (let len = models2.length, i2 = 0; i2 < len; i2++) {
    const toModel = models2[i2];
    const node = graph[toModel];
    if (node.parent === null) {
      continue;
    }
    conversion[toModel] = wrapConversion(toModel, graph);
  }
  return conversion;
};
const conversions = conversions$2;
const route = route$1;
const convert$1 = {};
const models = Object.keys(conversions);
function wrapRaw(fn) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    return fn(args);
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    const result = fn(args);
    if (typeof result === "object") {
      for (let len = result.length, i2 = 0; i2 < len; i2++) {
        result[i2] = Math.round(result[i2]);
      }
    }
    return result;
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
models.forEach((fromModel) => {
  convert$1[fromModel] = {};
  Object.defineProperty(convert$1[fromModel], "channels", { value: conversions[fromModel].channels });
  Object.defineProperty(convert$1[fromModel], "labels", { value: conversions[fromModel].labels });
  const routes = route(fromModel);
  const routeModels = Object.keys(routes);
  routeModels.forEach((toModel) => {
    const fn = routes[toModel];
    convert$1[fromModel][toModel] = wrapRounded(fn);
    convert$1[fromModel][toModel].raw = wrapRaw(fn);
  });
});
var colorConvert = convert$1;
const colorString = colorStringExports;
const convert = colorConvert;
const skippedModels = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
];
const hashedModelKeys = {};
for (const model of Object.keys(convert)) {
  hashedModelKeys[[...convert[model].labels].sort().join("")] = model;
}
const limiters = {};
function Color(object, model) {
  if (!(this instanceof Color)) {
    return new Color(object, model);
  }
  if (model && model in skippedModels) {
    model = null;
  }
  if (model && !(model in convert)) {
    throw new Error("Unknown model: " + model);
  }
  let i2;
  let channels;
  if (object == null) {
    this.model = "rgb";
    this.color = [0, 0, 0];
    this.valpha = 1;
  } else if (object instanceof Color) {
    this.model = object.model;
    this.color = [...object.color];
    this.valpha = object.valpha;
  } else if (typeof object === "string") {
    const result = colorString.get(object);
    if (result === null) {
      throw new Error("Unable to parse color from string: " + object);
    }
    this.model = result.model;
    channels = convert[this.model].channels;
    this.color = result.value.slice(0, channels);
    this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
  } else if (object.length > 0) {
    this.model = model || "rgb";
    channels = convert[this.model].channels;
    const newArray = Array.prototype.slice.call(object, 0, channels);
    this.color = zeroArray(newArray, channels);
    this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
  } else if (typeof object === "number") {
    this.model = "rgb";
    this.color = [
      object >> 16 & 255,
      object >> 8 & 255,
      object & 255
    ];
    this.valpha = 1;
  } else {
    this.valpha = 1;
    const keys2 = Object.keys(object);
    if ("alpha" in object) {
      keys2.splice(keys2.indexOf("alpha"), 1);
      this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
    }
    const hashedKeys = keys2.sort().join("");
    if (!(hashedKeys in hashedModelKeys)) {
      throw new Error("Unable to parse color from object: " + JSON.stringify(object));
    }
    this.model = hashedModelKeys[hashedKeys];
    const { labels } = convert[this.model];
    const color2 = [];
    for (i2 = 0; i2 < labels.length; i2++) {
      color2.push(object[labels[i2]]);
    }
    this.color = zeroArray(color2);
  }
  if (limiters[this.model]) {
    channels = convert[this.model].channels;
    for (i2 = 0; i2 < channels; i2++) {
      const limit = limiters[this.model][i2];
      if (limit) {
        this.color[i2] = limit(this.color[i2]);
      }
    }
  }
  this.valpha = Math.max(0, Math.min(1, this.valpha));
  if (Object.freeze) {
    Object.freeze(this);
  }
}
Color.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(places) {
    let self2 = this.model in colorString.to ? this : this.rgb();
    self2 = self2.round(typeof places === "number" ? places : 1);
    const args = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
    return colorString.to[self2.model](args);
  },
  percentString(places) {
    const self2 = this.rgb().round(typeof places === "number" ? places : 1);
    const args = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
    return colorString.to.rgb.percent(args);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const result = {};
    const { channels } = convert[this.model];
    const { labels } = convert[this.model];
    for (let i2 = 0; i2 < channels; i2++) {
      result[labels[i2]] = this.color[i2];
    }
    if (this.valpha !== 1) {
      result.alpha = this.valpha;
    }
    return result;
  },
  unitArray() {
    const rgb = this.rgb().color;
    rgb[0] /= 255;
    rgb[1] /= 255;
    rgb[2] /= 255;
    if (this.valpha !== 1) {
      rgb.push(this.valpha);
    }
    return rgb;
  },
  unitObject() {
    const rgb = this.rgb().object();
    rgb.r /= 255;
    rgb.g /= 255;
    rgb.b /= 255;
    if (this.valpha !== 1) {
      rgb.alpha = this.valpha;
    }
    return rgb;
  },
  round(places) {
    places = Math.max(places || 0, 0);
    return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model);
  },
  alpha(value) {
    if (value !== void 0) {
      return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model);
    }
    return this.valpha;
  },
  // Rgb
  red: getset("rgb", 0, maxfn(255)),
  green: getset("rgb", 1, maxfn(255)),
  blue: getset("rgb", 2, maxfn(255)),
  hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (value) => (value % 360 + 360) % 360),
  saturationl: getset("hsl", 1, maxfn(100)),
  lightness: getset("hsl", 2, maxfn(100)),
  saturationv: getset("hsv", 1, maxfn(100)),
  value: getset("hsv", 2, maxfn(100)),
  chroma: getset("hcg", 1, maxfn(100)),
  gray: getset("hcg", 2, maxfn(100)),
  white: getset("hwb", 1, maxfn(100)),
  wblack: getset("hwb", 2, maxfn(100)),
  cyan: getset("cmyk", 0, maxfn(100)),
  magenta: getset("cmyk", 1, maxfn(100)),
  yellow: getset("cmyk", 2, maxfn(100)),
  black: getset("cmyk", 3, maxfn(100)),
  x: getset("xyz", 0, maxfn(95.047)),
  y: getset("xyz", 1, maxfn(100)),
  z: getset("xyz", 2, maxfn(108.833)),
  l: getset("lab", 0, maxfn(100)),
  a: getset("lab", 1),
  b: getset("lab", 2),
  keyword(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    return convert[this.model].keyword(this.color);
  },
  hex(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    return colorString.to.hex(this.rgb().round().color);
  },
  hexa(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    const rgbArray = this.rgb().round().color;
    let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
    if (alphaHex.length === 1) {
      alphaHex = "0" + alphaHex;
    }
    return colorString.to.hex(rgbArray) + alphaHex;
  },
  rgbNumber() {
    const rgb = this.rgb().color;
    return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
  },
  luminosity() {
    const rgb = this.rgb().color;
    const lum = [];
    for (const [i2, element2] of rgb.entries()) {
      const chan = element2 / 255;
      lum[i2] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  },
  contrast(color2) {
    const lum1 = this.luminosity();
    const lum2 = color2.luminosity();
    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05);
    }
    return (lum2 + 0.05) / (lum1 + 0.05);
  },
  level(color2) {
    const contrastRatio = this.contrast(color2);
    if (contrastRatio >= 7) {
      return "AAA";
    }
    return contrastRatio >= 4.5 ? "AA" : "";
  },
  isDark() {
    const rgb = this.rgb().color;
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
    return yiq < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const rgb = this.rgb();
    for (let i2 = 0; i2 < 3; i2++) {
      rgb.color[i2] = 255 - rgb.color[i2];
    }
    return rgb;
  },
  lighten(ratio) {
    const hsl = this.hsl();
    hsl.color[2] += hsl.color[2] * ratio;
    return hsl;
  },
  darken(ratio) {
    const hsl = this.hsl();
    hsl.color[2] -= hsl.color[2] * ratio;
    return hsl;
  },
  saturate(ratio) {
    const hsl = this.hsl();
    hsl.color[1] += hsl.color[1] * ratio;
    return hsl;
  },
  desaturate(ratio) {
    const hsl = this.hsl();
    hsl.color[1] -= hsl.color[1] * ratio;
    return hsl;
  },
  whiten(ratio) {
    const hwb = this.hwb();
    hwb.color[1] += hwb.color[1] * ratio;
    return hwb;
  },
  blacken(ratio) {
    const hwb = this.hwb();
    hwb.color[2] += hwb.color[2] * ratio;
    return hwb;
  },
  grayscale() {
    const rgb = this.rgb().color;
    const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
    return Color.rgb(value, value, value);
  },
  fade(ratio) {
    return this.alpha(this.valpha - this.valpha * ratio);
  },
  opaquer(ratio) {
    return this.alpha(this.valpha + this.valpha * ratio);
  },
  rotate(degrees) {
    const hsl = this.hsl();
    let hue = hsl.color[0];
    hue = (hue + degrees) % 360;
    hue = hue < 0 ? 360 + hue : hue;
    hsl.color[0] = hue;
    return hsl;
  },
  mix(mixinColor, weight) {
    if (!mixinColor || !mixinColor.rgb) {
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
    }
    const color1 = mixinColor.rgb();
    const color2 = this.rgb();
    const p2 = weight === void 0 ? 0.5 : weight;
    const w2 = 2 * p2 - 1;
    const a2 = color1.alpha() - color2.alpha();
    const w1 = ((w2 * a2 === -1 ? w2 : (w2 + a2) / (1 + w2 * a2)) + 1) / 2;
    const w22 = 1 - w1;
    return Color.rgb(
      w1 * color1.red() + w22 * color2.red(),
      w1 * color1.green() + w22 * color2.green(),
      w1 * color1.blue() + w22 * color2.blue(),
      color1.alpha() * p2 + color2.alpha() * (1 - p2)
    );
  }
};
for (const model of Object.keys(convert)) {
  if (skippedModels.includes(model)) {
    continue;
  }
  const { channels } = convert[model];
  Color.prototype[model] = function(...args) {
    if (this.model === model) {
      return new Color(this);
    }
    if (args.length > 0) {
      return new Color(args, model);
    }
    return new Color([...assertArray(convert[this.model][model].raw(this.color)), this.valpha], model);
  };
  Color[model] = function(...args) {
    let color2 = args[0];
    if (typeof color2 === "number") {
      color2 = zeroArray(args, channels);
    }
    return new Color(color2, model);
  };
}
function roundTo(number, places) {
  return Number(number.toFixed(places));
}
function roundToPlace(places) {
  return function(number) {
    return roundTo(number, places);
  };
}
function getset(model, channel, modifier) {
  model = Array.isArray(model) ? model : [model];
  for (const m2 of model) {
    (limiters[m2] || (limiters[m2] = []))[channel] = modifier;
  }
  model = model[0];
  return function(value) {
    let result;
    if (value !== void 0) {
      if (modifier) {
        value = modifier(value);
      }
      result = this[model]();
      result.color[channel] = value;
      return result;
    }
    result = this[model]().color[channel];
    if (modifier) {
      result = modifier(result);
    }
    return result;
  };
}
function maxfn(max) {
  return function(v2) {
    return Math.max(0, Math.min(max, v2));
  };
}
function assertArray(value) {
  return Array.isArray(value) ? value : [value];
}
function zeroArray(array, length) {
  for (let i2 = 0; i2 < length; i2++) {
    if (typeof array[i2] !== "number") {
      array[i2] = 0;
    }
  }
  return array;
}
var color = Color;
const color$1 = /* @__PURE__ */ getDefaultExportFromCjs(color);
const element = document.createElement("i");
function decodeNamedCharacterReference(value) {
  const characterReference = "&" + value + ";";
  element.innerHTML = characterReference;
  const char = element.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
    return false;
  }
  return char === characterReference ? false : char;
}
var format = { exports: {} };
(function(module) {
  (function() {
    var namespace;
    {
      namespace = module.exports = format2;
    }
    namespace.format = format2;
    namespace.vsprintf = vsprintf;
    if (typeof console !== "undefined" && typeof console.log === "function") {
      namespace.printf = printf;
    }
    function printf() {
      console.log(format2.apply(null, arguments));
    }
    function vsprintf(fmt, replacements) {
      return format2.apply(null, [fmt].concat(replacements));
    }
    function format2(fmt) {
      var argIndex = 1, args = [].slice.call(arguments), i2 = 0, n2 = fmt.length, result = "", c2, escaped = false, arg, tmp, leadingZero = false, precision, nextArg = function() {
        return args[argIndex++];
      }, slurpNumber = function() {
        var digits = "";
        while (/\d/.test(fmt[i2])) {
          digits += fmt[i2++];
          c2 = fmt[i2];
        }
        return digits.length > 0 ? parseInt(digits) : null;
      };
      for (; i2 < n2; ++i2) {
        c2 = fmt[i2];
        if (escaped) {
          escaped = false;
          if (c2 == ".") {
            leadingZero = false;
            c2 = fmt[++i2];
          } else if (c2 == "0" && fmt[i2 + 1] == ".") {
            leadingZero = true;
            i2 += 2;
            c2 = fmt[i2];
          } else {
            leadingZero = true;
          }
          precision = slurpNumber();
          switch (c2) {
            case "b":
              result += parseInt(nextArg(), 10).toString(2);
              break;
            case "c":
              arg = nextArg();
              if (typeof arg === "string" || arg instanceof String)
                result += arg;
              else
                result += String.fromCharCode(parseInt(arg, 10));
              break;
            case "d":
              result += parseInt(nextArg(), 10);
              break;
            case "f":
              tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
              result += leadingZero ? tmp : tmp.replace(/^0/, "");
              break;
            case "j":
              result += JSON.stringify(nextArg());
              break;
            case "o":
              result += "0" + parseInt(nextArg(), 10).toString(8);
              break;
            case "s":
              result += nextArg();
              break;
            case "x":
              result += "0x" + parseInt(nextArg(), 10).toString(16);
              break;
            case "X":
              result += "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase();
              break;
            default:
              result += c2;
              break;
          }
        } else if (c2 === "%") {
          escaped = true;
        } else {
          result += c2;
        }
      }
      return result;
    }
  })();
})(format);
var formatExports = format.exports;
const formatter = /* @__PURE__ */ getDefaultExportFromCjs(formatExports);
const fault = Object.assign(create(Error), {
  eval: create(EvalError),
  range: create(RangeError),
  reference: create(ReferenceError),
  syntax: create(SyntaxError),
  type: create(TypeError),
  uri: create(URIError)
});
function create(Constructor) {
  FormattedError.displayName = Constructor.displayName || Constructor.name;
  return FormattedError;
  function FormattedError(format2, ...values) {
    const reason = format2 ? formatter(format2, ...values) : format2;
    return new Constructor(reason);
  }
}
function markdownTable(table, options = {}) {
  const align = (options.align || []).concat();
  const stringLength = options.stringLength || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table.length) {
    const row2 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length;
    }
    while (++columnIndex2 < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex2]);
      if (options.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row2.push(cell);
    }
    cellMatrix[rowIndex] = row2;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code2 = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code2;
    }
  }
  columnIndex = -1;
  const row = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code2 = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code2 === 99) {
      before = ":";
      after = ":";
    } else if (code2 === 108) {
      before = ":";
    } else if (code2 === 114) {
      after = ":";
    }
    let size = options.alignDelimiters === false ? 1 : Math.max(
      1,
      longestCellByColumn[columnIndex] - before.length - after.length
    );
    const cell = before + "-".repeat(size) + after;
    if (options.alignDelimiters !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row2 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row2[columnIndex] || "";
      let before = "";
      let after = "";
      if (options.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code2 = alignments[columnIndex];
        if (code2 === 114) {
          before = " ".repeat(size);
        } else if (code2 === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if (options.delimiterStart !== false && !columnIndex) {
        line.push("|");
      }
      if (options.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(options.alignDelimiters === false && cell === "") && (options.delimiterStart !== false || columnIndex)) {
        line.push(" ");
      }
      if (options.alignDelimiters !== false) {
        line.push(before);
      }
      line.push(cell);
      if (options.alignDelimiters !== false) {
        line.push(after);
      }
      if (options.padding !== false) {
        line.push(" ");
      }
      if (options.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
        line.push("|");
      }
    }
    lines.push(
      options.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
    );
  }
  return lines.join("\n");
}
function serialize(value) {
  return value === null || value === void 0 ? "" : String(value);
}
function defaultStringLength(value) {
  return value.length;
}
function toAlignment(value) {
  const code2 = typeof value === "string" ? value.codePointAt(0) : 0;
  return code2 === 67 || code2 === 99 ? 99 : code2 === 76 || code2 === 108 ? 108 : code2 === 82 || code2 === 114 ? 114 : 0;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer = function isBuffer2(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
};
const isBuffer$1 = /* @__PURE__ */ getDefaultExportFromCjs(isBuffer);
class VFileMessage extends Error {
  /**
   * Create a message for `reason` at `place` from `origin`.
   *
   * When an error is passed in as `reason`, the `stack` is copied.
   *
   * @param {string | Error | VFileMessage} reason
   *   Reason for message, uses the stack and message of the error if given.
   *
   *   > 👉 **Note**: you should use markdown.
   * @param {Node | NodeLike | Position | Point | null | undefined} [place]
   *   Place in file where the message occurred.
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // To do: next major: expose `undefined` everywhere instead of `null`.
  constructor(reason, place, origin) {
    const parts = [null, null];
    let position = {
      // @ts-expect-error: we always follows the structure of `position`.
      start: { line: null, column: null },
      // @ts-expect-error: "
      end: { line: null, column: null }
    };
    super();
    if (typeof place === "string") {
      origin = place;
      place = void 0;
    }
    if (typeof origin === "string") {
      const index = origin.indexOf(":");
      if (index === -1) {
        parts[1] = origin;
      } else {
        parts[0] = origin.slice(0, index);
        parts[1] = origin.slice(index + 1);
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position = place.position;
        }
      } else if ("start" in place || "end" in place) {
        position = place;
      } else if ("line" in place || "column" in place) {
        position.start = place;
      }
    }
    this.name = stringifyPosition(place) || "1:1";
    this.message = typeof reason === "object" ? reason.message : reason;
    this.stack = "";
    if (typeof reason === "object" && reason.stack) {
      this.stack = reason.stack;
    }
    this.reason = this.message;
    this.fatal;
    this.line = position.start.line;
    this.column = position.start.column;
    this.position = position;
    this.source = parts[0];
    this.ruleId = parts[1];
    this.file;
    this.actual;
    this.expected;
    this.url;
    this.note;
  }
}
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.fatal = null;
VFileMessage.prototype.column = null;
VFileMessage.prototype.line = null;
VFileMessage.prototype.source = null;
VFileMessage.prototype.ruleId = null;
VFileMessage.prototype.position = null;
const path = { basename, dirname, extname, join, sep: "/" };
function basename(path2, ext) {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath$1(path2);
  let start = 0;
  let end = -1;
  let index = path2.length;
  let seenNonSlash;
  if (ext === void 0 || ext.length === 0 || ext.length > path2.length) {
    while (index--) {
      if (path2.charCodeAt(index) === 47) {
        if (seenNonSlash) {
          start = index + 1;
          break;
        }
      } else if (end < 0) {
        seenNonSlash = true;
        end = index + 1;
      }
    }
    return end < 0 ? "" : path2.slice(start, end);
  }
  if (ext === path2) {
    return "";
  }
  let firstNonSlashEnd = -1;
  let extIndex = ext.length - 1;
  while (index--) {
    if (path2.charCodeAt(index) === 47) {
      if (seenNonSlash) {
        start = index + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index + 1;
      }
      if (extIndex > -1) {
        if (path2.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            end = index;
          }
        } else {
          extIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }
  if (start === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path2.length;
  }
  return path2.slice(start, end);
}
function dirname(path2) {
  assertPath$1(path2);
  if (path2.length === 0) {
    return ".";
  }
  let end = -1;
  let index = path2.length;
  let unmatchedSlash;
  while (--index) {
    if (path2.charCodeAt(index) === 47) {
      if (unmatchedSlash) {
        end = index;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end < 0 ? path2.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path2.charCodeAt(0) === 47 ? "//" : path2.slice(0, end);
}
function extname(path2) {
  assertPath$1(path2);
  let index = path2.length;
  let end = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index--) {
    const code2 = path2.charCodeAt(index);
    if (code2 === 47) {
      if (unmatchedSlash) {
        startPart = index + 1;
        break;
      }
      continue;
    }
    if (end < 0) {
      unmatchedSlash = true;
      end = index + 1;
    }
    if (code2 === 46) {
      if (startDot < 0) {
        startDot = index;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
  preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path2.slice(startDot, end);
}
function join(...segments) {
  let index = -1;
  let joined;
  while (++index < segments.length) {
    assertPath$1(segments[index]);
    if (segments[index]) {
      joined = joined === void 0 ? segments[index] : joined + "/" + segments[index];
    }
  }
  return joined === void 0 ? "." : normalize(joined);
}
function normalize(path2) {
  assertPath$1(path2);
  const absolute = path2.charCodeAt(0) === 47;
  let value = normalizeString(path2, !absolute);
  if (value.length === 0 && !absolute) {
    value = ".";
  }
  if (value.length > 0 && path2.charCodeAt(path2.length - 1) === 47) {
    value += "/";
  }
  return absolute ? "/" + value : value;
}
function normalizeString(path2, allowAboveRoot) {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index = -1;
  let code2;
  let lastSlashIndex;
  while (++index <= path2.length) {
    if (index < path2.length) {
      code2 = path2.charCodeAt(index);
    } else if (code2 === 47) {
      break;
    } else {
      code2 = 47;
    }
    if (code2 === 47) {
      if (lastSlash === index - 1 || dots === 1)
        ;
      else if (lastSlash !== index - 1 && dots === 2) {
        if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = index;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path2.slice(lastSlash + 1, index);
        } else {
          result = path2.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (code2 === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath$1(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(path2)
    );
  }
}
const proc = { cwd };
function cwd() {
  return "/";
}
function isUrl(fileUrlOrPath) {
  return fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && // @ts-expect-error: indexable.
  fileUrlOrPath.href && // @ts-expect-error: indexable.
  fileUrlOrPath.origin;
}
function urlToPath(path2) {
  if (typeof path2 === "string") {
    path2 = new URL(path2);
  } else if (!isUrl(path2)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`"
    );
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  if (path2.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file");
    error.code = "ERR_INVALID_URL_SCHEME";
    throw error;
  }
  return getPathFromURLPosix(path2);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    error.code = "ERR_INVALID_FILE_URL_HOST";
    throw error;
  }
  const pathname = url.pathname;
  let index = -1;
  while (++index < pathname.length) {
    if (pathname.charCodeAt(index) === 37 && pathname.charCodeAt(index + 1) === 50) {
      const third = pathname.charCodeAt(index + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError(
          "File URL path must not include encoded / characters"
        );
        error.code = "ERR_INVALID_FILE_URL_PATH";
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}
const order = ["history", "path", "basename", "stem", "extname", "dirname"];
class VFile {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Buffer` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (typeof value === "string" || buffer(value)) {
      options = { value };
    } else if (isUrl(value)) {
      options = { path: value };
    } else {
      options = value;
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = proc.cwd();
    this.value;
    this.stored;
    this.result;
    this.map;
    let index = -1;
    while (++index < order.length) {
      const prop2 = order[index];
      if (prop2 in options && options[prop2] !== void 0 && options[prop2] !== null) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
      }
    }
    let prop;
    for (prop in options) {
      if (!order.includes(prop)) {
        this[prop] = options[prop];
      }
    }
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {string | URL} path
   */
  set path(path2) {
    if (isUrl(path2)) {
      path2 = urlToPath(path2);
    }
    assertNonEmpty(path2, "path");
    if (this.path !== path2) {
      this.history.push(path2);
    }
  }
  /**
   * Get the parent path (example: `'~'`).
   */
  get dirname() {
    return typeof this.path === "string" ? path.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   */
  set dirname(dirname2) {
    assertPath(this.basename, "dirname");
    this.path = path.join(dirname2 || "", this.basename);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   */
  get basename() {
    return typeof this.path === "string" ? path.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set basename(basename2) {
    assertNonEmpty(basename2, "basename");
    assertPart(basename2, "basename");
    this.path = path.join(this.dirname || "", basename2);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   */
  get extname() {
    return typeof this.path === "string" ? path.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   */
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath(this.dirname, "extname");
    if (extname2) {
      if (extname2.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = path.join(this.dirname, this.stem + (extname2 || ""));
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   */
  get stem() {
    return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = path.join(this.dirname || "", stem + (this.extname || ""));
  }
  /**
   * Serialize the file.
   *
   * @param {BufferEncoding | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Buffer`
   *   (default: `'utf8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    return (this.value || "").toString(encoding || void 0);
  }
  /**
   * Create a warning message associated with the file.
   *
   * Its `fatal` is set to `false` and `file` is set to the current file path.
   * Its added to `file.messages`.
   *
   * @param {string | Error | VFileMessage} reason
   *   Reason for message, uses the stack and message of the error if given.
   * @param {Node | NodeLike | Position | Point | null | undefined} [place]
   *   Place in file where the message occurred.
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin);
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Create an info message associated with the file.
   *
   * Its `fatal` is set to `null` and `file` is set to the current file path.
   * Its added to `file.messages`.
   *
   * @param {string | Error | VFileMessage} reason
   *   Reason for message, uses the stack and message of the error if given.
   * @param {Node | NodeLike | Position | Point | null | undefined} [place]
   *   Place in file where the message occurred.
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = null;
    return message;
  }
  /**
   * Create a fatal error associated with the file.
   *
   * Its `fatal` is set to `true` and `file` is set to the current file path.
   * Its added to `file.messages`.
   *
   * > 👉 **Note**: a fatal error means that a file is no longer processable.
   *
   * @param {string | Error | VFileMessage} reason
   *   Reason for message, uses the stack and message of the error if given.
   * @param {Node | NodeLike | Position | Point | null | undefined} [place]
   *   Place in file where the message occurred.
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Message.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = true;
    throw message;
  }
}
function assertPart(part, name2) {
  if (part && part.includes(path.sep)) {
    throw new Error(
      "`" + name2 + "` cannot be a path: did not expect `" + path.sep + "`"
    );
  }
}
function assertNonEmpty(part, name2) {
  if (!part) {
    throw new Error("`" + name2 + "` cannot be empty");
  }
}
function assertPath(path2, name2) {
  if (!path2) {
    throw new Error("Setting `" + name2 + "` requires `path` to be set too");
  }
}
function buffer(value) {
  return isBuffer$1(value);
}
function bail(error) {
  if (error) {
    throw error;
  }
}
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray = function isArray2(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === "[object Array]";
};
var isPlainObject$1 = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== "[object Object]") {
    return false;
  }
  var hasOwnConstructor = hasOwn.call(obj, "constructor");
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  var key;
  for (key in obj) {
  }
  return typeof key === "undefined" || hasOwn.call(obj, key);
};
var setProperty = function setProperty2(target, options) {
  if (defineProperty && options.name === "__proto__") {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
};
var getProperty = function getProperty2(obj, name2) {
  if (name2 === "__proto__") {
    if (!hasOwn.call(obj, name2)) {
      return void 0;
    } else if (gOPD) {
      return gOPD(obj, name2).value;
    }
  }
  return obj[name2];
};
var extend$1 = function extend() {
  var options, name2, src, copy2, copyIsArray, clone;
  var target = arguments[0];
  var i2 = 1;
  var length = arguments.length;
  var deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i2 = 2;
  }
  if (target == null || typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i2 < length; ++i2) {
    options = arguments[i2];
    if (options != null) {
      for (name2 in options) {
        src = getProperty(target, name2);
        copy2 = getProperty(options, name2);
        if (target !== copy2) {
          if (deep && copy2 && (isPlainObject$1(copy2) || (copyIsArray = isArray(copy2)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject$1(src) ? src : {};
            }
            setProperty(target, { name: name2, newValue: extend(deep, clone, copy2) });
          } else if (typeof copy2 !== "undefined") {
            setProperty(target, { name: name2, newValue: copy2 });
          }
        }
      }
    }
  }
  return target;
};
const extend$2 = /* @__PURE__ */ getDefaultExportFromCjs(extend$1);
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index < values.length) {
        if (output[index] === null || output[index] === void 0) {
          output[index] = values[index];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = (
        /** @type {Error} */
        error
      );
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}
const unified = base().freeze();
const own$1 = {}.hasOwnProperty;
function base() {
  const transformers = trough();
  const attachers = [];
  let namespace = {};
  let frozen;
  let freezeIndex = -1;
  processor.data = data;
  processor.Parser = void 0;
  processor.Compiler = void 0;
  processor.freeze = freeze;
  processor.attachers = attachers;
  processor.use = use;
  processor.parse = parse2;
  processor.stringify = stringify2;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;
  return processor;
  function processor() {
    const destination = base();
    let index = -1;
    while (++index < attachers.length) {
      destination.use(...attachers[index]);
    }
    destination.data(extend$2(true, {}, namespace));
    return destination;
  }
  function data(key, value) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen);
        namespace[key] = value;
        return processor;
      }
      return own$1.call(namespace, key) && namespace[key] || null;
    }
    if (key) {
      assertUnfrozen("data", frozen);
      namespace = key;
      return processor;
    }
    return namespace;
  }
  function freeze() {
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(processor, ...options);
      if (typeof transformer === "function") {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Number.POSITIVE_INFINITY;
    return processor;
  }
  function use(value, ...options) {
    let settings;
    assertUnfrozen("use", frozen);
    if (value === null || value === void 0)
      ;
    else if (typeof value === "function") {
      addPlugin(value, ...options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings);
    }
    return processor;
    function add(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...options2] = value2;
          addPlugin(plugin, ...options2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings);
      }
    }
    function addList(plugins) {
      let index = -1;
      if (plugins === null || plugins === void 0)
        ;
      else if (Array.isArray(plugins)) {
        while (++index < plugins.length) {
          const thing = plugins[index];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, value2) {
      let index = -1;
      let entry;
      while (++index < attachers.length) {
        if (attachers[index][0] === plugin) {
          entry = attachers[index];
          break;
        }
      }
      if (entry) {
        if (isPlainObject2(entry[1]) && isPlainObject2(value2)) {
          value2 = extend$2(true, entry[1], value2);
        }
        entry[1] = value2;
      } else {
        attachers.push([...arguments]);
      }
    }
  }
  function parse2(doc) {
    processor.freeze();
    const file = vfile(doc);
    const Parser = processor.Parser;
    assertParser("parse", Parser);
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file);
  }
  function stringify2(node, doc) {
    processor.freeze();
    const file = vfile(doc);
    const Compiler = processor.Compiler;
    assertCompiler("stringify", Compiler);
    assertNode(node);
    if (newable(Compiler, "compile")) {
      return new Compiler(node, file).compile();
    }
    return Compiler(node, file);
  }
  function run(node, doc, callback) {
    assertNode(node);
    processor.freeze();
    if (!callback && typeof doc === "function") {
      callback = doc;
      doc = void 0;
    }
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      transformers.run(node, vfile(doc), done);
      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          callback(null, tree, file);
        }
      }
    }
  }
  function runSync(node, file) {
    let result;
    let complete;
    processor.run(node, file, done);
    assertDone("runSync", "run", complete);
    return result;
    function done(error, tree) {
      bail(error);
      result = tree;
      complete = true;
    }
  }
  function process(doc, callback) {
    processor.freeze();
    assertParser("process", processor.Parser);
    assertCompiler("process", processor.Compiler);
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      const file = vfile(doc);
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error);
        } else {
          const result = processor.stringify(tree, file2);
          if (result === void 0 || result === null)
            ;
          else if (looksLikeAVFileValue(result)) {
            file2.value = result;
          } else {
            file2.result = result;
          }
          done(error, file2);
        }
      });
      function done(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          callback(null, file2);
        }
      }
    }
  }
  function processSync(doc) {
    let complete;
    processor.freeze();
    assertParser("processSync", processor.Parser);
    assertCompiler("processSync", processor.Compiler);
    const file = vfile(doc);
    processor.process(file, done);
    assertDone("processSync", "process", complete);
    return file;
    function done(error) {
      complete = true;
      bail(error);
    }
  }
}
function newable(value, name2) {
  return typeof value === "function" && // Prototypes do exist.
  // type-coverage:ignore-next-line
  value.prototype && // A function with keys in its prototype is probably a constructor.
  // Classes’ prototype methods are not enumerable, so we check if some value
  // exists in the prototype.
  // type-coverage:ignore-next-line
  (keys(value.prototype) || name2 in value.prototype);
}
function keys(value) {
  let key;
  for (key in value) {
    if (own$1.call(value, key)) {
      return true;
    }
  }
  return false;
}
function assertParser(name2, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name2 + "` without `Parser`");
  }
}
function assertCompiler(name2, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name2 + "` without `Compiler`");
  }
}
function assertUnfrozen(name2, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name2 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node) {
  if (!isPlainObject2(node) || typeof node.type !== "string") {
    throw new TypeError("Expected node, got `" + node + "`");
  }
}
function assertDone(name2, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name2 + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAVFileValue(value) {
  return typeof value === "string" || isBuffer$1(value);
}
const tab$1 = 9;
const space$1 = 32;
function trimLines(value) {
  const source = String(value);
  const search2 = /\r?\n|\r/g;
  let match = search2.exec(source);
  let last = 0;
  const lines = [];
  while (match) {
    lines.push(
      trimLine(source.slice(last, match.index), last > 0, true),
      match[0]
    );
    last = match.index + match[0].length;
    match = search2.exec(source);
  }
  lines.push(trimLine(source.slice(last), last > 0, false));
  return lines.join("");
}
function trimLine(value, start, end) {
  let startIndex = 0;
  let endIndex = value.length;
  if (start) {
    let code2 = value.codePointAt(startIndex);
    while (code2 === tab$1 || code2 === space$1) {
      startIndex++;
      code2 = value.codePointAt(startIndex);
    }
  }
  if (end) {
    let code2 = value.codePointAt(endIndex - 1);
    while (code2 === tab$1 || code2 === space$1) {
      endIndex--;
      code2 = value.codePointAt(endIndex - 1);
    }
  }
  return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var propTypesExports = propTypes.exports;
const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
function whitespace(thing) {
  const value = (
    // @ts-expect-error looks like a node.
    thing && typeof thing === "object" && thing.type === "text" ? (
      // @ts-expect-error looks like a text.
      thing.value || ""
    ) : thing
  );
  return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
}
function stringify$1(values) {
  return values.join(" ").trim();
}
function stringify(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}
var styleToObject = { exports: {} };
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
var inlineStyleParser = function(style, options) {
  if (typeof style !== "string") {
    throw new TypeError("First argument must be a string");
  }
  if (!style)
    return [];
  options = options || {};
  var lineno = 1;
  var column = 1;
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines)
      lineno += lines.length;
    var i2 = str.lastIndexOf(NEWLINE);
    column = ~i2 ? str.length - i2 : column + str.length;
  }
  function position() {
    var start = { line: lineno, column };
    return function(node) {
      node.position = new Position(start);
      whitespace2();
      return node;
    };
  }
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column };
    this.source = options.source;
  }
  Position.prototype.content = style;
  function error(msg) {
    var err = new Error(
      options.source + ":" + lineno + ":" + column + ": " + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;
    if (options.silent)
      ;
    else {
      throw err;
    }
  }
  function match(re) {
    var m2 = re.exec(style);
    if (!m2)
      return;
    var str = m2[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m2;
  }
  function whitespace2() {
    match(WHITESPACE_REGEX);
  }
  function comments(rules) {
    var c2;
    rules = rules || [];
    while (c2 = comment()) {
      if (c2 !== false) {
        rules.push(c2);
      }
    }
    return rules;
  }
  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1))
      return;
    var i2 = 2;
    while (EMPTY_STRING != style.charAt(i2) && (ASTERISK != style.charAt(i2) || FORWARD_SLASH != style.charAt(i2 + 1))) {
      ++i2;
    }
    i2 += 2;
    if (EMPTY_STRING === style.charAt(i2 - 1)) {
      return error("End of comment missing");
    }
    var str = style.slice(2, i2 - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i2);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  function declaration() {
    var pos = position();
    var prop = match(PROPERTY_REGEX);
    if (!prop)
      return;
    comment();
    if (!match(COLON_REGEX))
      return error("property missing ':'");
    var val = match(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    });
    match(SEMICOLON_REGEX);
    return ret;
  }
  function declarations() {
    var decls = [];
    comments(decls);
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    return decls;
  }
  whitespace2();
  return declarations();
};
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
var parse$2 = inlineStyleParser;
function StyleToObject(style, iterator) {
  var output = null;
  if (!style || typeof style !== "string") {
    return output;
  }
  var declaration;
  var declarations = parse$2(style);
  var hasIterator = typeof iterator === "function";
  var property;
  var value;
  for (var i2 = 0, len = declarations.length; i2 < len; i2++) {
    declaration = declarations[i2];
    property = declaration.property;
    value = declaration.value;
    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }
  return output;
}
styleToObject.exports = StyleToObject;
styleToObject.exports.default = StyleToObject;
var styleToObjectExports = styleToObject.exports;
const StyleToObject$1 = /* @__PURE__ */ getDefaultExportFromCjs(styleToObjectExports);
var immutable = extend2;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend2() {
  var target = {};
  for (var i2 = 0; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
var hastUtilParseSelector = parse$1;
var search = /[#.]/g;
function parse$1(selector, defaultTagName) {
  var value = selector || "";
  var name2 = defaultTagName || "div";
  var props = {};
  var start = 0;
  var subvalue;
  var previous;
  var match;
  while (start < value.length) {
    search.lastIndex = start;
    match = search.exec(value);
    subvalue = value.slice(start, match ? match.index : value.length);
    if (subvalue) {
      if (!previous) {
        name2 = subvalue;
      } else if (previous === "#") {
        props.id = subvalue;
      } else if (props.className) {
        props.className.push(subvalue);
      } else {
        props.className = [subvalue];
      }
      start += subvalue.length;
    }
    if (match) {
      previous = match[0];
      start++;
    }
  }
  return { type: "element", tagName: name2, properties: props, children: [] };
}
const AElig = "Æ";
const AMP = "&";
const Aacute = "Á";
const Acirc = "Â";
const Agrave = "À";
const Aring = "Å";
const Atilde = "Ã";
const Auml = "Ä";
const COPY = "©";
const Ccedil = "Ç";
const ETH = "Ð";
const Eacute = "É";
const Ecirc = "Ê";
const Egrave = "È";
const Euml = "Ë";
const GT = ">";
const Iacute = "Í";
const Icirc = "Î";
const Igrave = "Ì";
const Iuml = "Ï";
const LT = "<";
const Ntilde = "Ñ";
const Oacute = "Ó";
const Ocirc = "Ô";
const Ograve = "Ò";
const Oslash = "Ø";
const Otilde = "Õ";
const Ouml = "Ö";
const QUOT = '"';
const REG = "®";
const THORN = "Þ";
const Uacute = "Ú";
const Ucirc = "Û";
const Ugrave = "Ù";
const Uuml = "Ü";
const Yacute = "Ý";
const aacute = "á";
const acirc = "â";
const acute = "´";
const aelig = "æ";
const agrave = "à";
const amp = "&";
const aring = "å";
const atilde = "ã";
const auml = "ä";
const brvbar = "¦";
const ccedil = "ç";
const cedil = "¸";
const cent = "¢";
const copy = "©";
const curren = "¤";
const deg = "°";
const divide = "÷";
const eacute = "é";
const ecirc = "ê";
const egrave = "è";
const eth = "ð";
const euml = "ë";
const frac12 = "½";
const frac14 = "¼";
const frac34 = "¾";
const gt = ">";
const iacute = "í";
const icirc = "î";
const iexcl = "¡";
const igrave = "ì";
const iquest = "¿";
const iuml = "ï";
const laquo = "«";
const lt = "<";
const macr = "¯";
const micro = "µ";
const middot = "·";
const nbsp = " ";
const not = "¬";
const ntilde = "ñ";
const oacute = "ó";
const ocirc = "ô";
const ograve = "ò";
const ordf = "ª";
const ordm = "º";
const oslash = "ø";
const otilde = "õ";
const ouml = "ö";
const para = "¶";
const plusmn = "±";
const pound = "£";
const quot = '"';
const raquo = "»";
const reg = "®";
const sect = "§";
const shy = "­";
const sup1 = "¹";
const sup2 = "²";
const sup3 = "³";
const szlig = "ß";
const thorn = "þ";
const times = "×";
const uacute = "ú";
const ucirc = "û";
const ugrave = "ù";
const uml = "¨";
const uuml = "ü";
const yacute = "ý";
const yen = "¥";
const yuml = "ÿ";
const require$$0 = {
  AElig,
  AMP,
  Aacute,
  Acirc,
  Agrave,
  Aring,
  Atilde,
  Auml,
  COPY,
  Ccedil,
  ETH,
  Eacute,
  Ecirc,
  Egrave,
  Euml,
  GT,
  Iacute,
  Icirc,
  Igrave,
  Iuml,
  LT,
  Ntilde,
  Oacute,
  Ocirc,
  Ograve,
  Oslash,
  Otilde,
  Ouml,
  QUOT,
  REG,
  THORN,
  Uacute,
  Ucirc,
  Ugrave,
  Uuml,
  Yacute,
  aacute,
  acirc,
  acute,
  aelig,
  agrave,
  amp,
  aring,
  atilde,
  auml,
  brvbar,
  ccedil,
  cedil,
  cent,
  copy,
  curren,
  deg,
  divide,
  eacute,
  ecirc,
  egrave,
  eth,
  euml,
  frac12,
  frac14,
  frac34,
  gt,
  iacute,
  icirc,
  iexcl,
  igrave,
  iquest,
  iuml,
  laquo,
  lt,
  macr,
  micro,
  middot,
  nbsp,
  not,
  ntilde,
  oacute,
  ocirc,
  ograve,
  ordf,
  ordm,
  oslash,
  otilde,
  ouml,
  para,
  plusmn,
  pound,
  quot,
  raquo,
  reg,
  sect,
  shy,
  sup1,
  sup2,
  sup3,
  szlig,
  thorn,
  times,
  uacute,
  ucirc,
  ugrave,
  uml,
  uuml,
  yacute,
  yen,
  yuml
};
const require$$1 = {
  "0": "�",
  "128": "€",
  "130": "‚",
  "131": "ƒ",
  "132": "„",
  "133": "…",
  "134": "†",
  "135": "‡",
  "136": "ˆ",
  "137": "‰",
  "138": "Š",
  "139": "‹",
  "140": "Œ",
  "142": "Ž",
  "145": "‘",
  "146": "’",
  "147": "“",
  "148": "”",
  "149": "•",
  "150": "–",
  "151": "—",
  "152": "˜",
  "153": "™",
  "154": "š",
  "155": "›",
  "156": "œ",
  "158": "ž",
  "159": "Ÿ"
};
var isDecimal = decimal$2;
function decimal$2(character) {
  var code2 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code2 >= 48 && code2 <= 57;
}
var isHexadecimal = hexadecimal$1;
function hexadecimal$1(character) {
  var code2 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code2 >= 97 && code2 <= 102 || code2 >= 65 && code2 <= 70 || code2 >= 48 && code2 <= 57;
}
var isAlphabetical = alphabetical$1;
function alphabetical$1(character) {
  var code2 = typeof character === "string" ? character.charCodeAt(0) : character;
  return code2 >= 97 && code2 <= 122 || code2 >= 65 && code2 <= 90;
}
var alphabetical = isAlphabetical;
var decimal$1 = isDecimal;
var isAlphanumerical = alphanumerical$1;
function alphanumerical$1(character) {
  return alphabetical(character) || decimal$1(character);
}
var el;
var semicolon$1 = 59;
var decodeEntity_browser = decodeEntity$1;
function decodeEntity$1(characters) {
  var entity = "&" + characters + ";";
  var char;
  el = el || document.createElement("i");
  el.innerHTML = entity;
  char = el.textContent;
  if (char.charCodeAt(char.length - 1) === semicolon$1 && characters !== "semi") {
    return false;
  }
  return char === entity ? false : char;
}
var legacy = require$$0;
var invalid = require$$1;
var decimal = isDecimal;
var hexadecimal = isHexadecimal;
var alphanumerical = isAlphanumerical;
var decodeEntity = decodeEntity_browser;
var parseEntities_1 = parseEntities;
var own = {}.hasOwnProperty;
var fromCharCode = String.fromCharCode;
var noop = Function.prototype;
var defaults = {
  warning: null,
  reference: null,
  text: null,
  warningContext: null,
  referenceContext: null,
  textContext: null,
  position: {},
  additional: null,
  attribute: false,
  nonTerminated: true
};
var tab = 9;
var lineFeed = 10;
var formFeed = 12;
var space = 32;
var ampersand = 38;
var semicolon = 59;
var lessThan = 60;
var equalsTo = 61;
var numberSign = 35;
var uppercaseX = 88;
var lowercaseX = 120;
var replacementCharacter = 65533;
var name = "named";
var hexa = "hexadecimal";
var deci = "decimal";
var bases = {};
bases[hexa] = 16;
bases[deci] = 10;
var tests = {};
tests[name] = alphanumerical;
tests[deci] = decimal;
tests[hexa] = hexadecimal;
var namedNotTerminated = 1;
var numericNotTerminated = 2;
var namedEmpty = 3;
var numericEmpty = 4;
var namedUnknown = 5;
var numericDisallowed = 6;
var numericProhibited = 7;
var messages = {};
messages[namedNotTerminated] = "Named character references must be terminated by a semicolon";
messages[numericNotTerminated] = "Numeric character references must be terminated by a semicolon";
messages[namedEmpty] = "Named character references cannot be empty";
messages[numericEmpty] = "Numeric character references cannot be empty";
messages[namedUnknown] = "Named character references must be known";
messages[numericDisallowed] = "Numeric character references cannot be disallowed";
messages[numericProhibited] = "Numeric character references cannot be outside the permissible Unicode range";
function parseEntities(value, options) {
  var settings = {};
  var option;
  var key;
  if (!options) {
    options = {};
  }
  for (key in defaults) {
    option = options[key];
    settings[key] = option === null || option === void 0 ? defaults[key] : option;
  }
  if (settings.position.indent || settings.position.start) {
    settings.indent = settings.position.indent || [];
    settings.position = settings.position.start;
  }
  return parse(value, settings);
}
function parse(value, settings) {
  var additional = settings.additional;
  var nonTerminated = settings.nonTerminated;
  var handleText = settings.text;
  var handleReference = settings.reference;
  var handleWarning = settings.warning;
  var textContext = settings.textContext;
  var referenceContext = settings.referenceContext;
  var warningContext = settings.warningContext;
  var pos = settings.position;
  var indent = settings.indent || [];
  var length = value.length;
  var index = 0;
  var lines = -1;
  var column = pos.column || 1;
  var line = pos.line || 1;
  var queue = "";
  var result = [];
  var entityCharacters;
  var namedEntity;
  var terminated;
  var characters;
  var character;
  var reference;
  var following;
  var warning;
  var reason;
  var output;
  var entity;
  var begin;
  var start;
  var type;
  var test;
  var prev;
  var next;
  var diff;
  var end;
  if (typeof additional === "string") {
    additional = additional.charCodeAt(0);
  }
  prev = now();
  warning = handleWarning ? parseError : noop;
  index--;
  length++;
  while (++index < length) {
    if (character === lineFeed) {
      column = indent[lines] || 1;
    }
    character = value.charCodeAt(index);
    if (character === ampersand) {
      following = value.charCodeAt(index + 1);
      if (following === tab || following === lineFeed || following === formFeed || following === space || following === ampersand || following === lessThan || following !== following || additional && following === additional) {
        queue += fromCharCode(character);
        column++;
        continue;
      }
      start = index + 1;
      begin = start;
      end = start;
      if (following === numberSign) {
        end = ++begin;
        following = value.charCodeAt(end);
        if (following === uppercaseX || following === lowercaseX) {
          type = hexa;
          end = ++begin;
        } else {
          type = deci;
        }
      } else {
        type = name;
      }
      entityCharacters = "";
      entity = "";
      characters = "";
      test = tests[type];
      end--;
      while (++end < length) {
        following = value.charCodeAt(end);
        if (!test(following)) {
          break;
        }
        characters += fromCharCode(following);
        if (type === name && own.call(legacy, characters)) {
          entityCharacters = characters;
          entity = legacy[characters];
        }
      }
      terminated = value.charCodeAt(end) === semicolon;
      if (terminated) {
        end++;
        namedEntity = type === name ? decodeEntity(characters) : false;
        if (namedEntity) {
          entityCharacters = characters;
          entity = namedEntity;
        }
      }
      diff = 1 + end - start;
      if (!terminated && !nonTerminated)
        ;
      else if (!characters) {
        if (type !== name) {
          warning(numericEmpty, diff);
        }
      } else if (type === name) {
        if (terminated && !entity) {
          warning(namedUnknown, 1);
        } else {
          if (entityCharacters !== characters) {
            end = begin + entityCharacters.length;
            diff = 1 + end - begin;
            terminated = false;
          }
          if (!terminated) {
            reason = entityCharacters ? namedNotTerminated : namedEmpty;
            if (settings.attribute) {
              following = value.charCodeAt(end);
              if (following === equalsTo) {
                warning(reason, diff);
                entity = null;
              } else if (alphanumerical(following)) {
                entity = null;
              } else {
                warning(reason, diff);
              }
            } else {
              warning(reason, diff);
            }
          }
        }
        reference = entity;
      } else {
        if (!terminated) {
          warning(numericNotTerminated, diff);
        }
        reference = parseInt(characters, bases[type]);
        if (prohibited(reference)) {
          warning(numericProhibited, diff);
          reference = fromCharCode(replacementCharacter);
        } else if (reference in invalid) {
          warning(numericDisallowed, diff);
          reference = invalid[reference];
        } else {
          output = "";
          if (disallowed(reference)) {
            warning(numericDisallowed, diff);
          }
          if (reference > 65535) {
            reference -= 65536;
            output += fromCharCode(reference >>> (10 & 1023) | 55296);
            reference = 56320 | reference & 1023;
          }
          reference = output + fromCharCode(reference);
        }
      }
      if (reference) {
        flush();
        prev = now();
        index = end - 1;
        column += end - start + 1;
        result.push(reference);
        next = now();
        next.offset++;
        if (handleReference) {
          handleReference.call(
            referenceContext,
            reference,
            { start: prev, end: next },
            value.slice(start - 1, end)
          );
        }
        prev = next;
      } else {
        characters = value.slice(start - 1, end);
        queue += characters;
        column += characters.length;
        index = end - 1;
      }
    } else {
      if (character === 10) {
        line++;
        lines++;
        column = 0;
      }
      if (character === character) {
        queue += fromCharCode(character);
        column++;
      } else {
        flush();
      }
    }
  }
  return result.join("");
  function now() {
    return {
      line,
      column,
      offset: index + (pos.offset || 0)
    };
  }
  function parseError(code2, offset) {
    var position = now();
    position.column += offset;
    position.offset += offset;
    handleWarning.call(warningContext, messages[code2], position, code2);
  }
  function flush() {
    if (queue) {
      result.push(queue);
      if (handleText) {
        handleText.call(textContext, queue, { start: prev, end: now() });
      }
      queue = "";
    }
  }
}
function prohibited(code2) {
  return code2 >= 55296 && code2 <= 57343 || code2 > 1114111;
}
function disallowed(code2) {
  return code2 >= 1 && code2 <= 8 || code2 === 11 || code2 >= 13 && code2 <= 31 || code2 >= 127 && code2 <= 159 || code2 >= 64976 && code2 <= 65007 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534;
}
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}
var e, t, n, i, r = function(e2, t2) {
  return { name: e2, value: void 0 === t2 ? -1 : t2, delta: 0, entries: [], id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12) };
}, a = function(e2, t2) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(e2)) {
      if ("first-input" === e2 && !("PerformanceEventTiming" in self))
        return;
      var n2 = new PerformanceObserver(function(e3) {
        return e3.getEntries().map(t2);
      });
      return n2.observe({ type: e2, buffered: true }), n2;
    }
  } catch (e3) {
  }
}, o = function(e2, t2) {
  var n2 = function n3(i2) {
    "pagehide" !== i2.type && "hidden" !== document.visibilityState || (e2(i2), t2 && (removeEventListener("visibilitychange", n3, true), removeEventListener("pagehide", n3, true)));
  };
  addEventListener("visibilitychange", n2, true), addEventListener("pagehide", n2, true);
}, u = function(e2) {
  addEventListener("pageshow", function(t2) {
    t2.persisted && e2(t2);
  }, true);
}, c = function(e2, t2, n2) {
  var i2;
  return function(r2) {
    t2.value >= 0 && (r2 || n2) && (t2.delta = t2.value - (i2 || 0), (t2.delta || void 0 === i2) && (i2 = t2.value, e2(t2)));
  };
}, f = -1, s = function() {
  return "hidden" === document.visibilityState ? 0 : 1 / 0;
}, m = function() {
  o(function(e2) {
    var t2 = e2.timeStamp;
    f = t2;
  }, true);
}, v = function() {
  return f < 0 && (f = s(), m(), u(function() {
    setTimeout(function() {
      f = s(), m();
    }, 0);
  })), { get firstHiddenTime() {
    return f;
  } };
}, d = function(e2, t2) {
  var n2, i2 = v(), o2 = r("FCP"), f2 = function(e3) {
    "first-contentful-paint" === e3.name && (m2 && m2.disconnect(), e3.startTime < i2.firstHiddenTime && (o2.value = e3.startTime, o2.entries.push(e3), n2(true)));
  }, s2 = window.performance && performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0], m2 = s2 ? null : a("paint", f2);
  (s2 || m2) && (n2 = c(e2, o2, t2), s2 && f2(s2), u(function(i3) {
    o2 = r("FCP"), n2 = c(e2, o2, t2), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        o2.value = performance.now() - i3.timeStamp, n2(true);
      });
    });
  }));
}, p = false, l = -1, h = function(e2, t2) {
  p || (d(function(e3) {
    l = e3.value;
  }), p = true);
  var n2, i2 = function(t3) {
    l > -1 && e2(t3);
  }, f2 = r("CLS", 0), s2 = 0, m2 = [], v2 = function(e3) {
    if (!e3.hadRecentInput) {
      var t3 = m2[0], i3 = m2[m2.length - 1];
      s2 && e3.startTime - i3.startTime < 1e3 && e3.startTime - t3.startTime < 5e3 ? (s2 += e3.value, m2.push(e3)) : (s2 = e3.value, m2 = [e3]), s2 > f2.value && (f2.value = s2, f2.entries = m2, n2());
    }
  }, h2 = a("layout-shift", v2);
  h2 && (n2 = c(i2, f2, t2), o(function() {
    h2.takeRecords().map(v2), n2(true);
  }), u(function() {
    s2 = 0, l = -1, f2 = r("CLS", 0), n2 = c(i2, f2, t2);
  }));
}, T = { passive: true, capture: true }, y = /* @__PURE__ */ new Date(), g = function(i2, r2) {
  e || (e = r2, t = i2, n = /* @__PURE__ */ new Date(), w(removeEventListener), E());
}, E = function() {
  if (t >= 0 && t < n - y) {
    var r2 = { entryType: "first-input", name: e.type, target: e.target, cancelable: e.cancelable, startTime: e.timeStamp, processingStart: e.timeStamp + t };
    i.forEach(function(e2) {
      e2(r2);
    }), i = [];
  }
}, S = function(e2) {
  if (e2.cancelable) {
    var t2 = (e2.timeStamp > 1e12 ? /* @__PURE__ */ new Date() : performance.now()) - e2.timeStamp;
    "pointerdown" == e2.type ? function(e3, t3) {
      var n2 = function() {
        g(e3, t3), r2();
      }, i2 = function() {
        r2();
      }, r2 = function() {
        removeEventListener("pointerup", n2, T), removeEventListener("pointercancel", i2, T);
      };
      addEventListener("pointerup", n2, T), addEventListener("pointercancel", i2, T);
    }(t2, e2) : g(t2, e2);
  }
}, w = function(e2) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(t2) {
    return e2(t2, S, T);
  });
}, L = function(n2, f2) {
  var s2, m2 = v(), d2 = r("FID"), p2 = function(e2) {
    e2.startTime < m2.firstHiddenTime && (d2.value = e2.processingStart - e2.startTime, d2.entries.push(e2), s2(true));
  }, l2 = a("first-input", p2);
  s2 = c(n2, d2, f2), l2 && o(function() {
    l2.takeRecords().map(p2), l2.disconnect();
  }, true), l2 && u(function() {
    var a2;
    d2 = r("FID"), s2 = c(n2, d2, f2), i = [], t = -1, e = null, w(addEventListener), a2 = p2, i.push(a2), E();
  });
}, b = {}, F = function(e2, t2) {
  var n2, i2 = v(), f2 = r("LCP"), s2 = function(e3) {
    var t3 = e3.startTime;
    t3 < i2.firstHiddenTime && (f2.value = t3, f2.entries.push(e3), n2());
  }, m2 = a("largest-contentful-paint", s2);
  if (m2) {
    n2 = c(e2, f2, t2);
    var d2 = function() {
      b[f2.id] || (m2.takeRecords().map(s2), m2.disconnect(), b[f2.id] = true, n2(true));
    };
    ["keydown", "click"].forEach(function(e3) {
      addEventListener(e3, d2, { once: true, capture: true });
    }), o(d2, true), u(function(i3) {
      f2 = r("LCP"), n2 = c(e2, f2, t2), requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          f2.value = performance.now() - i3.timeStamp, b[f2.id] = true, n2(true);
        });
      });
    });
  }
}, P = function(e2) {
  var t2, n2 = r("TTFB");
  t2 = function() {
    try {
      var t3 = performance.getEntriesByType("navigation")[0] || function() {
        var e3 = performance.timing, t4 = { entryType: "navigation", startTime: 0 };
        for (var n3 in e3)
          "navigationStart" !== n3 && "toJSON" !== n3 && (t4[n3] = Math.max(e3[n3] - e3.navigationStart, 0));
        return t4;
      }();
      if (n2.value = n2.delta = t3.responseStart, n2.value < 0 || n2.value > performance.now())
        return;
      n2.entries = [t3], e2(n2);
    } catch (e3) {
    }
  }, "complete" === document.readyState ? setTimeout(t2, 0) : addEventListener("load", function() {
    return setTimeout(t2, 0);
  });
};
const webVitals = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getCLS: h,
  getFCP: d,
  getFID: L,
  getLCP: F,
  getTTFB: P
}, Symbol.toStringTag, { value: "Module" }));
export {
  EventEmitter$1 as E,
  PropTypes as P,
  StyleToObject$1 as S,
  VFile as V,
  color$1 as a,
  buffer$1 as b,
  ccount as c,
  decodeNamedCharacterReference as d,
  stringify as e,
  fault as f,
  stringify$1 as g,
  hastUtilParseSelector as h,
  immutable as i,
  webVitals as j,
  markdownTable as m,
  nanoid as n,
  parseEntities_1 as p,
  schedulerExports as s,
  trimLines as t,
  unified as u,
  whitespace as w
};
