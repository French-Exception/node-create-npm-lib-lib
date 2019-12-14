import {NpmSemVer} from "./NpmSemVer";
import {NpmDependency} from "./NpmDependency";
import {NpmScript} from "./NpmScript";
import {NpmDirectory} from "./NpmDirectory";

export interface NpmPackage {
    version?: NpmSemVer,
    name?: string,
    scope?: string,
    description?: string,
    main?: string,
    directories?: Array<NpmDirectory>,
    scripts?: Array<NpmScript>,
    keywords?: string[],
    dependencies?: Array<NpmDependency>,
    devDependencies?: Array<NpmDependency>,
    homepage?: string,
    bugs?: { url?: string, email?: string },
    author?: string,
    license?: string,
    publishConfig?: { access?: string, repository?: string }
    repository?: { type?: string, url?: string }
}
