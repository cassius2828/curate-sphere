// src/utils/indexedDB.js
import { openDB } from "idb";

const DB_NAME = "cached-data";
const STORE_NAME = "cache-store";

export async function openMyIndexedDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setItemIndexedDB(key, value, type) {
  const db = await openMyIndexedDB();
  const typeKey = `${key}-${type}`;
  // get count of objects
  const count = await db.count(STORE_NAME);

  // checks if count is past 10k then runs func to delte oldest item
  if (count >= 10000) {
    await deleteOldestItem(db);
  }
  await db.put(STORE_NAME, value, typeKey);
}

export async function getItemIndexedDB(key, type) {
  const db = await openMyIndexedDB();
  const typeKey = `${key}-${type}`;

  return await db.get(STORE_NAME, typeKey);
}

export async function deleteItemIndexedDB(key, type) {
  const db = await openMyIndexedDB();
  const typeKey = `${key}-${type}`;
  return await db.delete(STORE_NAME, typeKey);
}

export async function clearStore() {
  const db = await openMyIndexedDB();
  return await db.clear(STORE_NAME);
}

async function deleteOldestItem(db) {
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  const cursor = await store.openCursor();

  if (cursor) {
    await cursor.delete();
  }

  await transaction.done;
}
