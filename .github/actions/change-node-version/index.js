const core = require('@actions/core');
const fs = require('fs');

try {
	const version = core.getInput('target-version');
	const packageFile = `./package.json`;
	const content = fs.readFileSync(packageFile, 'utf8');
	const packageJson = JSON.parse(content);
	core.notice(`Version updated to ${version} from ${packageJson.version}.`);
	packageJson.version = version;
	const newContent = JSON.stringify(packageJson, null, 2);
	fs.writeFileSync(packageFile, newContent, 'utf8');
} catch (error) {
	core.setFailed(error.message);
}
