module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {})

  // building an association between different models (user, bar)
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User)
    Bookmark.belongsTo(models.Bar)
  }
  return Bookmark
}