import { v4 as uuidv4 } from 'uuid';

function generateUuid(): string {
    return uuidv4();
}

function removeNullValues<T>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null)
    ) as Partial<T>;
}

// Deep check.
function checkAllPropertiesNotNull(obj: object): boolean {
    return Object.values(obj).every(value => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return checkAllPropertiesNotNull(value);
        }
        return value != null;
    });
}

export {
    generateUuid,
    removeNullValues,
    checkAllPropertiesNotNull,
};