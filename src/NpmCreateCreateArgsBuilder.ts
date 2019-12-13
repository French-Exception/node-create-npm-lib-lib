import {NpmPackage} from "./NpmPackage";
import {NpmSemVer} from "./NpmSemVer";

export class NpmCreateCreateArgsBuilder {
    model: NpmPackage;

    constructor() {
        this.model = <any>{};
    }

    public withScope(scope: string): NpmCreateCreateArgsBuilder {
        this.model.scope = scope;
        return this;
    }

    public withName(name: string): NpmCreateCreateArgsBuilder {
        this.model.name = name;
        return this;
    }

    public withDescription(desc: string): NpmCreateCreateArgsBuilder {
        this.model.description = desc;
        return this;
    }

    public withVersion(version: NpmSemVer): NpmCreateCreateArgsBuilder {
        this.model.version = version;
        return this;
    }

    public withScript(name: string, value: string): NpmCreateCreateArgsBuilder {
        if (!this.model.scripts) {
            this.model.scripts = new Map<string, string>();
        }

        this.model.scripts[name] = value;

        return this;
    }

    public withKeyword(key: string): NpmCreateCreateArgsBuilder {
        if (!this.model.keywords)
            this.model.keywords = new Array();

        this.model.keywords.push(key);

        return this;
    }

    public withKeywords(keys: string[]): NpmCreateCreateArgsBuilder {
        if (!this.model.keywords)
            this.model.keywords = new Array();

        this.model.keywords = this.model.keywords.concat(keys);

        return this;
    }

    public withAuthor(name: string, email: string): NpmCreateCreateArgsBuilder {
        this.model.author = `${name} <${email}>`;
        return this;
    }

    public withLicence(name: string): NpmCreateCreateArgsBuilder {
        this.model.license = name;
        return this;
    }

    public withDependency(name: string, version: NpmSemVer): NpmCreateCreateArgsBuilder {
        this.model['dependencies'][name] = version;
        return this;
    }

    public withDevDependency(name: string, version: NpmSemVer) {
        this.model['devDependencies'][name] = version;

        return this;
    }
}
