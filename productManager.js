const fs = require('fs').promises;

class productManager {
  constructor(path) {
    this.path = path;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  async addProduct(productData) {
    const newProductId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    const newProduct = { id: newProductId, ...productData };
    this.products.push(newProduct);
    await this.saveProducts();
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(productId) {
    return this.products.find(product => product.id === productId) || null;
  }

  async updateProduct(productId, updatedData) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedData, id: productId };
      await this.saveProducts();
      return true;
    }
    return false;
  }

  async deleteProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
    await this.saveProducts();
  }
}

module.exports = productManager;
