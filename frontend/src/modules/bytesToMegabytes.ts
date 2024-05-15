/**
 * Converts bytes to megabytes.
 * 
 * @param bytes - The number of bytes to convert.
 * @returns The equivalent number of megabytes.
 */
export function bytesToMegabytes(bytes : number) : number {
    const megabytes = bytes / 1048576;
    return parseFloat(megabytes.toFixed(2));
}