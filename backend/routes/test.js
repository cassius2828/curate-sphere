const express = require("express");
const { seedTestDB } = require("../seeders/seedTestDB");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await seedTestDB();
    res.status(200).json({ message: "Successfully seeded database" });
  } catch (err) {
    res.status(500).json({ error: "Unable to seed database" });
  }
});

module.exports = router;
