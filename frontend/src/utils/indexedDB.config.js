// src/utils/indexedDB.js

import { openDB, deleteDB } from "idb";

// Constants for the database and store names
const DB_NAME = "curate_sphere_cached-data";

let openConnections = [];

export async function openMyIndexedDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      const storeNames = ["artworks", "exhibitions", "filters"];
      storeNames.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
        // tracks open connections
        console.log(openConnections, ' ,__ before')
        console.log(openConnections.push(db))
        console.log(openConnections, ' ,__ after push')

      });
    },
  });
}

// Stores an item in IndexedDB under a specific key and type
export async function setItemIndexedDB(key, value, storeName) {
  try {
    const db = await openMyIndexedDB();
    // Get the current count of items in the store
    const count = await db.count(storeName);

    // If the count exceeds 10,000, delete the oldest item
    if (count >= 10000) {
      await deleteOldestItem(db);
    }

    // Add or update the item in the store
    await db.put(storeName, value, key);
  } catch (error) {
    console.error(`Error setting item in ${storeName}. Error: ${error}`);
  }
}

// Retrieves an item from IndexedDB by its key and type
export async function getItemIndexedDB(key, storeName) {
  try {
    const db = await openMyIndexedDB();

    return await db.get(storeName, key);
  } catch (error) {
    console.error(`Error retrieving item in ${storeName}. Error: ${error}`);

    return null;
  }
}

// Deletes an item from IndexedDB by its key and type
export async function deleteItemIndexedDB(key, storeName) {
  try {
    const db = await openMyIndexedDB();

    return await db.delete(storeName, key);
  } catch (error) {
    console.error(`Error deleting item in ${storeName}. Error: ${error}`);
  }
}

// Clears all items from the IndexedDB store
export async function clearStore(storeName) {
  try {
    // Open the database and start a new transaction for the specified store
    const db = await openMyIndexedDB(storeName);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    // Clear the store
    await store.clear();
    await tx.done; // Ensure the transaction completes successfully

    return { message: `Cleared the ${storeName} store` };
  } catch (error) {
    console.error(`Error clearing the store ${storeName}. Error: ${error}`);
    throw new Error(`Error clearing the store ${storeName}`);
  }
}

// Deletes the oldest item in the IndexedDB store
async function deleteOldestItem(db, storeName) {
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  const cursor = await store.openCursor();

  // If a cursor is available, delete the item it points to
  if (cursor) {
    await cursor.delete();
  }

  await transaction.done;
}

export async function deleteEntireDatabase() {
  console.log("hello");
  try {
    console.log(openConnections)
    closeAllConnections();
    console.log(openConnections)
    const data = await deleteDB(DB_NAME);
    console.log(data, ' <-- data var')
    console.log("successfuly deleted database");
    return { message: "Database deleted successfully" };
  } catch (error) {
    console.error("Error deleting the database:", error);
    return { error: "Error deleting the database" };
  } finally {
    console.log("bye");
  }
}

function closeAllConnections() {
  openConnections.forEach((db) => db.close());
  openConnections = [];
}
