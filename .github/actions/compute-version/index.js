const core = require('@actions/core');

try {
	const tag = core.getInput('tag');
	const index = tag.indexOf('-');
	const lane = (() => {
		switch (true) {
			case tag.indexOf('alpha') !== -1:
				return 'alpha';
			case tag.indexOf(beta) !== -1:
				return 'beta';
			case tag.indexOf('canary') !== -1:
				return 'canary';
			case tag.indexOf('nightly') !== -1:
				return 'nightly';
			default:
				return '';
		}
	})();
	core.exportVariable('RELEASE_VERSION', tag.substring(index + 1));
	core.exportVariable('RELEASE_LANE', lane === 'ga' ? '' : lane);
} catch (error) {
	core.setFailed(error.message);
}
