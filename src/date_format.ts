import _ from "lodash";

export function dateString(now?: Date): string {
    if (!now) now = new Date();
    const pad = (d: number) => (v: number) => _.padStart(v.toString(), d, "0");
    const date = [
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ].map(pad(2)).join("-");
    const time = [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ].map(pad(2)).join(":");
    return `${date} ${time}.${pad(3)(now.getMilliseconds())}`;
}
