import {VUtils} from './value-utils';

export type LoggerLevel = 'debug' | 'trace' | 'log' | 'info' | 'warn' | 'error';
export type LoggerName = `${string}.${LoggerLevel}`;
export type LoggerEnablement = Record<LoggerName, true>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoggerPrinter = (...data: Array<any>) => void;

export class EnhancedLogger {
	private _logger: Console;
	private _enabledLevels: Array<LoggerLevel>;
	private _enablement: LoggerEnablement = {};
	private _printers: Partial<Record<LoggerLevel, LoggerPrinter>> = {};
	constructor(private readonly to: Console) {
		this._logger = to;
		this._enabledLevels = ['warn', 'error'];
	}

	get logger(): Console {
		return this._logger;
	}

	public enableLevel(level: LoggerLevel) {
		if (this._enabledLevels.includes(level)) {
			// already enabled, do nothing
		} else {
			const levels: Array<LoggerLevel> = ['debug', 'trace', 'log', 'info', 'warn', 'error'];
			const foundIndex = levels.indexOf(level);
			this._enabledLevels = levels.filter((level, index) => {
				return index >= foundIndex;
			});
		}
	}

	public disableLevel(level: LoggerLevel) {
		if (!this._enabledLevels.includes(level)) {
			// already disabled, do nothing
		} else {
			const levels: Array<LoggerLevel> = ['debug', 'trace', 'log', 'info', 'warn', 'error'];
			const foundIndex = levels.indexOf(level);
			this._enabledLevels = levels.filter((level, index) => {
				return index > foundIndex;
			});
		}
	}

	public enable(name: LoggerName) {
		this._enablement[name] = true;
	}

	public disable(name: LoggerName) {
		delete this._enablement[name];
	}

	public isEnabled(name: LoggerName): boolean {
		return this._enablement[name] === true
			|| (this._enabledLevels[name] !== false
				&& this._enabledLevels.some(level => name.endsWith(`.${level}`)));
	}

	public takeover(to: Console): void {
		this._logger = to ?? console;
	}

	public restore(): void {
		this._logger = console;
	}

	private createPrinter(level: LoggerLevel): LoggerPrinter {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (...data: Array<any>) => {
			const date = new Date();
			if (data == null || data.length <= 1) {
				// always print
				this.logger[level](
					`%c[UNKNOWN LOCATION] %c[${level.toUpperCase()}] %c[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
					'color: #871094', 'color: #0033B3', 'color: #9E880D',
					...data);
			} else {
				const key = data.pop();
				if (this.isEnabled(`${key}.${level}` as LoggerName)) {
					this.logger[level](
						`%c[${key}] %c[${level.toUpperCase()}] %c[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
						'color: #871094', 'color: #0033B3', 'color: #9E880D',
						...data);
				}
			}
		};
	}

	public print(level: LoggerLevel): LoggerPrinter {
		if (this._printers[level] == null) {
			this._printers[level] = this.createPrinter(level);
		}
		return this._printers[level];
	}
}

export type Logger = Console & EnhancedLogger;
export const createLogger = () => {
	return new Proxy(new EnhancedLogger(console) as Logger, {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		get(target: Logger, p: string): any {
			if (p === 'takeover') {
				return target.takeover;
			} else if (p === 'restore') {
				return target.restore;
			} else if (['debug', 'trace', 'log', 'info', 'warn', 'error'].includes(p)) {
				return target.print(p as LoggerLevel);
			} else {
				return target[p] ?? VUtils.noop;
			}
		}
	});
};

export const N1Logger: Logger = createLogger();
