import _ from "lodash";


export class LogLevel {
    static readonly hasConsole = !_.isEqual(typeof console, "undefined");
    
    static readonly None = new LogLevel(null);
    static readonly DEBUG = new LogLevel("DEBUG");
    static readonly INFO = new LogLevel("INFO");
    static readonly WARN = new LogLevel("WARN");
    static readonly FATAL = new LogLevel("FATAL");

    private static readonly all = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.FATAL];
    private static maxLenOfNames = LogLevel.all.map((l) => l.name.length).max();
    private static _isDebel: boolean;
    private static _default: Promise<LogLevel>;

    static async isDevel(): Promise<boolean> {
        if (_.isNil(Logger._isDebel)) {
            LogLevel._isDebel = LogLevel.hasConsole;
        }
        return LogLevel._isDebel;
    }

    static async getDefault(): Promise<LogLevel> {
        if (_.isNil(LogLevel._default)) {
            async function obtain() {
                return await LogLevel.isDevel() ? LogLevel.DEBUG : LogLevel.INFO;
            }
            LogLevel._default = obtain();
        }
        return await LogLevel._default;
    }

    private constructor(private _name: string | null) {
    }

    toString(): string {
        return this.name;
    }

    get name(): string {
        return this._name || "None";
    }

    get isNone(): boolean {
        return _.isNil(this._name);
    }

    get mark(): string {
        if (this.isNone) {
            return _.padStart("", LogLevel.maxLenOfNames, "-");
        }
        return _.padStart(this._name, LogLevel.maxLenOfNames);
    }

    get index(): number {
        return LogLevel.all.indexOf(this);
    }
}
