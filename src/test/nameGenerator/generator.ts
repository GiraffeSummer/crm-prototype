import adjectives from "./adjectives.js";
import names from "./names.js";

export default function (): string {
    const ad = adjectives.random();
    return `${ad[0].toLocaleUpperCase() + ad.slice(1)} ${names.random()}`;
}