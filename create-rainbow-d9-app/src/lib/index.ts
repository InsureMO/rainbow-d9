import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import {help} from './help';
import {checkVersions, checkYarnVersion, getPackageManagerOption, install} from './package-manager';
import {createPackageDirectory, createPackageJson, getStandardOption, StdOptions, validateName} from './standard';
import {PackageManager} from './types';

const generatePackageJson = async (stdOptions: StdOptions, directory: string) => {
	const json = createPackageJson(stdOptions, directory);
	const packageFile = path.resolve(directory, 'package.json');
	fs.writeFileSync(packageFile, JSON.stringify(json, null, 2) + '\n');
};

const generateReadme = async (packageName: string, directory: string) => {
	const readmeFile = path.resolve(directory, 'README.md');
	let content = fs.readFileSync(readmeFile).toString();
	content = content.replace(/o23\/n99/, packageName);
	fs.writeFileSync(readmeFile, content);
};

const create = async () => {
	const packageName = process.argv[2];
	validateName(packageName);
	checkVersions();
	const {packageManager} = await getPackageManagerOption();
	if (packageManager === PackageManager.YARN) {
		checkYarnVersion();
	}

	const directory = createPackageDirectory(packageName);
	const stdOptions = await getStandardOption(packageName);
	await generatePackageJson(stdOptions, directory);
	await generateReadme(packageName, directory);
	// install dependencies
	await install(packageManager, directory);

	console.log();
	console.log(`${chalk.green('✔')} Success! Created ${chalk.cyan.underline(packageName)}.`);
	console.log();
};

export const createApp = async () => {
	if (process.argv.includes('--help')) {
		help();
	} else {
		await create();
	}

	process.exit(0);
};