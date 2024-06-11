import {ShowRepository} from "@/api/repository/show-repository";
import type {ShowInfo, ShowModel, ShowsByGenreModel} from "@/models/show-model";
import {insertInSortedOrder} from "@/utilities/show-info";

export class ShowService {
    private showRepository: ShowRepository;

    constructor() {
        this.showRepository = new ShowRepository();
    }


    public async getShowInfoPerPage(page: number): Promise<ShowInfo[] | null> {
        const response = await this.showRepository.fetchShows(page);

        if (response !== null) {
            return response.map((show: ShowModel) => {
                return {
                    id: show.id,
                    name: show.name,
                    type: show.type,
                    genres: show.genres,
                    image: show.image,
                    rating: show.rating
                };
            });
        }

        return null;
    }

    /**
     * Get all data and keep it in memory and use it immediately since is faster
     */
    public async getRecursivelyShowsInfo() {
        const a = performance.now();
        console.log('START...');

        let page = 0;
        let showsInfo: ShowInfo[] = [];
        let response = await this.getShowInfoPerPage(page);

        if (response === null) {
            return null;
        }

        // todo: process here the grouping by genre
        while (response !== null && page < 10) {
            showsInfo = showsInfo.concat(response);
            page++;
            response = await this.getShowInfoPerPage(page);
        }


        // end of test
        const b = performance.now();
        console.log('FINISH in ' + (b - a) + ' ms.');

        return showsInfo;
    }


    /**
     * Initially use sorted data from memory
     */
    public async getShowsInfoFromMemoryGroupedByGenre(): Promise<ShowsByGenreModel| null> {
          const showsInfo = await this.getRecursivelyShowsInfo();

            if (showsInfo === null) {
                return null;
            }

            const showsByGenre: { [genres: string]: ShowInfo[] } = {};

            showsInfo.forEach((show: ShowInfo) => {
                show.genres.forEach((genre: string) => {
                    if (!showsByGenre[genre]) {
                        showsByGenre[genre] = [];
                    }
                    insertInSortedOrder(showsByGenre[genre], show);
                    // showsByGenre[genre].push(show);
                });
            });

            return showsByGenre;

    }

    // todo: optimise this function
    public async fetchRecursivelyAndProcess() {
        const isDbDataInsertedToday = await this.showRepository.isDbDataInsertedToday();

        // Do nothing if data is inserted today
        if (isDbDataInsertedToday) {
            return;
        }

        let page = 0;
        let response = await this.setShowsInfo(page);

        // to test the performance
        const a = performance.now();
        console.log('start...');

        // make api calls until there are no more pages
        while (response === true) {
            page++;
            response = await this.setShowsInfo(page);
        }

        // end of test
        const b = performance.now();
        console.log('Finished in ' + (b - a) + ' ms.');
    }

    public async setShowsInfo(page: number) {
        const response = await this.showRepository.fetchShows(page);

        if (response === null) {
            return false
        }

        const showInfoPage = response.map((show: ShowModel) => {
            return {
                id: show.id,
                name: show.name,
                type: show.type,
                genres: show.genres,
                rating: show.rating,
                image: show.image,
                createdAt: new Date()
            };
        });

        await this.showRepository.addShowInfoOnBulk(showInfoPage);

        return true

    }


    // todo: consider storing data from memory to indexedDB
    // but it might lost if the user refreshes the page
    // or closes the browser


    public async getShowsInfoFromDb() {
        return await this.showRepository.getShowsGroupedByGenre();
    }

}