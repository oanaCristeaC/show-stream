import type {ShowInfo, ShowModel, ShowsByGenreModel} from "@/models/show-model";
import {BaseRepository} from "@/api/repository/base-repository";
import Dexie, {type EntityTable} from 'dexie';
import {db} from "@/database/indexDB";

export class ShowRepository extends BaseRepository {
    private db: Dexie & { showInfo: EntityTable<ShowInfo, "id">; }

    constructor() {
        super();
        this.db = db;
    }

    public async fetchShows(page: number): Promise<ShowModel[] | null> {
        try {
            console.log('fetchShows')
            const response = await this.fetchApi(`/shows?page=${page}`);

            if (!response.ok) {
               return null;
            }

            return await response.json();

        } catch (error) {
            // log the error to a logging service: "Error fetching shows from API:", error
            return null;
        }
    }

    public async addShowInfoOnBulk(showInfoBulk: ShowInfo[] | null): Promise<void> {

        if (showInfoBulk === null) {
            return
        }
        try {
            await this.db.showInfo.bulkPut(showInfoBulk);
        } catch (error) {
            // log the error to a logging service: "Error adding show info to Dexie:", error
        }
    }

    public async getShowInfo(db: IDBDatabase, showInfoId: number): Promise<ShowInfo | null> {
        try {
            const showInfo = await this.db.showInfo.get(showInfoId);

            return (showInfo === undefined) ? null : showInfo;

        } catch (error) {
            // log the error to a logging service: "Error fetching show info from Dexie:", error
            return null;
        }
    }

 public async getShowsGroupedByGenre(): Promise<ShowsByGenreModel | null> {
    try {
        const showInfo = await db.showInfo.where('genres').notEqual('').toArray();

        return showInfo.reduce((acc: ShowsByGenreModel, showInfo: ShowInfo) => {

            // todo: I deed to consider all genres to a show and not only the first one
            if (!acc[showInfo.genres[0]]) {
                acc[showInfo.genres[0]] = [];
            }
            acc[showInfo.genres[0]].push(showInfo);
            return acc;
        }, {});
    } catch (error) {
        // log the error to a logging service: console.error('Error fetching shows by genre:', error);
        return null;
    }
}

    public async isDbDataInsertedToday(): Promise<boolean>{

        const today = new Date();

        // Set hours, minutes, seconds, and milliseconds to zero for accurate comparison
        today.setHours(0, 0, 0, 0);

        // if there are records inserted today, return true
        return this.db.showInfo.where('createdAt').aboveOrEqual(today).count().then(count => count > 0)
            .catch(error => {
                // log the error to a logging service: "Error checking Dexie for records inserted today:", error
                return false;
            });
    }

}
