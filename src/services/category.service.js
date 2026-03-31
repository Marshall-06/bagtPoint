const { Category } = require("../models/model");

class CategoryService {

    // Create a new category (admin only)
    async create(data) {
        const { name } = data;

        if (!name) throw new Error("Category name is required");

        const existing = await Category.findOne({ where: { name } });
        if (existing) throw new Error("Category with this name already exists");

        const category = await Category.create({ name });
        return category;
    }

    // Get all categories
    async getAll() {
        return await Category.findAll({ order: [["name", "ASC"]] });
    }

    // Get single category by ID
    async getById(id) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error("Category not found");
        return category;
    }

    // Update category (admin only)
    async update(id, data) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error("Category not found");

        const { name } = data;
        if (!name) throw new Error("Category name is required");
        category.name = name;

        await category.save();
        return category;
    }

    // Delete category (admin only)
    async delete(id) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error("Category not found");
        await category.destroy();
    }
}

module.exports = new CategoryService();
