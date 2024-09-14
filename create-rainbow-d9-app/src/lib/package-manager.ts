import chalk from 'chalk';
import {execSync} from 'child_process';
import prompts from 'prompts';
import {PackageManager} from './types';

export interface PackageManagerOptions {
	packageManager: PackageManager;
}

const checkNodeVersion = () => {
	const version = process.versions.node;
	const [major, minor] = version.split('.').map(Number);
	if (major < 18 || (major === 18 && minor < 19)) {
		console.error(chalk.red(`✖ Node version must >= 18.19.0, current is ${version}, please upgrade your Node.js.`));
		process.exit(1);
	}
};

const checkNpmVersion = () => {
	const version = execSync('npm -v').toString().trim();
	const [major, minor] = version.split('.').map(Number);
	if (major < 10 || (major === 10 && minor < 2)) {
		console.error(chalk.red(`✖ Npm version must >= 10.2.0, current is ${version} please upgrade your npm.`));
		process.exit(1);
	}
};

export const checkVersions = () => {
	checkNodeVersion();
	checkNpmVersion();
};

const findPackageManger = (): PackageManager | undefined => {
	const [, packageManager] = process.argv.slice(3)
		.find(arg => arg.startsWith('--package-manager='))?.split('=') ?? ['--package-manager', ''];
	if (Object.values(PackageManager).includes(packageManager as PackageManager)) {
		return packageManager as PackageManager;
	} else {
		return (void 0);
	}
};

export const getPackageManagerOption = async (): Promise<PackageManagerOptions> => {
	const packageManager = findPackageManger();
	if (packageManager != null) {
		return {packageManager};
	}
	return prompts([
		{
			name: 'packageManager',
			type: 'select',
			choices: [PackageManager.YARN, PackageManager.NPM, PackageManager.PNPM].map((i) => ({title: i, value: i})),
			message: 'Please choose a package manager:'
		}
	]);
};

export const checkYarnVersion = () => {
	const version = execSync('yarn -v').toString().trim();
	const [major, minor, patch] = version.split('.').map(Number);
	if (major < 1 || (major === 1 && minor < 22) || (major === 1 && minor === 22 && patch < 10)) {
		console.error(chalk.red(`✖ Yarn version must >= 1.22.10, current is ${version} please upgrade your yarn.`));
		process.exit(1);
	}
};

const shouldInstall = (): boolean | undefined => {
	if (process.argv.slice(3).includes('--install')) {
		return true;
	} else if (process.argv.slice(3).includes('--ignore-install')) {
		return false;
	} else {
		return (void 0);
	}
};

export const install = async (manager: PackageManager, directory: string): Promise<void> => {
	let should = shouldInstall();
	if (should == null) {
		const answer = await prompts([
			{
				name: 'should',
				type: 'toggle',
				message: 'Do you want to install all the dependencies directly?',
				initial: false,
				active: 'yes',
				inactive: 'no'
			}
		]);
		should = answer.should;
	}
	if (should) {
		const cmd = manager === 'yarn' ? 'yarn' : (manager + ' i');
		execSync(cmd, {stdio: 'inherit', cwd: directory});
	}
};
