const core = require('@actions/core');

try {
	const version = core.getInput('version');
	const lane = core.getInput('lane') || 'ga';
	const [major, minor, patch] = version.split('.');
	core.exportVariable('RELEASE_BRANCH_NAME', `release/${lane}/${major}.${minor}`);
} catch (error) {
	core.setFailed(error.message);
}
