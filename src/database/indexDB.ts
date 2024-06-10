export function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {

        // todo: add db name and version to env
        const request: IDBOpenDBRequest = indexedDB.open('show-stream-database', 1);

        request.onerror = (event: Event) => {
            console.error('Database error:', (event.target as IDBRequest).error);

            reject((event.target as IDBRequest).error);
        };

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
            resolve(db);
        };

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

            //todo: add shows-info as parameter
            if (!db.objectStoreNames.contains('shows-info')) {

                db.createObjectStore('shows-info', { keyPath: 'id' });
            }
        };
    });
}