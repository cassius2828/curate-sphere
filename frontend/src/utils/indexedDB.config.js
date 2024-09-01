// src/utils/indexedDB.js

import { openDB } from "idb";

// Constants for the database and store names
const DB_NAME = "cached-data";
const STORE_NAME = "cache-store";

// Opens the IndexedDB database, creating a store if it doesn't exist
export async function openMyIndexedDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

// Stores an item in IndexedDB under a specific key and type
export async function setItemIndexedDB(key, value, type) {
  try {
    const db = await openMyIndexedDB();
    const typeKey = `${key}-${type}`;

    // Get the current count of items in the store
    const count = await db.count(STORE_NAME);

    // If the count exceeds 10,000, delete the oldest item
    if (count >= 10000) {
      await deleteOldestItem(db);
    }

    // Add or update the item in the store
    await db.put(STORE_NAME, value, typeKey);
  } catch (error) {
    console.error("Error setting item in IndexedDB:", error);
  }
}

// Retrieves an item from IndexedDB by its key and type
export async function getItemIndexedDB(key, type) {
  try {
    const db = await openMyIndexedDB();
    const typeKey = `${key}-${type}`;
    return await db.get(STORE_NAME, typeKey);
  } catch (error) {
    console.error("Error getting item from IndexedDB:", error);
    return null;
  }
}

// Deletes an item from IndexedDB by its key and type
export async function deleteItemIndexedDB(key, type) {
  try {
    const db = await openMyIndexedDB();
    const typeKey = `${key}-${type}`;
    return await db.delete(STORE_NAME, typeKey);
  } catch (error) {
    console.error("Error deleting item from IndexedDB:", error);
  }
}

// Clears all items from the IndexedDB store
export async function clearStore() {
  try {
    const db = await openMyIndexedDB();
    return await db.clear(STORE_NAME);
  } catch (error) {
    console.error("Error clearing IndexedDB store:", error);
  }
}

// Deletes the oldest item in the IndexedDB store
async function deleteOldestItem(db) {
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const cursor = await store.openCursor();

  // If a cursor is available, delete the item it points to
  if (cursor) {
    await cursor.delete();
  }

  await transaction.done;
}
