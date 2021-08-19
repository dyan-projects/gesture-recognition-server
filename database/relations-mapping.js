const mapRelations = db => {
  // Advert <-> Company
  db.company?.model.hasMany(db.advert?.model);
  db.advert?.model.belongsTo(db.company?.model);

  return db;
};

module.exports = mapRelations;
