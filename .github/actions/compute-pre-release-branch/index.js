const core = require('@actions/core');

try {
	const version = core.getInput('version');
	const lane = core.getInput('lane') || 'ga';
	const [major, minor, patch] = version.split('.');
	core.exportVariable('PRE_RELEASE_BRANCH_NAME', `pre-release/${lane}/v${major}.${minor}`);
} catch (error) {
	core.setFailed(error.message);
}