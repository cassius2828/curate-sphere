const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("../config/database");

const populateData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully to tutorial.");
    await sequelize.sync({ force: true });
    console.log("Database synced.");

    // Create Users
    const user1 = await sequelize.models.User.create({
      username: "John",
    
      password: 'supersecret',
      profileImg: ''
    });
    const user2 = await sequelize.models.User.create({
      username: "Jane",
    
      password: 'supersecreter',
      profileImg: ''
    });    const user3 = await sequelize.models.User.create({
      username: "George",
    
      password: 'jungle',
      profileImg: ''
    });
    console.log("Users created:", user1.id, user2.id, user3.id);

    // Create Exhibitions
    const exhibition1 = await sequelize.models.Exhibition.create({
      title: "Modern Art Expo",
      startDate: new Date(),
      endDate: new Date(),
      description: "A showcase of modern art.",
      location: "New York, NY",
      userId: user1.id,
    });
    const exhibition2 = await sequelize.models.Exhibition.create({
      title: "Western Historical Expo",
      startDate: new Date(),
      endDate: new Date(),
      description: "A showcase of Western art.",
      location: "Brooklyn, NY",
      userId: user2.id,
    });
    console.log("Exhibitions created:", exhibition1.id, exhibition2.id);

    // Create Artworks
    const artwork1 = await sequelize.models.Artwork.create({
      objectId: 4321
    });
    const artwork2 = await sequelize.models.Artwork.create({
      objectId: 2134
    });
    const artwork3 = await sequelize.models.Artwork.create({
      objectId: 8834
    });
    console.log("Artworks created:", artwork1.id, artwork2.id, artwork3.id);

    // Associate Artworks with Exhibitions
    await exhibition1.addArtworks(artwork1);
    await exhibition2.addArtworks(artwork2);
    await exhibition2.addArtworks(artwork3);

    console.log("Artworks associated with exhibitions.");

    console.log("Data has been populated successfully!");
  } catch (error) {
    console.error("Error populating data:", error);
  } finally {
    await sequelize.close();
  }
};

populateData();
