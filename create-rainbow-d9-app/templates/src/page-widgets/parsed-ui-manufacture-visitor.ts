import {ContainerDef, NodeDef} from '@rainbow-d9/n1';
import {TabsDef} from '@rainbow-d9/n2';
import {asT} from '../utils';

const doVisitParsedUI = (node: NodeDef, ancestors: Array<NodeDef>, visit: (node: NodeDef, ancestors: Array<NodeDef>) => void) => {
	visit(node, ancestors);
	const {$wt = ''} = node;
	const [type] = $wt.split('.');
	switch (type) {
		// container
		case 'Page':
		case 'Section':
		case 'Box':
		case 'ButtonBar':
		// array
		case 'Table':
		case 'Ribs':
		case 'RibsView': {
			const {$nodes} = asT<ContainerDef>(node);
			($nodes ?? []).forEach(child => {
				const ancestorsOfNode = [node, ...ancestors];
				visit(child, ancestorsOfNode);
				doVisitParsedUI(child, ancestorsOfNode, visit);
			});
			break;
		}
		case 'Tabs': {
			const {contents} = asT<TabsDef>(node);
			(contents ?? []).forEach(child => {
				doVisitParsedUI(child, [node, ...ancestors], visit);
				// tab's child is body, all contents are in body
				doVisitParsedUI(asT<NodeDef>(child.body), [child, node, ...ancestors], visit);
			});
			break;
		}
		case 'Wizard': {
			const {contents} = asT<TabsDef>(node);
			(contents ?? []).forEach(child => {
				doVisitParsedUI(child, [node, ...ancestors], visit);
				// wizard step's child is body, all contents are in body
				doVisitParsedUI(asT<NodeDef>(child.body), [child, node, ...ancestors], visit);
			});
			break;
		}
		default:
			break;
	}
};
/**
 * manufacture parsed node def via given visit function
 */
export const visitParsedUI = (parsed: NodeDef, visit: (node: NodeDef, ancestors: Array<NodeDef>) => void) => {
	doVisitParsedUI(parsed, [], visit);
};