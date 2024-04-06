"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@noble";
exports.ids = ["vendor-chunks/@noble"];
exports.modules = {

/***/ "(ssr)/./node_modules/@noble/curves/esm/abstract/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/@noble/curves/esm/abstract/utils.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bitGet: () => (/* binding */ bitGet),\n/* harmony export */   bitLen: () => (/* binding */ bitLen),\n/* harmony export */   bitMask: () => (/* binding */ bitMask),\n/* harmony export */   bitSet: () => (/* binding */ bitSet),\n/* harmony export */   bytesToHex: () => (/* binding */ bytesToHex),\n/* harmony export */   bytesToNumberBE: () => (/* binding */ bytesToNumberBE),\n/* harmony export */   bytesToNumberLE: () => (/* binding */ bytesToNumberLE),\n/* harmony export */   concatBytes: () => (/* binding */ concatBytes),\n/* harmony export */   createHmacDrbg: () => (/* binding */ createHmacDrbg),\n/* harmony export */   ensureBytes: () => (/* binding */ ensureBytes),\n/* harmony export */   equalBytes: () => (/* binding */ equalBytes),\n/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),\n/* harmony export */   hexToNumber: () => (/* binding */ hexToNumber),\n/* harmony export */   numberToBytesBE: () => (/* binding */ numberToBytesBE),\n/* harmony export */   numberToBytesLE: () => (/* binding */ numberToBytesLE),\n/* harmony export */   numberToHexUnpadded: () => (/* binding */ numberToHexUnpadded),\n/* harmony export */   numberToVarBytesBE: () => (/* binding */ numberToVarBytesBE),\n/* harmony export */   utf8ToBytes: () => (/* binding */ utf8ToBytes),\n/* harmony export */   validateObject: () => (/* binding */ validateObject)\n/* harmony export */ });\n/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */\n// 100 lines of code in the file are duplicated from noble-hashes (utils).\n// This is OK: `abstract` directory does not use noble-hashes.\n// User may opt-in into using different hashing library. This way, noble-hashes\n// won't be included into their bundle.\nconst _0n = BigInt(0);\nconst _1n = BigInt(1);\nconst _2n = BigInt(2);\nconst u8a = (a) => a instanceof Uint8Array;\nconst hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));\n/**\n * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'\n */\nfunction bytesToHex(bytes) {\n    if (!u8a(bytes))\n        throw new Error('Uint8Array expected');\n    // pre-caching improves the speed 6x\n    let hex = '';\n    for (let i = 0; i < bytes.length; i++) {\n        hex += hexes[bytes[i]];\n    }\n    return hex;\n}\nfunction numberToHexUnpadded(num) {\n    const hex = num.toString(16);\n    return hex.length & 1 ? `0${hex}` : hex;\n}\nfunction hexToNumber(hex) {\n    if (typeof hex !== 'string')\n        throw new Error('hex string expected, got ' + typeof hex);\n    // Big Endian\n    return BigInt(hex === '' ? '0' : `0x${hex}`);\n}\n/**\n * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])\n */\nfunction hexToBytes(hex) {\n    if (typeof hex !== 'string')\n        throw new Error('hex string expected, got ' + typeof hex);\n    const len = hex.length;\n    if (len % 2)\n        throw new Error('padded hex string expected, got unpadded hex of length ' + len);\n    const array = new Uint8Array(len / 2);\n    for (let i = 0; i < array.length; i++) {\n        const j = i * 2;\n        const hexByte = hex.slice(j, j + 2);\n        const byte = Number.parseInt(hexByte, 16);\n        if (Number.isNaN(byte) || byte < 0)\n            throw new Error('Invalid byte sequence');\n        array[i] = byte;\n    }\n    return array;\n}\n// BE: Big Endian, LE: Little Endian\nfunction bytesToNumberBE(bytes) {\n    return hexToNumber(bytesToHex(bytes));\n}\nfunction bytesToNumberLE(bytes) {\n    if (!u8a(bytes))\n        throw new Error('Uint8Array expected');\n    return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));\n}\nfunction numberToBytesBE(n, len) {\n    return hexToBytes(n.toString(16).padStart(len * 2, '0'));\n}\nfunction numberToBytesLE(n, len) {\n    return numberToBytesBE(n, len).reverse();\n}\n// Unpadded, rarely used\nfunction numberToVarBytesBE(n) {\n    return hexToBytes(numberToHexUnpadded(n));\n}\n/**\n * Takes hex string or Uint8Array, converts to Uint8Array.\n * Validates output length.\n * Will throw error for other types.\n * @param title descriptive title for an error e.g. 'private key'\n * @param hex hex string or Uint8Array\n * @param expectedLength optional, will compare to result array's length\n * @returns\n */\nfunction ensureBytes(title, hex, expectedLength) {\n    let res;\n    if (typeof hex === 'string') {\n        try {\n            res = hexToBytes(hex);\n        }\n        catch (e) {\n            throw new Error(`${title} must be valid hex string, got \"${hex}\". Cause: ${e}`);\n        }\n    }\n    else if (u8a(hex)) {\n        // Uint8Array.from() instead of hash.slice() because node.js Buffer\n        // is instance of Uint8Array, and its slice() creates **mutable** copy\n        res = Uint8Array.from(hex);\n    }\n    else {\n        throw new Error(`${title} must be hex string or Uint8Array`);\n    }\n    const len = res.length;\n    if (typeof expectedLength === 'number' && len !== expectedLength)\n        throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);\n    return res;\n}\n/**\n * Copies several Uint8Arrays into one.\n */\nfunction concatBytes(...arrays) {\n    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));\n    let pad = 0; // walk through each item, ensure they have proper type\n    arrays.forEach((a) => {\n        if (!u8a(a))\n            throw new Error('Uint8Array expected');\n        r.set(a, pad);\n        pad += a.length;\n    });\n    return r;\n}\nfunction equalBytes(b1, b2) {\n    // We don't care about timing attacks here\n    if (b1.length !== b2.length)\n        return false;\n    for (let i = 0; i < b1.length; i++)\n        if (b1[i] !== b2[i])\n            return false;\n    return true;\n}\n/**\n * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])\n */\nfunction utf8ToBytes(str) {\n    if (typeof str !== 'string')\n        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);\n    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809\n}\n// Bit operations\n/**\n * Calculates amount of bits in a bigint.\n * Same as `n.toString(2).length`\n */\nfunction bitLen(n) {\n    let len;\n    for (len = 0; n > _0n; n >>= _1n, len += 1)\n        ;\n    return len;\n}\n/**\n * Gets single bit at position.\n * NOTE: first bit position is 0 (same as arrays)\n * Same as `!!+Array.from(n.toString(2)).reverse()[pos]`\n */\nfunction bitGet(n, pos) {\n    return (n >> BigInt(pos)) & _1n;\n}\n/**\n * Sets single bit at position.\n */\nconst bitSet = (n, pos, value) => {\n    return n | ((value ? _1n : _0n) << BigInt(pos));\n};\n/**\n * Calculate mask for N bits. Not using ** operator with bigints because of old engines.\n * Same as BigInt(`0b${Array(i).fill('1').join('')}`)\n */\nconst bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;\n// DRBG\nconst u8n = (data) => new Uint8Array(data); // creates Uint8Array\nconst u8fr = (arr) => Uint8Array.from(arr); // another shortcut\n/**\n * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.\n * @returns function that will call DRBG until 2nd arg returns something meaningful\n * @example\n *   const drbg = createHmacDRBG<Key>(32, 32, hmac);\n *   drbg(seed, bytesToKey); // bytesToKey must return Key or undefined\n */\nfunction createHmacDrbg(hashLen, qByteLen, hmacFn) {\n    if (typeof hashLen !== 'number' || hashLen < 2)\n        throw new Error('hashLen must be a number');\n    if (typeof qByteLen !== 'number' || qByteLen < 2)\n        throw new Error('qByteLen must be a number');\n    if (typeof hmacFn !== 'function')\n        throw new Error('hmacFn must be a function');\n    // Step B, Step C: set hashLen to 8*ceil(hlen/8)\n    let v = u8n(hashLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.\n    let k = u8n(hashLen); // Steps B and C of RFC6979 3.2: set hashLen, in our case always same\n    let i = 0; // Iterations counter, will throw when over 1000\n    const reset = () => {\n        v.fill(1);\n        k.fill(0);\n        i = 0;\n    };\n    const h = (...b) => hmacFn(k, v, ...b); // hmac(k)(v, ...values)\n    const reseed = (seed = u8n()) => {\n        // HMAC-DRBG reseed() function. Steps D-G\n        k = h(u8fr([0x00]), seed); // k = hmac(k || v || 0x00 || seed)\n        v = h(); // v = hmac(k || v)\n        if (seed.length === 0)\n            return;\n        k = h(u8fr([0x01]), seed); // k = hmac(k || v || 0x01 || seed)\n        v = h(); // v = hmac(k || v)\n    };\n    const gen = () => {\n        // HMAC-DRBG generate() function\n        if (i++ >= 1000)\n            throw new Error('drbg: tried 1000 values');\n        let len = 0;\n        const out = [];\n        while (len < qByteLen) {\n            v = h();\n            const sl = v.slice();\n            out.push(sl);\n            len += v.length;\n        }\n        return concatBytes(...out);\n    };\n    const genUntil = (seed, pred) => {\n        reset();\n        reseed(seed); // Steps D-G\n        let res = undefined; // Step H: grind until k is in [1..n-1]\n        while (!(res = pred(gen())))\n            reseed();\n        reset();\n        return res;\n    };\n    return genUntil;\n}\n// Validating curves and fields\nconst validatorFns = {\n    bigint: (val) => typeof val === 'bigint',\n    function: (val) => typeof val === 'function',\n    boolean: (val) => typeof val === 'boolean',\n    string: (val) => typeof val === 'string',\n    stringOrUint8Array: (val) => typeof val === 'string' || val instanceof Uint8Array,\n    isSafeInteger: (val) => Number.isSafeInteger(val),\n    array: (val) => Array.isArray(val),\n    field: (val, object) => object.Fp.isValid(val),\n    hash: (val) => typeof val === 'function' && Number.isSafeInteger(val.outputLen),\n};\n// type Record<K extends string | number | symbol, T> = { [P in K]: T; }\nfunction validateObject(object, validators, optValidators = {}) {\n    const checkField = (fieldName, type, isOptional) => {\n        const checkVal = validatorFns[type];\n        if (typeof checkVal !== 'function')\n            throw new Error(`Invalid validator \"${type}\", expected function`);\n        const val = object[fieldName];\n        if (isOptional && val === undefined)\n            return;\n        if (!checkVal(val, object)) {\n            throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);\n        }\n    };\n    for (const [fieldName, type] of Object.entries(validators))\n        checkField(fieldName, type, false);\n    for (const [fieldName, type] of Object.entries(optValidators))\n        checkField(fieldName, type, true);\n    return object;\n}\n// validate type tests\n// const o: { a: number; b: number; c: number } = { a: 1, b: 5, c: 6 };\n// const z0 = validateObject(o, { a: 'isSafeInteger' }, { c: 'bigint' }); // Ok!\n// // Should fail type-check\n// const z1 = validateObject(o, { a: 'tmp' }, { c: 'zz' });\n// const z2 = validateObject(o, { a: 'isSafeInteger' }, { c: 'zz' });\n// const z3 = validateObject(o, { test: 'boolean', z: 'bug' });\n// const z4 = validateObject(o, { a: 'boolean', z: 'bug' });\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQG5vYmxlL2N1cnZlcy9lc20vYWJzdHJhY3QvdXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGdDQUFnQyxJQUFJO0FBQ3BDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsSUFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE9BQU8saUNBQWlDLElBQUksWUFBWSxFQUFFO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTyxXQUFXLGdCQUFnQixhQUFhLElBQUk7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSw0REFBNEQsV0FBVztBQUN2RSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRCQUE0QjtBQUNuRDtBQUNPO0FBQ1A7QUFDQSw0Q0FBNEM7QUFDNUMsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUNuRCw4REFBOEQ7QUFDckU7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELEtBQUs7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsa0JBQWtCLEdBQUcsS0FBSyxHQUFHLFdBQVcsY0FBYyxLQUFLO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsV0FBVyxXQUFXLFlBQVksSUFBSTtBQUNwRCxrQ0FBa0Msb0JBQW9CLElBQUksYUFBYSxHQUFHO0FBQzFFO0FBQ0Esa0NBQWtDLFVBQVUsSUFBSSxTQUFTO0FBQ3pELGtDQUFrQyxvQkFBb0IsSUFBSSxTQUFTO0FBQ25FLGtDQUFrQywyQkFBMkI7QUFDN0Qsa0NBQWtDLHdCQUF3QjtBQUMxRCIsInNvdXJjZXMiOlsid2VicGFjazovL3F1ZXN0Z2FtaW5nLy4vbm9kZV9tb2R1bGVzL0Bub2JsZS9jdXJ2ZXMvZXNtL2Fic3RyYWN0L3V0aWxzLmpzP2RmMGQiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIG5vYmxlLWN1cnZlcyAtIE1JVCBMaWNlbnNlIChjKSAyMDIyIFBhdWwgTWlsbGVyIChwYXVsbWlsbHIuY29tKSAqL1xuLy8gMTAwIGxpbmVzIG9mIGNvZGUgaW4gdGhlIGZpbGUgYXJlIGR1cGxpY2F0ZWQgZnJvbSBub2JsZS1oYXNoZXMgKHV0aWxzKS5cbi8vIFRoaXMgaXMgT0s6IGBhYnN0cmFjdGAgZGlyZWN0b3J5IGRvZXMgbm90IHVzZSBub2JsZS1oYXNoZXMuXG4vLyBVc2VyIG1heSBvcHQtaW4gaW50byB1c2luZyBkaWZmZXJlbnQgaGFzaGluZyBsaWJyYXJ5LiBUaGlzIHdheSwgbm9ibGUtaGFzaGVzXG4vLyB3b24ndCBiZSBpbmNsdWRlZCBpbnRvIHRoZWlyIGJ1bmRsZS5cbmNvbnN0IF8wbiA9IEJpZ0ludCgwKTtcbmNvbnN0IF8xbiA9IEJpZ0ludCgxKTtcbmNvbnN0IF8ybiA9IEJpZ0ludCgyKTtcbmNvbnN0IHU4YSA9IChhKSA9PiBhIGluc3RhbmNlb2YgVWludDhBcnJheTtcbmNvbnN0IGhleGVzID0gLyogQF9fUFVSRV9fICovIEFycmF5LmZyb20oeyBsZW5ndGg6IDI1NiB9LCAoXywgaSkgPT4gaS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSk7XG4vKipcbiAqIEBleGFtcGxlIGJ5dGVzVG9IZXgoVWludDhBcnJheS5mcm9tKFsweGNhLCAweGZlLCAweDAxLCAweDIzXSkpIC8vICdjYWZlMDEyMydcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzVG9IZXgoYnl0ZXMpIHtcbiAgICBpZiAoIXU4YShieXRlcykpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVWludDhBcnJheSBleHBlY3RlZCcpO1xuICAgIC8vIHByZS1jYWNoaW5nIGltcHJvdmVzIHRoZSBzcGVlZCA2eFxuICAgIGxldCBoZXggPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhleCArPSBoZXhlc1tieXRlc1tpXV07XG4gICAgfVxuICAgIHJldHVybiBoZXg7XG59XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyVG9IZXhVbnBhZGRlZChudW0pIHtcbiAgICBjb25zdCBoZXggPSBudW0udG9TdHJpbmcoMTYpO1xuICAgIHJldHVybiBoZXgubGVuZ3RoICYgMSA/IGAwJHtoZXh9YCA6IGhleDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb051bWJlcihoZXgpIHtcbiAgICBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGV4IHN0cmluZyBleHBlY3RlZCwgZ290ICcgKyB0eXBlb2YgaGV4KTtcbiAgICAvLyBCaWcgRW5kaWFuXG4gICAgcmV0dXJuIEJpZ0ludChoZXggPT09ICcnID8gJzAnIDogYDB4JHtoZXh9YCk7XG59XG4vKipcbiAqIEBleGFtcGxlIGhleFRvQnl0ZXMoJ2NhZmUwMTIzJykgLy8gVWludDhBcnJheS5mcm9tKFsweGNhLCAweGZlLCAweDAxLCAweDIzXSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhleFRvQnl0ZXMoaGV4KSB7XG4gICAgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hleCBzdHJpbmcgZXhwZWN0ZWQsIGdvdCAnICsgdHlwZW9mIGhleCk7XG4gICAgY29uc3QgbGVuID0gaGV4Lmxlbmd0aDtcbiAgICBpZiAobGVuICUgMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYWRkZWQgaGV4IHN0cmluZyBleHBlY3RlZCwgZ290IHVucGFkZGVkIGhleCBvZiBsZW5ndGggJyArIGxlbik7XG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShsZW4gLyAyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGogPSBpICogMjtcbiAgICAgICAgY29uc3QgaGV4Qnl0ZSA9IGhleC5zbGljZShqLCBqICsgMik7XG4gICAgICAgIGNvbnN0IGJ5dGUgPSBOdW1iZXIucGFyc2VJbnQoaGV4Qnl0ZSwgMTYpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGJ5dGUpIHx8IGJ5dGUgPCAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGJ5dGUgc2VxdWVuY2UnKTtcbiAgICAgICAgYXJyYXlbaV0gPSBieXRlO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vLyBCRTogQmlnIEVuZGlhbiwgTEU6IExpdHRsZSBFbmRpYW5cbmV4cG9ydCBmdW5jdGlvbiBieXRlc1RvTnVtYmVyQkUoYnl0ZXMpIHtcbiAgICByZXR1cm4gaGV4VG9OdW1iZXIoYnl0ZXNUb0hleChieXRlcykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzVG9OdW1iZXJMRShieXRlcykge1xuICAgIGlmICghdThhKGJ5dGVzKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVaW50OEFycmF5IGV4cGVjdGVkJyk7XG4gICAgcmV0dXJuIGhleFRvTnVtYmVyKGJ5dGVzVG9IZXgoVWludDhBcnJheS5mcm9tKGJ5dGVzKS5yZXZlcnNlKCkpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJUb0J5dGVzQkUobiwgbGVuKSB7XG4gICAgcmV0dXJuIGhleFRvQnl0ZXMobi50b1N0cmluZygxNikucGFkU3RhcnQobGVuICogMiwgJzAnKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyVG9CeXRlc0xFKG4sIGxlbikge1xuICAgIHJldHVybiBudW1iZXJUb0J5dGVzQkUobiwgbGVuKS5yZXZlcnNlKCk7XG59XG4vLyBVbnBhZGRlZCwgcmFyZWx5IHVzZWRcbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJUb1ZhckJ5dGVzQkUobikge1xuICAgIHJldHVybiBoZXhUb0J5dGVzKG51bWJlclRvSGV4VW5wYWRkZWQobikpO1xufVxuLyoqXG4gKiBUYWtlcyBoZXggc3RyaW5nIG9yIFVpbnQ4QXJyYXksIGNvbnZlcnRzIHRvIFVpbnQ4QXJyYXkuXG4gKiBWYWxpZGF0ZXMgb3V0cHV0IGxlbmd0aC5cbiAqIFdpbGwgdGhyb3cgZXJyb3IgZm9yIG90aGVyIHR5cGVzLlxuICogQHBhcmFtIHRpdGxlIGRlc2NyaXB0aXZlIHRpdGxlIGZvciBhbiBlcnJvciBlLmcuICdwcml2YXRlIGtleSdcbiAqIEBwYXJhbSBoZXggaGV4IHN0cmluZyBvciBVaW50OEFycmF5XG4gKiBAcGFyYW0gZXhwZWN0ZWRMZW5ndGggb3B0aW9uYWwsIHdpbGwgY29tcGFyZSB0byByZXN1bHQgYXJyYXkncyBsZW5ndGhcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVCeXRlcyh0aXRsZSwgaGV4LCBleHBlY3RlZExlbmd0aCkge1xuICAgIGxldCByZXM7XG4gICAgaWYgKHR5cGVvZiBoZXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXMgPSBoZXhUb0J5dGVzKGhleCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aXRsZX0gbXVzdCBiZSB2YWxpZCBoZXggc3RyaW5nLCBnb3QgXCIke2hleH1cIi4gQ2F1c2U6ICR7ZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh1OGEoaGV4KSkge1xuICAgICAgICAvLyBVaW50OEFycmF5LmZyb20oKSBpbnN0ZWFkIG9mIGhhc2guc2xpY2UoKSBiZWNhdXNlIG5vZGUuanMgQnVmZmVyXG4gICAgICAgIC8vIGlzIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXksIGFuZCBpdHMgc2xpY2UoKSBjcmVhdGVzICoqbXV0YWJsZSoqIGNvcHlcbiAgICAgICAgcmVzID0gVWludDhBcnJheS5mcm9tKGhleCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGl0bGV9IG11c3QgYmUgaGV4IHN0cmluZyBvciBVaW50OEFycmF5YCk7XG4gICAgfVxuICAgIGNvbnN0IGxlbiA9IHJlcy5sZW5ndGg7XG4gICAgaWYgKHR5cGVvZiBleHBlY3RlZExlbmd0aCA9PT0gJ251bWJlcicgJiYgbGVuICE9PSBleHBlY3RlZExlbmd0aClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RpdGxlfSBleHBlY3RlZCAke2V4cGVjdGVkTGVuZ3RofSBieXRlcywgZ290ICR7bGVufWApO1xuICAgIHJldHVybiByZXM7XG59XG4vKipcbiAqIENvcGllcyBzZXZlcmFsIFVpbnQ4QXJyYXlzIGludG8gb25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0Qnl0ZXMoLi4uYXJyYXlzKSB7XG4gICAgY29uc3QgciA9IG5ldyBVaW50OEFycmF5KGFycmF5cy5yZWR1Y2UoKHN1bSwgYSkgPT4gc3VtICsgYS5sZW5ndGgsIDApKTtcbiAgICBsZXQgcGFkID0gMDsgLy8gd2FsayB0aHJvdWdoIGVhY2ggaXRlbSwgZW5zdXJlIHRoZXkgaGF2ZSBwcm9wZXIgdHlwZVxuICAgIGFycmF5cy5mb3JFYWNoKChhKSA9PiB7XG4gICAgICAgIGlmICghdThhKGEpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVaW50OEFycmF5IGV4cGVjdGVkJyk7XG4gICAgICAgIHIuc2V0KGEsIHBhZCk7XG4gICAgICAgIHBhZCArPSBhLmxlbmd0aDtcbiAgICB9KTtcbiAgICByZXR1cm4gcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbEJ5dGVzKGIxLCBiMikge1xuICAgIC8vIFdlIGRvbid0IGNhcmUgYWJvdXQgdGltaW5nIGF0dGFja3MgaGVyZVxuICAgIGlmIChiMS5sZW5ndGggIT09IGIyLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYjEubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmIChiMVtpXSAhPT0gYjJbaV0pXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIEBleGFtcGxlIHV0ZjhUb0J5dGVzKCdhYmMnKSAvLyBuZXcgVWludDhBcnJheShbOTcsIDk4LCA5OV0pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1dGY4VG9CeXRlcyhzdHIpIHtcbiAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdXRmOFRvQnl0ZXMgZXhwZWN0ZWQgc3RyaW5nLCBnb3QgJHt0eXBlb2Ygc3RyfWApO1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoc3RyKSk7IC8vIGh0dHBzOi8vYnVnemlsLmxhLzE2ODE4MDlcbn1cbi8vIEJpdCBvcGVyYXRpb25zXG4vKipcbiAqIENhbGN1bGF0ZXMgYW1vdW50IG9mIGJpdHMgaW4gYSBiaWdpbnQuXG4gKiBTYW1lIGFzIGBuLnRvU3RyaW5nKDIpLmxlbmd0aGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpdExlbihuKSB7XG4gICAgbGV0IGxlbjtcbiAgICBmb3IgKGxlbiA9IDA7IG4gPiBfMG47IG4gPj49IF8xbiwgbGVuICs9IDEpXG4gICAgICAgIDtcbiAgICByZXR1cm4gbGVuO1xufVxuLyoqXG4gKiBHZXRzIHNpbmdsZSBiaXQgYXQgcG9zaXRpb24uXG4gKiBOT1RFOiBmaXJzdCBiaXQgcG9zaXRpb24gaXMgMCAoc2FtZSBhcyBhcnJheXMpXG4gKiBTYW1lIGFzIGAhIStBcnJheS5mcm9tKG4udG9TdHJpbmcoMikpLnJldmVyc2UoKVtwb3NdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYml0R2V0KG4sIHBvcykge1xuICAgIHJldHVybiAobiA+PiBCaWdJbnQocG9zKSkgJiBfMW47XG59XG4vKipcbiAqIFNldHMgc2luZ2xlIGJpdCBhdCBwb3NpdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGJpdFNldCA9IChuLCBwb3MsIHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIG4gfCAoKHZhbHVlID8gXzFuIDogXzBuKSA8PCBCaWdJbnQocG9zKSk7XG59O1xuLyoqXG4gKiBDYWxjdWxhdGUgbWFzayBmb3IgTiBiaXRzLiBOb3QgdXNpbmcgKiogb3BlcmF0b3Igd2l0aCBiaWdpbnRzIGJlY2F1c2Ugb2Ygb2xkIGVuZ2luZXMuXG4gKiBTYW1lIGFzIEJpZ0ludChgMGIke0FycmF5KGkpLmZpbGwoJzEnKS5qb2luKCcnKX1gKVxuICovXG5leHBvcnQgY29uc3QgYml0TWFzayA9IChuKSA9PiAoXzJuIDw8IEJpZ0ludChuIC0gMSkpIC0gXzFuO1xuLy8gRFJCR1xuY29uc3QgdThuID0gKGRhdGEpID0+IG5ldyBVaW50OEFycmF5KGRhdGEpOyAvLyBjcmVhdGVzIFVpbnQ4QXJyYXlcbmNvbnN0IHU4ZnIgPSAoYXJyKSA9PiBVaW50OEFycmF5LmZyb20oYXJyKTsgLy8gYW5vdGhlciBzaG9ydGN1dFxuLyoqXG4gKiBNaW5pbWFsIEhNQUMtRFJCRyBmcm9tIE5JU1QgODAwLTkwIGZvciBSRkM2OTc5IHNpZ3MuXG4gKiBAcmV0dXJucyBmdW5jdGlvbiB0aGF0IHdpbGwgY2FsbCBEUkJHIHVudGlsIDJuZCBhcmcgcmV0dXJucyBzb21ldGhpbmcgbWVhbmluZ2Z1bFxuICogQGV4YW1wbGVcbiAqICAgY29uc3QgZHJiZyA9IGNyZWF0ZUhtYWNEUkJHPEtleT4oMzIsIDMyLCBobWFjKTtcbiAqICAgZHJiZyhzZWVkLCBieXRlc1RvS2V5KTsgLy8gYnl0ZXNUb0tleSBtdXN0IHJldHVybiBLZXkgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIbWFjRHJiZyhoYXNoTGVuLCBxQnl0ZUxlbiwgaG1hY0ZuKSB7XG4gICAgaWYgKHR5cGVvZiBoYXNoTGVuICE9PSAnbnVtYmVyJyB8fCBoYXNoTGVuIDwgMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoYXNoTGVuIG11c3QgYmUgYSBudW1iZXInKTtcbiAgICBpZiAodHlwZW9mIHFCeXRlTGVuICE9PSAnbnVtYmVyJyB8fCBxQnl0ZUxlbiA8IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncUJ5dGVMZW4gbXVzdCBiZSBhIG51bWJlcicpO1xuICAgIGlmICh0eXBlb2YgaG1hY0ZuICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2htYWNGbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAvLyBTdGVwIEIsIFN0ZXAgQzogc2V0IGhhc2hMZW4gdG8gOCpjZWlsKGhsZW4vOClcbiAgICBsZXQgdiA9IHU4bihoYXNoTGVuKTsgLy8gTWluaW1hbCBub24tZnVsbC1zcGVjIEhNQUMtRFJCRyBmcm9tIE5JU1QgODAwLTkwIGZvciBSRkM2OTc5IHNpZ3MuXG4gICAgbGV0IGsgPSB1OG4oaGFzaExlbik7IC8vIFN0ZXBzIEIgYW5kIEMgb2YgUkZDNjk3OSAzLjI6IHNldCBoYXNoTGVuLCBpbiBvdXIgY2FzZSBhbHdheXMgc2FtZVxuICAgIGxldCBpID0gMDsgLy8gSXRlcmF0aW9ucyBjb3VudGVyLCB3aWxsIHRocm93IHdoZW4gb3ZlciAxMDAwXG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHYuZmlsbCgxKTtcbiAgICAgICAgay5maWxsKDApO1xuICAgICAgICBpID0gMDtcbiAgICB9O1xuICAgIGNvbnN0IGggPSAoLi4uYikgPT4gaG1hY0ZuKGssIHYsIC4uLmIpOyAvLyBobWFjKGspKHYsIC4uLnZhbHVlcylcbiAgICBjb25zdCByZXNlZWQgPSAoc2VlZCA9IHU4bigpKSA9PiB7XG4gICAgICAgIC8vIEhNQUMtRFJCRyByZXNlZWQoKSBmdW5jdGlvbi4gU3RlcHMgRC1HXG4gICAgICAgIGsgPSBoKHU4ZnIoWzB4MDBdKSwgc2VlZCk7IC8vIGsgPSBobWFjKGsgfHwgdiB8fCAweDAwIHx8IHNlZWQpXG4gICAgICAgIHYgPSBoKCk7IC8vIHYgPSBobWFjKGsgfHwgdilcbiAgICAgICAgaWYgKHNlZWQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBrID0gaCh1OGZyKFsweDAxXSksIHNlZWQpOyAvLyBrID0gaG1hYyhrIHx8IHYgfHwgMHgwMSB8fCBzZWVkKVxuICAgICAgICB2ID0gaCgpOyAvLyB2ID0gaG1hYyhrIHx8IHYpXG4gICAgfTtcbiAgICBjb25zdCBnZW4gPSAoKSA9PiB7XG4gICAgICAgIC8vIEhNQUMtRFJCRyBnZW5lcmF0ZSgpIGZ1bmN0aW9uXG4gICAgICAgIGlmIChpKysgPj0gMTAwMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZHJiZzogdHJpZWQgMTAwMCB2YWx1ZXMnKTtcbiAgICAgICAgbGV0IGxlbiA9IDA7XG4gICAgICAgIGNvbnN0IG91dCA9IFtdO1xuICAgICAgICB3aGlsZSAobGVuIDwgcUJ5dGVMZW4pIHtcbiAgICAgICAgICAgIHYgPSBoKCk7XG4gICAgICAgICAgICBjb25zdCBzbCA9IHYuc2xpY2UoKTtcbiAgICAgICAgICAgIG91dC5wdXNoKHNsKTtcbiAgICAgICAgICAgIGxlbiArPSB2Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uY2F0Qnl0ZXMoLi4ub3V0KTtcbiAgICB9O1xuICAgIGNvbnN0IGdlblVudGlsID0gKHNlZWQsIHByZWQpID0+IHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcmVzZWVkKHNlZWQpOyAvLyBTdGVwcyBELUdcbiAgICAgICAgbGV0IHJlcyA9IHVuZGVmaW5lZDsgLy8gU3RlcCBIOiBncmluZCB1bnRpbCBrIGlzIGluIFsxLi5uLTFdXG4gICAgICAgIHdoaWxlICghKHJlcyA9IHByZWQoZ2VuKCkpKSlcbiAgICAgICAgICAgIHJlc2VlZCgpO1xuICAgICAgICByZXNldCgpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgcmV0dXJuIGdlblVudGlsO1xufVxuLy8gVmFsaWRhdGluZyBjdXJ2ZXMgYW5kIGZpZWxkc1xuY29uc3QgdmFsaWRhdG9yRm5zID0ge1xuICAgIGJpZ2ludDogKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ2JpZ2ludCcsXG4gICAgZnVuY3Rpb246ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG4gICAgYm9vbGVhbjogKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nLFxuICAgIHN0cmluZzogKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycsXG4gICAgc3RyaW5nT3JVaW50OEFycmF5OiAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyB8fCB2YWwgaW5zdGFuY2VvZiBVaW50OEFycmF5LFxuICAgIGlzU2FmZUludGVnZXI6ICh2YWwpID0+IE51bWJlci5pc1NhZmVJbnRlZ2VyKHZhbCksXG4gICAgYXJyYXk6ICh2YWwpID0+IEFycmF5LmlzQXJyYXkodmFsKSxcbiAgICBmaWVsZDogKHZhbCwgb2JqZWN0KSA9PiBvYmplY3QuRnAuaXNWYWxpZCh2YWwpLFxuICAgIGhhc2g6ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgJiYgTnVtYmVyLmlzU2FmZUludGVnZXIodmFsLm91dHB1dExlbiksXG59O1xuLy8gdHlwZSBSZWNvcmQ8SyBleHRlbmRzIHN0cmluZyB8IG51bWJlciB8IHN5bWJvbCwgVD4gPSB7IFtQIGluIEtdOiBUOyB9XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVPYmplY3Qob2JqZWN0LCB2YWxpZGF0b3JzLCBvcHRWYWxpZGF0b3JzID0ge30pIHtcbiAgICBjb25zdCBjaGVja0ZpZWxkID0gKGZpZWxkTmFtZSwgdHlwZSwgaXNPcHRpb25hbCkgPT4ge1xuICAgICAgICBjb25zdCBjaGVja1ZhbCA9IHZhbGlkYXRvckZuc1t0eXBlXTtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGVja1ZhbCAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWxpZGF0b3IgXCIke3R5cGV9XCIsIGV4cGVjdGVkIGZ1bmN0aW9uYCk7XG4gICAgICAgIGNvbnN0IHZhbCA9IG9iamVjdFtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoaXNPcHRpb25hbCAmJiB2YWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCFjaGVja1ZhbCh2YWwsIG9iamVjdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbSAke1N0cmluZyhmaWVsZE5hbWUpfT0ke3ZhbH0gKCR7dHlwZW9mIHZhbH0pLCBleHBlY3RlZCAke3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoY29uc3QgW2ZpZWxkTmFtZSwgdHlwZV0gb2YgT2JqZWN0LmVudHJpZXModmFsaWRhdG9ycykpXG4gICAgICAgIGNoZWNrRmllbGQoZmllbGROYW1lLCB0eXBlLCBmYWxzZSk7XG4gICAgZm9yIChjb25zdCBbZmllbGROYW1lLCB0eXBlXSBvZiBPYmplY3QuZW50cmllcyhvcHRWYWxpZGF0b3JzKSlcbiAgICAgICAgY2hlY2tGaWVsZChmaWVsZE5hbWUsIHR5cGUsIHRydWUpO1xuICAgIHJldHVybiBvYmplY3Q7XG59XG4vLyB2YWxpZGF0ZSB0eXBlIHRlc3RzXG4vLyBjb25zdCBvOiB7IGE6IG51bWJlcjsgYjogbnVtYmVyOyBjOiBudW1iZXIgfSA9IHsgYTogMSwgYjogNSwgYzogNiB9O1xuLy8gY29uc3QgejAgPSB2YWxpZGF0ZU9iamVjdChvLCB7IGE6ICdpc1NhZmVJbnRlZ2VyJyB9LCB7IGM6ICdiaWdpbnQnIH0pOyAvLyBPayFcbi8vIC8vIFNob3VsZCBmYWlsIHR5cGUtY2hlY2tcbi8vIGNvbnN0IHoxID0gdmFsaWRhdGVPYmplY3QobywgeyBhOiAndG1wJyB9LCB7IGM6ICd6eicgfSk7XG4vLyBjb25zdCB6MiA9IHZhbGlkYXRlT2JqZWN0KG8sIHsgYTogJ2lzU2FmZUludGVnZXInIH0sIHsgYzogJ3p6JyB9KTtcbi8vIGNvbnN0IHozID0gdmFsaWRhdGVPYmplY3QobywgeyB0ZXN0OiAnYm9vbGVhbicsIHo6ICdidWcnIH0pO1xuLy8gY29uc3QgejQgPSB2YWxpZGF0ZU9iamVjdChvLCB7IGE6ICdib29sZWFuJywgejogJ2J1ZycgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@noble/curves/esm/abstract/utils.js\n");

/***/ })

};
;