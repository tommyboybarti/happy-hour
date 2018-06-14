module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define('Bar', {
    name: DataTypes.STRING,
    formatted_address: DataTypes.STRING,
    formatted_phone_number: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    website: DataTypes.STRING,
    days: {
      type: DataTypes.STRING, 
      get: function() {
          return JSON.parse(this.getDataValue('days'));
      },
      set: function(val) {
          return this.setDataValue('days', JSON.stringify(val));
      }
    },
    times: { 
      type: DataTypes.STRING, 
      get: function() {
          return JSON.parse(this.getDataValue('times'));
      },
      set: function(val) {
          return this.setDataValue('times', JSON.stringify(val));
      }
    },
    offering: DataTypes.TEXT
  })

  Bar.associate = function (models) {
  }
  
  return Bar
}
