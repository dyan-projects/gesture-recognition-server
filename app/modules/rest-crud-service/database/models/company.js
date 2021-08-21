const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  });

  return Company;
};
