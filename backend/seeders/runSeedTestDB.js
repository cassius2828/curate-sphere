const dotenv = require('dotenv');
const {seedTestDB} = require('./seedTestDB.js');  // Adjust the path based on your project structure
// Load the environment variables from the .env.test file
dotenv.config({ path: '.env.test' });

const isTestEnv = process.env.SEED_TEST_DB || false;
const DB_NAME = process.env.DB_NAME;
console.log(isTestEnv, ' is test env')
console.log(DB_NAME, ' db name')
if (isTestEnv && DB_NAME === "test_curate_sphere") {
  const seedDB = async () => {
    try {
      await seedTestDB();
      console.log("Seeded Test DB successfully");
    } catch (error) {
      console.error("Error seeding test DB:", error);
    }
  };
  seedDB();
} else {
  console.log("Not in a test environment or incorrect DB name. Seeding aborted.");
}