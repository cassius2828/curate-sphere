const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

async function seedTestDB() {
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
      profileImg: "https://nrs.harvard.edu/urn-3:HUAM:VRS48616_dynmc",
      headerImg: "https://nrs.harvard.edu/urn-3:HUAM:CARP03212_dynmc",
      email: "larrydoe@gmail.com",
      bio: "I’m Larry, an art enthusiast who loves exploring different styles and periods. I enjoy discovering new artists and connecting with others who share my passion for creative expression.",
    });

    const user2 = await sequelize.models.User.create({
      username: "Jane",
      password: bcrypt.hashSync("123", 10),
      profileImg: "",
      headerImg: "",
      email: "janedoe@gmail.com",
      bio: "I’m Jane, a passionate curator fascinated by modern art and its evolution. I love visiting museums and galleries to get inspired and find new ideas for my own exhibitions.",
    });

    const user3 = await sequelize.models.User.create({
      username: "George",
      password: bcrypt.hashSync("123", 10),
      profileImg: "",
      headerImg: "",
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
      title: "Renaissance Art Expo",
      startDate: new Date(),
      endDate: new Date(),
      description: "A collection of Renaissance art.",
      location: "Los Angeles, CA",
      userId: user1.id,
    });

    const exhibition3 = await sequelize.models.Exhibition.create({
      title: "Impressionism Unveiled",
      startDate: new Date(),
      endDate: new Date(),
      description: "An exhibition focusing on Impressionist art.",
      location: "San Francisco, CA",
      userId: user1.id,
    });

    const exhibition4 = await sequelize.models.Exhibition.create({
      title: "Abstract Wonders",
      startDate: new Date(),
      endDate: new Date(),
      description: "Exploring abstract art forms.",
      location: "Chicago, IL",
      userId: user1.id,
    });

    const exhibition5 = await sequelize.models.Exhibition.create({
      title: "Western Historical Expo",
      startDate: new Date(),
      endDate: new Date(),
      description: "A showcase of Western art.",
      location: "Brooklyn, NY",
      userId: user2.id,
    });

    console.log(
      "Exhibitions created:",
      exhibition1.id,
      exhibition2.id,
      exhibition3.id,
      exhibition4.id,
      exhibition5.id
    );

    // Create Artworks based on the objectid from the provided image
    const artwork1 = await sequelize.models.Artwork.create({ objectid: 10971 });
    const artwork2 = await sequelize.models.Artwork.create({
      objectid: 135003,
    });
    const artwork3 = await sequelize.models.Artwork.create({
      objectid: 135004,
    });
    const artwork4 = await sequelize.models.Artwork.create({
      objectid: 148466,
    });
    const artwork5 = await sequelize.models.Artwork.create({
      objectid: 165347,
    });
    const artwork6 = await sequelize.models.Artwork.create({
      objectid: 178264,
    });
    const artwork7 = await sequelize.models.Artwork.create({
      objectid: 192634,
    });
    const artwork8 = await sequelize.models.Artwork.create({
      objectid: 192636,
    });
    const artwork9 = await sequelize.models.Artwork.create({
      objectid: 192678,
    });
    const artwork10 = await sequelize.models.Artwork.create({
      objectid: 192943,
    });
    const artwork11 = await sequelize.models.Artwork.create({
      objectid: 201134,
    });
    const artwork12 = await sequelize.models.Artwork.create({
      objectid: 219231,
    });
    const artwork13 = await sequelize.models.Artwork.create({
      objectid: 297038,
    });
    const artwork14 = await sequelize.models.Artwork.create({
      objectid: 297881,
    });
    const artwork15 = await sequelize.models.Artwork.create({
      objectid: 33130,
    });
    const artwork16 = await sequelize.models.Artwork.create({
      objectid: 33192,
    });
    const artwork17 = await sequelize.models.Artwork.create({
      objectid: 350731,
    });
    const artwork18 = await sequelize.models.Artwork.create({
      objectid: 379663,
    });
    const artwork19 = await sequelize.models.Artwork.create({
      objectid: 47472,
    });

    console.log(
      "Artworks created:",
      artwork1.id,
      artwork2.id,
      artwork3.id,
      artwork4.id,
      artwork5.id,
      artwork6.id,
      artwork7.id,
      artwork8.id,
      artwork9.id,
      artwork10.id,
      artwork11.id,
      artwork12.id,
      artwork13.id,
      artwork14.id,
      artwork15.id,
      artwork16.id,
      artwork17.id,
      artwork18.id,
      artwork19.id
    );

    // Associate Artworks with Exhibitions
    await exhibition1.addArtworks([artwork1, artwork2, artwork3, artwork4]);
    await exhibition2.addArtworks([artwork5, artwork6, artwork7, artwork8]);
    await exhibition3.addArtworks([artwork9, artwork10, artwork11, artwork12]);
    await exhibition4.addArtworks([artwork13, artwork14, artwork15, artwork16]);
    await exhibition5.addArtworks([artwork17, artwork18, artwork19]);

    console.log("Artworks associated with exhibitions.");

    console.log("Data has been populated successfully!");
  } catch (error) {
    console.error("Error populating data:", error);
  } 
}

module.exports = {
  seedTestDB,
};
