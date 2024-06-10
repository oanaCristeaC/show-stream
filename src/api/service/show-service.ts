import {ShowRepository} from "@/api/repository/show-repository";
import type {ShowInfo, ShowModel} from "@/models/show-model";
import {openDatabase} from "@/database/indexDB";

export class ShowService {
    private showRepository: ShowRepository;
    private db: Promise<IDBDatabase>;

    constructor() {
        this.showRepository = new ShowRepository();
        this.db = openDatabase()
    }

    public async getShowsInfo(page: number): Promise<ShowInfo[] | null> {
        const response = await this.showRepository.fetchShows(page);

        if (response !== null) {
            return response.map((show: ShowModel) => {
                return {
                    id: show.id,
                    name: show.name,
                    type: show.type,
                    genres: show.genres,
                    rating: show.rating
                };
            });
        }

        return null;
    }

    public async fetchRecursivelyAndProcess() {
        let page = 0;
        let showsInfo: ShowInfo[] = [];
        let response = await this.getShowsInfo(page);

        while (response !== null) {
            showsInfo = showsInfo.concat(response);
            page++;
            response = await this.getShowsInfo(page);
        }

        return showsInfo;
    }

}