import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';

export const RestApiVariablePortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-rest-api-variable-port'})`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;
`;

export interface RestApiVariableWidgetProps {
	label: string;
}

export const RestApiVariablePortWidget = (props: RestApiVariableWidgetProps) => {
	const {label} = props;

	return <RestApiVariablePortContainer>
		<span><IntlLabel keys={['o23', 'rest-api', 'variable', label]} value={label}/></span>
	</RestApiVariablePortContainer>;
};
