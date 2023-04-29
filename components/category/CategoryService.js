const categoryModel = require('./CategoryModel');

const getAllCategories = async () => {
  try {
    // return category;
    return await categoryModel.find();
  } catch (error) {
    console.log(error);
  }
  return [];
}

module.exports = { getAllCategories };

var category = [{
  "_id": 1,
  "name": "Meselia Airport"
}, {
  "_id": 2,
  "name": "Châteauroux-Déols \"Marcel Dassault\" Airport"
}, {
  "_id": 3,
  "name": "M'Vengue El Hadj Omar Bongo Ondimba International Airport"
}, {
  "_id": 4,
  "name": "Venice Marco Polo Airport"
}, {
  "_id": 5,
  "name": "Waynesville-St. Robert Regional Forney field"
}, {
  "_id": 6,
  "name": "Thaba Nchu Tar Airport"
}, {
  "_id": 7,
  "name": "Hof-Plauen Airport"
}, {
  "_id": 8,
  "name": "Pitalito Airport"
}]