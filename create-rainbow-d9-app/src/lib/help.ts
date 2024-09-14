import chalk from 'chalk';

export const help = () => {
	console.log(`${chalk.green('Usage: ')} npx create-rainbow-d9-app my-app [options]`);
	console.log(`${chalk.green('       ')} yarn create rainbow-d9-app my-app [options]`);
	console.log();
	console.log(`${chalk.green('Options:')}`);
	console.log(`  --help                                                      Show help`);
	console.log(`  --fix-name                                                  Use the given package name without asking for confirmation`);
	console.log(`  --default-desc                                              Use the default description without asking for confirmation`);
	console.log(`  --package-manager=<${chalk.yellow('yarn')}/${chalk.yellow('npm')}/${chalk.yellow('pnpm')}>                           Use the specified package manager`);
	console.log(`  --install                                                   Install dependencies after creating the application`);
	console.log(`  --ignore-install                                            Do not install dependencies after creating the application`);
	console.log();
};