import {NpmPackage} from "./NpmPackage";
import {NpmDependency} from "./NpmDependency";
import {NpmSemVer} from "./NpmSemVer";

export function npmPackageNameToString(givenPackage: NpmPackage | NpmDependency): string {
    return (givenPackage.scope ? '@' + givenPackage.scope + '/' : '') + givenPackage.name;
}

export function dependencyToJson(dependency: NpmDependency): { name: string, version: string } {
    const name = npmPackageNameToString(dependency);
    const version = semverToString(dependency.version);

    return {name: name, version: version};
}

export function semverToString(version: NpmSemVer): string {
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
    } else if ('*' === version.prefix) {
        return '*';
    }

}
