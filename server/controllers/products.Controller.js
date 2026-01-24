import Product from "../models/products.Models.js";

//create a product
export const createProduct = async (req, res) => {
  const { name, description, price, thumbnail, stock, category } = req.body;
  try {
    if (!name || !price || !category || !thumbnail || stock === undefined) {
      return res
        .status(400)
        .json({ message: "Name, price, thumbnail, and stock are required" });
    }
    const numberPrice = Number(price);
    const newProduct = await Product.create({
      name,
      description,
      price: numberPrice,
      thumbnail,
      category,
      stock,
    });
    //201 created
    return res
      .status(201)
      .json({ newProduct, message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};
//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    //in case there is o products
    if (products.length === 0) {
      return res
        .status(200)
        .json({ products: [], message: "No products found" });
    }
    return res
      .status(200)
      .json({ products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

//get by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ product, message: "Product fetched successfully" });
    //200 ok
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
//delete by id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ product, message: "Product deleted successfully" });
    //200 ok
  } catch (error) {
    res.status(500).json({ message: "Error deleteiong product", error });
  }
};

//update by id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, thumbnail, stock } = req.body;
  try {
    const updatedData = {};
    if (name !== undefined) updatedData.name = name;
    if (description !== undefined) updatedData.description = description;
    if (price !== undefined) updatedData.price = Number(price);
    if (thumbnail !== undefined) updatedData.thumbnail = thumbnail;
    if (stock !== undefined) updatedData.stock = stock;

    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ product, message: "Product updated successfully" });
    //200 ok
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};
