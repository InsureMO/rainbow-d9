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

export const O23Playground = () => {
	const def = useDemoMarkdown(DemoContent);

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
          - name: Validate first name
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
    to-response: $result
`;

	return <GlobalRoot>
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalRoot>;
};

export const O23PlaygroundData = DemoData;
export const O23PlaygroundMarkdown = DemoContent;
