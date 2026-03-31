const categoryService = require("../services/category.service");

// POST /api/categories — admin only
exports.create = async (req, res) => {
    try {
        const category = await categoryService.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET /api/categories
exports.getAll = async (req, res) => {
    try {
        const categories = await categoryService.getAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/categories/:id
exports.getById = async (req, res) => {
    try {
        const category = await categoryService.getById(req.params.id);
        res.json(category);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// PUT /api/categories/:id — admin only
exports.update = async (req, res) => {
    try {
        const category = await categoryService.update(req.params.id, req.body);
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/categories/:id — admin only
exports.delete = async (req, res) => {
    try {
        await categoryService.delete(req.params.id);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
