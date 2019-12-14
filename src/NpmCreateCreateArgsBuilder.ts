import {NpmPackage} from "./NpmPackage";
import {NpmSemVer} from "./NpmSemVer";

export class NpmCreateCreateArgsBuilder {
    protected readonly _model: NpmPackage;

    constructor() {
        this._model = <any>{};
        this._model.scripts = <any>{};
        this._model.devDependencies = <any>{};
        this._model.dependencies = <any>{};
        this._model.directories = <any>{};
        this._model.scripts = <any>{};
    }

    public model() {
        return this._model;
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
}
