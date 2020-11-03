"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semverToString = exports.dependencyToJson = exports.npmPackageNameToString = void 0;
function npmPackageNameToString(givenPackage) {
    return (givenPackage.scope ? '@' + givenPackage.scope + '/' : '') + givenPackage.name;
}
exports.npmPackageNameToString = npmPackageNameToString;
function dependencyToJson(dependency) {
    const name = npmPackageNameToString(dependency);
    const version = semverToString(dependency.version);
    return { name: name, version: version };
}
exports.dependencyToJson = dependencyToJson;
function semverToString(version) {
    if (version.major || version.minor || version.patch) {
        let v = `${version.major}`;
        if (undefined !== version.minor)
            v += `.${version.minor}`;
        if (undefined !== version.patch)
            v += `.${version.patch}`;
        if (undefined !== version.prefix)
            v = version.prefix + v;
        if (undefined !== version.suffix)
            v += '-' + version.suffix;
        return v;
    }
    else if ('*' === version.prefix) {
        return '*';
    }
}
exports.semverToString = semverToString;
//# sourceMappingURL=Util.js.map