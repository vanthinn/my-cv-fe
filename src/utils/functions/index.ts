import { urlsNoTokenRequired } from "../../common/constants";

export function isTokenRequired(url: string): boolean {
    return !urlsNoTokenRequired.includes(url);
}