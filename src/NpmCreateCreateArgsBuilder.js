"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmCreateCreateArgsBuilder = void 0;
const Util_1 = require("./Util");
class NpmCreateCreateArgsBuilder {
    constructor() {
        this._gitBin = '';
        this._npmBin = '';
        this._branch = "";
        this._model = {};
        this._model.scripts = {};
        this._model.devDependencies = {};
        this._model.dependencies = {};
        this._model.directories = {};
        this._model.scripts = {};
    }
    reshape(arg) {
        const model = {
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
        }
        else {
            model.packageJson.name = model.name;
        }
        if (model.version) {
            model.packageJson.version = ("string" === typeof model.version ? model.version : Util_1.semverToString(model.version));
        }
        if (Object.keys(model.packageJson.dependencies).length > 0) {
            Object.keys(model.packageJson.dependencies).forEach((value, index) => {
                model.packageJson.dependencies[value] = model.packageJson.dependencies[value];
            });
        }
        if (Object.keys(model.packageJson.devDependencies).length > 0) {
            Object.keys(model.packageJson.devDependencies).forEach((value, index) => {
                const version = model.packageJson.devDependencies[value];
                const newVersion = version['prefix'] ? version['prefix'] : ((version.major || version.minor || version.patch) ? `${version.major}.${version.minor}.${version.patch}` : version);
                model.packageJson.devDependencies[value] = newVersion;
            });
        }
        if (model.packageJson.scope)
            delete model.packageJson.scope;
        return model;
    }
    model() {
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
    withFile(file) {
        this._model.files.push(file);
        return this;
    }
    withPath(path) {
        this._path = path;
        return this;
    }
    withMain(main) {
        this._model.main = main;
        return this;
    }
    withGitBin(bin) {
        this._gitBin = bin;
        return this;
    }
    withNpmBin(bin) {
        this._npmBin = bin;
        return this;
    }
    withScope(scope) {
        this._model.scope = scope;
        return this;
    }
    withName(name) {
        this._model.name = name;
        return this;
    }
    withDescription(desc) {
        this._model.description = desc;
        return this;
    }
    withVersion(version) {
        this._model.version = version;
        return this;
    }
    withScript(name, value) {
        if (!this._model.scripts) {
            this._model.scripts = {};
        }
        this._model.scripts[name] = value;
        return this;
    }
    withKeyword(key) {
        if (!this._model.keywords)
            this._model.keywords = new Array();
        this._model.keywords.push(key);
        return this;
    }
    withKeywords(keys) {
        if (!this._model.keywords)
            this._model.keywords = new Array();
        this._model.keywords = this._model.keywords.concat(keys);
        return this;
    }
    withAuthor(name, email) {
        this._model.author = `${name} <${email}>`;
        return this;
    }
    withLicence(name) {
        this._model.license = name;
        return this;
    }
    withDependency(name, version) {
        this._model['dependencies'][name] = version;
        return this;
    }
    withDevDependency(name, version) {
        this._model['devDependencies'][name] = version;
        return this;
    }
    withBranch(name) {
        this._branch = name;
        return this;
    }
}
exports.NpmCreateCreateArgsBuilder = NpmCreateCreateArgsBuilder;
//# sourceMappingURL=NpmCreateCreateArgsBuilder.js.map