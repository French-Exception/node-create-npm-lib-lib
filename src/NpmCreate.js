"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmCreate = void 0;
const path = require("path");
const fs = require("fs-extra");
const promisify_child_process_1 = require("promisify-child-process");
const mkdirp = require("mkdirp-promise");
const Util_1 = require("./Util");
const deepmerge = require("deepmerge");
class NpmCreate {
    constructor(logger) {
        this._logger = logger;
    }
    async create(args) {
        this.args = args;
        this._logger.trace('NpmCreate.create: %s', JSON.stringify(this.args));
        await this.bench('directory.create', async () => {
            return this.directoryCreate();
        });
        await this.bench('npm.init', async () => {
            return this.npmInit();
        });
        await this.bench('npm.packagejson.update', async () => {
            return this.npmUpdatePackageJson();
        });
        await this.bench('npm.install.dev', async () => {
            return this.npmDependenciesInstall();
        });
        await this.bench('git.init', async () => {
            return this.gitInit();
        });
        await this.bench('git.branch.checkout', async () => {
            return this.gitCheckoutBranch();
        });
        await this.bench('git.flow.init', async () => {
            return this.gitFlowInit();
        });
        await this.bench('npm.install.dependencies', async () => {
            return this.npmDependenciesInstall(true);
        });
    }
    async bench(goal, fn) {
        this._logger.info('%s start', goal);
        const start = new Date();
        try {
            const result = await fn();
            const end = new Date();
            const diffSeconds = (end - start) / 1000;
            this._logger.info('%s end, took: %s seconds', goal, diffSeconds);
            return result;
        }
        catch (e) {
            this._logger.error(e);
        }
        return this;
    }
    async npmUpdatePackageJson() {
        this._logger.trace('NpmCreate.npmUpdatePackageJson');
        const jsonFilepath = path.join(this.args.path, 'package.json');
        let jsonContent = JSON.parse(await fs.readFile(jsonFilepath));
        const name = [];
        if (this.args.scope)
            name.push('@' + this.args.scope);
        name.push(this.args.name);
        jsonContent.name = name.join('/');
        jsonContent.version = Util_1.semverToString(this.args.version);
        if (this.args.packageJson) {
            jsonContent = deepmerge(jsonContent, this.args.packageJson, { clone: true });
        }
        await fs.writeFile(jsonFilepath, JSON.stringify(jsonContent, null, 2));
    }
    async npmInit() {
        this._logger.trace('NpmCreate.npmInit: path %s', this.args.path);
        await promisify_child_process_1.spawn(this.args.npmBin, ['init', '-f'], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }
    async npmDependenciesInstall(dev) {
        this._logger.trace('NpmCreate.npmDependenciesInstall: dev ? %s', (dev ? 'true' : 'false'));
        await promisify_child_process_1.spawn(this.args.npmBin, ['install'].concat(dev ? ['--only', 'dev'] : []), {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }
    async gitCheckoutBranch() {
        this._logger.trace('NpmCreate.gitCheckout: %s', this.args.path);
        await promisify_child_process_1.spawn(this.args.gitBin, ['checkout', '-b', this.args.branch], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }
    async gitFlowInit() {
        this._logger.trace('NpmCreate.gitFlowInit: %s', this.args.path);
        await promisify_child_process_1.spawn(this.args.gitBin, ['flow', 'init', '-d'], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }
    async gitInit() {
        this._logger.trace('NpmCreate.gitInit: %s', this.args.path);
        await promisify_child_process_1.spawn(this.args.gitBin, ['init'], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }
    async directoryCreate() {
        this._logger.trace('NpmCreate.directoryCreate: %s', this.args.path);
        await mkdirp(this.args.path);
    }
}
exports.NpmCreate = NpmCreate;
//# sourceMappingURL=NpmCreate.js.map