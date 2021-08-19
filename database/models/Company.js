const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING(50),
      allownull: false,
    },
  });

  return Company;
};
