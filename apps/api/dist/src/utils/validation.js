export function isNonEmptyString(value) {
    return (typeof value === "string" &&
        value.trim().length > 0);
}
export function isValidEmail(value) {
    if (typeof value !== "string") {
        return false;
    }
    const email = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isValidUuid(value) {
    if (typeof value !== "string") {
        return false;
    }
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
//# sourceMappingURL=validation.js.map