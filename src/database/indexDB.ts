import Dexie, { type EntityTable } from 'dexie'
import type { ShowInfo, ShowInfoDBModel } from '@/models/show-model'

const db = new Dexie('show-stream') as Dexie & {
  showInfoDBModel: EntityTable<ShowInfoDBModel, 'id'>
}

// Schema declaration:
db.version(1).stores({
  showInfoDBModel: '++id, name, type, genres, rating, createdAt' // primary key "id" (for the runtime!)
})

export { db }
