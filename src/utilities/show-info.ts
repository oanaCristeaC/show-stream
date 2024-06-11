import type {ShowInfo} from "@/models/show-model";

export const insertInSortedOrder = (shows: ShowInfo[], show: ShowInfo): void => {
    let index: number = shows.length - 1;
    const showRating = show.rating?.average ?? 0;

    while (index >= 0) {
        const currentShowRating = shows[index]?.rating?.average ?? 0;
        if (currentShowRating >= showRating) {
            break;
        }
        index--;
    }

    shows.splice(index + 1, 0, show);
}