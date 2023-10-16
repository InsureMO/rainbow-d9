import {NodePosition, VUtils} from '@rainbow-d9/n1';
import {Nullable, Undefinable} from '../../../utility-types';
import {D9PropertyNames} from './attribute-name-util';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export class PositionAttributeBuild implements AttributeValueBuild<NodePosition> {
	public accept(key: WidgetPropertyName) {
		return D9PropertyNames.POSITION === key;
	}

	public static buildPosition(value: Nullable<string>): NodePosition {
		value = (value ?? '').trim();
		if (value.includes(':')) {
			const keyMap = {
				'c': '$col', '$c': '$col', 'col': '$col', '$col': '$col', 'column': '$col', '$column': '$col',
				'cols': '$cols', '$cols': '$cols', 'columns': '$cols', '$columns': '$cols',
				'r': '$row', '$r': '$row', 'row': '$row', '$row': '$row',
				'rows': '$rows', '$rows': '$rows'
			};
			return value.split(',')
				.map(segment => segment.trim())
				.filter(segment => VUtils.isNotBlank(segment) && segment.includes(':'))
				.map(segment => segment.split(':'))
				.filter(([key, value]) => VUtils.isNotBlank(key) && VUtils.isNotBlank(value))
				.map(([key, value]) => {
					key = keyMap[key.trim()];
					if (key == null) {
						return null;
					}
					let v;
					if (value === 'all') {
						v = -1;
					} else {
						const tested = VUtils.isPositive(value);
						if (tested.test) {
							v = tested.value;
						} else {
							return null;
						}
					}
					return [key, v];
				})
				.filter(x => x != null)
				.reduce((pos, [key, value]) => {
					pos[key] = value;
					return pos;
				}, {} as NodePosition);
		}

		const values = value.split(',')
			.map(segment => segment.trim())
			.filter(segment => VUtils.isNotBlank(segment))
			.map(value => VUtils.isPositive(value))
			.filter(tested => tested.test)
			.map(transformed => (transformed as { test: true, value: number }).value);
		switch (values.length) {
			case 0:
				return (void 0);
			case 1:
				// cols
				return {$cols: values[0]};
			case 2:
				// row + col
				return {$row: values[0], $col: values[1], $cols: 3};
			case 3:
				// row + col + cols
				return {$row: values[0], $col: values[1], $cols: values[2]};
			default:
				// all set
				return {$row: values[0], $col: values[1], $cols: values[2], $rows: values[3]};
		}
	}

	public build(value: Undefinable<string>): Nullable<NodePosition> {
		if (VUtils.isBlank(value)) {
			return (void 0);
		} else {
			return PositionAttributeBuild.buildPosition(value);
		}
	}
}