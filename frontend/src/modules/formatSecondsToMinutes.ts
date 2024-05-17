/**
 * Formats the given number of seconds into a string representation of minutes and seconds.
 * 
 * @param seconds - The number of seconds to format.
 * @returns A string representation of minutes and seconds.
 */
export const formatSecondsToMinutes = (seconds: number): string => {
    // if (seconds > 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${(String(remainingSeconds).padStart(2, '0'))}`;
    // }
    // return seconds.toFixed(2).toString();
};

