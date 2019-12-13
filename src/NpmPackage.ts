import {NpmSemVer} from "./NpmSemVer";
import {NpmDependency} from "./NpmDependency";

export interface NpmPackage {
    version?: NpmSemVer,
    name?: string,
    scope?: string,
    description?: string,
    main?: string,
    directories?: Map<string, string>,
    repository?: { type: string, url: string }
    scripts?: Map<string, string>,
    keywords?: string[],
    dependencies?: Array<NpmDependency>,
    devDependencies?: Array<NpmDependency>,
    homepage?: string,
    bugs?: { url?: string, email?: string },
    author?: string,
    license?: string,
}
