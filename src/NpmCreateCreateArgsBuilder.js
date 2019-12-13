"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NpmCreateCreateArgsBuilder {
    constructor() {
        this.model = {};
    }
    withScope(scope) {
        this.model.scope = scope;
        return this;
    }
    withName(name) {
        this.model.name = name;
        return this;
    }
    withDescription(desc) {
        this.model.description = desc;
        return this;
    }
    withVersion(version) {
        this.model.version = version;
        return this;
    }
    withScript(name, value) {
        if (!this.model.scripts) {
            this.model.scripts = new Map();
        }
        this.model.scripts[name] = value;
        return this;
    }
    withKeyword(key) {
        if (!this.model.keywords)
            this.model.keywords = new Array();
        this.model.keywords.push(key);
        return this;
    }
    withKeywords(keys) {
        if (!this.model.keywords)
            this.model.keywords = new Array();
        this.model.keywords = this.model.keywords.concat(keys);
        return this;
    }
    withAuthor(name, email) {
        this.model.author = `${name} <${email}>`;
        return this;
    }
    withLicence(name) {
        this.model.license = name;
        return this;
    }
    withDependency(name, version) {
        this.model['dependencies'][name] = version;
        return this;
    }
    withDevDependency(name, version) {
        this.model['devDependencies'][name] = version;
        return this;
    }
}
exports.NpmCreateCreateArgsBuilder = NpmCreateCreateArgsBuilder;
//# sourceMappingURL=NpmCreateCreateArgsBuilder.js.map