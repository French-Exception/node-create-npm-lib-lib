"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.which = void 0;
const _which = require("which");
async function which(name) {
    return new Promise((resolve, reject) => {
        _which(name, (err, resolvedPath) => {
            if (err)
                return reject(err);
            resolve(resolvedPath);
        });
    });
}
exports.which = which;
//# sourceMappingURL=WhichPromise.js.map