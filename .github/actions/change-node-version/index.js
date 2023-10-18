const core = require('@actions/core');
const fs = require('fs');

try {
	const moduleName = core.getInput('module-name');
	const version = core.getInput('target-version');
	const packageFile = `./${moduleName}/package.json`;
	const content = fs.readFileSync(packageFile, 'utf8');
	const packageJson = JSON.parse(content);
	core.notice(`Version of module[${moduleName}] updated to ${version} from ${packageJson.version}.`);
	packageJson.version = version;
	['dependencies', 'devDependencies'].forEach(key => {
		if (packageJson[key] != null) {
			Object.keys(packageJson[key]).forEach(name => {
				if (name.startsWith('@rainbow-d9/')) {
					packageJson[key][name] = version;
				}
			});
		}
	});
	const newContent = JSON.stringify(packageJson, null, '\t');
	fs.writeFileSync(packageFile, newContent, 'utf8');
} catch (error) {
	core.setFailed(error.message);
}
