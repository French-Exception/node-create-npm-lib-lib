import {NpmCreateCreateArgsInterface} from "./NpmCreateCreateArgsInterface";
import * as log4js from "@log4js-node/log4js-api"
import * as path from "path";
import * as fs from "fs-extra"
import {spawn} from "promisify-child-process";
import * as mkdirp from "mkdirp-promise";
import {semverToString} from "./Util";
import * as deepmerge from "deepmerge";
import * as NpmSemVer from "./NpmSemVer"

export class NpmCreate {
    private _logger: log4js.Logger;
    private args: NpmCreateCreateArgsInterface;

    constructor(logger: log4js.Logger) {
        this._logger = logger;
    }

    public async create(args: NpmCreateCreateArgsInterface) {
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

    protected async bench(goal, fn: () => Promise<any>): Promise<NpmCreate> {
        this._logger.info('%s start', goal);
        const start = new Date();
        try {
            const result = await fn();
            const end = new Date();
            const diffSeconds = (<any>end - <any>start) / 1000;
            this._logger.info('%s end, took: %s seconds', goal, diffSeconds);
            return result;
        } catch (e) {
            this._logger.error(e);
        }
        return this;
    }

    protected async npmUpdatePackageJson() {
        this._logger.trace('NpmCreate.npmUpdatePackageJson');
        const jsonFilepath = path.join(this.args.path, 'package.json');
        let jsonContent = JSON.parse(await fs.readFile(jsonFilepath));

        const name = [];
        if (this.args.scope)
            name.push('@' + this.args.scope);

        name.push(this.args.name);

        jsonContent.name = name.join('/');
        jsonContent.version = semverToString(<NpmSemVer.NpmSemVer>this.args.version);

        if (this.args.packageJson) {
            jsonContent = deepmerge(jsonContent, this.args.packageJson, {clone: true})
        }

        await fs.writeFile(jsonFilepath, JSON.stringify(jsonContent, null, 2));
    }

    protected async npmInit() {
        this._logger.trace('NpmCreate.npmInit: path %s', this.args.path);
        await spawn(this.args.npmBin, ['init', '-f'], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }

    protected async npmDependenciesInstall(dev?: boolean) {
        this._logger.trace('NpmCreate.npmDependenciesInstall: dev ? %s', (dev ? 'true' : 'false'));
        await spawn(this.args.npmBin, ['install'].concat(dev ? ['--only', 'dev'] : []), {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }

    protected async gitCheckoutBranch() {
        this._logger.trace('NpmCreate.gitCheckout: %s', this.args.path);
        await spawn(this.args.gitBin, ['checkout', '-b', this.args.branch], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }

    protected async gitFlowInit() {
        this._logger.trace('NpmCreate.gitFlowInit: %s', this.args.path);
        await spawn(this.args.gitBin, ['flow', 'init', '-d'], {
            cwd: this.args.path,
            stdio: 'inherit'
        });
    }

    protected async gitInit() {
        this._logger.trace('NpmCreate.gitInit: %s', this.args.path);
        await spawn(this.args.gitBin, ['init'], {
            cwd: this.args.path,
            stdio: 'inherit'
        })
    }

    protected async directoryCreate() {
        this._logger.trace('NpmCreate.directoryCreate: %s', this.args.path);
        await mkdirp(this.args.path);
    }
}



