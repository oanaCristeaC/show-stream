export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutID: number | undefined;

    return function(...args: Parameters<T>): void {
        if (timeoutID !== undefined) {
            clearTimeout(timeoutID);
        }
        timeoutID = window.setTimeout(() => fn(...args), delay);
    };
}
