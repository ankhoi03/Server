const productModel = require('./ProductModel');

const getAllProducts = async () => {
  try {
    return productModel.find();
  } catch (error) {
    console.log('>>>>>>>>Get all products ERROR: ', error)
  }
  return [];
}

//delete product by _id
const deleteProductById = async (id) => {
  try {
    // const index = products.findIndex(item => item._id.toString() == id);
    // if (index >= 0) {
    //   products.splice(index, 1);
    // }
    await productModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('>>>>>>>>Delete product ERROR:', error);
  }
  return false;
}

//add new product
const addNewProduct = async (name, price, quantity, image, category, display, system, ram, rom, chip, camera, battery) => {
  try {
    const newProduct = {
      //  _id: products.length + 1,
      name,
      price,
      quantity,
      image,
      category,
      display,
      system,
      ram,
      rom,
      chip,
      camera,
      battery
    }
    //  products.push(newProduct);
    await productModel.create(newProduct);
    return true;
  } catch (error) {
    console.log('>>>>>>>Add new product ERROR:', error);

  }
  return false;
}

//update product
const updateProduct = async (id, name, price, quantity, image, category, display, system, ram, rom, chip, camera, battery) => {
  try {
    //let product = products.find(item => item._id.toString() == id.toString());
    let item = await productModel.findById(id);
    if (item) {
      item.name = name ? name : item.name;
      item.price = price ? price : item.price;
      item.quantity = quantity ? quantity : item.quantity;
      item.image = image ? image : item.image;
      item.category = category ? category : item.category;
      item.display = display ? display : item.display;
      item.system = system ? system : item.system;
      item.ram = ram ? ram : item.ram;
      item.rom = rom ? rom : item.rom;
      item.chip = chip ? chip : item.chip;
      item.camera = camera ? camera : item.camera;
      item.battery = battery ? battery : item.battery;
      await item.save();
      return true;
    }


  } catch (error) {
    console.log('>>>>>>Update product ERROR:', error);

  }
  return false;
}

//get product by id
const getProductById = async (id) => {
  try {
    // let product = products.find(item => item._id.toString() == id.toString());
    let product = productModel.findById(id);
    return product;
  } catch (error) {
    console.log('>>>>>>>Get product by id ERROR:', error);
  }
  return null;
}

//query 
const search = async function (keyword) {
  try {
    let query = {
      //$regex: regular expression
      //$option: i- ignore case
      name: { $regex: keyword, $options: 'i' }
    }
    let products = await productModel.find(query);
    return products;
  } catch (error) {

  }
}

module.exports = { getAllProducts, deleteProductById, addNewProduct, updateProduct, getProductById, search };

