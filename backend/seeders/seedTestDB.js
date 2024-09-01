const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

async function seedTestDB()  {
    try {
      await sequelize.authenticate();
      console.log(
        "Connection has been established successfully to test database."
      );
      await sequelize.sync({ force: true });
      console.log("Database synced.");
  
      // Create Users
      const user1 = await sequelize.models.User.create({
        username: "Larry",
        password: bcrypt.hashSync("123", 10),
        profileImg: "http://localhost:5173/artwork/165347",
        headerImg: "http://localhost:5173/artwork/379663",
        email: "larrydoe@gmail.com",
        bio: "I’m Larry, an art enthusiast who loves exploring different styles and periods. I enjoy discovering new artists and connecting with others who share my passion for creative expression.",
      });
  
      const user2 = await sequelize.models.User.create({
        username: "Jane",
        password: bcrypt.hashSync("123", 10),
        profileImg: "http://localhost:5173/artwork/47472",
        headerImg: "http://localhost:5173/artwork/10971",
        email: "janedoe@gmail.com",
        bio: "I’m Jane, a passionate curator fascinated by modern art and its evolution. I love visiting museums and galleries to get inspired and find new ideas for my own exhibitions.",
      });
  
      const user3 = await sequelize.models.User.create({
        username: "George",
        password: bcrypt.hashSync("123", 10),
        profileImg: "http://localhost:5173/artwork/148466",
        headerImg: "http://localhost:5173/artwork/178264",
        email: "georgeofthejungle@gmail.com",
        bio: "I’m George, an art collector and historian with a deep interest in classical art and its cultural impact. I spend my time researching and attending auctions to expand my collection.",
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
        objectid: 297038,
      });
      const artwork2 = await sequelize.models.Artwork.create({
        objectid: 33130,
      });
      const artwork3 = await sequelize.models.Artwork.create({
        objectid: 192943,
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

  module.exports = {
    seedTestDB
  }