module.exports = function(sequelize, DataTypes) {
  var Dream = sequelize.define("Dream", {
    title: {
      type: DataTypes.STRING
    },      
    mood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dream: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    privacy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    polarity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    polarity_confidence: {
      type: DataTypes.STRING
    }

  });
  return Dream;
};
