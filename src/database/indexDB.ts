import Dexie, {type EntityTable} from 'dexie';
import type {ShowInfo} from "@/models/show-model";

const db = new Dexie('show-stream') as Dexie & {
    showInfo: EntityTable<ShowInfo, 'id'>;
};

// Schema declaration:
db.version(1).stores({
    showInfo: '++id, name, type, genres, rating, createdAt' // primary key "id" (for the runtime!)
});

export { db };
