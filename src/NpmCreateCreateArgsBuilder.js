"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NpmCreateCreateArgsBuilder {
    constructor() {
        this._model = {};
        this._model.scripts = {};
        this._model.devDependencies = {};
        this._model.dependencies = {};
        this._model.directories = {};
        this._model.scripts = {};
    }
    model() {
        return this._model;
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
}
exports.NpmCreateCreateArgsBuilder = NpmCreateCreateArgsBuilder;
//# sourceMappingURL=NpmCreateCreateArgsBuilder.js.map