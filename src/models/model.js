const User = require("./user")
const CourseLike = require("./courseLike");
const Comment = require("./comment");
const Category = require("./category");


// comment belongs to user and course
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });


module.exports = {
    User,
    CourseLike,
    Comment,
    Category
};