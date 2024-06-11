import type {ShowInfo, ShowModel} from "@/models/show-model";
import {BaseRepository} from "@/api/repository/base-repository";
import Dexie, {type EntityTable} from 'dexie';
import {db} from "@/database/indexDB";


export class ShowRepository extends BaseRepository {
    private db: Dexie & {  showInfo: EntityTable<ShowInfo, "id">; }

    constructor() {
        super();
        this.db = db;
    }

    public async fetchShows(page: number): Promise<ShowModel[] | null> {
        try {
            console.log('fetchShows')
            const response = await this.fetchApi(`/shows?page=${page}`);

            if (response.ok) {
                return await response.json();
            }

            return null

        } catch (error) {

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
            // log the error to a logging service
        }
    }

    public async getShowInfo(db: IDBDatabase, showInfoId: number): Promise<ShowInfo | null> {
        try {
            const showInfo =  await this.db.showInfo.get(showInfoId) ;

            return (showInfo === undefined) ? null : showInfo;

        } catch (error) {
            // log the error to a logging service

            return null;
        }
    }

    public async checkAndFetchDataIfNeeded() {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero for accurate comparison

        await this.db.showInfo.where('createdAt').aboveOrEqual(today).count().then(count => {
            if (count > 0) {
                // Records inserted today exist in Dexie, no need to fetch from API
                console.log("Records inserted today exist in Dexie, no API fetch needed.");
            } else {
                // No records inserted today, proceed with API fetch
                console.log("No records inserted today in Dexie, fetch from API.");
                // Your API fetch logic here
            }
        }).catch(error => {
            console.error("Error checking Dexie for records inserted today:", error);
        });
    }
}
