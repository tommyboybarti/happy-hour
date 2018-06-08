module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define('Bar', {
    title: DataTypes.STRING,
    happyhour: DataTypes.STRING,
    location: DataTypes.STRING,
    offering: DataTypes.TEXT
  })
  
  return Bar
}
