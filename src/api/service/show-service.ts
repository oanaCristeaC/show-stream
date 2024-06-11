import {ShowRepository} from "@/api/repository/show-repository";
import type {ShowInfo, ShowModel} from "@/models/show-model";
import { db } from "@/database/indexDB"

export class ShowService {
    private showRepository: ShowRepository;

    constructor() {
        this.showRepository = new ShowRepository();

    }

    // todo: optimise this function
    public async fetchRecursivelyAndProcess() {
        let page = 0;
        let response = await this.setShowsInfo(page);

        //  to test the performance
        const a = performance.now();
        console.log('start...');

        // make api calls until there are no more pages
        while (response === true) {
            page++;
            response = await this.setShowsInfo(page);
        }

        // end of test
        await this.showRepository.checkAndFetchDataIfNeeded();
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
                createdAt: new Date()
            };
        });

        await this.showRepository.addShowInfoOnBulk(showInfoPage);

        return true

    }


}