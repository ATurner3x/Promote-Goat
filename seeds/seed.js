const sequelize = require("../config/connection");

//import the models

const User = require("../models/user");
const Post = require("../models/post");

//import seed data
const userData = require("./userData.json");
const postData = require("./postData.json");

//create Seed Function
const seedDatabase = async () => {
  //sync all database models
  await sequelize.sync({ force: true });

  //bulk create the user data using the userData.json file
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //bulk create Post data using the JSON file
  //set user_id to random user
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
