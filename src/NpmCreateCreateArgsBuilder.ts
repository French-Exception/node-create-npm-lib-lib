import {NpmPackage} from "./NpmPackage";
import {NpmSemVer} from "./NpmSemVer";
import {NpmCreateCreateArgsInterface} from "./NpmCreateCreateArgsInterface"
import {npmPackageNameToString, semverToString} from "./Util";

export class NpmCreateCreateArgsBuilder {
    protected readonly _model: NpmPackage;
    protected _gitBin: string
    protected _npmBin: string
    protected _branch: string;
    protected _path: string;

    constructor() {
        this._gitBin = '';
        this._npmBin = '';
        this._branch = "";
        this._model = <any>{};
        this._model.scripts = <any>{};
        this._model.devDependencies = <any>{};
        this._model.dependencies = <any>{};
        this._model.directories = <any>{};
        this._model.scripts = <any>{};
    }

    protected reshape(arg: NpmCreateCreateArgsInterface): NpmCreateCreateArgsInterface {
        const model: NpmCreateCreateArgsInterface = {
            scope: arg.scope,
            name: arg.name,
            packageJson: arg.packageJson,
            version: arg.version,
            npmBin: arg.npmBin,
            gitBin: arg.gitBin,
            path: arg.path,
            branch: arg.branch
        };

        if (model.scope) {
            model.packageJson.name = `@${model.scope}/${model.name}`;
        } else {
            model.packageJson.name = model.name;
        }

        if (model.version) {
            model.packageJson.version = ("string" === typeof model.version ? model.version : semverToString(<NpmSemVer>model.version));
        }

        if (Object.keys(model.packageJson.dependencies).length > 0) {
            Object.keys(model.packageJson.dependencies).forEach((value, index) => {
                model.packageJson.dependencies[value] = model.packageJson.dependencies[value]
            })
        }

        if (Object.keys(model.packageJson.devDependencies).length > 0) {
            Object.keys(model.packageJson.devDependencies).forEach((value, index) => {
                const version: NpmSemVer = model.packageJson.devDependencies[value];
                const newVersion = version['prefix'] ? version['prefix'] : ((version.major || version.minor || version.patch) ? `${version.major}.${version.minor}.${version.patch}` : version);
                model.packageJson.devDependencies[value] = newVersion;
            })
        }

        if (model.packageJson.scope)
            delete model.packageJson.scope;

        return model;
    }

    public model(): NpmCreateCreateArgsInterface {
        const model = this.reshape({
            version: this._model.version,
            scope: this._model.scope,
            npmBin: this._npmBin,
            gitBin: this._gitBin,
            branch: this._branch,
            path: this._path,
            name: this._model.name,
            packageJson: this._model
        });
        return model;
    }

    public withFile(file: string): NpmCreateCreateArgsBuilder {
        this._model.files.push(file);
        return this;
    }

    public withPath(path: string): NpmCreateCreateArgsBuilder {
        this._path = path;
        return this;
    }

    public withMain(main) {
        this._model.main = main;
        return this;
    }

    public withGitBin(bin: string): NpmCreateCreateArgsBuilder {
        this._gitBin = bin;
        return this;
    }

    public withNpmBin(bin: string): NpmCreateCreateArgsBuilder {
        this._npmBin = bin;
        return this;
    }

    public withScope(scope: string): NpmCreateCreateArgsBuilder {
        this._model.scope = scope;
        return this;
    }

    public withName(name: string): NpmCreateCreateArgsBuilder {
        this._model.name = name;
        return this;
    }

    public withDescription(desc: string): NpmCreateCreateArgsBuilder {
        this._model.description = desc;
        return this;
    }

    public withVersion(version: NpmSemVer): NpmCreateCreateArgsBuilder {
        this._model.version = version;
        return this;
    }

    public withScript(name: string, value: string): NpmCreateCreateArgsBuilder {
        if (!this._model.scripts) {
            this._model.scripts = <any>{};
        }

        this._model.scripts[name] = value;

        return this;
    }

    public withKeyword(key: string): NpmCreateCreateArgsBuilder {
        if (!this._model.keywords)
            this._model.keywords = new Array();

        this._model.keywords.push(key);

        return this;
    }

    public withKeywords(keys: string[]): NpmCreateCreateArgsBuilder {
        if (!this._model.keywords)
            this._model.keywords = new Array();

        this._model.keywords = this._model.keywords.concat(keys);

        return this;
    }

    public withAuthor(name: string, email: string): NpmCreateCreateArgsBuilder {
        this._model.author = `${name} <${email}>`;
        return this;
    }

    public withLicence(name: string): NpmCreateCreateArgsBuilder {
        this._model.license = name;
        return this;
    }

    public withDependency(name: string, version: NpmSemVer): NpmCreateCreateArgsBuilder {
        this._model['dependencies'][name] = version;
        return this;
    }

    public withDevDependency(name: string, version: NpmSemVer) {
        this._model['devDependencies'][name] = version;

        return this;
    }

    public withBranch(name: string): NpmCreateCreateArgsBuilder {
        this._branch = name;
        return this;
    }
}
