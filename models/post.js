const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
  static async createPost(postData) {
    const post = await Post.create(postData);
    return post;
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    socMed: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
