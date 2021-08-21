const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Advert = sequelize.define('advert', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  });

  return Advert;
};
