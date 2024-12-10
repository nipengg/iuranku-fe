export function truncateString(str: string, maxLength: number, ending = "...") {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + ending;
    }
    return str;
}
