import {NpmPackage} from "./NpmPackage";
import {NpmSemVer} from "./NpmSemVer";

export interface NpmCreateCreateArgsInterface {
    path: string,
    scope?: string,
    name: string,
    version: NpmSemVer,
    packageJson: NpmPackage,
    branch: string
    gitBin?: string,
    npmBin?: string
}
