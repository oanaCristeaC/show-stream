import type {ShowInfo, ShowModel} from "@/models/show-model";
import {BaseRepository} from "@/api/repository/base-repository";

export class ShowRepository extends BaseRepository {
    constructor() {
        super();
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
    public async addShowInfo(db: IDBDatabase, showInfo: ShowInfo): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['shows-info'], 'readwrite');
            const objectStore = transaction.objectStore('shows-info');
            const request = objectStore.add(showInfo);

            request.onerror = (event: Event) => {
                console.error('Add show-info error:', (event.target as IDBRequest).error);
                reject((event.target as IDBRequest).error);
            };

            request.onsuccess = () => {
                resolve();
            };
        });
    }

    public async getShowInfo(db: IDBDatabase, showInfoId: number): Promise<ShowInfo> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['shows-info']);
            const objectStore = transaction.objectStore('shows-info');
            const request = objectStore.get(showInfoId);

            request.onerror = (event: Event) => {
                console.error('Get ShowInfo error:', (event.target as IDBRequest).error);
                reject((event.target as IDBRequest).error);
            };

            request.onsuccess = (event: Event) => {
                const showInfo = (event.target as IDBRequest).result as ShowInfo;
                resolve(showInfo);
            };
        });
    }
}
