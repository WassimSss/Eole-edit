export const formatSecondsToMinutes = (seconds: number): string => {
    if (seconds > 60) {
        const minutes = Math.floor(seconds / 60);
        console.log("minutes : ", minutes)
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${Number(remainingSeconds)}`;
    }
    return seconds.toFixed(2).toString();
};

