module.exports = db => {
  // Company (One) <-> Advert (Many)
  db.company?.hasMany(db.advert);
  db.advert?.belongsTo(db.company);

  return db;
};
