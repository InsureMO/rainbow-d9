import {StandaloneRoot} from '@rainbow-d9/n1';
import {$d9n2, GlobalRoot} from '@rainbow-d9/n2';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

$d9n2.intl.labels['en-US'] = {
	...($d9n2.intl.labels['en-US'] ?? {}),
	o23: {
		variable: {
			enabled: 'Enabled'
		}
	}
};
DemoData.yaml = `code: ApiTest
type: pipeline
enabled: false
route: /api/test
method: get
headers: true
path-params:
  - id
  - name
expose-headers:
  x-a: aaa
  x-b: bbb

steps:
  - name: Do validation
    use: sets
    steps:
      - name: Validate name
        use: sets
        steps:
          - name: Get first name
            use: get-property
            property: firstName
            merge: firstName
          - name: Validate first name
            from-input: return $factor.firstName;
            use: snippet
          - name: Validate last name
            use: snippet
      - name: Validate age
        use: snippet
      - name: Validate country
        use: snippet
      - name: Validate address
        use: sets
        steps:
          - name: "Validate address #1"
            use: snippet
      - name: Validate job
        use: sets
        steps:
          - name: Validate job occupation
            use: snippet
    error-handles:
      catchable:
        - name: Catch catchable error
          use: sets
          steps:
            - name: "Catch catchable #1"
              use: snippet
      uncatchable:
        - name: Catch uncatchable error
          use: snippet
      exposed:
        - name: Catch exposed error
          use: snippet
      any:
        - name: Catch any error
          use: snippet
    to-output: $result
  - name: Clean Data
    use: sets
    steps:
      - name: Remove temporary
        use: del-properties
        property: $temp, $temporary
      - name: Remove cache
        use: del-property
        property: $cache
  - name: Create a sequence
    use: snowflake
    merge: snowflakeId
  - name: Log data
    use: async-sets
    steps:
      - name: Write log
        use: snippet
        snippet: $.$logger.log('Data received.', $factor);
      - name: Write validation results to log
        use: each
        from-input: return $factor.results;
        item-name: result
        steps:
          - name: Write validation result to log
            use: snippet
            snippet: $.$logger.log('Invalid thing detected.', $factor.result);
  - name: Log data
    use: parallel
    steps:
      - name: Write log to file
        use: snippet
        snippet: $.$logger.log('Data received.', $factor);
      - name: Write log to remote
        use: snippet
        snippet: $.$logger.log('Data received.', $factor);
`;
export const O23Playground = () => {
	const def = useDemoMarkdown(DemoContent);

	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalRoot>;
};

export const O23PlaygroundData = DemoData;
export const O23PlaygroundMarkdown = DemoContent;
