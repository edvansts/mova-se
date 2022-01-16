export function removeUndefinedFromObj(obj: any) {
    if (typeof obj !== 'object') {
        return null;
    }

    const newObj = obj;

    Object.keys(newObj).forEach(
        key => newObj[key] === undefined && delete newObj[key],
    );

    return newObj;
}
