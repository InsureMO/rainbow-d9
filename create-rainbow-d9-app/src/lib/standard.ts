import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import prompts, {PromptObject} from 'prompts';
import validate from 'validate-npm-package-name';

export interface StdOptions {
	name: string;
	description?: string;
}

const printValidationResults = (results: Array<string>) => {
	if (typeof results !== 'undefined') {
		results.forEach((error) => console.error(chalk.red(`  - ${error}`)));
	}
};

export const validateName = (name: string) => {
	if (name == null || name.trim().length === 0) {
		console.error(chalk.red('✖ Could not create a project with empty or blank name.'));
		process.exit(1);
	} else {
		const validationResult = validate(name);

		if (validationResult.validForNewPackages === false) {
			console.error(chalk.red(`✖ Could not create a project called ${chalk.red.underline(`"${name}"`)} because of npm naming restrictions:`));
			printValidationResults(validationResult.errors);
			printValidationResults(validationResult.warnings);

			process.exit(1);
		}
	}
};

const getPackageDirectory = (packageName: string) => {
	return path.resolve(packageName.startsWith('@') ? packageName.split('/')[1] : packageName);
};

const isDirectoryEmpty = (directory: string) => {
	const files = fs.readdirSync(directory);
	return files == null || files.length === 0 || (files.length === 1 && files[0] === '.DS_Store');
};

export const createPackageDirectory = (packageName: string) => {
	const dir = getPackageDirectory(packageName);
	if (fs.existsSync(dir)) {
		if (!isDirectoryEmpty(dir)) {
			const relativeDir = path.relative(process.cwd(), dir);
			console.error(chalk.red(`✖ The directory "${relativeDir}" already exists and is not empty, so it is unable to create the application.`));
			process.exit(1);
		}
	} else {
		// noinspection JSCheckFunctionSignatures
		fs.mkdirpSync(dir);
		// noinspection JSCheckFunctionSignatures
		fs.mkdirpSync(path.resolve(dir, 'src'));
	}
	return dir;
};

const isNameFixed = (): boolean => {
	return process.argv.slice(3).includes('--fix-name');
};
const isDescDefault = (): boolean => {
	return process.argv.slice(3).includes('--default-desc');
};

export const getStandardOption = async (packageName: string): Promise<StdOptions> => {
	const nameFixed = isNameFixed();
	const useDefaultDescription = isDescDefault();
	if (nameFixed && useDefaultDescription) {
		return {
			name: packageName,
			description: 'An application created based on Rainbow-D9, powered by InsureMO.'
		};
	}
	const result = await prompts([
		nameFixed ? null : {
			name: 'name',
			type: 'text',
			message: 'Package name:',
			initial: packageName
		},
		useDefaultDescription ? null : {
			name: 'description',
			type: 'text',
			message: 'Package description:',
			initial: 'An application created based on Rainbow-D9, powered by InsureMO.'
		}
	].filter(x => x != null) as Array<PromptObject>);
	return {
		name: packageName,
		description: 'An application created based on Rainbow-D9, powered by InsureMO.',
		...result
	};
};

export const createPackageJson = (options: StdOptions, directory: string) => {
	const {name, description} = options;
	fs.copySync(path.resolve(__dirname, './templates'), directory);

	// create README.md
	fs.writeFileSync(path.resolve(directory, 'README.md'), `# ${name}\n\n${description}\n`);
	const packageFile = path.resolve(directory, 'package.json');
	// parse and modify package.json
	const json = JSON.parse(fs.readFileSync(packageFile).toString());
	json.name = name;
	json.version = '0.1.0';
	json.description = description ?? '';
	json.license = 'UNLICENSED';
	delete json.jest;
	// noinspection JSUnresolvedReference
	delete json.repository;
	// noinspection JSUnresolvedReference
	delete json.bugs;
	delete json.author;
	return json;
};
