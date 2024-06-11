import {IntlLabel} from '@rainbow-d9/n2';
import React, {ErrorInfo, ReactNode} from 'react';
import {ParseError} from './widgets';

export interface ErrorBoundaryProps {
	content?: string;
	children: ReactNode;
}

export interface ErrorBoundaryState {
	content?: string;
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {content: props.content, hasError: false};
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		console.log(error);
		return {hasError: true, error};
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		// logErrorToMyService(error, info.componentStack);
	}

	componentDidUpdate(_prevProps: Readonly<ErrorBoundaryProps>, prevState: Readonly<ErrorBoundaryState>) {
		if (prevState.content !== this.props.content) {
			// content changed, try again
			this.setState({content: this.props.content, hasError: false});
		}
	}

	render() {
		if (this.state.hasError) {
			// console.error(this.state.error?.stack);
			// You can render any custom fallback UI
			return <ParseError>
				<IntlLabel keys={['playground', 'error', 'unknown']} value="Something went wrong."/>
			</ParseError>;
		}

		return this.props.children;
	}
}