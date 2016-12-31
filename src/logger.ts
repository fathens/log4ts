import _ from "lodash";

import { dateString } from './date_format'
import { LogLevel } from "./loglevel"

declare var console; 

export interface LogWriter {
    log(msg: String);
}

export type LogMsg = string | (() => string);

export class Logger {
    static concreateWriter: LogWriter;
    
    static async output(text: string) {
        if (!_.isNil(Logger.concreateWriter)) {
            Logger.concreateWriter.log(text);
        }
        if (LogLevel.hasConsole) {
            console.log(text);
        }
    }

    constructor(private tag: string) {
    }

    private _level: LogLevel;
    get level() {
        return this._level;
    }
    set level(v: LogLevel) {
        this.output(LogLevel.None, () => `Set log level: ${v}`);
        this._level = v;
        this._limit = null;
    }

    private _limit: Promise<number>;
    private async getLimit(): Promise<number> {
        if (_.isNil(this._level)) {
            this._level = await LogLevel.getDefault();
            this.output(LogLevel.None, () => `Using default log level: ${this._level}`);
        }
        return this.level.index;
    }
    private get limit(): Promise<number> {
        if (_.isNil(this._limit)) {
            this._limit = this.getLimit();
        }
        return this._limit;
    }

    private async output(level: LogLevel, msg: LogMsg) {
        function getMsg(): string {
            try {
                function isString(x: any): x is string {
                    return typeof x === "string";
                }
                return isString(msg) ? msg : msg();
            } catch (ex) {
                return `Failed to get msg: ${ex}`;
            }
        }
        if (level.isNone || await this.limit <= level.index) {
            Logger.output(`${dateString()}: ${level.mark}: ${this.tag}: ${getMsg()}`);
        }
    }

    public debug(msg: LogMsg) {
        this.output(LogLevel.DEBUG, msg);
    }

    public info(msg: LogMsg) {
        this.output(LogLevel.INFO, msg);
    }

    public warn(msg: LogMsg) {
        this.output(LogLevel.WARN, msg);
    }

    public fatal(msg: LogMsg) {
        this.output(LogLevel.FATAL, msg);
    }
}
