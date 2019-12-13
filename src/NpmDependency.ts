import {NpmSemVer} from "./NpmSemVer";

export interface NpmDependency {
    scope?: string,
    name: string,
    version?: NpmSemVer
}
