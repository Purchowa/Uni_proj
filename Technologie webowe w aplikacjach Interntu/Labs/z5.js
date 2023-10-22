"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumWithCache = void 0;
function sumWithCache(cache, a, b) {
    var newKey = "".concat(a, "_").concat(b);
    if (cache[newKey] === undefined) {
        console.log("Adding to cache!");
        cache[newKey] = a + b;
    }
    return cache[newKey];
}
exports.sumWithCache = sumWithCache;
